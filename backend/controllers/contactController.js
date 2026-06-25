import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js'; // ← Ye line add kar
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  
  console.log('Form Data Received:', req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill all fields' 
    });
  }

  try {
    // 1. Pehle DB mein save karo
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Saved to DB:', newContact);

    // 2. Phir mail bhejo
    await transporter.sendMail({
      from: '"Portfolio Contact" <viddhi1234.com@gmail.com>',
      to: process.env.EMAIL_USER,
      subject: `Portfolio: New Message from ${name}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `,
      replyTo: email
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message sent & saved successfully!' 
    });

  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message' 
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({ 
      success: true,
      data: contacts 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contacts' 
    });
  }
};