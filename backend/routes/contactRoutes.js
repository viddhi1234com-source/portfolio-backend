import express from 'express';
import { sendContactForm, getAllContacts } from '../controllers/contactController.js';
const router = express.Router();

router.post('/', sendContactForm);
router.get('/', getAllContacts);

export default router;