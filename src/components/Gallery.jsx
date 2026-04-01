import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  blurIn,
} from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

const galleryItems = [
  {
    key: "blocks",
    emoji: "🧱",
    bg: "from-coconut-green-dark via-coconut-green to-coconut-green-light",
  },
  {
    key: "growBags",
    emoji: "🌱",
    bg: "from-coconut-green-dark to-coconut-green",
  },
  {
    key: "factory",
    emoji: "🏭",
    bg: "from-coconut-green to-coconut-green-light",
  },
  {
    key: "packaging",
    emoji: "📦",
    bg: "from-coconut-green-light via-coconut-green to-coconut-green-dark",
  },
  {
    key: "husk",
    emoji: "🥥",
    bg: "from-coconut-green-dark to-coconut-green",
  },
  {
    key: "testing",
    emoji: "🔬",
    bg: "from-coconut-green to-coconut-green-dark",
  },
  {
    key: "discs",
    emoji: "⭕",
    bg: "from-coconut-green via-coconut-green-dark to-coconut-green-light",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Gallery() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  }, []);

  // Auto-play every 6 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const item = galleryItems[current];

  return (
    <section id="gallery" className="py-24 bg-coconut-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-12"
        >
          <motion.span
            variants={blurIn}
            className="inline-block px-4 py-1.5 bg-coconut-green/10 text-coconut-green text-sm font-semibold rounded-full mb-4"
          >
            {t("gallery.badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-dark-light max-w-2xl mx-auto text-lg"
          >
            {t("gallery.subtitle")}
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Card container */}
          <div className="relative overflow-hidden rounded-2xl h-84 sm:h-100">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`absolute inset-0 bg-gradient-to-br ${item.bg} flex flex-col items-center justify-center rounded-2xl`}
              >
                <span className="text-6xl sm:text-7xl mb-4">{item.emoji}</span>
                <span className="text-white font-bold text-xl sm:text-2xl">
                  {t(`gallery.items.${item.key}`)}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev button */}
          <button
            onClick={goPrev}
            aria-label={t("gallery.prevAria")}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-coconut-green hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={goNext}
            aria-label={t("gallery.nextAria")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-coconut-green hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                aria-label={`${t("gallery.goToSlide")} ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-8 bg-coconut-green"
                    : "w-2 bg-coconut-green/30 hover:bg-coconut-green/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
