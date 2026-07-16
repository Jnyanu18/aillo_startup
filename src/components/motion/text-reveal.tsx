import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  children,
  as: As = "span",
  className,
}: {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const words = children.split(" ");
  const MotionTag = motion(As as any);
  return (
    <MotionTag
      className="inline-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      variants={container}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em] leading-[1.15]"
        >
          <motion.span className={cn("inline-block", className)} variants={word}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
