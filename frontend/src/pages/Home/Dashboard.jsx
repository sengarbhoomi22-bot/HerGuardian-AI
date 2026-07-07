import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, TrendingUp, Heart, Bookmark, Phone, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";
import { getDashboardAnalytics } from "../../services/analyticsService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import DashboardHeader from "../../components/common/DashboardHeader";
import QuoteOfTheDayWidget from "../../components/common/QuoteOfTheDayWidget";

const COLORS = ["#B85CA8", "#E89BB5", "#D4709D", "#A33D8F"];

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDashboardAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load analytics");
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadAnalytics();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 sm:p-8">
        <div className="mx-auto max-w-7xl">
          <LoadingSpinner label="Loading your analytics..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 sm:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-red-50 border border-red-200 p-6 flex items-center gap-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">{error}</p>
              <button
                onClick={loadAnalytics}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    dashboard,
    charts: { favoritesByModule, remindersByCategory },
    recentActivity,
  } = analytics || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader user={user} />

        {/* Quote of the Day Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <QuoteOfTheDayWidget />
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            { icon: Heart, label: "Health Reminders", value: dashboard?.totalReminders || 0, color: "from-red-400 to-pink-400" },
            { icon: Bookmark, label: "Saved Tips", value: dashboard?.totalSavedTips || 0, color: "from-purple-400 to-pink-400" },
            { icon: TrendingUp, label: "Favorite Tips", value: dashboard?.totalFavorites || 0, color: "from-orange-400 to-red-400" },
            { icon: Phone, label: "Emergency Contacts", value: dashboard?.totalEmergencyContacts || 0, color: "from-blue-400 to-purple-400" },
            { icon: MessageSquare, label: "AI Conversations", value: dashboard?.totalChatMessages || 0, color: "from-green-400 to-teal-400" },
            { icon: User, label: "Profile Complete", value: `${dashboard?.profileCompletion || 0}%`, color: "from-indigo-400 to-blue-400" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`rounded-2xl bg-gradient-to-br ${stat.color} p-6 text-white shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-90">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="h-12 w-12 opacity-60" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Pie Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Favorites by Module</h3>
            {favoritesByModule && favoritesByModule.some((item) => item.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={favoritesByModule}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {favoritesByModule.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-gray-500">No favorites yet</p>
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Reminders by Category</h3>
            {remindersByCategory && remindersByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={remindersByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#B85CA8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-lg bg-gray-50">
                <p className="text-gray-500">No reminders yet</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Recent Reminders */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Reminders</h3>
            <div className="space-y-3">
              {recentActivity?.reminders && recentActivity.reminders.length > 0 ? (
                recentActivity.reminders.map((reminder) => (
                  <div key={reminder._id} className="rounded-lg bg-red-50 p-3 border-l-4 border-red-400">
                    <p className="font-medium text-gray-800 text-sm">{reminder.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {reminder.category} • {reminder.time}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No reminders yet</p>
              )}
            </div>
          </div>

          {/* Recent Favorites */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Saved Tips</h3>
            <div className="space-y-3">
              {recentActivity?.favorites && recentActivity.favorites.length > 0 ? (
                recentActivity.favorites.map((favorite) => (
                  <div key={favorite._id} className="rounded-lg bg-purple-50 p-3 border-l-4 border-purple-400">
                    <p className="font-medium text-gray-800 text-sm">{favorite.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {favorite.category}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No saved tips yet</p>
              )}
            </div>
          </div>

          {/* Recent Chat Messages */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent AI Chats</h3>
            <div className="space-y-3">
              {recentActivity?.chatMessages && recentActivity.chatMessages.length > 0 ? (
                recentActivity.chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-lg p-3 border-l-4 ${
                      msg.role === "user"
                        ? "bg-blue-50 border-blue-400"
                        : "bg-green-50 border-green-400"
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-600 uppercase">
                      {msg.role === "user" ? "You" : "Assistant"}
                    </p>
                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                      {msg.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No chat messages yet</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 rounded-2xl bg-white p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 font-medium">Name</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{user?.name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Email</p>
              <p className="mt-1 text-lg font-semibold text-gray-800 truncate">{user?.email || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Age</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{user?.age || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Country</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{user?.country || "Not provided"}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;