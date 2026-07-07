import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import HealthTipModal from "../../components/common/HealthTipModal";
import CategoryFilter from "../../components/common/CategoryFilter";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import WellnessCard from "../../components/common/WellnessCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import menstrualTips from "../../data/menstrualTips";
import { addFavorite, getFavorites, removeFavorite } from "../../services/favoriteService";

const cycleFacts = [
  "Your cycle can affect energy, mood, and appetite in different ways.",
  "Tracking symptoms can help you notice patterns and support your wellbeing.",
  "A balanced routine with rest and movement can help you feel more comfortable.",
  "Hydration and nutritious meals can support energy during your cycle.",
  "Some people feel more tired or emotional in certain phases of the cycle.",
  "Gentle exercise may help reduce tension and improve circulation.",
  "Warmth and relaxation are simple comfort tools for cramping.",
  "Listening to your body is an important part of menstrual wellness.",
];

const quickCareTips = [
  { title: "Stay Hydrated", description: "Sip water regularly to feel more comfortable and reduce bloating." },
  { title: "Use Heating Pad", description: "A warm pad can ease cramps and relax tight muscles." },
  { title: "Gentle Exercise", description: "A short walk or light stretch can boost comfort and mood." },
  { title: "Healthy Meals", description: "Choose nourishing meals rich in iron, fiber, and hydration." },
  { title: "Proper Rest", description: "Give yourself extra rest when your body needs recovery." },
];

function MenstrualWellness() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTip, setSelectedTip] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [featuredFact] = useState(() => cycleFacts[Math.floor(Math.random() * cycleFacts.length)]);
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

  const categories = useMemo(() => ["All", ...new Set(menstrualTips.map((tip) => tip.category))], []);

  const filteredTips = useMemo(() => {
    return menstrualTips.filter((tip) => {
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
          source: "menstrual",
        });
        toast.success("Favorite Added ❤️");
      }
      await loadFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8effa] p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Menstrual Wellness" themeColor="text-[#b85ca8]" />

        <div className="mb-8 rounded-3xl border border-[#e9d6ef] bg-gradient-to-r from-[#f3dff5] to-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#9b3f86]">Cycle Facts</h2>
          <p className="mt-2 text-sm text-gray-700 sm:text-base">{featuredFact}</p>
        </div>

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menstrual tips..."
          inputClassName="mb-8 border-[#e5c8e8] focus:ring-2 focus:ring-[#d78ed7]"
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          activeClassName="bg-[#c56cb8] text-white"
          inactiveClassName="border border-[#e5c8e8] bg-white text-[#9b3f86] hover:bg-[#f8ebf8]"
        />

        {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

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
                themeColor="text-[#b85ca8]"
                buttonClass="border-[#e5c8e8] text-[#9b3f86] hover:bg-[#f8ebf8]"
                badgeClass="bg-[#f7e7f7] text-[#9b3f86]"
              />
            ))
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold text-[#9b3f86]">Quick Period Care</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {quickCareTips.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#efd8ef] bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-[#b85ca8]">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HealthTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </div>
  );
}

export default MenstrualWellness;
