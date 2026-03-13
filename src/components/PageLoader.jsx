import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading -> reveal -> done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background pattern */}
          <div className="loader-pattern" />

          {/* Logo mark */}
          <motion.div
            className="loader-logo-container"
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={
              phase === "loading"
                ? { scale: 1, opacity: 1, rotateY: 0 }
                : { scale: 20, opacity: 0, rotateY: 180 }
            }
            transition={
              phase === "loading"
                ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                : { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }
          >
            <div className="loader-logo">
              <motion.div
                className="loader-logo-inner"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </div>
            <motion.p
              className="loader-text"
              initial={{ opacity: 0, y: 15, letterSpacing: "0px" }}
              animate={
                phase === "loading"
                  ? { opacity: 1, y: 0, letterSpacing: "8px" }
                  : { opacity: 0, scale: 1.5, letterSpacing: "20px" }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              SALATI
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="loader-progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === "loading" ? 1 : 0, y: phase === "loading" ? 0 : -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="loader-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "loading" ? 1 : 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
