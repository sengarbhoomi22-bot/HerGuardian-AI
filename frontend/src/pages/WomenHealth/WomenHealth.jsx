import { motion } from "framer-motion";
import { HeartPulse, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import HealthTipModal from "../../components/common/HealthTipModal";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import WellnessCard from "../../components/common/WellnessCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import enhancedHealthTips from "../../data/enhancedHealthTips";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";

function WomenHealth() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTip, setSelectedTip] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = useMemo(() => ["All", ...new Set(enhancedHealthTips.map((tip) => tip.category))], []);

  const filteredTips = useMemo(() => {
    return enhancedHealthTips.filter((tip) => {
      const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || tip.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const loadFavorites = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getFavorites();
      setFavorites(response.favorites || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load favorites");
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

  const toggleFavorite = async (tip) => {
    setError("");

    const isAlreadyFavorite = favorites.some((favorite) => favorite.itemId === tip.title);
    try {
      if (isAlreadyFavorite) {
        const favorite = favorites.find((item) => item.itemId === tip.title);
        await removeFavorite(favorite._id);
        toast.success("Favorite Removed 💔");
      } else {
        await addFavorite({
          itemId: tip.title,
          title: tip.title,
          description: tip.description,
          category: tip.category,
          source: "health",
        });
        toast.success("Favorite Added ❤️");
      }
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,235,244,0.75),_transparent_40%),linear-gradient(135deg,_#fff7fb_0%,_#fdf4f7_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-8 rounded-[28px] border border-pink-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(190,24,93,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-600">
                <HeartPulse className="h-4 w-4" />
                Women's wellness hub
              </div>
              <SectionTitle title="Women's Health" themeColor="text-pink-600" subtitle="Supportive wellness guidance designed for everyday care." />
            </div>
            <div className="rounded-2xl bg-pink-50 p-3 text-pink-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search health tips..."
            inputClassName="mb-0 border-pink-200 focus:ring-2 focus:ring-pink-400"
          />
          <p className="text-sm text-slate-500">{filteredTips.length} helpful tips available</p>
        </div>

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          activeClassName="bg-pink-500 text-white"
          inactiveClassName="bg-white border border-pink-200 text-pink-600 hover:bg-pink-50"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <LoadingSpinner label="Loading favorites..." className="col-span-full" />
          ) : (
            filteredTips.map((tip, index) => (
              <WellnessCard
                key={`${tip.title}-${index}`}
                title={tip.title}
                description={tip.description}
                category={tip.category}
                image={tip.image}
                isFavorite={favorites.some((favorite) => favorite.itemId === tip.title)}
                onToggleFavorite={() => toggleFavorite(tip)}
                onReadMore={() => setSelectedTip(tip)}
                themeColor="text-pink-600"
                buttonClass="border-pink-200 text-pink-600 hover:bg-pink-50"
                badgeClass="bg-pink-100 text-pink-600"
              />
            ))
          )}
        </div>
      </div>

      <HealthTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </div>
  );
}

export default WomenHealth;
