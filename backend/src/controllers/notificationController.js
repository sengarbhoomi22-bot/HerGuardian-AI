import Notification from '../models/Notification.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({ user: req.user._id, read: false });
    res.status(200).json({ success: true, notifications, unreadCount });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const { title, message, type = 'info', userId } = req.body;
    const user = userId || req.user?._id;
    if (!user || !title || !message) return res.status(400).json({ success: false, message: 'user, title and message required' });
    const n = await Notification.create({ user, title, message, type });
    res.status(201).json({ success: true, notification: n });
  } catch (error) {
    next(error);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const n = await Notification.findOne({ _id: req.params.id, user: req.user._id });
    if (!n) return res.status(404).json({ success: false, message: 'Notification not found' });
    n.read = true;
    await n.save();
    res.status(200).json({ success: true, notification: n });
  } catch (error) {
    next(error);
  }
};

export const removeNotification = async (req, res, next) => {
  try {
    const n = await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!n) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    next(error);
  }
};

export const markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id, read: false }, { $set: { read: true } });
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications, unreadCount: 0 });
  } catch (error) {
    next(error);
  }
};
