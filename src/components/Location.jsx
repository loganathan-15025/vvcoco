import { motion } from "framer-motion";
import { useState } from "react";
import {
  useScrollAnimation,
  fadeInUp,
  fadeInRight,
  staggerContainer,
  clipReveal,
  blurIn,
} from "../hooks/useScrollAnimation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export default function Location() {
  const { ref, controls } = useScrollAnimation();
  const { t } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(17);
  const mapEmbedUrl = `https://www.google.com/maps?q=10.6020544,77.0794428&z=${zoomLevel}&output=embed`;
  const factoryAddressLines = [
    t("location.factoryLine1"),
    t("location.factoryLine2"),
    t("location.factoryLine3"),
    t("location.factoryLine5"),
  ].filter(Boolean);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 20));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 3));

  return (
    <section id="location" className="py-24 bg-coconut-brown/10">
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
            {t("location.badge")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark"
          >
            {t("location.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-dark-light max-w-2xl mx-auto text-lg"
          >
            {t("location.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Google Map - clip reveal wipe */}
          <motion.div
            variants={clipReveal}
            className="relative lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border-0"
          >
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                type="button"
                onClick={zoomIn}
                aria-label="Zoom in map"
                className="w-10 h-10 rounded-xl bg-white/95 text-dark text-xl font-bold shadow-md hover:bg-white transition"
              >
                +
              </button>
              <button
                type="button"
                onClick={zoomOut}
                aria-label="Zoom out map"
                className="w-10 h-10 rounded-xl bg-white/95 text-dark text-xl font-bold shadow-md hover:bg-white transition"
              >
                -
              </button>
            </div>
            <iframe
              title={t("location.mapTitle")}
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[400px]"
            />
          </motion.div>

          {/* Address Cards - staggered from right */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.3 },
              },
            }}
            initial="hidden"
            animate={controls}
            className="flex flex-col gap-4"
          >
            <motion.div
              variants={fadeInRight}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px -8px rgba(0,0,0,0.08)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-surface-light rounded-2xl p-6 border border-white/5 flex-1"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-coconut-green/10 flex items-center justify-center mb-4"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaMapMarkerAlt className="text-coconut-green text-lg" />
              </motion.div>
              <h3 className="text-lg font-bold text-dark mb-3">
                {t("location.factoryTitle")}
              </h3>
              <p className="text-dark-light text-sm leading-relaxed">
                {factoryAddressLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < factoryAddressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px -8px rgba(46, 125, 50, 0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-coconut-green to-coconut-green-light rounded-2xl p-6 text-white"
            >
              <h3 className="font-bold text-lg mb-2">
                {t("location.workingHoursTitle")}
              </h3>
              <div className="space-y-1.5 text-sm text-white/90">
                <p>{t("location.weekdaysLabel")}</p>
                <p className="font-semibold text-white">
                  {t("location.weekdaysTime")}
                </p>
                <p className="mt-3">{t("location.sundayLabel")}</p>
                <p className="font-semibold text-white">
                  {t("location.sundayTime")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
