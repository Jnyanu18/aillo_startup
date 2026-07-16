import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion/gsap";

/* ---------------- Topology ------------------------------------------------ */
// 4 clusters → build / automate / grow / support. ~70 nodes total.
const CLUSTER_ANCHORS: THREE.Vector3[] = [
  new THREE.Vector3(-1.6, 1.1, 0.2),
  new THREE.Vector3(1.5, 1.0, -0.3),
  new THREE.Vector3(-1.4, -1.1, -0.2),
  new THREE.Vector3(1.5, -1.0, 0.3),
];

const NODE_COUNT = 72;
const PER_CLUSTER = NODE_COUNT / CLUSTER_ANCHORS.length;

type NodeData = {
  cluster: number;
  // resting cluster position
  rest: THREE.Vector3;
  // scattered starting position
  scatter: THREE.Vector3;
  // flat/line motif end position (for scroll morph)
  line: THREE.Vector3;
  phase: number;
};

function buildNodes(): NodeData[] {
  const nodes: NodeData[] = [];
  for (let c = 0; c < CLUSTER_ANCHORS.length; c++) {
    const anchor = CLUSTER_ANCHORS[c];
    for (let i = 0; i < PER_CLUSTER; i++) {
      const r = 0.55 + Math.random() * 0.35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const rest = new THREE.Vector3(
        anchor.x + r * Math.sin(phi) * Math.cos(theta),
        anchor.y + r * Math.sin(phi) * Math.sin(theta) * 0.85,
        anchor.z + r * Math.cos(phi) * 0.6,
      );
      const scatter = new THREE.Vector3(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      );
      // line motif: arrange across a gentle horizontal sine
      const t = (c * PER_CLUSTER + i) / NODE_COUNT;
      const line = new THREE.Vector3(
        (t - 0.5) * 6.5,
        Math.sin(t * Math.PI * 2) * 0.35,
        0,
      );
      nodes.push({ cluster: c, rest, scatter, line, phase: Math.random() * Math.PI * 2 });
    }
  }
  return nodes;
}

/* Edges: connect each node to its 2 nearest neighbors within & across clusters */
function buildEdgeIndices(nodes: NodeData[]) {
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    const distances: Array<{ j: number; d: number }> = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      distances.push({ j, d: nodes[i].rest.distanceTo(nodes[j].rest) });
    }
    distances.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2; k++) {
      const j = distances[k].j;
      if (j > i) pairs.push([i, j]);
    }
  }
  return pairs;
}

/* ---------------- Scene contents ------------------------------------------ */
function Scene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const nodes = useMemo(buildNodes, []);
  const edgeIdx = useMemo(() => buildEdgeIndices(nodes), [nodes]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Intro progress 0..1 lerped over ~1.6s on mount
  const introRef = useRef(0);
  useEffect(() => {
    const { gsap } = ensureGsap();
    const reduce = prefersReducedMotion();
    if (reduce) {
      introRef.current = 1;
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 1,
      duration: 1.6,
      ease: "power3.out",
      delay: 0.15,
      onUpdate: () => {
        introRef.current = obj.v;
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // line buffer
  const linePositions = useMemo(
    () => new Float32Array(edgeIdx.length * 2 * 3),
    [edgeIdx.length],
  );

  // current world positions per node (computed each frame)
  const currentPos = useMemo(
    () => nodes.map(() => new THREE.Vector3()),
    [nodes],
  );

  const { camera } = useThree();
  const baseCamZ = 5.6;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const intro = introRef.current; // 0..1
    const scroll = progressRef.current; // 0..1 from ScrollTrigger

    // Camera dolly + slight rotate driven by scroll progress
    camera.position.z = baseCamZ + scroll * 2.4;
    camera.position.x = scroll * 0.6;
    camera.position.y = scroll * 0.2;
    camera.lookAt(0, 0, 0);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      // Intro: scatter -> rest
      tmp.lerpVectors(n.scatter, n.rest, intro);
      // Scroll morph: rest -> line motif
      tmpB.lerpVectors(tmp, n.line, scroll);
      // Subtle idle drift
      const drift = 0.06 * intro * (1 - scroll * 0.7);
      tmpB.x += Math.sin(t * 0.7 + n.phase) * drift;
      tmpB.y += Math.cos(t * 0.6 + n.phase * 1.3) * drift;

      currentPos[i].copy(tmpB);

      const pulse = 1 + Math.sin(t * 1.8 + n.phase) * 0.18;
      dummy.position.copy(tmpB);
      dummy.scale.setScalar(0.085 * pulse * (0.4 + 0.6 * intro));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // node color: warm peach palette
      const hue = 0.06 + n.cluster * 0.012;
      const lum = 0.55 + Math.sin(t + n.phase) * 0.05;
      color.setHSL(hue, 0.9, lum);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    // Edge positions
    if (linesRef.current) {
      for (let e = 0; e < edgeIdx.length; e++) {
        const [a, b] = edgeIdx[e];
        const pa = currentPos[a];
        const pb = currentPos[b];
        const off = e * 6;
        linePositions[off + 0] = pa.x;
        linePositions[off + 1] = pa.y;
        linePositions[off + 2] = pa.z;
        linePositions[off + 3] = pb.x;
        linePositions[off + 4] = pb.y;
        linePositions[off + 5] = pb.z;
      }
      const geom = linesRef.current.geometry as THREE.BufferGeometry;
      const attr = geom.getAttribute("position") as THREE.BufferAttribute;
      attr.needsUpdate = true;
      // Fade edges with intro/scroll
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.18 + 0.22 * intro * (1 - scroll * 0.5);
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffb088"
          emissiveIntensity={1.5}
          roughness={0.35}
          metalness={0.4}
          toneMapped={false}
        />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ff8a4c"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ---------------- Public component ---------------------------------------- */
export function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    const el = wrapRef.current;
    if (!el) return;
    const { ScrollTrigger } = ensureGsap();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=80%",
      scrub: 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => {
      st.kill();
    };
  }, []);

  if (reduce) {
    // Static fallback: warm radial gradient, no canvas, no animation.
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-[#07061a]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,138,76,0.5) 0%, rgba(7,6,26,0) 65%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-[#07061a]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,138,76,0.35) 0%, rgba(7,6,26,0) 65%)",
        }}
      />
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5.6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 4]} intensity={1.0} color="#ffd4b8" />
          <pointLight position={[0, 0, 3]} intensity={1.4} color="#ff8a4c" distance={9} />
          <Scene progressRef={progressRef} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        ailo.network · build · automate · grow · support
      </div>
    </div>
  );
}
