import express from 'express';
import { getQuotes, getWomen, getAffirmations, getStories } from '../controllers/inspirationController.js';

const router = express.Router();

router.get('/quotes', getQuotes);
router.get('/women', getWomen);
router.get('/affirmations', getAffirmations);
router.get('/stories', getStories);

export default router;
