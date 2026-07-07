import { useState } from "react";
import { motion } from "framer-motion";
import womenQuotes from "../../data/womenQuotes";

function QuoteBanner() {
  const [quote] = useState(() => womenQuotes[Math.floor(Math.random() * womenQuotes.length)]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto mt-8 w-11/12 max-w-5xl rounded-2xl bg-pink-100 p-6 shadow-lg"
    >
      <p className="text-center text-lg italic text-pink-700">
        "{quote}"
      </p>
    </motion.div>
  );
}

export default QuoteBanner;