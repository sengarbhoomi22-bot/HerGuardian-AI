import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import { inspirationQuotes } from '../../data/inspirationQuotes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getQuoteForToday = () => {
  if (typeof window === 'undefined') return null;

  const today = new Date().toDateString();
  const storedDate = localStorage.getItem('quoteDate');
  const storedQuote = localStorage.getItem('quoteOfDay');

  if (storedDate === today && storedQuote) {
    return JSON.parse(storedQuote);
  }

  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const newQuote = inspirationQuotes[dayOfYear % inspirationQuotes.length];

  localStorage.setItem('quoteDate', today);
  localStorage.setItem('quoteOfDay', JSON.stringify(newQuote));
  return newQuote;
};

const QuoteOfTheDayWidget = () => {
  const [quote] = useState(getQuoteForToday);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!quote) return;

    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const response = await fetch(`${API_BASE_URL}/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            const favorites = data.data || [];
            const favorited = favorites.some((fav) => fav.contentId === quote.id && fav.category === 'Quote');
            setIsFavorited(favorited);
          }
        } catch (error) {
          console.error('Error checking favorites:', error);
        }
      })();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [quote]);

  const handleToggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add favorites');
        return;
      }

      if (isFavorited) {
        await fetch(`${API_BASE_URL}/favorites/${quote.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await fetch(`${API_BASE_URL}/favorites`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contentId: quote.id,
            category: 'Quote',
            title: quote.text,
          }),
        });
      }

      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!quote) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-pink-50 border-2 border-gradient-to-r from-blue-200 to-pink-200 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h3 className="text-lg font-bold text-gray-800">Quote of the Day</h3>
        </div>
        <button
          onClick={handleToggleFavorite}
          className="transition-transform hover:scale-110"
        >
          <Heart
            size={20}
            className={isFavorited ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}
          />
        </button>
      </div>

      <p className="text-gray-700 italic mb-3">"{quote.text}"</p>
      <p className="text-gray-600 text-sm mb-4">— {quote.author}</p>

      <a
        href="/inspiration"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
      >
        Explore More
        <ExternalLink size={16} />
      </a>
    </motion.div>
  );
};

export default QuoteOfTheDayWidget;
