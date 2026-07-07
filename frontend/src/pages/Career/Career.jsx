import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import HealthTipModal from "../../components/common/HealthTipModal";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import WellnessCard from "../../components/common/WellnessCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import careerTips from "../../data/careerTips";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";

const hotScholarships = [
  { title: "Adobe Research Women-in-Technology", award: "$10,000 + Internship", deadline: "Varies annually" },
  { title: "Generation Google Scholarship", award: "$1,000 to $10,000", deadline: "Spring applications" },
  { title: "Palantir Women in Technology", award: "$7,000 + Tech grants", deadline: "Late Autumn" },
  { title: "Outreachy Open Source Internships", award: "$7,000 Stipend (Remote)", deadline: "Bi-annual (Feb & Sept)" },
];

function Career() {
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

  const categories = useMemo(() => ["All", ...new Set(careerTips.map((tip) => tip.category))], []);

  const filteredTips = useMemo(() => {
    return careerTips.filter((tip) => {
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
        toast.success("Opportunity Removed 💔");
      } else {
        await addFavorite({
          itemId: tipId,
          title: tip.title,
          description: tip.description,
          category: tip.category,
          source: "career",
        });
        toast.success("Opportunity Saved ❤️");
      }
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(224,242,254,0.7),_transparent_40%),linear-gradient(135deg,_#f0f9ff_0%,_#e0f2fe_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8 rounded-[28px] border border-sky-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(14,165,233,0.08)] backdrop-blur sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                <GraduationCap className="h-4 w-4" />
                Professional Growth
              </div>
              <SectionTitle
                title="Career, Scholarships & Fellowships"
                themeColor="text-sky-700"
                subtitle="Discover roadmaps, academic grants, resume guides, and career launch opportunities."
              />
            </div>
            <div className="rounded-2xl bg-sky-50 p-3 text-sky-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scholarships & careers..."
            inputClassName="border-sky-200 focus:ring-2 focus:ring-sky-400"
          />
          <p className="text-sm text-slate-500">{filteredTips.length} opportunities loaded</p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          activeClassName="bg-sky-600 text-white"
          inactiveClassName="border border-sky-200 bg-white text-sky-700 hover:bg-sky-100"
        />

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        {/* Opportunity Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <LoadingSpinner label="Loading saved items..." className="col-span-full" />
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
                themeColor="text-sky-700"
                buttonClass="border-sky-200 text-sky-700 hover:bg-sky-50"
                badgeClass="bg-sky-100 text-sky-700"
              />
            ))
          )}
        </div>

        {/* Trending Grants Table */}
        <div className="mt-12 rounded-[28px] border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-sky-800 mb-6">Trending Support Programs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-sky-50 text-xs uppercase text-sky-700">
                <tr>
                  <th scope="col" className="px-6 py-3.5 rounded-l-xl">Program</th>
                  <th scope="col" className="px-6 py-3.5">Support Award</th>
                  <th scope="col" className="px-6 py-3.5 rounded-r-xl">Application Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {hotScholarships.map((item, idx) => (
                  <tr key={idx} className="bg-white hover:bg-sky-50/30">
                    <td className="px-6 py-4 font-semibold text-gray-800">{item.title}</td>
                    <td className="px-6 py-4">{item.award}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">{item.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <HealthTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </div>
  );
}

export default Career;
