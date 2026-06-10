import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  const faqs = t("help.faqs", { returnObjects: true });

  return (
    <section className="faq-section">
      <div className="section-container">
        <div className="section-header">
          <AnimatedTitle text={t("faq.title")} />
          <p className="section-subtitle">{t("faq.subtitle")}</p>
        </div>

        <div className="faq-landing-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq-landing-item ${open === i ? "faq-landing-item-open" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                className="faq-landing-question"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="faq-landing-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq-landing-q-text">{faq.q}</span>
                <motion.span
                  className="faq-landing-chevron"
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-landing-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="faq-landing-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/help" className="faq-landing-more-link">
            {t("faq.more")}
            <ArrowRight size={16} className="faq-landing-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
