import { motion } from "framer-motion";
import { Apple, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import HealthTipModal from "../../components/common/HealthTipModal";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import WellnessCard from "../../components/common/WellnessCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import recipes from "../../data/recipes";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";

function Nutrition() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTip, setSelectedTip] = useState(null);
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

  const categories = useMemo(() => ["All", ...new Set(recipes.map((tip) => tip.category))], []);

  const filteredTips = useMemo(() => {
    return recipes.filter((tip) => {
      const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || tip.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleFavorite = async (tip) => {
    setError("");

    const isAlreadyFavorite = favorites.some((favorite) => favorite.itemId === tip.id.toString());
    try {
      if (isAlreadyFavorite) {
        const favorite = favorites.find((item) => item.itemId === tip.id.toString());
        await removeFavorite(favorite._id);
        toast.success("Favorite Removed 💔");
      } else {
        await addFavorite({
          itemId: tip.id.toString(),
          title: tip.title,
          description: tip.description,
          category: tip.category,
          source: "nutrition",
        });
        toast.success("Favorite Added ❤️");
      }
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,253,245,0.8),_transparent_40%),linear-gradient(135deg,_#f5fff7_0%,_#f4fbf3_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-8 rounded-[28px] border border-green-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(22,101,52,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <Apple className="h-4 w-4" />
                Nutrition essentials
              </div>
              <SectionTitle title="Nutrition & Healthy Eating" themeColor="text-green-700" subtitle="Discover simple nutrition tips for a healthier routine." />
            </div>
            <div className="rounded-2xl bg-green-50 p-3 text-green-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search recipes & healthy meals..." inputClassName="mb-0 border-green-200 focus:ring-2 focus:ring-green-400" />
          <p className="text-sm text-slate-500">{filteredTips.length} healthy recipes ready</p>
        </div>

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          activeClassName="bg-green-600 text-white"
          inactiveClassName="border border-green-200 bg-white text-green-700 hover:bg-green-100"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <LoadingSpinner label="Loading favorites..." className="col-span-full" />
          ) : (
            filteredTips.map((tip) => (
              <WellnessCard
                key={tip.id}
                title={tip.title}
                image={tip.image}
                description={tip.description || tip.benefits?.slice(0, 2).join(" • ") || "Nutritious and balanced meal idea."}
                category={tip.category}
                isFavorite={favorites.some((favorite) => favorite.itemId === tip.id.toString())}
                onToggleFavorite={() => toggleFavorite(tip)}
                onReadMore={() => setSelectedTip(tip)}
                themeColor="text-green-700"
                buttonClass="border-green-200 text-green-700 hover:bg-green-50"
                badgeClass="bg-green-100 text-green-700"
              />
            ))
          )}
        </div>
      </div>

      <HealthTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </div>
  );
}

export default Nutrition;