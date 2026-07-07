import Favorite from '../models/Favorite.js';
import Notification from '../models/Notification.js';

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, favorites });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { itemId, title, description, category, source } = req.body;

    if (!itemId || !title) {
      return res.status(400).json({ success: false, message: 'Item ID and title are required' });
    }

    const existing = await Favorite.findOne({ user: req.user._id, itemId });
    if (existing) {
      return res.status(200).json({ success: true, favorite: existing });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      itemId,
      title,
      description: description || '',
      category: category || 'General',
      source: source || 'general',
    });

    // create notification for favorite added
    try {
      await Notification.create({ user: req.user._id, title: 'Added to Favorites', message: `"${favorite.title}" was added to your favorites.`, type: 'success' });
    } catch (e) {
      console.error('Notification error', e);
    }

    res.status(201).json({ success: true, favorite });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({ success: true, favorite: await Favorite.findOne({ user: req.user._id, itemId: req.body.itemId }) });
    }
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!favorite) {
      return res.status(404).json({ success: false, message: 'Favorite not found' });
    }

    res.status(200).json({ success: true, message: 'Favorite removed' });
  } catch (error) {
    next(error);
  }
};
