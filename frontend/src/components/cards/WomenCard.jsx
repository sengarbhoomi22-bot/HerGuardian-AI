import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';

const WomenCard = ({ woman, onFavorite, isFavorited }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md bg-opacity-90 border border-lavender-200"
      >
        {/* Image */}
        <div className="h-48 flex items-center justify-center relative overflow-hidden">
          {woman.image ? (
            <img src={woman.image} alt={woman.name} className="w-full h-full object-cover" />
          ) : (
            <div className="h-48 bg-gradient-to-br from-blue-300 to-pink-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="text-center relative z-10">
                <div className="text-5xl font-bold text-white opacity-70">
                  {woman.name.charAt(0)}
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{woman.name}</h3>
              <p className="text-sm text-blue-600 font-semibold">{woman.profession}</p>
            </div>
            <button
              onClick={() => onFavorite(woman.id)}
              className="transition-transform hover:scale-110"
            >
              <Heart
                size={24}
                className={isFavorited ? "fill-pink-500 text-pink-500" : "text-gray-400"}
              />
            </button>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{woman.description}</p>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen size={18} />
            Read More
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* Header */}
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{woman.name}</h2>
              <p className="text-lg text-blue-600 font-semibold mb-6">{woman.profession}</p>

              {/* Full Story */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Her Story</h3>
                <p className="text-gray-600 leading-relaxed">{woman.fullStory}</p>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Key Achievements</h3>
                <ul className="space-y-2">
                  {woman.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-pink-500 text-lg mt-1">•</span>
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legacy */}
              <div className="bg-gradient-to-r from-lavender-100 to-pink-100 p-4 rounded-xl mb-6">
                <h3 className="font-bold text-gray-700 mb-2">Her Legacy</h3>
                <p className="text-gray-600">{woman.legacy}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default WomenCard;
