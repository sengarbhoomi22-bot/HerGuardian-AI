import { addDays, addWeeks, endOfDay, format, startOfDay, startOfWeek, subDays, subWeeks } from 'date-fns';
import Reminder from '../models/Reminder.js';
import Favorite from '../models/Favorite.js';
import Contact from '../models/Contact.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';

const safeParseInt = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const buildEmptySeries = (length, startDate, formatter) => {
  return Array.from({ length }).map((_, index) => ({
    label: formatter(addDays(startDate, index)),
    value: 0,
  }));
};

export const getDashboardAnalytics = async (userId) => {
  try {
    const [totalReminders, totalFavorites, totalEmergencyContacts, user, chatData, favorites] = await Promise.all([
      Reminder.countDocuments({ user: userId }),
      Favorite.countDocuments({ user: userId }),
      Contact.countDocuments({ user: userId }),
      User.findById(userId),
      Chat.findOne({ user: userId }).select('messages'),
      Favorite.find({ user: userId }).select('source category'),
    ]);

    const totalChatMessages = chatData?.messages?.length || 0;
    const totalSavedTips = totalFavorites;

    const nutritionFavorites = favorites.filter((fav) => fav.source === 'nutrition').length;
    const fitnessSessions = favorites.filter((fav) => fav.source === 'fitness').length;
    const healthArticlesViewed = favorites.filter((fav) => fav.source === 'health').length;
    const menstrualTipsViewed = favorites.filter((fav) => fav.source === 'menstrual').length;

    let profileCompletion = 0;
    if (user) {
      let completedFields = 0;
      const totalFields = 5; // name, email, phone, age, preferences
      if (user.name) completedFields++;
      if (user.email) completedFields++;
      if (user.phone) completedFields++;
      if (user.age) completedFields++;
      if (user.preferences && Object.keys(user.preferences || {}).length > 0) completedFields++;
      profileCompletion = Math.round((completedFields / (totalFields + 1)) * 100);
    }

    const dailyActivity = await getRecentActivitySeries(userId, 7);
    const weeklyActivity = await getWeeklyActivitySeries(userId, 4);

    return {
      totalReminders,
      totalFavorites,
      totalEmergencyContacts,
      totalChatMessages,
      totalSavedTips,
      profileCompletion,
      nutritionFavorites,
      fitnessSessions,
      healthArticlesViewed,
      menstrualTipsViewed,
      dailyActivity,
      weeklyActivity,
    };
  } catch (error) {
    console.error('Analytics Service Error:', error);
    throw error;
  }
};

export const getFavoritesByModule = async (userId) => {
  try {
    const favorites = await Favorite.find({ user: userId }).select('category');
    
    const moduleCounts = {
      'Women\'s Health': 0,
      Nutrition: 0,
      Fitness: 0,
      'Menstrual Wellness': 0,
      Other: 0,
    };

    favorites.forEach((fav) => {
      if (moduleCounts.hasOwnProperty(fav.category)) {
        moduleCounts[fav.category]++;
      } else {
        moduleCounts['Other']++;
      }
    });

    return Object.entries(moduleCounts).map(([name, value]) => ({
      name,
      value,
    }));
  } catch (error) {
    console.error('Favorites By Module Error:', error);
    throw error;
  }
};

export const getRemindersByCategory = async (userId) => {
  try {
    const reminders = await Reminder.find({ user: userId }).select('category');
    
    const categoryCounts = {};
    reminders.forEach((reminder) => {
      const cat = reminder.category || 'Uncategorized';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));
  } catch (error) {
    console.error('Reminders By Category Error:', error);
    throw error;
  }
};

export const getRecentReminders = async (userId, limit = 5) => {
  try {
    const reminders = await Reminder.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title category time notes createdAt');
    return reminders;
  } catch (error) {
    console.error('Recent Reminders Error:', error);
    throw error;
  }
};

export const getRecentFavorites = async (userId, limit = 5) => {
  try {
    const favorites = await Favorite.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title category source createdAt');
    return favorites;
  } catch (error) {
    console.error('Recent Favorites Error:', error);
    throw error;
  }
};

export const getRecentChatMessages = async (userId, limit = 5) => {
  try {
    const chatData = await Chat.findOne({ user: userId }).select('messages');
    if (!chatData || !chatData.messages) {
      return [];
    }

    return chatData.messages
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit)
      .map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
  } catch (error) {
    console.error('Recent Chat Messages Error:', error);
    throw error;
  }
};

const getRecentActivitySeries = async (userId, days = 7) => {
  const startDate = startOfDay(subDays(new Date(), days - 1));
  const daily = buildEmptySeries(days, startDate, (date) => format(date, 'EEE'));

  const reminders = await Reminder.find({
    user: userId,
    createdAt: { $gte: startDate },
  }).select('createdAt');

  const chatData = await Chat.findOne({ user: userId }).select('messages.timestamp');

  reminders.forEach((reminder) => {
    const label = format(startOfDay(reminder.createdAt), 'EEE');
    const item = daily.find((day) => day.label === label);
    if (item) item.value += 1;
  });

  (chatData?.messages || []).forEach((message) => {
    const label = format(startOfDay(message.timestamp), 'EEE');
    const item = daily.find((day) => day.label === label);
    if (item) item.value += 1;
  });

  return daily;
};

const getWeeklyActivitySeries = async (userId, weeks = 4) => {
  const startDate = startOfWeek(subWeeks(new Date(), weeks - 1));
  const weekly = Array.from({ length: weeks }).map((_, index) => ({
    label: format(addWeeks(startDate, index), 'MMM d'),
    value: 0,
  }));

  const reminders = await Reminder.find({
    user: userId,
    createdAt: { $gte: startDate },
  }).select('createdAt');

  const chatData = await Chat.findOne({ user: userId }).select('messages.timestamp');

  reminders.forEach((reminder) => {
    const weekIndex = Math.max(0, Math.min(weeks - 1, Math.floor((startOfWeek(reminder.createdAt) - startDate) / (7 * 24 * 60 * 60 * 1000))));
    weekly[weekIndex].value += 1;
  });

  (chatData?.messages || []).forEach((message) => {
    const weekIndex = Math.max(0, Math.min(weeks - 1, Math.floor((startOfWeek(message.timestamp) - startDate) / (7 * 24 * 60 * 60 * 1000))));
    weekly[weekIndex].value += 1;
  });

  return weekly;
};
