import { useState } from "react";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  blurIn,
} from "../hooks/useScrollAnimation";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const formFieldVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", country: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-coconut-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={blurIn}
            className="inline-block px-4 py-1.5 bg-coconut-green/10 text-coconut-green text-sm font-semibold rounded-full mb-4"
          >
            {t("contact.badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-dark-light max-w-2xl mx-auto text-lg"
          >
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Contact Info - slides from left */}
          <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-6">
            <motion.div
              whileHover={{
                y: -3,
                boxShadow: "0 10px 40px -8px rgba(0,0,0,0.08)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-dark mb-6">
                {t("contact.infoTitle")}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-coconut-green/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-coconut-green" />
                  </div>
                  <div>
                    <div className="font-medium text-dark text-sm">
                      {t("contact.addressLabel")}
                    </div>
                    <div className="text-dark-light text-sm mt-0.5">
                      Pollachi, Coimbatore,
                      <br />
                      Tamil Nadu, India
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-coconut-green/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-coconut-green" />
                  </div>
                  <div>
                    <div className="font-medium text-dark text-sm">
                      {t("contact.phoneLabel")}
                    </div>
                    <div className="text-dark-light text-sm mt-0.5">
                      +91 98765 43210
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-coconut-green/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-coconut-green" />
                  </div>
                  <div>
                    <div className="font-medium text-dark text-sm">
                      {t("contact.emailLabel")}
                    </div>
                    <div className="text-dark-light text-sm mt-0.5">
                      info@vvcoco.com
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Buttons with hover scale */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-4 transition-colors"
            >
              <FaWhatsapp className="text-2xl" />
              <div>
                <div className="font-semibold text-sm">
                  {t("contact.whatsappTitle")}
                </div>
                <div className="text-xs text-white/80">
                  {t("contact.whatsappSubtitle")}
                </div>
              </div>
            </motion.a>
            <motion.a
              href="mailto:info@vvcoco.com"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-coconut-green hover:bg-coconut-green-dark text-white rounded-2xl p-4 transition-colors"
            >
              <FaEnvelope className="text-2xl" />
              <div>
                <div className="font-semibold text-sm">
                  {t("contact.sendEmailTitle")}
                </div>
                <div className="text-xs text-white/80">
                  {t("contact.sendEmailSubtitle")}
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Form - slides from right with staggered fields */}
          <motion.div variants={fadeInRight} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-bold text-dark mb-6">
                {t("contact.formTitle")}
              </h3>
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                  },
                }}
                initial="hidden"
                animate={controls}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <motion.div variants={formFieldVariant}>
                  <label className="block text-sm font-medium text-dark mb-1.5">
                    {t("contact.fields.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coconut-green focus:ring-2 focus:ring-coconut-green/20 outline-none transition-all text-sm"
                    placeholder={t("contact.placeholders.name")}
                  />
                </motion.div>
                <motion.div variants={formFieldVariant}>
                  <label className="block text-sm font-medium text-dark mb-1.5">
                    {t("contact.fields.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coconut-green focus:ring-2 focus:ring-coconut-green/20 outline-none transition-all text-sm"
                    placeholder={t("contact.placeholders.email")}
                  />
                </motion.div>
                <motion.div variants={formFieldVariant}>
                  <label className="block text-sm font-medium text-dark mb-1.5">
                    {t("contact.fields.country")}
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coconut-green focus:ring-2 focus:ring-coconut-green/20 outline-none transition-all text-sm"
                    placeholder={t("contact.placeholders.country")}
                  />
                </motion.div>
                <motion.div variants={formFieldVariant}>
                  <label className="block text-sm font-medium text-dark mb-1.5">
                    {t("contact.fields.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coconut-green focus:ring-2 focus:ring-coconut-green/20 outline-none transition-all text-sm"
                    placeholder={t("contact.placeholders.phone")}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                variants={formFieldVariant}
                initial="hidden"
                animate={controls}
                className="mt-4"
              >
                <label className="block text-sm font-medium text-dark mb-1.5">
                  {t("contact.fields.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coconut-green focus:ring-2 focus:ring-coconut-green/20 outline-none transition-all text-sm resize-none"
                  placeholder={t("contact.placeholders.message")}
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 12px 30px -8px rgba(46, 125, 50, 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-3.5 bg-coconut-green hover:bg-coconut-green-dark text-white font-semibold rounded-xl transition-colors text-sm"
              >
                {submitted ? t("contact.sent") : t("contact.send")}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
