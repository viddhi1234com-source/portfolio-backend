import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing with:', process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, 
  subject: 'Test Mail From Backend',
  text: 'Bhai agar ye mail aaya to sab sahi hai'
}, (error, info) => {
  if (error) {
    console.log('❌ REAL ERROR:', error);
  } else {
    console.log('✅ Mail sent:', info.response);
  }
});