import { inspirationQuotes } from '../data/inspirationQuotes.js';
import { inspiringWomen } from '../data/inspiringWomen.js';
import { affirmations } from '../data/affirmations.js';
import { successStories } from '../data/successStories.js';

export const getQuotes = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, quotes: inspirationQuotes });
  } catch (error) {
    next(error);
  }
};

export const getWomen = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, women: inspiringWomen });
  } catch (error) {
    next(error);
  }
};

export const getAffirmations = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, affirmations });
  } catch (error) {
    next(error);
  }
};

export const getStories = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, stories: successStories });
  } catch (error) {
    next(error);
  }
};
