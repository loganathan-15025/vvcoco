import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Applications from "./components/Applications";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for exactly 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen />}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navbar />
          <Hero />
          <Products />
          <WhyChooseUs />
          <About />
          <Applications />
          <Contact />
          <Location />
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
