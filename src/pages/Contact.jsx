import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Important: Replace this with your actual Web3Forms Access Key
  const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New Contact from Salati Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        setSubmitted(true);
        e.target.reset(); // clear form
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

          <h1 className="legal-title">{t("contact.title")}</h1>
          <p className="legal-intro">{t("contact.intro")}</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="from_name" value="Salati Contact Form" />

            <div className="contact-field">
              <label htmlFor="name">{t("contact.fields.name")}</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="contact-field">
              <label htmlFor="email">{t("contact.fields.email")}</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="contact-field">
              <label htmlFor="message">{t("contact.fields.message")}</label>
              <textarea id="message" name="message" rows="5" required />
            </div>
            <button type="submit" className="contact-submit" disabled={loading}>
              {loading ? "Sending..." : t("contact.fields.submit")}
            </button>
            {error && (
              <motion.p
                style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem', fontWeight: 500 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
            {submitted && (
              <motion.p
                className="contact-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t("contact.success")}
              </motion.p>
            )}
          </form>

          <div className="contact-alt">
            <p className="contact-alt-label">{t("contact.directEmail")}</p>
            <a href="mailto:anas.benkhelifa@etu.univ-batna2.dz" className="contact-email-link">
              anas.benkhelifa@etu.univ-batna2.dz
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
