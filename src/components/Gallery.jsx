import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlareHover from "./react-bits/GlareHover";
import AnimatedTitle from "./AnimatedTitle";
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
  const pinRef = useRef(null);
  const stRef = useRef(null);
  const activeIdxRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Pinned scrollytelling — desktop only
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * 2.4,
        pin: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            screenshots.length - 1,
            Math.floor(self.progress * screenshots.length)
          );
          if (idx !== activeIdxRef.current) {
            activeIdxRef.current = idx;
            setActive(idx);
          }
        },
      });
      stRef.current = st;
      return () => {
        st.kill();
        stRef.current = null;
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Jump to a given screen's scroll segment when its list item is clicked
  const goToScreen = (i) => {
    const st = stRef.current;
    if (!st) return;
    const target =
      st.start + ((i + 0.5) / screenshots.length) * (st.end - st.start);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="preview" ref={sectionRef} className="gallery-section">
      <div ref={pinRef} className="gallery-pin">
        <div className="gallery-bg-orb" />

        <div className="section-container gallery-pin-container">
          <div ref={headingRef} className="section-header gallery-header">
            <AnimatedTitle text={`${t("gallery.title1")} ${t("gallery.title2")}`} />
            <p className="section-subtitle">
              {t("gallery.subtitle")}
            </p>
          </div>

          {/* Desktop: pinned showcase — text list synced with phone screen */}
          <div className="gallery-showcase">
            <div className="showcase-list">
              {screenshots.map((shot, i) => (
                <button
                  key={i}
                  type="button"
                  className={`showcase-item ${i === active ? "showcase-item-active" : ""}`}
                  onClick={() => goToScreen(i)}
                >
                  <span className="showcase-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="showcase-item-text">
                    <span className="showcase-label">{t(shot.labelKey)}</span>
                    <span className="showcase-desc">{t(shot.descKey)}</span>
                  </span>
                  <span className="showcase-bar" />
                </button>
              ))}
            </div>

            <div className="showcase-phone-wrap">
              <div className="showcase-phone-glow" />
              <motion.div
                animate={{ rotate: active % 2 === 0 ? -2 : 2, y: active % 2 === 0 ? -6 : 6 }}
                transition={{ type: "spring", stiffness: 60, damping: 14 }}
              >
              <GlareHover
                className="showcase-phone"
                background="transparent"
                borderColor="transparent"
                glareColor="#ffffff"
                glareOpacity={0.12}
                glareSize={150}
                borderRadius="20px"
                style={{ padding: 0 }}
              >
                <div className="gallery-phone-notch" />
                <div className="showcase-screen">
                  {/* All screens stay mounted — crossfade is stable under fast scrubbing */}
                  {screenshots.map((shot, i) => (
                    <motion.img
                      key={i}
                      src={shot.src}
                      alt={t(shot.labelKey)}
                      className="showcase-screenshot"
                      initial={false}
                      animate={{
                        opacity: active === i ? 1 : 0,
                        scale: active === i ? 1 : 1.06,
                        y: active === i ? 0 : i < active ? -22 : 22,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </div>
              </GlareHover>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked cards */}
      <div className="gallery-stack section-container">
        {screenshots.map((shot, i) => (
          <motion.div
            key={i}
            className="gallery-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gallery-phone">
              <div className="gallery-phone-notch" />
              <img
                src={shot.src}
                alt={t(shot.labelKey)}
                className="gallery-phone-img"
                loading="lazy"
              />
            </div>
            <div className="gallery-card-info">
              <p className="gallery-label">{t(shot.labelKey)}</p>
              <p className="gallery-desc">{t(shot.descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
