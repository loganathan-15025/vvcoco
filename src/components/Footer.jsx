import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
} from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import { FaLeaf, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/919876543210", label: "WhatsApp" },
];

const columnVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const { ref, controls } = useScrollAnimation(0.1);
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Brand */}
          <motion.div variants={columnVariant}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-coconut-green to-coconut-green-light flex items-center justify-center">
                <FaLeaf className="text-white text-sm" />
              </div>
              <span className="font-bold text-lg">VV Coco</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={columnVariant}>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              {t("footer.contact")}
            </h3>
            <div className="space-y-2.5 text-gray-400 text-sm">
              <p>Pollachi, Coimbatore</p>
              <p>Tamil Nadu, India</p>
              <p>+91 98765 43210</p>
              <p>info@vvcoco.com</p>
            </div>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-coconut-green flex items-center justify-center transition-colors"
                  >
                    <Icon className="text-sm" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { delay: 0.5, duration: 0.6 } },
          hidden: { opacity: 0 },
        }}
        className="border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">{t("footer.rights")}</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              {t("footer.privacy")}
            </span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              {t("footer.terms")}
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
