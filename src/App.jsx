import { useState, useCallback, useEffect } from "react";
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
import Plasma from "./components/react-bits/Plasma";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [loaded, setLoaded] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
        <Plasma
          color="#1CCCCD"
          speed={1}
          direction="forward"
          scale={1}
          opacity={0.4}
          mouseInteractive={false}
        />
      </div>

      <div
        className={`app-wrapper ${loaded ? "app-loaded" : "app-loading"}`}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Gallery />
            <WhySalati />
            <CTA />
          </main>
          <Footer />
        </SmoothScroll>
      </div>

      <Analytics />
    </>
  );
}

export default App;