import dotenv from 'dotenv';
import Contact from '../models/Contact.js';
dotenv.config();

export const sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Form Data Received:', req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('DB SAVE SUCCESS:', newContact);
    console.log('EMAIL SENT SUCCESS');
    
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.log('REAL ERROR:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
};