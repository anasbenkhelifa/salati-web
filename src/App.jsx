import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import WhySalati from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import PageLoader from "./components/PageLoader";
import ScrollProgress from "./components/ScrollProgress";
import Marquee from "./components/Marquee";
import PrayerJourney from "./components/PrayerJourney";
import CursorGlow from "./components/CursorGlow";
import BackToTop from "./components/BackToTop";
import FAQ from "./components/FAQ";
// WebGL background loads on demand — it's atmosphere, not content
const Plasma = lazy(() => import("./components/react-bits/Plasma"));
import { Analytics } from "@vercel/analytics/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSunTimes, estimateCoords } from "./lib/sunTimes";

// Time-of-day atmosphere: the ambient palette follows the visitor's actual
// sun — sunrise/sunset computed astronomically from a timezone-based location
// estimate, so the periods track the seasons anywhere on Earth.
const getDayPeriod = () => {
  const now = new Date();
  const { lat, lng } = estimateCoords();
  const times = getSunTimes(now, lat, lng);

  if (!times) {
    // Polar day/night — fall back to fixed clock buckets
    const h = now.getHours();
    if (h >= 4 && h < 7) return "dawn";
    if (h >= 7 && h < 17) return "day";
    if (h >= 17 && h < 20) return "dusk";
    return "night";
  }

  const t = now.getTime();
  const rise = times.sunrise.getTime();
  const set = times.sunset.getTime();
  const MIN = 60 * 1000;
  if (t >= rise - 75 * MIN && t < rise + 30 * MIN) return "dawn";
  if (t >= rise + 30 * MIN && t < set - 45 * MIN) return "day";
  if (t >= set - 45 * MIN && t < set + 45 * MIN) return "dusk";
  return "night";
};

const PLASMA_COLORS = {
  dawn: "#E8A05A",
  day: "#1CCCCD",
  dusk: "#F0735A",
  night: "#7C82F0",
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const [period, setPeriod] = useState(getDayPeriod);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dataset.time = period;
    const id = setInterval(() => setPeriod(getDayPeriod()), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [period]);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    // Layout (and RTL direction) changes shift every trigger position
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, [i18n.language]);

  // A small wave goodbye when the tab loses focus
  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? "🌙 Salati — see you soon" : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <PageLoader onComplete={handleLoadComplete} />

      {/* Plasma fixed full-screen background — outside SmoothScroll so it never scrolls */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <Suspense fallback={null}>
          <Plasma
            key={period}
            color={PLASMA_COLORS[period]}
            speed={1}
            direction="forward"
            scale={1}
            opacity={0.4}
            mouseInteractive={false}
          />
        </Suspense>
      </div>

      {/* Film grain overlay for a premium finish */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Ambient cursor light (desktop only) */}
      <CursorGlow />

      <div
        className={`app-wrapper ${loaded ? "app-loaded" : "app-loading"}`}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Features />
            <PrayerJourney />
            <Gallery />
            <WhySalati />
            <FAQ />
            <CTA />
          </main>
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </div>

      <Analytics />
    </>
  );
}

export default App;