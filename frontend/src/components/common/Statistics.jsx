import statsData from "../../data/statsData";
import { motion } from "framer-motion";

function Statistics() {
  return (
    <section className="py-20 bg-white px-6">
      <h2 className="text-4xl font-bold text-center text-pink-600">
        Our Impact
      </h2>

      <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
        Empowering women through AI-driven guidance, education, and wellness.
      </p>

      <div className="grid gap-8 mt-14 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {statsData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl bg-pink-50 p-8 shadow-md text-center"
          >
            <h3 className="text-5xl font-bold text-pink-600">
              {item.number}
            </h3>

            <p className="mt-4 text-lg text-gray-700">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;