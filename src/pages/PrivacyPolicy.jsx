import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="legal-back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("brandName")}
          </Link>

          <h1 className="legal-title">{t("privacy.title")}</h1>
          <p className="legal-updated">{t("privacy.lastUpdated")}</p>
          <p className="legal-intro">{t("privacy.intro")}</p>

          {t("privacy.sections", { returnObjects: true }).map((section, i) => (
            <motion.div
              key={i}
              className="legal-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            >
              <h2 className="legal-section-title">{section.title}</h2>
              <p className="legal-section-content">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
