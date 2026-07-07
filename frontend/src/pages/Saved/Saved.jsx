import { motion } from "framer-motion";
import { BookmarkX, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getFavorites, removeFavorite } from "../../services/favoriteService";

function Saved() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFavorites = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getFavorites();
      setFavorites(response.favorites || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load saved tips");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadFavorites();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleRemove = async (favoriteId) => {
    setError("");
    try {
      await removeFavorite(favoriteId);
      toast.success("Favorite Removed 💔");
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to remove favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,240,245,0.7),_transparent_40%),linear-gradient(135deg,_#fff8fa_0%,_#fdf2f8_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-8 rounded-[28px] border border-pink-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(190,24,93,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-600">
                <Sparkles className="h-4 w-4" />
                Saved wellness picks
              </div>
              <h1 className="text-3xl font-bold text-pink-600 sm:text-4xl">Saved Health Tips</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">Keep your favorite wellness guidance close at hand.</p>
            </div>
          </div>
        </motion.div>

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        {isLoading ? (
          <LoadingSpinner label="Loading saved tips..." className="min-h-[50vh]" />
        ) : favorites.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[50vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-pink-200 bg-white/70 p-8 text-center shadow-sm">
            <div className="rounded-full bg-pink-100 p-4 text-pink-600">
              <BookmarkX className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-800">Nothing saved yet</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">Tap the heart on any wellness tip to collect it here for easy access later.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((favorite) => (
              <motion.div key={favorite._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-pink-600">{favorite.title}</h2>
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-600">{favorite.category}</span>
                </div>

                <p className="text-sm leading-6 text-slate-600">{favorite.description || 'Saved wellness tip'}</p>

                <button onClick={() => handleRemove(favorite._id)} className="mt-6 rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:-translate-y-0.5 hover:bg-pink-50">Remove</button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;
