import Reminder from '../models/Reminder.js';
import Notification from '../models/Notification.js';

export const getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, reminders });
  } catch (error) {
    next(error);
  }
};

export const createReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.create({
      user: req.user._id,
      title: req.body.title,
      category: req.body.category,
      time: req.body.time,
      notes: req.body.notes || '',
    });

    // create notification for new reminder
    try {
      await Notification.create({ user: req.user._id, title: 'Reminder Created', message: `Reminder: ${reminder.title} at ${reminder.time}`, type: 'reminder' });
    } catch (e) {
      console.error('Notification error', e);
    }

    res.status(201).json({ success: true, reminder });
  } catch (error) {
    next(error);
  }
};

export const updateReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, user: req.user._id });

    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }

    reminder.title = req.body.title || reminder.title;
    reminder.category = req.body.category || reminder.category;
    reminder.time = req.body.time || reminder.time;
    reminder.notes = req.body.notes ?? reminder.notes;

    await reminder.save();

    res.status(200).json({ success: true, reminder });
  } catch (error) {
    next(error);
  }
};

export const deleteReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }

    res.status(200).json({ success: true, message: 'Reminder deleted' });
  } catch (error) {
    next(error);
  }
};
