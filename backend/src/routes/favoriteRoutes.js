import express from 'express';
import protect from '../middleware/auth.js';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';

const router = express.Router();

router.get('/', protect, getFavorites);
router.post('/', protect, addFavorite);
router.delete('/:id', protect, removeFavorite);

export default router;
