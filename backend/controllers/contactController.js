import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
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
    await transporter.sendMail({
      from: process.env.EMAIL_USER, 
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
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message' 
    });
  }
};

export const getAllContacts = (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Contact API working' 
  });
};