import { motion } from "framer-motion";
import { BadgeCheck, Settings, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/authService";
import { getFavorites } from "../../services/favoriteService";
import { getReminders } from "../../services/reminderService";

const defaultUser = {
  name: "Asha Sharma",
  age: 28,
  country: "India",
  profession: "Product Designer",
  avatar: "",
};

const navigationItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Women's Health", path: "/health" },
  { label: "Nutrition", path: "/nutrition" },
  { label: "Fitness", path: "/fitness" },
  { label: "Menstrual Wellness", path: "/menstrual" },
  { label: "Emergency SOS", path: "/emergency" },
  { label: "Health Reminder", path: "/reminder" },
];

function Profile() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(defaultUser);

  const [counts, setCounts] = useState({
    savedTips: 0,
    healthReminders: 0,
    healthFavorites: 0,
    nutritionFavorites: 0,
    fitnessFavorites: 0,
    menstrualFavorites: 0,
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const stats = useMemo(() => {
    return [
      { label: "Total Saved Library", value: counts.savedTips },
      { label: "Active Reminders", value: counts.healthReminders },
      { label: "Saved Health Tips", value: counts.healthFavorites },
      { label: "Saved Nutrition Tips", value: counts.nutritionFavorites },
      { label: "Saved Fitness Tips", value: counts.fitnessFavorites },
      { label: "Saved Menstrual Tips", value: counts.menstrualFavorites },
    ];
  }, [counts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void (async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setIsLoading(true);
        try {
          const profile = await getProfile();
          const profileUser = profile.user;
          setUser(profileUser);
          setForm(profileUser);
          localStorage.setItem("user", JSON.stringify(profileUser));

          const favResponse = await getFavorites();
          const favs = favResponse.favorites || [];
          const remResponse = await getReminders();
          const rems = remResponse.reminders || [];

          setCounts({
            savedTips: favs.length,
            healthReminders: rems.length,
            healthFavorites: favs.filter((f) => f.source === "health" || f.source === "general").length,
            nutritionFavorites: favs.filter((f) => f.source === "nutrition").length,
            fitnessFavorites: favs.filter((f) => f.source === "fitness").length,
            menstrualFavorites: favs.filter((f) => f.source === "menstrual").length,
          });
        } catch (error) {
          toast.error(error.response?.data?.message || "Unable to load profile stats");
        } finally {
          setIsLoading(false);
        }
      })();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const saveProfile = (event) => {
    event.preventDefault();
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setIsEditing(false);
    toast.success("Profile updated");
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[#dfe4ff] bg-white p-5 shadow-[0_20px_60px_rgba(94,111,189,0.12)] sm:p-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-[24px] bg-gradient-to-r from-[#5f73ea] to-[#8f7bec] p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
                <BadgeCheck className="h-4 w-4" />
                Personal wellness profile
              </div>
              <h1 className="text-3xl font-bold sm:text-4xl">Profile & Settings</h1>
              <p className="mt-2 text-sm text-white/90 sm:text-base">Manage your profile, preferences, and wellness overview.</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-3">
              <Settings className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[24px] border border-[#e4e8ff] bg-[#fbfcff] p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#5f73ea] to-[#b48ef5] text-2xl font-semibold text-white">
                    {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" /> : <UserRound className="h-7 w-7" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#4d5fd2]">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.profession}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-full bg-[#5f73ea] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4d63d6]"
                >
                  Edit Profile
                </button>
              </div>

              {isLoading && <p className="mt-4 text-sm text-gray-500">Loading profile…</p>}

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Name", value: user.name },
                  { label: "Age", value: user.age },
                  { label: "Country", value: user.country },
                  { label: "Profession", value: user.profession },
                ].map((item) => (
                  <div key={item.label} className="rounded-[18px] border border-[#e8ebff] bg-white p-3">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-1 font-semibold text-[#4d5fd2]">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6">
            <section className="rounded-[24px] border border-[#e4e8ff] bg-[#fbfcff] p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-[#4d5fd2]">Account Statistics</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[18px] border border-[#e8ebff] bg-white p-4">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-1 text-xl font-semibold text-[#4d5fd2]">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#e4e8ff] bg-[#fbfcff] p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-[#4d5fd2]">Quick Navigation</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="rounded-[18px] border border-[#e8ebff] bg-white px-4 py-3 text-sm font-medium text-[#4d5fd2] transition hover:bg-[#f3f6ff]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-[24px] bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-[#4d5fd2]">Edit Profile</h3>
            <form onSubmit={saveProfile} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfe4ff] px-4 py-3 outline-none focus:ring-2 focus:ring-[#7b8cee]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfe4ff] px-4 py-3 outline-none focus:ring-2 focus:ring-[#7b8cee]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfe4ff] px-4 py-3 outline-none focus:ring-2 focus:ring-[#7b8cee]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dfe4ff] px-4 py-3 outline-none focus:ring-2 focus:ring-[#7b8cee]"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-full border border-[#dfe4ff] px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#5f73ea] px-4 py-2 text-sm font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
