import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

/** Floating back-to-top button with a scroll-progress ring around it. */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 700);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg className="back-to-top-ring" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="21" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              stroke="url(#backTopStroke)"
              strokeWidth="2"
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ pathLength: scrollYProgress }}
            />
            <defs>
              <linearGradient id="backTopStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#10b981" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
