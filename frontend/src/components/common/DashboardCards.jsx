import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dashboardCards from "../../data/dashboardCards";

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {dashboardCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.04 }}
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <Link
            to={card.route}
            className={`${card.color} rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 min-h-[220px] flex flex-col justify-between block`}
          >
            <div>
              <div className="text-4xl">{card.icon}</div>
              <h2 className="text-lg font-bold mt-4 text-gray-800">
                {card.title}
              </h2>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            <button className="mt-5 w-full bg-white/60 backdrop-blur text-gray-700 font-semibold py-2 rounded-xl hover:bg-white transition text-sm">
              Explore →
            </button>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardCards;