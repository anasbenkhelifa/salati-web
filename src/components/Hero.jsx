import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import BlurText from "./react-bits/BlurText";
import GlareHover from "./react-bits/GlareHover";
import GlassSurface from "./react-bits/GlassSurface";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useTranslation();
  const headlineText = t("hero.headline");
  
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [
    "/prayer-dashboard.jpg",
    "/prayer-times.jpg",
    "/qibla.jpg",
    "/settings.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax orbs
      gsap.to(".hero-orb-1", {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-orb-2", {
        y: -100,
        x: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".hero-orb-3", {
        y: -40,
        x: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      {/* Parallax gradient orbs */}
      <div className="hero-orbs">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* Grid pattern overlay */}


      <motion.div className="hero-container" style={{ opacity }}>
        <div className="hero-content">
          {/* Left: Text */}
          <motion.div className="hero-text" style={{ y }}>
            <h1 className="hero-headline">
              <motion.span
                className="hero-headline-salati hero-headline-salati--big"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {t("brandName")}
              </motion.span>
              <BlurText
                text={headlineText}
                delay={50}
                animateBy="words"
                direction="bottom"
                className="hero-blur-text"
              />
            </h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              {t("hero.desc")}
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton
                as="a"
                href="#download"
                className="btn-primary"
                strength={0.2}
              >
                <span className="btn-glow" />
                <span className="btn-text">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t("hero.downloadBtn")}
                </span>
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#features"
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
                  {t("hero.exploreBtn")}
                </span>
              </MagneticButton>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              className="hero-mini-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="hero-stat">
                <span className="hero-stat-number">100%</span>
                <span className="hero-stat-label">{t("hero.statOffline")}</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">0</span>
                <span className="hero-stat-label">{t("hero.statAds")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            ref={phoneRef}
            className="hero-phone-container"
            style={{ y: phoneY, rotate: phoneRotate }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-phone-glow" />
            <GlareHover
              className="hero-phone"
              background="transparent"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={0.15}
              glareSize={150}
              borderRadius="40px"
              style={{ padding: 0 }}
            >
              <div className="hero-phone-notch" />
              <div className="hero-phone-screen">
                {screens.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`Salati app screen ${i + 1}`}
                    className="hero-phone-screenshot"
                    initial={false}
                    animate={{
                      opacity: currentScreen === i ? 1 : 0,
                      scale: currentScreen === i ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </GlareHover>
            {/* Floating elements around phone */}
            <motion.div
              className="hero-float hero-float-1"
              animate={{
                y: [0, -20, 0, 15, 0],
                x: [0, 10, 0, -10, 0],
                rotate: [0, 8, -4, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hero-float-icon">🕌</span>
            </motion.div>
            <motion.div
              className="hero-float hero-float-2"
              animate={{
                y: [0, 25, 0, -15, 0],
                x: [0, -15, 0, 10, 0],
                rotate: [0, -12, 6, 0],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hero-float-icon">🧭</span>
            </motion.div>
            <motion.div
              className="hero-float hero-float-3"
              animate={{
                y: [0, -15, 0, 20, 0],
                x: [0, 20, 0, -5, 0],
                rotate: [0, 15, -10, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hero-float-icon">⏰</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="scroll-dot"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
