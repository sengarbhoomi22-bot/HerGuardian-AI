import { motion } from "framer-motion";
import whyChooseData from "../../data/whyChooseData";

function WhyChoose() {
  return (
    <section className="px-6 py-20 bg-white">
      <h2 className="text-4xl font-bold text-center text-pink-600">
        Why Choose HerGuardian AI?
      </h2>

      <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
        Designed to empower, educate, and support women through every stage of life.
      </p>

      <div className="grid gap-8 mt-14 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {whyChooseData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-pink-100 bg-pink-50 p-8 shadow-md"
          >
            <h3 className="text-2xl font-semibold text-pink-600">
              {item.title}
            </h3>

            <p className="mt-4 text-gray-700 leading-7">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;