import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import HealthTipModal from "../../components/common/HealthTipModal";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import WellnessCard from "../../components/common/WellnessCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import detailedExercises from "../../data/detailedExercises";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";

function Fitness() {
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

  const [dailyWorkout] = useState(() => detailedExercises[Math.floor(Math.random() * detailedExercises.length)]);

  const categories = useMemo(() => ["All", ...new Set(detailedExercises.map((tip) => tip.category))], []);

  const filteredTips = useMemo(() => {
    return detailedExercises.filter((tip) => {
      const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || tip.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const toggleFavorite = async (tip) => {
    setError("");
    const tipId = tip.id.toString();
    const isAlreadyFavorite = favorites.some((favorite) => favorite.itemId === tipId);
    try {
      if (isAlreadyFavorite) {
        const favorite = favorites.find((item) => item.itemId === tipId);
        await removeFavorite(favorite._id);
        toast.success("Favorite Removed 💔");
      } else {
        await addFavorite({
          itemId: tipId,
          title: tip.title,
          description: tip.description,
          category: tip.category,
          source: "fitness",
        });
        toast.success("Favorite Added ❤️");
      }
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,246,255,0.8),_transparent_40%),linear-gradient(135deg,_#f5faff_0%,_#eef7ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-8 rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                <Activity className="h-4 w-4" />
                Fitness motivation
              </div>
              <SectionTitle title="Fitness & Active Lifestyle" themeColor="text-blue-700" subtitle="Build strength, movement, and healthy habits with simple fitness tips." />
            </div>
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        {dailyWorkout && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-8 rounded-[28px] border border-blue-200 bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Workout of the Day</p>
                <h2 className="mt-2 text-2xl font-bold">{dailyWorkout.title}</h2>
                <p className="mt-2 max-w-2xl text-sm text-blue-50 sm:text-base">{dailyWorkout.description}</p>
              </div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">{dailyWorkout.category}</span>
            </div>
          </motion.div>
        )}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search certified exercises..." inputClassName="mb-0 border-blue-200 focus:ring-2 focus:ring-blue-400" />
          <p className="text-sm text-slate-500">{filteredTips.length} certified exercise routines available</p>
        </div>

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          activeClassName="bg-blue-600 text-white"
          inactiveClassName="border border-blue-200 bg-white text-blue-700 hover:bg-blue-100"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <LoadingSpinner label="Loading favorites..." className="col-span-full" />
          ) : (
            filteredTips.map((tip) => (
              <WellnessCard
                key={tip.id}
                image={tip.image}
                title={tip.title}
                description={tip.description}
                category={tip.category}
                isFavorite={favorites.some((favorite) => favorite.itemId === tip.id.toString())}
                onToggleFavorite={() => toggleFavorite(tip)}
                onReadMore={() => setSelectedTip(tip)}
                themeColor="text-blue-700"
                buttonClass="border-blue-200 text-blue-700 hover:bg-blue-50"
                badgeClass="bg-blue-100 text-blue-700"
              />
            ))
          )}
        </div>
      </div>

      <HealthTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </div>
  );
}

export default Fitness;