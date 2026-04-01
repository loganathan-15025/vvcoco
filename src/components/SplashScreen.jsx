import { motion } from "framer-motion";
import splashImage from "../assets/img2.png";
import { useLanguage } from "../context/LanguageContext";

export default function SplashScreen() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#fdfcfa] via-[#f9f6f2] to-[#f5f0ea] flex flex-col items-center justify-center overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading website content"
    >
      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coconut-brown/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coconut-green/5 rounded-full blur-[80px]" />

      {/* Logo with elegant animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center"
      >
        {/* Rotating ring around logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#2e7d32",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
            }}
          />
        </div>

        {/* Logo container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(141,110,99,0.15)] border-2 border-white"
        >
          <img
            src={splashImage}
            alt="VV Coco"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6 text-2xl md:text-3xl font-bold text-dark tracking-tight"
      >
        VV Coco
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-1 text-coconut-brown text-xs md:text-sm font-medium tracking-[0.1em] uppercase"
      >
        {t("splash.tagline")}
      </motion.p>
    </motion.div>
  );
}
