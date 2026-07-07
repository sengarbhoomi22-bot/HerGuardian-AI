import Feedback from '../models/Feedback.js';

export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, feedback });
  } catch (error) {
    next(error);
  }
};

export const createFeedback = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required' });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      userName: req.user.name,
      rating,
      comment,
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    next(error);
  }
};
