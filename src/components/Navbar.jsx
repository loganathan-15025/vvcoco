import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import logoImage from "../assets/img2.png";
import { useLanguage } from "../context/LanguageContext";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "products", href: "#products" },
  { key: "about", href: "#about" },
  { key: "applications", href: "#applications" },
  { key: "contact", href: "#contact" },
  { key: "location", href: "#location" },
];

const mobileItemVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, isTamil, toggleLanguage } = useLanguage();
  const toggleLabel = isTamil ? t("nav.toggleEnglish") : t("nav.toggleTamil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 md:pt-4">
          <div
            className={`flex items-center justify-between h-14 md:h-16 px-4 md:px-5 rounded-full transition-all duration-500 border ${
              scrolled
                ? "bg-black/35 backdrop-blur-xl shadow-[0_12px_36px_-16px_rgba(0,0,0,0.55)] border-white/20"
                : "bg-black/20 backdrop-blur-lg border-white/15"
            }`}
          >
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/25 shadow-lg shadow-coconut-green/25">
                <img
                  src={logoImage}
                  alt="VV Coco Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`font-bold text-lg tracking-tight transition-colors duration-300 ${"text-white"}`}
              >
                VV Coco
              </span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    whileHover={{ y: -1 }}
                    className="relative px-3.5 py-2 text-sm font-medium transition-all duration-300 rounded-full group text-white/90 hover:text-white"
                  >
                    {t(`nav.links.${link.key}`)}
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-coconut-green rounded-full transition-all duration-300 group-hover:w-4/5" />
                  </motion.a>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-1 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-coconut-green to-coconut-green-light rounded-full hover:brightness-95 transition-all shadow-lg shadow-coconut-green/30"
              >
                {toggleLabel}
              </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                type="button"
                onClick={toggleLanguage}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-coconut-green to-coconut-green-light rounded-full shadow-lg shadow-coconut-green/30"
              >
                {toggleLabel}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={t("nav.toggleMenu")}
                className="p-2.5 rounded-full transition-all border text-white bg-white/10 border-white/25"
              >
                {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-24 w-[92%] max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-[#102116]/95 to-[#0b160f]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
                  },
                }}
                className="p-4"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    variants={mobileItemVariant}
                    className="block px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl text-base font-medium transition-all"
                  >
                    {t(`nav.links.${link.key}`)}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
