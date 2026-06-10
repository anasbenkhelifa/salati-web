import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const ITEM_KEYS = [
  "times",
  "qibla",
  "offline",
  "noAds",
  "adhan",
  "widgets",
  "languages",
  "privacy",
];

export default function Marquee() {
  const { t } = useTranslation();
  const trackRef = useRef(null);

  // GSAP-driven loop whose speed, direction and skew react to scroll velocity
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 38,
      repeat: -1,
    });

    let target = 1;
    const st = ScrollTrigger.create({
      onUpdate(self) {
        const v = self.getVelocity();
        const boost = gsap.utils.clamp(-5, 5, v / 250);
        if (Math.abs(boost) > Math.abs(target)) target = boost || target;
      },
    });

    const tick = () => {
      // Ease the loop's speed toward the target, then decay back to cruise speed
      loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.08));
      target = gsap.utils.interpolate(target, target < 0 ? -1 : 1, 0.04);
      // Skew follows how far we are from cruise speed
      const ts = loop.timeScale();
      gsap.set(track, {
        skewX: gsap.utils.clamp(-8, 8, (Math.abs(ts) - 1) * Math.sign(ts) * 2.2),
      });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      loop.kill();
    };
  }, []);

  const renderRow = (ariaHidden) => (
    <div className="marquee-row" aria-hidden={ariaHidden}>
      {ITEM_KEYS.map((key) => (
        <span key={key} className="marquee-item">
          <span className="marquee-star">✦</span>
          {t(`marquee.${key}`)}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-section">
      <div ref={trackRef} className="marquee-track">
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
