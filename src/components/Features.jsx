import { Compass, Clock, ListChecks, MapPin, Radio, ShieldCheck } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBorder from "./react-bits/StarBorder";
import SpotlightCard from "./SpotlightCard";
import AnimatedTitle from "./AnimatedTitle";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    titleKey: "features.cards.clock.title",
    subtitleKey: "features.cards.clock.subtitle",
    icon: Clock,
    descKey: "features.cards.clock.desc",
    color: "rgba(16, 185, 129, 0.15)",
  },
  {
    titleKey: "features.cards.list.title",
    subtitleKey: "features.cards.list.subtitle",
    icon: ListChecks,
    descKey: "features.cards.list.desc",
    color: "rgba(34, 211, 238, 0.15)",
  },
  {
    titleKey: "features.cards.qibla.title",
    subtitleKey: "features.cards.qibla.subtitle",
    icon: Compass,
    descKey: "features.cards.qibla.desc",
    color: "rgba(99, 102, 241, 0.15)",
  },
  {
    titleKey: "features.cards.adhan.title",
    subtitleKey: "features.cards.adhan.subtitle",
    icon: Radio,
    descKey: "features.cards.adhan.desc",
    color: "rgba(244, 114, 182, 0.15)",
  },
  {
    titleKey: "features.cards.location.title",
    subtitleKey: "features.cards.location.subtitle",
    icon: MapPin,
    descKey: "features.cards.location.desc",
    color: "rgba(251, 191, 36, 0.15)",
  },
  {
    titleKey: "features.cards.privacy.title",
    subtitleKey: "features.cards.privacy.subtitle",
    icon: ShieldCheck,
    descKey: "features.cards.privacy.desc",
    color: "rgba(16, 185, 129, 0.15)",
  },
];

export default function Features() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const threadRef = useRef(null);

  // A thread that draws itself, weaving through the feature grid
  useEffect(() => {
    const path = threadRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current.querySelector(".features-grid"),
        start: "top 80%",
        end: "bottom 65%",
        scrub: 1,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="features" ref={sectionRef} className="features-section">
      {/* Background decorations */}
      <div className="features-bg">
        <div className="features-orb features-orb-1" />
        <div className="features-orb features-orb-2" />
      </div>

      <div className="section-container">
        <div className="section-header">
          <AnimatedTitle
            text={`${t("features.title1")} ${t("features.title2")} ${t("features.title3")}`}
          />
          <p className="section-subtitle">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="features-grid-wrap">
          {/* Connecting thread drawn on scroll */}
          <svg
            className="features-thread"
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="threadStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#10b981" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path
              ref={threadRef}
              d="M500 -20 C 80 120, 920 220, 500 380 C 80 540, 920 640, 500 820"
              stroke="url(#threadStroke)"
              strokeWidth="1.5"
            />
          </svg>

          <div className="features-grid">
          {features.map((f, idx) => (
            <SpotlightCard
              key={idx}
              className="feature-card"
              spotlightColor={f.color}
              delay={(idx % 3) * 0.12}
            >
              <span className="feature-num" aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg" />
                <f.icon size={22} className="feature-icon" />
              </div>
              <h3 className="feature-title">
                {t(f.titleKey)}
                <span className="feature-subtitle">{t(f.subtitleKey)}</span>
              </h3>
              <p className="feature-desc">{t(f.descKey)}</p>
            </SpotlightCard>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
