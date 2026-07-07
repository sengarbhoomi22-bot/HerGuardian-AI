import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section
      id="about"
      className="bg-pink-50 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-pink-600"
        >
          About HerGuardian AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg leading-9 text-gray-700 text-center max-w-4xl mx-auto"
        >
          HerGuardian AI is an intelligent platform created exclusively for women.
          Our mission is to empower every woman by providing personalized support
          for health, menstrual wellness, nutrition, fitness, mental well-being,
          career growth, scholarships, and daily inspiration.

          <br /><br />

          We believe that every woman deserves easy access to trustworthy
          information, opportunities, and AI-powered guidance in one safe,
          beautiful, and supportive space.

          <br /><br />

          HerGuardian AI is more than an application—it's a companion that
          grows with you through every stage of your journey.
        </motion.p>

      </div>
    </section>
  );
}

export default AboutSection;