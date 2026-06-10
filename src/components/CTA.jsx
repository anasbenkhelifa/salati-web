import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import GlassSurface from "./react-bits/GlassSurface";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const skylineRef = useRef(null);
  const crescentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Mosque skyline line-art draws itself on scroll, crescent pops in at the end
  useEffect(() => {
    const path = skylineRef.current;
    const crescent = crescentRef.current;
    if (!path || !crescent) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(crescent, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 35%",
        scrub: 1,
      },
    });
    tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }).to(
      crescent,
      { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
      ">-0.05"
    );
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="download" ref={sectionRef} className="cta-section">
      <div className="section-container">
        <motion.div className="cta-card" style={{ scale, opacity }}>
          {/* Animated border */}
          <div className="cta-border-glow" />
          <div className="cta-inner">
            {/* Drifting aurora orbs inside the card */}
            <div className="cta-aurora cta-aurora-1" />
            <div className="cta-aurora cta-aurora-2" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <svg
                className="cta-skyline"
                viewBox="0 0 360 130"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="skylineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#10b981" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <path
                  ref={skylineRef}
                  stroke="url(#skylineStroke)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 122
                     H44
                     V96 H40 V92 H44
                     V66 H41 V62 H44
                     L45 50 V46 L50 28 L55 46 V50
                     L56 62 H59 V66 H56
                     V92 H60 V96 H56
                     V122
                     H94
                     V108
                     C94 94 103 88 111 82
                     L113 78 L115 82
                     C123 88 132 94 132 108
                     V122
                     H140
                     V104 H144 V100 H148
                     V92
                     C150 64 164 50 178 46
                     L180 40 L182 46
                     C196 50 210 64 212 92
                     V100 H216 V104 H220
                     V122
                     H228
                     V108
                     C228 94 237 88 245 82
                     L247 78 L249 82
                     C257 88 266 94 266 108
                     V122
                     H304
                     V96 H300 V92 H304
                     V66 H301 V62 H304
                     L305 50 V46 L310 28 L315 46 V50
                     L316 62 H319 V66 H316
                     V92 H320 V96 H316
                     V122
                     H354"
                />
                <path
                  ref={crescentRef}
                  className="cta-crescent"
                  fill="#fbbf24"
                  d="M185 10 a11 11 0 1 0 6 20 a9 9 0 1 1 -6 -20"
                />
              </svg>
              <h3 className="cta-title">{t("cta.title")}</h3>
              <p className="cta-desc">
                {t("cta.subtitle")}
              </p>
              <div className="cta-pills">
                {["free", "noAds", "offline"].map((key) => (
                  <span key={key} className="cta-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t(`cta.pills.${key}`)}
                  </span>
                ))}
              </div>
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