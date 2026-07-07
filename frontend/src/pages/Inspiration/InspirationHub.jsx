import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, BookOpen, Mic, Globe } from "lucide-react";
import toast from "react-hot-toast";
import SectionTitle from "../../components/common/SectionTitle";
import inspirationHubData from "../../data/inspirationHubData";
import { addFavorite, getFavorites } from "../../services/favoriteService";

function InspirationHub() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.favorites || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadFavorites();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSaveInspiration = async (item, type) => {
    const isAlreadySaved = favorites.some((fav) => fav.itemId === item.title || fav.itemId === item.name);

    if (isAlreadySaved) {
      toast.error("Already saved in your library!");
      return;
    }

    try {
      await addFavorite({
        itemId: item.title || item.name,
        title: item.title || item.name,
        description: item.description || item.contribution || item.mission,
        category: type,
        source: "inspiration",
      });
      toast.success("Saved to Library ❤️");
      loadFavorites();
    } catch {
      toast.error("Failed to save item");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(253,244,245,0.7),_transparent_40%),linear-gradient(135deg,_#fffafb_0%,_#fff1f3_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8 rounded-[28px] border border-rose-100 bg-white/80 p-6 shadow-[0_20px_60px_rgba(244,63,94,0.08)] backdrop-blur sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                <Trophy className="h-4 w-4" />
                Inspiration Hub
              </div>
              <SectionTitle
                title="Inspirational Women & Resources"
                themeColor="text-rose-700"
                subtitle="Celebrate the triumphs of pioneering women, and explore empowering literature, podcasts, and global missions."
              />
            </div>
            <div className="rounded-2xl bg-rose-50 p-3 text-rose-600">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        {/* Success Stories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-rose-800 mb-6 flex items-center gap-2">
            <span>✨</span> Trailblazing Women
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {inspirationHubData.stories.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm flex gap-4 items-start"
              >
                <div className="text-4xl bg-rose-50 p-3.5 rounded-2xl flex items-center justify-center shrink-0">
                  {story.image}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{story.name}</h3>
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">{story.role}</span>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{story.contribution}</p>
                  <button
                    onClick={() => handleSaveInspiration(story, "History")}
                    className="mt-4 text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
                  >
                    Save Story
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Books, Podcasts & Orgs in 3 Columns */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Books */}
          <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-rose-800 mb-5 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-rose-600" />
              Empowering Books
            </h3>
            <div className="space-y-4">
              {inspirationHubData.books.map((book, idx) => (
                <div key={idx} className="border-b border-rose-50 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-gray-800 text-sm">{book.title}</h4>
                  <p className="text-xs text-rose-600 font-medium">By {book.author}</p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{book.description}</p>
                  <button
                    onClick={() => handleSaveInspiration(book, "Book")}
                    className="mt-2 text-[10px] font-bold text-rose-600 hover:underline"
                  >
                    + Save Book
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Podcasts */}
          <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-rose-800 mb-5 flex items-center gap-2">
              <Mic className="h-5 w-5 text-rose-600" />
              Inspiring Podcasts
            </h3>
            <div className="space-y-4">
              {inspirationHubData.podcasts.map((podcast, idx) => (
                <div key={idx} className="border-b border-rose-50 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-gray-800 text-sm">{podcast.title}</h4>
                  <p className="text-xs text-rose-600 font-medium">Hosted by {podcast.host}</p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{podcast.description}</p>
                  <button
                    onClick={() => handleSaveInspiration(podcast, "Podcast")}
                    className="mt-2 text-[10px] font-bold text-rose-600 hover:underline"
                  >
                    + Save Podcast
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Organizations */}
          <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-rose-800 mb-5 flex items-center gap-2">
              <Globe className="h-5 w-5 text-rose-600" />
              Global Missions
            </h3>
            <div className="space-y-4">
              {inspirationHubData.organizations.map((org, idx) => (
                <div key={idx} className="border-b border-rose-50 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-gray-800 text-sm">{org.name}</h4>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{org.mission}</p>
                  <button
                    onClick={() => handleSaveInspiration({ title: org.name, description: org.mission }, "Organization")}
                    className="mt-2 text-[10px] font-bold text-rose-600 hover:underline"
                  >
                    + Save Organization
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default InspirationHub;
