import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("footer.product.title"),
      links: [
        { label: t("footer.product.features"), url: "#features" },
        { label: t("footer.product.screenshots"), url: "#preview" },
        { label: t("footer.product.download"), url: "#download" },
        { label: t("footer.product.changelog"), url: "#" },
      ],
    },
    {
      title: t("footer.resources.title"),
      links: [
        { label: t("footer.resources.privacy"), url: "/privacy", isRoute: true },
        { label: t("footer.resources.terms"), url: "/terms", isRoute: true },
        { label: t("footer.resources.help"), url: "/help", isRoute: true },
        { label: t("footer.resources.contact"), url: "/contact", isRoute: true },
      ],
    },
    {
      title: t("footer.connect.title"),
      links: [
        { label: t("footer.connect.telegram"), url: "https://t.me/anassbkk" },
        { label: t("footer.connect.instagram"), url: "https://www.instagram.com/anass._.bkk?igsh=MXEyMWoyZHl2bGQ4Ng==" },
        { label: t("footer.connect.github"), url: "https://github.com/anasbenkhelifa" },
        { label: t("footer.connect.email"), url: "mailto:anas1benkhelifa@gmail.com" },
      ],
    },
  ];

  return (
    <footer className="footer-section">
      {/* Gradient separator */}
      <div className="footer-separator" />

      <div className="section-container">
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Brand column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/favicon.png" alt="Salati Logo" className="footer-logo-mark" style={{ objectFit: 'cover', background: 'none' }} />
              <div>
                <p className="footer-brand-name">{t("brandName")}</p>
                <p className="footer-brand-tagline">{t("footer.tagline")}</p>
              </div>
            </div>
            <p className="footer-brand-desc">
              {t("footer.desc")}
            </p>
            {/* Social icons */}
            <div className="footer-socials">
              {[
                { 
                  icon: <svg key="tg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
                  url: "https://t.me/anassbkk"
                },
                {
                  icon: <svg key="ig" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                  url: "https://www.instagram.com/anass._.bkk?igsh=MXEyMWoyZHl2bGQ4Ng=="
                },
                {
                  icon: <svg key="gh" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                  url: "https://github.com/anasbenkhelifa"
                },
                {
                  icon: <svg key="ml" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  url: "mailto:anas1benkhelifa@gmail.com"
                }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col, i) => (
            <div key={i} className="footer-links-col">
              <h4 className="footer-links-title">{col.title}</h4>
              <ul className="footer-links-list">
                {col.links.map((link, j) => (
                  <li key={j}>
                    {link.isRoute ? (
                      <Link to={link.url} className="footer-link">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.url} className="footer-link">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <p className="footer-copyright">
            {t("footer.copyright").replace("{{year}}", new Date().getFullYear())}
          </p>
          <button
            className="footer-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
