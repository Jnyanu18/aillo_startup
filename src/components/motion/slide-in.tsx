import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -120, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const fromRight: Variants = {
  hidden: { opacity: 0, x: 120, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const fromBottom: Variants = {
  hidden: { opacity: 0, y: 80, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SlideIn({
  children,
  from = "left",
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}) {
  const variants =
    from === "left" ? fromLeft : from === "right" ? fromRight : fromBottom;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px", amount: 0.15 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
