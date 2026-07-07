import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaAppleAlt,
  FaDumbbell,
  FaBrain,
  FaGraduationCap,
  FaRobot,
} from "react-icons/fa";
import { GiLotusFlower } from "react-icons/gi";
import { MdAutoStories } from "react-icons/md";

const features = [
  {
    icon: <FaHeartbeat size={35} />,
    title: "Women's Health",
    description: "Personalized guidance for a healthier and happier life.",
  },
  {
    icon: <GiLotusFlower size={35} />,
    title: "Menstrual Wellness",
    description: "Understand your cycle with confidence, care, and awareness.",
  },
  {
    icon: <FaAppleAlt size={35} />,
    title: "Nutrition",
    description: "Healthy meals, recipes, and balanced nutrition plans.",
  },
  {
    icon: <FaDumbbell size={35} />,
    title: "Fitness",
    description: "Exercise routines designed for every woman and every goal.",
  },
  {
    icon: <FaBrain size={35} />,
    title: "Mental Wellness",
    description: "Support your emotional well-being with AI-powered guidance.",
  },
  {
    icon: <FaGraduationCap size={35} />,
    title: "Career & Scholarships",
    description: "Career advice, learning resources, and scholarships for women.",
  },
  {
    icon: <MdAutoStories size={35} />,
    title: "Inspiration",
    description: "Motivational stories, quotes, and empowering articles.",
  },
];

function WomenIllustration() {
  return (
    <section className="px-6 py-16">
      <h2 className="mb-4 text-center text-4xl font-bold text-pink-600">
        Empowering Every Chapter of Her Journey
      </h2>

      <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600 text-lg">
        Everything you need to support your health, confidence, education,
        wellness, and personal growth — thoughtfully brought together in one
        intelligent platform.
      </p>

      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.04,
            }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg"
          >
            <div className="mb-5 text-pink-500">{feature.icon}</div>

            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-7">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WomenIllustration;