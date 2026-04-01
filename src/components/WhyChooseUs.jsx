import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  blurIn,
  hoverLift,
} from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import {
  FaLeaf,
  FaSeedling,
  FaTint,
  FaAward,
  FaRecycle,
  FaGlobeAmericas,
} from "react-icons/fa";

const features = [
  {
    icon: FaLeaf,
    key: "natural",
    gradient: "from-coconut-green to-coconut-green-light",
  },
  {
    icon: FaRecycle,
    key: "eco",
    gradient: "from-coconut-green to-coconut-green-light",
  },
  {
    icon: FaTint,
    key: "water",
    gradient: "from-coconut-green to-coconut-green-light",
  },
  {
    icon: FaAward,
    key: "export",
    gradient: "from-coconut-green-dark to-coconut-green",
  },
  {
    icon: FaSeedling,
    key: "sustainable",
    gradient: "from-coconut-green-dark to-coconut-green",
  },
  {
    icon: FaGlobeAmericas,
    key: "shipping",
    gradient: "from-coconut-green to-coconut-green-light",
  },
];

// Alternating entrance: even from left, odd from right
const featureVariant = (index) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -30 : 30,
    y: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export default function WhyChooseUs() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-coconut-brown/10">
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
            {t("why.badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark"
          >
            {t("why.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="ta-justify mt-4 text-dark-light max-w-2xl mx-auto text-lg"
          >
            {t("why.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                variants={featureVariant(index)}
                whileHover={hoverLift}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-coconut-green/20 hover:shadow-lg transition-all duration-300 overflow-hidden relative"
              >
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-coconut-green/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <Icon className="text-lg text-white" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">
                  {t(`why.features.${feature.key}.title`)}
                </h3>
                <p className="ta-justify text-dark-light text-sm leading-relaxed">
                  {t(`why.features.${feature.key}.text`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
