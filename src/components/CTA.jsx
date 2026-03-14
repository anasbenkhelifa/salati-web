import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import GlassSurface from "./react-bits/GlassSurface";
import { useTranslation } from "react-i18next";

export default function CTA() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="download" ref={sectionRef} className="cta-section">
      <div className="section-container">
        <motion.div className="cta-card" style={{ scale, opacity }}>
          {/* Animated border */}
          <div className="cta-border-glow" />
          <div className="cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="cta-emoji">🌙</span>
              <h3 className="cta-title">{t("cta.title")}</h3>
              <p className="cta-desc">
                {t("cta.subtitle")}
              </p>
            </motion.div>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <MagneticButton
                as="a"
                href="https://pub-01160e77f7394a43946f810025efb70d.r2.dev/Salati.apk"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://pub-01160e77f7394a43946f810025efb70d.r2.dev/Salati.apk";
                }}
                className="btn-primary btn-lg"
                strength={0.2}
              >
                <span className="btn-glow" />
                <span className="btn-text">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t("cta.downloadNow")}
                </span>
              </MagneticButton>
              <MagneticButton
                as="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary btn-lg"
                strength={0.15}
                style={{ position: 'relative', overflow: 'hidden', border: 'none' }}
              >
                {/* GlassSurface as background layer */}
                <GlassSurface
                  width="100%"
                  height="100%"
                  borderRadius={50}
                  backgroundOpacity={0.1}
                  saturation={1}
                  borderWidth={0.07}
                  brightness={50}
                  opacity={0.93}
                  blur={11}
                  displace={0.5}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
                {/* Text content above the glass layer */}
                <span className="btn-text" style={{ position: "relative", zIndex: 1 }}>
                  {t("cta.viewFeatures")}
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}