import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlareHover from "./react-bits/GlareHover";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const screenshots = [
  {
    src: "/prayer-dashboard.jpg",
    labelKey: "gallery.shots.dashboard.label",
    descKey: "gallery.shots.dashboard.desc",
  },
  {
    src: "/prayer-times.jpg",
    labelKey: "gallery.shots.times.label",
    descKey: "gallery.shots.times.desc",
  },
  {
    src: "/qibla.jpg",
    labelKey: "gallery.shots.qibla.label",
    descKey: "gallery.shots.qibla.desc",
  },
  {
    src: "/settings.jpg",
    labelKey: "gallery.shots.settings.label",
    descKey: "gallery.shots.settings.desc",
  },
];

export default function Gallery() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word reveal
      gsap.from(headingRef.current.querySelectorAll(".gallery-heading-word"), {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Staggered card reveal on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.from(".gallery-card", {
          y: 80,
          opacity: 0,
          scale: 0.92,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="preview" ref={sectionRef} className="gallery-section">
      <div className="gallery-bg-orb" />

      <div className="section-container">
        <div ref={headingRef} className="section-header">
          <h2 className="section-title">
            {[t("gallery.title1"), t("gallery.title2")].map((word, i) => (
              <span key={i} className="gallery-heading-word" style={{ display: 'inline-block' }}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="section-subtitle">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Desktop: Staggered grid with 3D perspective hover */}
        <div className="gallery-grid">
          {screenshots.map((shot, i) => (
            <motion.div
              key={i}
              className="gallery-card"
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="gallery-phone">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderColor="transparent"
                  borderRadius="20px"
                  glareColor="#ffffff"
                  glareOpacity={0.15}
                  glareSize={150}
                  className="gallery-phone-glare"
                >
                  <div className="gallery-phone-notch" />
                  <img
                    src={shot.src}
                    alt={t(shot.labelKey)}
                    className="gallery-phone-img"
                    loading="lazy"
                  />
                </GlareHover>
              </div>
              <div className="gallery-card-info">
                <p className="gallery-label">{t(shot.labelKey)}</p>
                <p className="gallery-desc">{t(shot.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
