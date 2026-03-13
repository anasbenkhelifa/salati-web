import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "./react-bits/SpotlightCard";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: "🕌",
    titleKey: "stats.cards.focus.title",
    descKey: "stats.cards.focus.desc",
  },
  {
    icon: "🔒",
    titleKey: "stats.cards.privacy.title",
    descKey: "stats.cards.privacy.desc",
  },
  {
    icon: "⚡",
    titleKey: "stats.cards.offline.title",
    descKey: "stats.cards.offline.desc",
  },
];

export default function WhySalati() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.querySelectorAll(".why-heading-word"), {
        y: 50,
        opacity: 0,
        rotateX: -30,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why-section">
      <div className="why-bg" />

      <div className="section-container">
        <div ref={headingRef} className="section-header">
          <h2 className="section-title">
            {[t("stats.title1"), t("stats.title2")].map((word, i) => (
              <span key={i} className="why-heading-word" style={{ display: 'inline-block' }}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="section-subtitle">
            {t("stats.subtitle")}
          </p>
        </div>

        <div className="why-grid">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="why-card-wrapper"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard className="why-card" spotlightColor="rgba(16, 185, 129, 0.12)">
                <span className="why-icon">{v.icon}</span>
                <h3 className="why-title">{t(v.titleKey)}</h3>
                <p className="why-desc">{t(v.descKey)}</p>
                {/* Decorative line */}
                <div className="why-line" />
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Mission statement */}
        <motion.div
          className="why-mission"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="why-mission-text">
            <span className="why-mission-highlight">{t("brandName")}</span>{" "}
            {t("stats.mission")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
