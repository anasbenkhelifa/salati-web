import { motion, AnimatePresence, animate } from "framer-motion";
import { useState, useEffect } from "react";

const LETTERS = "SALATI".split("");

// Same crescent geometry as the journey moon, scaled up (browser auto-corrects radii)
const CRESCENT_D = "M 9 -31.8 A 33 33 0 1 0 9 31.8 A 26.4 26.4 0 1 1 9 -31.8 Z";

export default function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading -> reveal -> done
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counter = animate(0, 100, {
      duration: 2.0,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    const t1 = setTimeout(() => setPhase("reveal"), 2150);
    const t2 = setTimeout(() => onComplete?.(), 2300);
    const t3 = setTimeout(() => setPhase("done"), 3150);
    return () => {
      counter.stop();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="page-loader"
          initial={false}
          animate={phase === "reveal" ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          {/* Starfield */}
          <div className="loader-stars" />

          {/* Slowly rotating geometric star */}
          <svg className="loader-geo" viewBox="0 0 200 200" aria-hidden="true">
            <g fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.6">
              <rect x="55" y="55" width="90" height="90" />
              <rect x="55" y="55" width="90" height="90" transform="rotate(45 100 100)" />
              <circle cx="100" cy="100" r="63" />
              <circle cx="100" cy="100" r="90" strokeDasharray="2 6" />
            </g>
          </svg>

          <div className="loader-center">
            <div className="loader-crescent-wrap">
              <motion.svg
                className="loader-crescent"
                viewBox="-45 -45 90 90"
                fill="none"
                animate={phase === "reveal" ? { scale: 1.18 } : { scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <defs>
                  <linearGradient id="loaderCrescent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#10b981" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <g transform="rotate(-25)">
                  {/* The crescent draws itself… */}
                  <motion.path
                    d={CRESCENT_D}
                    stroke="url(#loaderCrescent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.15, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
                  />
                  {/* …then fills with light */}
                  <motion.path
                    d={CRESCENT_D}
                    fill="url(#loaderCrescent)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.25, ease: "easeOut" }}
                  />
                </g>
              </motion.svg>
              <motion.span
                className="loader-spark"
                initial={{ scale: 0, opacity: 0, rotate: -40 }}
                animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.9], rotate: 10 }}
                transition={{ delay: 1.45, duration: 0.55, ease: "easeOut" }}
              >
                ✦
              </motion.span>
            </div>

            <div className="loader-brand" aria-label="Salati">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="loader-letter"
                  initial={{ opacity: 0, y: 26, rotateX: -55, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.5 + i * 0.075, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="loader-arabic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
            >
              صلاتي
            </motion.p>
          </div>

          {/* Giant outlined counter */}
          <span className="loader-counter">{progress}</span>

          {/* Progress line */}
          <div className="loader-progress-line">
            <div
              className="loader-progress-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>

          {/* Dawn glow on the curtain's lower edge */}
          <div className="loader-horizon" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
