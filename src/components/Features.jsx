import { Compass, Clock, ListChecks, MapPin, Radio, ShieldCheck } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBorder from "./react-bits/StarBorder";
import SpotlightCard from "./SpotlightCard";
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
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.querySelectorAll(".feature-heading-word"), {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="features-section">
      {/* Background decorations */}
      <div className="features-bg">
        <div className="features-orb features-orb-1" />
        <div className="features-orb features-orb-2" />
      </div>

      <div className="section-container">
        <div ref={headingRef} className="section-header">
          <h2 className="section-title">
            {[t("features.title1"), t("features.title2"), t("features.title3")].map((word, i) => (
              <span key={i} className="feature-heading-word" style={{ display: 'inline-block' }}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="section-subtitle">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, idx) => (
            <SpotlightCard
              key={idx}
              className="feature-card"
              spotlightColor={f.color}
            >
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
    </section>
  );
}
