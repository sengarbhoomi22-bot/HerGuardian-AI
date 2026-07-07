import express from 'express';
import protect from '../middleware/auth.js';
import { getReminders, createReminder, updateReminder, deleteReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.get('/', protect, getReminders);
router.post('/', protect, createReminder);
router.put('/:id', protect, updateReminder);
router.delete('/:id', protect, deleteReminder);

export default router;
