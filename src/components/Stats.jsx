import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import SpotlightCard from "./react-bits/SpotlightCard";
import AnimatedTitle from "./AnimatedTitle";
import { useTranslation } from "react-i18next";

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

const counters = [
  { value: 5, suffix: "", labelKey: "stats.counters.prayers" },
  { value: 3, suffix: "", labelKey: "stats.counters.languages" },
  { value: 100, suffix: "%", labelKey: "stats.counters.offline" },
  { value: 0, suffix: "", labelKey: "stats.counters.ads" },
];

function Counter({ value, suffix }) {
  const { i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  const formatted = new Intl.NumberFormat(
    i18n.language?.startsWith("ar") ? "ar-EG" : i18n.language || "en"
  ).format(display);

  return (
    <span ref={ref} className="counter-number">
      {formatted}
      {suffix}
    </span>
  );
}

function MissionWord({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span className="mission-word" style={{ opacity }}>
      {children}{" "}
    </motion.span>
  );
}

function MissionReveal({ brand, text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className="why-mission-text">
      <span className="why-mission-highlight">{brand}</span>{" "}
      {words.map((word, i) => (
        <MissionWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </MissionWord>
      ))}
    </p>
  );
}

export default function WhySalati() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // Giant editorial text strips drifting horizontally with scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const giantX1 = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const giantX2 = useTransform(scrollYProgress, [0, 1], ["-6%", "4%"]);

  const brand = t("brandName");
  const giantText = Array(6).fill(brand).join("  ✦  ");

  return (
    <section ref={sectionRef} className="why-section">
      <div className="why-bg" />

      {/* Outlined giant text, parallaxing in opposite directions */}
      <div className="why-giant" aria-hidden="true">
        <motion.div className="why-giant-row" style={{ x: giantX1 }}>
          {giantText}
        </motion.div>
        <motion.div className="why-giant-row why-giant-row-2" style={{ x: giantX2 }}>
          {giantText}
        </motion.div>
      </div>

      <div className="section-container why-content">
        <div className="section-header">
          <AnimatedTitle text={`${t("stats.title1")} ${t("stats.title2")}`} />
          <p className="section-subtitle">
            {t("stats.subtitle")}
          </p>
        </div>

        {/* Animated counters */}
        <div className="why-counters">
          {counters.map((c, i) => (
            <motion.div
              key={i}
              className="counter-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Counter value={c.value} suffix={c.suffix} />
              <span className="counter-label">{t(c.labelKey)}</span>
            </motion.div>
          ))}
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

        {/* Mission statement — scroll-driven word reveal */}
        <div className="why-mission">
          <MissionReveal brand={t("brandName")} text={t("stats.mission")} />
        </div>
      </div>
    </section>
  );
}
