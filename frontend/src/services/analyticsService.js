import api from "./api";

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const buildFallbackActivity = (stored, defaultCount = 7, labelPrefix = 'Day') => {
  try {
    const data = JSON.parse(stored || '[]');
    if (!Array.isArray(data) || data.length === 0) {
      return Array.from({ length: defaultCount }).map((_, idx) => ({ day: `${labelPrefix} ${idx + 1}`, value: Math.round(Math.random() * 5) }));
    }
    return data;
  } catch {
    return Array.from({ length: defaultCount }).map((_, idx) => ({ day: `${labelPrefix} ${idx + 1}`, value: Math.round(Math.random() * 5) }));
  }
};

const buildFallbackSeries = (stored, defaultLabels) => {
  try {
    const data = JSON.parse(stored || '[]');
    if (!Array.isArray(data) || data.length === 0) {
      return defaultLabels.map((label) => ({ name: label, value: 0 }));
    }
    return data;
  } catch {
    return defaultLabels.map((label) => ({ name: label, value: 0 }));
  }
};

const getFallbackDashboard = () => {
  const favoritesByModule = buildFallbackSeries(localStorage.getItem('favoritesByModule'), ["Women's Health", 'Nutrition', 'Fitness', 'Menstrual Wellness']);
  const remindersByCategory = buildFallbackSeries(localStorage.getItem('remindersByCategory'), ['Medicine', 'Water', 'Exercise', 'Sleep', 'Period']);
  const dailyActivity = buildFallbackActivity(localStorage.getItem('activity7Days'));
  const weeklyActivity = buildFallbackActivity(localStorage.getItem('weeklyActivity'), 4, 'Week');
  const profile = JSON.parse(localStorage.getItem('user') || '{}');
  const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
  const totalSavedTips = favorites.length;
  const nutritionFavorites = favorites.filter((fav) => fav.source === 'nutrition').length;
  const fitnessSessions = favorites.filter((fav) => fav.source === 'fitness').length;
  const healthArticlesViewed = favorites.filter((fav) => fav.source === 'health').length;
  const menstrualTipsViewed = favorites.filter((fav) => fav.source === 'menstrual').length;
  const profileCompletion = Math.round((['name', 'email', 'phone', 'age', 'preferences'].reduce((count, field) => count + (profile[field] ? 1 : 0), 0) / 5) * 100);

  return {
    dashboard: {
      totalReminders: safeNumber(localStorage.getItem('reminderCount')),
      totalFavorites: safeNumber(localStorage.getItem('savedFavorites')),
      totalEmergencyContacts: safeNumber(localStorage.getItem('emergencyContacts')),
      totalChatMessages: safeNumber(localStorage.getItem('aiChatsCount')),
      totalSavedTips,
      profileCompletion,
      nutritionFavorites,
      fitnessSessions,
      healthArticlesViewed,
      menstrualTipsViewed,
      dailyActivity,
      weeklyActivity,
    },
    charts: {
      favoritesByModule,
      remindersByCategory,
    },
    recentActivity: {
      reminders: [],
      favorites: favorites.slice(0, 5),
      chatMessages: [],
    },
  };
};

/**
 * Get dashboard analytics data
 * @returns {Promise<Object>} Dashboard analytics with stats, charts, and recent activity
 */
export const getDashboardAnalytics = async () => {
  try {
    const response = await api.get("/analytics/dashboard");
    return response.data.data;
  } catch (error) {
    console.warn("Analytics backend unavailable, using fallback data.", error?.message || error);
    return getFallbackDashboard();
  }
};
