import nodemailer from 'nodemailer';
import { env } from './env.js';

export const createTransporter = () => {
  if (!env.SMTP.USER || !env.SMTP.PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP.HOST,
    port: env.SMTP.PORT,
    secure: env.SMTP.SECURE,
    auth: {
      user: env.SMTP.USER,
      pass: env.SMTP.PASS
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10 // Max 10 messages per second to prevent provider blocking
  });
};

export const verifyTransporter = async (transporter) => {
  if (!transporter) {
    return { configured: false, message: 'SMTP credentials not provided in .env' };
  }
  try {
    await transporter.verify();
    return { configured: true, message: 'SMTP connection verified and ready' };
  } catch (error) {
    return { configured: false, message: error.message };
  }
};
