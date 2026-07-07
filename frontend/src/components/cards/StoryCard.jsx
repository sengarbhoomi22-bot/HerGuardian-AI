import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';

const StoryCard = ({ story, onFavorite, isFavorited }) => {
  const [showModal, setShowModal] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      Career: "from-blue-400 to-blue-600",
      Health: "from-green-400 to-green-600",
      "Personal Growth": "from-purple-400 to-purple-600",
      Business: "from-orange-400 to-orange-600",
      Education: "from-indigo-400 to-indigo-600",
      "Mental Wellness": "from-pink-400 to-pink-600",
      "Mental Health": "from-rose-400 to-rose-600",
    };
    return colors[category] || "from-gray-400 to-gray-600";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white to-lavender-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md bg-opacity-90 border border-pink-200 h-full flex flex-col"
      >
        {/* Category Banner */}
        <div className={`h-2 bg-gradient-to-r ${getCategoryColor(story.category)}`}></div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Badge */}
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(story.category)}`}>
              {story.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h3>

          {/* Preview */}
          <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-4">{story.preview}</p>

          {/* Author */}
          <p className="text-sm text-gray-500 italic mb-4">— {story.author}</p>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              Read Story
            </button>
            <button
              onClick={() => onFavorite(story.id)}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
            >
              <Heart
                size={20}
                className={isFavorited ? "fill-pink-500 text-pink-500" : "text-gray-400"}
              />
            </button>
          </div>
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
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>

              {/* Category Badge */}
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(story.category)}`}>
                  {story.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{story.title}</h2>

              {/* Author */}
              <p className="text-gray-600 italic mb-6">By {story.author}</p>

              {/* Full Story */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{story.fullStory}</p>
              </div>

              {/* Inspirational Note */}
              <div className="bg-gradient-to-r from-lavender-100 to-pink-100 p-4 rounded-xl my-6">
                <p className="text-gray-700 font-semibold">
                  ✨ This story reminds us that challenges can become our greatest strengths.
                </p>
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

export default StoryCard;
