import { loginAdmin } from '../services/auth.service.js';
import { verifyTransporter, createTransporter } from '../config/mailer.js';
import mongoose from 'mongoose';

export const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const authData = await loginAdmin(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: authData
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

export const handleSystemStatus = async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED';
  const transporter = createTransporter();
  const smtpStatus = await verifyTransporter(transporter);

  res.status(200).json({
    success: true,
    status: {
      database: dbStatus,
      smtp: smtpStatus
    }
  });
};
