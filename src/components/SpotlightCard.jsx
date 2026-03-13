import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.15)",
}) {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`spotlight-card ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spotlight effect */}
      <div
        className="spotlight-effect"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
      {/* Animated border glow */}
      <div
        className="spotlight-border"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, rgba(16, 185, 129, 0.4), transparent 60%)`,
        }}
      />
      <div className="spotlight-content">{children}</div>
    </motion.div>
  );
}
