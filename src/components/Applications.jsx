import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  blurIn,
} from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import {
  GiGreenhouse,
  GiPlantSeed,
  GiFlowerPot,
  GiFruitTree,
  GiCarrot,
  GiFlowers,
} from "react-icons/gi";

const applications = [
  {
    icon: GiPlantSeed,
    key: "hydroponics",
    color: "coconut-green",
    hoverGradient:
      "group-hover:from-coconut-green group-hover:to-coconut-green-light",
  },
  {
    icon: GiGreenhouse,
    key: "greenhouse",
    color: "coconut-green",
    hoverGradient:
      "group-hover:from-coconut-green group-hover:to-coconut-green-light",
  },
  {
    icon: GiFlowerPot,
    key: "horticulture",
    color: "coconut-green",
    hoverGradient:
      "group-hover:from-coconut-green group-hover:to-coconut-green-light",
  },
  {
    icon: GiFruitTree,
    key: "nursery",
    color: "coconut-green",
    hoverGradient:
      "group-hover:from-coconut-green-dark group-hover:to-coconut-green",
  },
  {
    icon: GiCarrot,
    key: "vegetable",
    color: "coconut-green",
    hoverGradient:
      "group-hover:from-coconut-green-dark group-hover:to-coconut-green",
  },
  {
    icon: GiFlowers,
    key: "home",
    color: "coconut-green",
    hoverGradient:
      "group-hover:from-coconut-green group-hover:to-coconut-green-light",
  },
];

export default function Applications() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();
  const scrollingApplications = [...applications, ...applications];

  return (
    <section
      id="applications"
      className="scroll-mt-24 md:scroll-mt-28 pt-10 pb-24 md:py-24 bg-coconut-brown/10 relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #6D4C41 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-16"
        >
          <motion.span
            variants={blurIn}
            className="inline-block px-4 py-1.5 bg-coconut-green/10 text-coconut-green text-sm font-semibold rounded-full mb-4"
          >
            {t("applications.badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark"
          >
            {t("applications.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="ta-justify mt-4 text-dark-light max-w-2xl mx-auto text-lg"
          >
            {t("applications.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-coconut-brown/10 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-coconut-brown/10 to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-5 pr-5"
            >
              {scrollingApplications.map((app, index) => {
                const Icon = app.icon;
                return (
                  <motion.div
                    key={`${app.key}-${index}`}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 20px 60px -12px rgba(46, 125, 50, 0.2)",
                      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className="group w-[280px] sm:w-[320px] flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-100 hover:border-coconut-green/30 transition-all duration-300 text-center overflow-hidden relative"
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-coconut-green to-coconut-green-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-coconut-green/10 to-coconut-green-light/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 ${app.hoverGradient} transition-all duration-300`}
                    >
                      <Icon className="text-2xl text-coconut-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-dark mb-2">
                      {t(`applications.items.${app.key}.title`)}
                    </h3>
                    <p className="ta-justify text-dark-light text-sm leading-relaxed line-clamp-3">
                      {t(`applications.items.${app.key}.text`)}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
