import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Apple, Activity, Sparkles, Bell, MessageSquare } from 'lucide-react';
import StatCard from '../../components/analytics/StatCard';
import ChartsSection from '../../components/analytics/ChartsSection';
import CircularProgress from '../../components/analytics/CircularProgress';
import Badges from '../../components/analytics/Badges';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const totalSavedTips = Number(localStorage.getItem('totalSavedTips') || 0);
      const nutritionFavorites = Number(localStorage.getItem('nutritionFavorites') || 0);
      const fitnessFavorites = Number(localStorage.getItem('fitnessFavorites') || 0);
      const menstrualFavorites = Number(localStorage.getItem('menstrualFavorites') || 0);
      const reminderCount = Number(localStorage.getItem('reminderCount') || 0);
      const aiChatsCount = Number(localStorage.getItem('aiChatsCount') || 0);

      const favoritesByModule = JSON.parse(localStorage.getItem('favoritesByModule') || '[]');
      const remindersByCategory = JSON.parse(localStorage.getItem('remindersByCategory') || '[]');

      const defaultActivity = Array.from({ length: 7 }).map((_, idx) => ({ day: `Day ${idx + 1}`, value: Math.floor(Math.random() * 10) }));
      const activity7Days = JSON.parse(localStorage.getItem('activity7Days') || JSON.stringify(defaultActivity));

      const completedActivities = Number(localStorage.getItem('completedActivities') || 0);

      let streak = Number(localStorage.getItem('healthStreak') || 0);
      if (!streak) {
        streak = Math.floor(Math.random() * 5) + 1;
        localStorage.setItem('healthStreak', String(streak));
      }

      setData({ totalSavedTips, nutritionFavorites, fitnessFavorites, menstrualFavorites, reminderCount, aiChatsCount, favoritesByModule, remindersByCategory, activity7Days, completedActivities, streak });
      setLoading(false);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  const calculateScore = () => {
    // simple heuristic: reminders (20%), favorites (40%), completed activities (40%)
    const { reminderCount, totalSavedTips, completedActivities } = data;
    const rScore = Math.min(reminderCount / 10, 1) * 20;
    const fScore = Math.min(totalSavedTips / 20, 1) * 40;
    const cScore = Math.min(completedActivities / 10, 1) * 40;
    return Math.round(rScore + fScore + cScore);
  };

  const handleExport = () => {
    // Simple print-to-PDF flow
    const win = window.open('', '_blank');
    const content = `
      <html>
      <head>
        <title>HerGuardian Analytics Report</title>
        <style>body{font-family:Arial;padding:20px;color:#333} h1{color:#B85CA8} .stat{margin-bottom:8px}</style>
      </head>
      <body>
        <h1>Your Wellness Insights</h1>
        <h3>Summary</h3>
        <div class="stat">Total Saved Tips: ${data.totalSavedTips}</div>
        <div class="stat">Reminders: ${data.reminderCount}</div>
        <div class="stat">AI Chats: ${data.aiChatsCount}</div>
        <h3>Badges</h3>
        <div>${JSON.stringify([])}</div>
      </body>
      </html>
    `;
    win.document.write(content);
    win.document.close();
    win.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse h-8 bg-pink-200 rounded mb-6 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-white rounded-2xl shadow" />
            <div className="h-40 bg-white rounded-2xl shadow" />
            <div className="h-40 bg-white rounded-2xl shadow" />
          </div>
        </div>
      </div>
    );
  }

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-r from-white to-pink-50 p-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600">Your Wellness Insights</h1>
          <p className="text-gray-600 mt-2">A snapshot of your recent activity and wellbeing trends.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Health Tips Saved" value={data.totalSavedTips} icon={Heart} color="from-pink-400 to-pink-600" />
          <StatCard title="Nutrition Favorites" value={data.nutritionFavorites} icon={Apple} color="from-yellow-400 to-pink-400" />
          <StatCard title="Fitness Favorites" value={data.fitnessFavorites} icon={Activity} color="from-green-400 to-teal-400" />
          <StatCard title="Menstrual Favorites" value={data.menstrualFavorites} icon={Sparkles} color="from-purple-400 to-pink-400" />
          <StatCard title="Reminder Count" value={data.reminderCount} icon={Bell} color="from-red-400 to-pink-400" />
          <StatCard title="AI Chats Count" value={data.aiChatsCount} icon={MessageSquare} color="from-indigo-400 to-blue-400" />
        </motion.div>

        {/* Charts & Sidebar */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartsSection favoritesByModule={data.favoritesByModule} remindersByCategory={data.remindersByCategory} activity7Days={data.activity7Days} />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg flex items-center justify-center">
              <CircularProgress score={score} />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Health Streak</h3>
              <p className="text-4xl font-bold text-pink-600">{data.streak} days</p>
              <p className="text-sm text-gray-500 mt-2">Keep it up! Small steps every day.</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <Badges favorites={data.favoritesByModule || []} reminders={(data.remindersByCategory || []).flatMap(r => Array(r.count).fill(r.name))} activityDays={data.activity7Days || []} />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <button onClick={handleExport} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold">Export Report (PDF)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
