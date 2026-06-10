import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Position of each prayer along the arc (fraction of total path length)
const PRAYERS = [
  { key: "fajr", t: 0.07 },
  { key: "dhuhr", t: 0.45 },
  { key: "asr", t: 0.63 },
  { key: "maghrib", t: 0.84 },
  { key: "isha", t: 0.97 },
];

const ARC_D = "M40 470 Q600 -60 1160 470";

export default function PrayerJourney() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const sunRef = useRef(null);
  const sunCoreRef = useRef(null);
  const haloDayRef = useRef(null);
  const haloSunsetRef = useRef(null);
  const moonRef = useRef(null);
  const moonHaloRef = useRef(null);
  const dawnRef = useRef(null);
  const nightRef = useRef(null);
  const markerRefs = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    const sun = sunRef.current;
    if (!path || !sun) return;
    const len = path.getTotalLength();

    // Place markers and the sun on the arc
    PRAYERS.forEach((p, i) => {
      const pt = path.getPointAtLength(p.t * len);
      markerRefs.current[i]?.setAttribute(
        "transform",
        `translate(${pt.x}, ${pt.y})`
      );
    });
    const start = path.getPointAtLength(0);
    sun.setAttribute("transform", `translate(${start.x}, ${start.y})`);

    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    // Celestial body baseline state (also restores correctly on rebuilds)
    gsap.set(sunCoreRef.current, {
      fill: "#fbbf24",
      opacity: 1,
      filter: "drop-shadow(0 0 12px rgba(251, 191, 36, 0.8))",
    });
    gsap.set(haloDayRef.current, { opacity: 0.6 });
    gsap.set(haloSunsetRef.current, { opacity: 0 });
    gsap.set(moonRef.current, { opacity: 0 });
    gsap.set(moonHaloRef.current, { opacity: 0 });

    const mm = gsap.matchMedia();

    const buildTimeline = (scrollTrigger) => {
      const proxy = { l: 0 };
      const tl = gsap.timeline({ scrollTrigger });

      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
        .to(
          proxy,
          {
            l: len,
            ease: "none",
            duration: 1,
            onUpdate: () => {
              const pt = path.getPointAtLength(proxy.l);
              sun.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
            },
          },
          0
        )
        .to(dawnRef.current, { opacity: 0, ease: "none", duration: 1 }, 0)
        .to(nightRef.current, { opacity: 1, ease: "none", duration: 1 }, 0);

      // Approaching Maghrib (t≈0.84): the sun blushes sunset red
      tl.to(
        sunCoreRef.current,
        {
          fill: "#ef4444",
          filter: "drop-shadow(0 0 14px rgba(239, 68, 68, 0.85))",
          duration: 0.16,
        },
        0.66
      )
        .to(haloDayRef.current, { opacity: 0, duration: 0.16 }, 0.66)
        .to(haloSunsetRef.current, { opacity: 0.75, duration: 0.16 }, 0.66);

      // After Maghrib: the sun sets and smoothly becomes the moon
      tl.to(
        sunCoreRef.current,
        { opacity: 0, attr: { r: 7 }, duration: 0.07 },
        0.87
      )
        .to(haloSunsetRef.current, { opacity: 0, duration: 0.07 }, 0.87)
        .to(moonRef.current, { opacity: 1, duration: 0.08 }, 0.9)
        .to(moonHaloRef.current, { opacity: 0.55, duration: 0.08 }, 0.9);

      // Light each prayer up as the sun reaches it
      PRAYERS.forEach((p, i) => {
        const g = markerRefs.current[i];
        if (!g) return;
        const at = Math.max(0, p.t - 0.03);
        tl.to(g, { opacity: 1, duration: 0.05 }, at);
        tl.to(g.querySelector(".journey-marker-dot"), { attr: { r: 9 }, duration: 0.05 }, at);
        tl.to(
          g.querySelector(".journey-marker-ring"),
          { opacity: 0.5, attr: { r: 19 }, duration: 0.05 },
          at
        );
      });

      return tl;
    };

    mm.add("(min-width: 768px)", () => {
      const tl = buildTimeline({
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * 1.7,
        pin: true,
        scrub: 0.6,
        // Journey sits above the Gallery pin — refresh it first so the two
        // pin spacers never throw each other's start positions off.
        refreshPriority: 2,
        invalidateOnRefresh: true,
      });
      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const tl = buildTimeline({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 100%",
        scrub: 1,
      });
      return () => tl.kill();
    });

    return () => mm.revert();
  }, [i18n.language]);

  return (
    <section ref={sectionRef} className="journey-section">
      {/* Sky overlays — dawn fades out, night fades in as the sun travels */}
      <div ref={dawnRef} className="journey-sky journey-sky-dawn" />
      <div ref={nightRef} className="journey-sky journey-sky-night" />

      <div className="section-container journey-container">
        <div className="section-header journey-header">
          <AnimatedTitle text={t("journey.title")} />
          <p className="section-subtitle">{t("journey.subtitle")}</p>
        </div>

        <div className="journey-stage" dir="ltr">
          <svg
            className="journey-svg"
            viewBox="0 0 1200 560"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journeyStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="0.45" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#818cf8" />
              </linearGradient>
              <radialGradient id="journeySun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#fef3c7" />
                <stop offset="0.5" stopColor="#fbbf24" />
                <stop offset="1" stopColor="rgba(251, 191, 36, 0)" />
              </radialGradient>
              <radialGradient id="journeySunset" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#fecaca" />
                <stop offset="0.5" stopColor="#f87171" />
                <stop offset="1" stopColor="rgba(248, 113, 113, 0)" />
              </radialGradient>
              <radialGradient id="journeyMoon" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#e0e7ff" />
                <stop offset="0.5" stopColor="#a5b4fc" />
                <stop offset="1" stopColor="rgba(165, 180, 252, 0)" />
              </radialGradient>
            </defs>

            {/* Horizon */}
            <line x1="0" y1="470" x2="1200" y2="470" className="journey-horizon" />

            {/* Ghost of the full arc */}
            <path d={ARC_D} className="journey-path-ghost" />

            {/* The arc that draws itself */}
            <path ref={pathRef} d={ARC_D} className="journey-path" stroke="url(#journeyStroke)" />

            {/* Prayer markers */}
            {PRAYERS.map((p, i) => (
              <g
                key={p.key}
                ref={(el) => (markerRefs.current[i] = el)}
                className="journey-marker"
              >
                <circle r="16" className="journey-marker-ring" />
                <circle r="6" className="journey-marker-dot" />
                <text y="-30" textAnchor="middle" className="journey-marker-name">
                  {t(`journey.prayers.${p.key}.name`)}
                </text>
                <text y="44" textAnchor="middle" className="journey-marker-time">
                  {t(`journey.prayers.${p.key}.time`)}
                </text>
              </g>
            ))}

            {/* Travelling sun — blushes red at sunset, becomes the moon at night */}
            <g ref={sunRef} className="journey-sun">
              <circle ref={haloDayRef} r="30" fill="url(#journeySun)" opacity="0.6" />
              <circle ref={haloSunsetRef} r="32" fill="url(#journeySunset)" opacity="0" />
              <circle ref={moonHaloRef} r="26" fill="url(#journeyMoon)" opacity="0" />
              <circle ref={sunCoreRef} r="11" className="journey-sun-core" />
              <path
                ref={moonRef}
                className="journey-moon"
                transform="rotate(-25)"
                d="M 3 -10.6 A 11 11 0 1 0 3 10.6 A 8.8 8.8 0 1 1 3 -10.6 Z"
                opacity="0"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
