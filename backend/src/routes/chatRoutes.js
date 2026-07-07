import express from 'express';
import protect from '../middleware/auth.js';
import { getChat, saveMessage, clearChat, deleteMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', protect, getChat);
router.post('/', protect, saveMessage);
router.delete('/', protect, clearChat);
router.delete('/:id', protect, deleteMessage);

export default router;
