import express from 'express';
import protect from '../middleware/auth.js';
import { getFeedback, createFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/', getFeedback);
router.post('/', protect, createFeedback);

export default router;
