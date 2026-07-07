import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import HealthTipModal from "../../components/common/HealthTipModal";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import WellnessCard from "../../components/common/WellnessCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import mentalTips from "../../data/mentalTips";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";

const wellnessQuotes = [
  "Rest and self-care are not options; they are essentials.",
  "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.",
  "Deep breaths are like little love notes to your nervous system.",
  "You don't have to control your thoughts. You just have to stop letting them control you.",
  "Be gentle with yourself. You are doing the best you can.",
];

const quickCopingSkills = [
  { title: "Box Breathing", description: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Instantly resets anxiety." },
  { title: "5-4-3-2-1 Method", description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste." },
  { title: "Warm Tea", description: "Sip a warm herbal tea slowly, focusing on the sensory experience." },
  { title: "Digital Detox", description: "Turn off all notifications for 30 minutes to give your mind a quiet break." },
];

function MentalWellness() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTip, setSelectedTip] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dailyQuote] = useState(() => wellnessQuotes[Math.floor(Math.random() * wellnessQuotes.length)]);

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

  const categories = useMemo(() => ["All", ...new Set(mentalTips.map((tip) => tip.category))], []);

  const filteredTips = useMemo(() => {
    return mentalTips.filter((tip) => {
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
          source: "mental",
        });
        toast.success("Favorite Added ❤️");
      }
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(243,232,255,0.7),_transparent_40%),linear-gradient(135deg,_#faf5ff_0%,_#f3e8ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8 rounded-[28px] border border-purple-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(147,51,234,0.08)] backdrop-blur sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                <Brain className="h-4 w-4" />
                Mental Well-being
              </div>
              <SectionTitle
                title="Mental Wellness & Mindfulness"
                themeColor="text-purple-700"
                subtitle="Nurture your mind, reduce anxiety, and build healthy emotional habits."
              />
            </div>
            <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        {/* Daily Quote Block */}
        <div className="mb-8 rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-600 to-indigo-500 p-6 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200">Daily Mindfulness Reminder</p>
          <h2 className="mt-3 text-xl font-medium italic">"{dailyQuote}"</h2>
        </div>

        {/* Search and Categories */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mental wellness guides..."
            inputClassName="border-purple-200 focus:ring-2 focus:ring-purple-400"
          />
          <p className="text-sm text-slate-500">{filteredTips.length} mindfulness practices available</p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          activeClassName="bg-purple-600 text-white"
          inactiveClassName="border border-purple-200 bg-white text-purple-700 hover:bg-purple-100"
        />

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        {/* Wellness Tip Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <LoadingSpinner label="Loading favorites..." className="col-span-full" />
          ) : (
            filteredTips.map((tip) => (
              <WellnessCard
                key={tip.id}
                title={tip.title}
                description={tip.description}
                category={tip.category}
                isFavorite={favorites.some((favorite) => favorite.itemId === tip.id.toString())}
                onToggleFavorite={() => toggleFavorite(tip)}
                onReadMore={() => setSelectedTip(tip)}
                themeColor="text-purple-700"
                buttonClass="border-purple-200 text-purple-700 hover:bg-purple-50"
                badgeClass="bg-purple-100 text-purple-700"
              />
            ))
          )}
        </div>

        {/* Quick Coping Strategies */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-purple-800">Quick Coping Strategies</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickCopingSkills.map((skill) => (
              <div key={skill.title} className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-purple-700">{skill.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HealthTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </div>
  );
}

export default MentalWellness;
