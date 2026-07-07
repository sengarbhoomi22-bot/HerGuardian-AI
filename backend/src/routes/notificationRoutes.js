import express from 'express';
import protect from '../middleware/auth.js';
import { getNotifications, createNotification, markRead, removeNotification, markAllRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.post('/', protect, createNotification);
router.patch('/read-all', protect, markAllRead);
router.patch('/:id/read', protect, markRead);
router.delete('/:id', protect, removeNotification);

export default router;
