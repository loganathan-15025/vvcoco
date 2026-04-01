import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/img.jpg";
import { useLanguage } from "../context/LanguageContext";

// Jumping letter animation used for English badge text
function BouncingText({ text, className, delay = 0 }) {
  const letters = text.split("");

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

// Typing animation without cursor: type -> hold -> erase -> repeat
function TypingText({
  text,
  className,
  typingSpeed = 70,
  deletingSpeed = 40,
  holdDelay = 1300,
  restartDelay = 300,
}) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
  }, [text]);

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      return;
    }

    let timeoutId;

    if (!isDeleting && displayText.length < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === text.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, holdDelay);
    } else if (isDeleting && displayText.length > 0) {
      timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
      }, restartDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [
    text,
    displayText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    holdDelay,
    restartDelay,
  ]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="invisible select-none">{text}</span>
      <span className="absolute inset-0">{displayText || "\u00A0"}</span>
    </span>
  );
}

export default function Hero() {
  const { t, isTamil } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={t("hero.imageAlt")}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/25 to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 md:pt-28 text-center -translate-y-4 md:-translate-y-6">
        {/* Clean headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`font-extrabold text-white leading-tight tracking-tight ${
            isTamil
              ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          }`}
        >
          {t("hero.titleLine1")}
          <br />
          <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
            {t("hero.titleLine2")}
          </span>
          <br />
          {t("hero.titleLine3")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 text-center text-white/80 max-w-2xl mx-auto leading-relaxed font-light ${
            isTamil ? "text-base md:text-lg" : "text-lg md:text-xl"
          }`}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* 100% organic line with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          {isTamil ? (
            <div className="max-w-full px-2 text-center">
              <TypingText
                text={`100% ${t("hero.stats.organic")}`}
                className="text-lg md:text-xl text-coconut-green-light font-semibold tracking-wide"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <BouncingText
                text="100%"
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                delay={0}
              />
              <BouncingText
                text={t("hero.stats.organic")}
                className="text-lg md:text-xl text-coconut-green-light font-semibold uppercase tracking-wider"
                delay={0.5}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#products"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-white text-coconut-green font-semibold rounded-full transition-all shadow-lg"
          >
            {t("hero.ctaProducts")}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full transition-all"
          >
            {t("hero.ctaContact")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
