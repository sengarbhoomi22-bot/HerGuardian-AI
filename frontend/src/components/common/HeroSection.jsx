import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-pink-600"
      >
        Welcome to HerGuardian AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-8 max-w-3xl text-lg md:text-xl text-gray-700 leading-8"
      >
        A trusted AI companion created exclusively for women —
        empowering every journey through health, wellness, education,
        career growth, confidence, and self-care.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/register")}
        className="mt-10 flex items-center gap-3 rounded-full bg-pink-600 px-8 py-4 text-white font-semibold shadow-lg transition hover:bg-pink-700"
      >
        Get Started
        <FaArrowRight />
      </motion.button>

    </section>
  );
}

export default HeroSection;