import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, RefreshCw } from 'lucide-react';
import WomenCard from '../../components/cards/WomenCard';
import StoryCard from '../../components/cards/StoryCard';
import { inspirationQuotes } from '../../data/inspirationQuotes';
import { inspiringWomen } from '../../data/inspiringWomen';
import { affirmations } from '../../data/affirmations';
import { successStories } from '../../data/successStories';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) console.warn('VITE_API_BASE_URL is not set. Favorites API calls will be skipped.');

const Inspiration = () => {
  // State
  const [currentQuote, setCurrentQuote] = useState(null);
  const [currentAffirmation, setCurrentAffirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !API_BASE_URL) return;

      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Filtered data based on search
  const filteredWomen = inspiringWomen.filter(
    (woman) =>
      woman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      woman.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStories = successStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuotes = inspirationQuotes.filter((quote) =>
    quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get quote of the day
  const getQuoteOfDay = () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('quoteDate');
    const storedQuote = localStorage.getItem('quoteOfDay');

    if (storedDate === today && storedQuote) {
      return JSON.parse(storedQuote);
    }

    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const quote = inspirationQuotes[dayOfYear % inspirationQuotes.length];

    localStorage.setItem('quoteDate', today);
    localStorage.setItem('quoteOfDay', JSON.stringify(quote));
    return quote;
  };

  // Get random affirmation
  const getRandomAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentQuote(getQuoteOfDay());
      setCurrentAffirmation(getRandomAffirmation());
      void loadFavorites();
      setLoading(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Check if item is favorited
  const isFavorited = (itemId, type) => {
    return favorites.some((fav) => fav.itemId === itemId && fav.category === type);
  };

  // Toggle favorite
  const handleToggleFavorite = async (itemId, type, title = '') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add favorites');
        return;
      }

      if (isFavorited(itemId, type)) {
        // Find favorite record by itemId and type to delete by _id
        const fav = favorites.find((f) => f.itemId === itemId && f.category === type);
        if (fav && API_BASE_URL) {
          await fetch(`${API_BASE_URL}/favorites/${fav._id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } else {
        // Add favorite (backend expects itemId and title)
        if (API_BASE_URL) {
          await fetch(`${API_BASE_URL}/favorites`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              itemId: itemId,
              category: type,
              title,
            }),
          });
        }
      }

      loadFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-lavender-50 to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold text-blue-500">Loading inspiration...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lavender-50 to-pink-50">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-pink-500 to-lavender-500 opacity-10 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-2"
          >
            🌸 Daily Inspiration
          </motion.h1>
          <p className="text-center text-gray-600 text-lg">
            Discover stories, wisdom, and strength from inspiring women around the world
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes, women, stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all shadow-lg"
            />
          </div>
        </motion.div>

        {/* Quote of the Day */}
        {currentQuote && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-blue-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">🌸</span>
              <h2 className="text-2xl font-bold">Quote of the Day</h2>
            </div>
            <blockquote className="text-xl md:text-2xl italic mb-6 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <p className="text-right text-lg opacity-90">— {currentQuote.author}</p>
            <button
              onClick={() =>
                handleToggleFavorite(currentQuote.id, 'Quote', currentQuote.text)
              }
              className="mt-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
            >
              <Heart
                size={20}
                className={
                  isFavorited(currentQuote.id, 'Quote')
                    ? 'fill-white text-white'
                    : 'text-white'
                }
              />
              {isFavorited(currentQuote.id, 'Quote') ? 'Favorited' : 'Add to Favorites'}
            </button>
          </motion.section>
        )}

        {/* Daily Affirmation */}
        {currentAffirmation && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-purple-400 to-lavender-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">💖</span>
              <h2 className="text-2xl font-bold">Daily Affirmation</h2>
            </div>
            <p className="text-2xl md:text-3xl font-semibold text-center mb-8">
              {currentAffirmation}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentAffirmation(getRandomAffirmation())}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                Show Another
              </button>
            </div>
          </motion.section>
        )}

        {/* Women Who Inspire */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">👩</span>
            <h2 className="text-3xl font-bold text-gray-800">Women Who Inspire</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWomen.map((woman) => (
              <WomenCard
                key={woman.id}
                woman={woman}
                onFavorite={(id) => handleToggleFavorite(id, 'Woman', woman.name)}
                isFavorited={isFavorited(woman.id, 'Woman')}
              />
            ))}
          </div>
        </motion.section>

        {/* Success Stories */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📖</span>
            <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onFavorite={(id) => handleToggleFavorite(id, 'Story', story.title)}
                isFavorited={isFavorited(story.id, 'Story')}
              />
            ))}
          </div>
        </motion.section>

        {/* All Quotes */}
        {searchTerm && filteredQuotes.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">✨</span>
              <h2 className="text-3xl font-bold text-gray-800">Search Results: Quotes</h2>
            </div>
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
                >
                  <p className="text-gray-800 mb-2 italic">"{quote.text}"</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">— {quote.author}</p>
                    <button
                      onClick={() => handleToggleFavorite(quote.id, 'Quote', quote.text)}
                      className="transition-transform hover:scale-110"
                    >
                      <Heart
                        size={20}
                        className={
                          isFavorited(quote.id, 'Quote')
                            ? 'fill-pink-500 text-pink-500'
                            : 'text-gray-400'
                        }
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Inspiration;
