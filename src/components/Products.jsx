import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeInUp,
  staggerContainer,
  blurIn,
} from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

// Import product images - update these paths when you add your images
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";

const products = [
  {
    key: "blocks",
    image: product1,
  },
  {
    key: "bricks",
    image: product2,
  },
  {
    key: "growBags",
    image: product3,
  },
  {
    key: "discs",
    image: product4,
  },
  {
    key: "pith",
    image: product5,
  },
  {
    key: "fiber",
    image: product6,
  },
];

// Each card enters from a slightly different direction
const cardVariant = (index) => ({
  hidden: {
    opacity: 0,
    y: 40,
    x: index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export default function Products() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section id="products" className="py-24 bg-coconut-brown/10">
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
            {t("products.badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark"
          >
            {t("products.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="ta-justify mt-4 text-dark-light max-w-2xl mx-auto text-lg"
          >
            {t("products.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, index) => {
            return (
              <motion.div
                key={product.key}
                variants={cardVariant(index)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 18px 45px -18px rgba(46, 125, 50, 0.28)",
                  transition: {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-transparent cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={t(`products.items.${product.key}.title`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </div>

                {/* Content - Description only, no heading */}
                <div className="p-6">
                  <p className="ta-justify text-dark-light leading-relaxed text-sm">
                    {t(`products.items.${product.key}.description`)}
                  </p>
                </div>

                {/* Hover-only bottom line */}
                <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-t-full bg-coconut-green group-hover:left-4 group-hover:w-[calc(100%-2rem)] group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
