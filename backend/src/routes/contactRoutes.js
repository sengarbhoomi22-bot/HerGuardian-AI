import express from 'express';
import protect from '../middleware/auth.js';
import { getContacts, createContact, updateContact, deleteContact } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', protect, getContacts);
router.post('/', protect, createContact);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
