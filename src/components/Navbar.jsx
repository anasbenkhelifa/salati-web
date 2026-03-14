import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MagneticButton from "./MagneticButton";
import GlassSurface from "./react-bits/GlassSurface";

export default function Navbar() {
  const { scrollY } = useScroll();
  const { t, i18n } = useTranslation();
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setElevated(latest > 10);
  });

  const navLinks = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.preview"), href: "#preview" },
    { label: t("nav.download"), href: "#download" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const cycleLanguage = () => {
    const currentLang = i18n.language?.startsWith('ar') ? 'ar' : (i18n.language || 'en');
    if (currentLang === 'en') changeLanguage('fr');
    else if (currentLang === 'fr') changeLanguage('ar');
    else changeLanguage('en');
  };

  const getLangDisplay = () => {
    const currentLang = i18n.language?.startsWith('ar') ? 'ar' : (i18n.language || 'en');
    if (currentLang === 'en') return 'En';
    if (currentLang === 'fr') return 'Fr';
    return 'ع';
  };

  return (
    <header className="navbar-header">
      <div className="navbar-wrapper">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`navbar ${elevated ? "navbar-elevated" : ""}`}
          style={{ background: 'transparent', backdropFilter: 'none' }}
        >
          {/* GlassSurface as background layer — strictly 64px tall, never resizes */}
          <GlassSurface
            key={mobileOpen ? "navbar-glass-open" : "navbar-glass"}
            width="100%"
            height={64}
            borderRadius={50}
            backgroundOpacity={0.1}
            saturation={1}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={11}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 0,
              pointerEvents: "none",
              height: 64
            }}
          />

          {/* All navbar content sits above the glass layer */}
          <div className="navbar-inner" style={{ position: "relative", zIndex: 1 }}>
            <a href="#" className="navbar-brand">
              <div className="navbar-logo">
                <img src="/favicon.png" alt="Salati Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="navbar-brand-text">
                <p className="navbar-brand-name">{t("brandName")}</p>
                <p className="navbar-brand-sub">Prayer Assistant</p>
              </div>
            </a>

            <nav className="navbar-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="navbar-link">
                  <span>{link.label}</span>
                  <span className="navbar-link-underline" />
                </a>
              ))}
            </nav>

            <div className="navbar-actions">
              <div className="language-switcher" style={{ 
                display: "flex", 
                alignItems: "center",
                marginInlineEnd: "1rem"
              }}>
                <button
                  onClick={cycleLanguage}
                  className="lang-cycle-btn"
                  style={{ 
                    padding: "6px 16px",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.08)", 
                    color: "var(--text-primary)", 
                    fontWeight: "600", 
                    border: "1px solid rgba(255, 255, 255, 0.15)", 
                    cursor: "pointer", 
                    fontSize: "0.9rem",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    transition: "all 0.2s ease",
                    fontFamily: i18n.language?.startsWith("ar") ? "Arial, sans-serif" : "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "50px",
                    letterSpacing: "0.5px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translateY(1px)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                >
                  {getLangDisplay()}
                </button>
              </div>

              <MagneticButton
                as="a"
                href="#download"
                className="navbar-cta"
                strength={0.2}
              >
                {t("nav.getApp")}
              </MagneticButton>
              <button
                className="navbar-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu — also above glass layer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="navbar-mobile"
                style={{ position: "relative", zIndex: 1 }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="navbar-mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#download"
                  className="navbar-mobile-cta"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.getApp")}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}