import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  ...props
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
