import { useEffect, useState } from "react";
import { getFavorites } from "../../services/favoriteService";
import { getReminders } from "../../services/reminderService";

function QuickStats() {
  const [stats, setStats] = useState({ savedItems: 0, reminders: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [favRes, remRes] = await Promise.all([getFavorites(), getReminders()]);
        setStats({
          savedItems: (favRes.favorites || []).length,
          reminders: (remRes.reminders || []).length,
        });
      } catch {
        // Silently fail — defaults to 0
      }
    };
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      <div className="bg-white rounded-2xl shadow-md p-5 text-center">
        <h3 className="text-pink-600 font-semibold text-sm">Modules</h3>
        <p className="text-3xl font-bold mt-2 text-gray-800">12</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 text-center">
        <h3 className="text-pink-600 font-semibold text-sm">Saved Items</h3>
        <p className="text-3xl font-bold mt-2 text-gray-800">{stats.savedItems}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 text-center">
        <h3 className="text-pink-600 font-semibold text-sm">Reminders</h3>
        <p className="text-3xl font-bold mt-2 text-gray-800">{stats.reminders}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 text-center">
        <h3 className="text-pink-600 font-semibold text-sm">AI Status</h3>
        <p className="text-xl font-bold mt-2 text-green-600">Active ✓</p>
      </div>
    </div>
  );
}

export default QuickStats;