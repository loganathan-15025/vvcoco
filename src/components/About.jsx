import { motion } from "framer-motion";
import aboutImage from "../assets/img3.jpg";
import {
  useScrollAnimation,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerContainerSlow,
  elasticPop,
} from "../hooks/useScrollAnimation";
import { FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();
  const highlights = t("about.highlights");
  const imageXPercent = 50;
  const imageYPercent = 30;
  const ownerNameShineStyle = {
    backgroundImage:
      "linear-gradient(110deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 40%, rgba(255,245,190,1) 50%, rgba(255,255,255,1) 60%, rgba(255,255,255,0.7) 100%)",
    backgroundSize: "220% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-coconut-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-stretch"
        >
          {/* Left: Image */}
          <motion.div variants={fadeInLeft} className="relative h-64 lg:h-150">
            <div className="relative z-20 mx-auto mb-4 w-fit -translate-y-1 rounded-xl bg-linear-to-r from-coconut-green/90 via-coconut-green-light/90 to-coconut-green/90 px-3 py-2 text-center text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm md:hidden">
              <p className="text-xs font-bold uppercase tracking-wide text-white/90">
                {t("about.facilitySubtitle")}
              </p>
              <motion.p
                className="text-base font-extrabold leading-tight"
                style={ownerNameShineStyle}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t("about.facilityTitle")}
              </motion.p>
            </div>
            <motion.div
              className="relative h-full rounded-3xl overflow-hidden ring-1 ring-blue-900/30"
              animate={{
                boxShadow: [
                  "0 0 50px rgba(239, 68, 68, 0.55)", // red
                  "0 0 50px rgba(251, 146, 60, 0.55)", // orange
                  "0 0 50px rgba(234, 179, 8, 0.55)", // yellow
                  "0 0 50px rgba(34, 197, 94, 0.55)", // green
                  "0 0 50px rgba(59, 130, 246, 0.55)", // blue
                  "0 0 50px rgba(147, 51, 234, 0.55)", // purple
                  "0 0 50px rgba(239, 68, 68, 0.55)", // back to red
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <img
                src={aboutImage}
                alt={t("about.facilityTitle")}
                className="w-full h-full object-cover"
                style={{
                  // Adjust image position without creating blank space in the box.
                  objectPosition: `${imageXPercent}% ${imageYPercent}%`,
                }}
              />
              <div className="absolute left-4 top-1/2 hidden -translate-y-[calc(50%+70px)] rounded-2xl bg-linear-to-r from-coconut-green/90 via-coconut-green-light/90 to-coconut-green/90 px-6 py-3 text-center text-white shadow-xl ring-1 ring-white/30 backdrop-blur-sm md:block">
                <p className="text-sm font-bold uppercase tracking-wider text-white/90">
                  {t("about.facilitySubtitle")}
                </p>
                <motion.p
                  className="text-xl md:text-2xl font-extrabold leading-tight"
                  style={ownerNameShineStyle}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {t("about.facilityTitle")}
                </motion.p>
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
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={elasticPop}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-coconut-green mt-0.5 shrink-0" />
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
