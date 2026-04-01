import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerContainerSlow,
  elasticPop,
  clipReveal,
} from "../hooks/useScrollAnimation";
import { FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();
  const highlights = t("about.highlights");

  return (
    <section id="about" className="py-16 md:py-24 bg-coconut-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Image with clip-path reveal */}
          <motion.div variants={fadeInLeft} className="relative">
            <motion.div
              variants={clipReveal}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-coconut-green to-coconut-green-light flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🏭
                  </motion.div>
                  <p className="text-lg font-semibold">
                    {t("about.facilityTitle")}
                  </p>
                  <p className="text-sm text-white/70 mt-1">
                    {t("about.facilitySubtitle")}
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Decorative elements with delayed fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.5,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
                hidden: { opacity: 0, scale: 0.5 },
              }}
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-coconut-green/10 rounded-2xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.7,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
                hidden: { opacity: 0, scale: 0.5 },
              }}
              className="absolute -top-4 -left-4 w-32 h-32 bg-coconut-green/10 rounded-full -z-10"
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div variants={staggerContainer}>
            <motion.span
              variants={fadeInRight}
              className="inline-block px-4 py-1.5 bg-coconut-green/10 text-coconut-green text-sm font-semibold rounded-full mb-4"
            >
              {t("about.badge")}
            </motion.span>
            <motion.h2
              variants={fadeInRight}
              className="text-3xl md:text-4xl font-bold text-dark mb-6"
            >
              {t("about.titleLine1")}
              <br />
              {t("about.titleLine2")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="ta-justify text-dark-light leading-relaxed mb-6"
            >
              {t("about.paragraph1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="ta-justify text-dark-light leading-relaxed mb-8"
            >
              {t("about.paragraph2")}
            </motion.p>

            <motion.div variants={staggerContainerSlow} className="space-y-3">
              {highlights.map((item) => (
                <motion.div
                  key={item}
                  variants={elasticPop}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-coconut-green mt-0.5 flex-shrink-0" />
                  <span className="text-dark-light text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
