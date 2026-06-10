import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section title with a char-level 3D flip-in reveal on scroll.
 * Arabic joins letters, so char splitting would break ligatures —
 * in RTL we split by words instead.
 */
export default function AnimatedTitle({ text, className = "" }) {
  const ref = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, { types: isRTL ? "words" : "words,chars" });
    const targets = isRTL ? split.words : split.chars;

    const tween = gsap.from(targets, {
      yPercent: 110,
      opacity: 0,
      rotateX: -75,
      transformOrigin: "50% 100%",
      transformPerspective: 600,
      stagger: isRTL ? 0.07 : 0.02,
      duration: 0.9,
      ease: "back.out(1.6)",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [text, isRTL]);

  // key forces a full remount when the text/language changes — SplitType has
  // mutated the DOM, so React can't reconcile the old text node in place.
  return (
    <h2 key={`${isRTL}-${text}`} ref={ref} className={`section-title ${className}`}>
      {text}
    </h2>
  );
}
