import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

export const loginAdmin = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const ensureDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'SUPER_ADMIN' });
    if (!adminExists) {
      console.log('[Auth Service] Initializing default super admin account...');
      await User.create({
        name: 'Super Admin',
        email: env.DEFAULT_ADMIN_EMAIL,
        password: env.DEFAULT_ADMIN_PASSWORD,
        role: 'SUPER_ADMIN'
      });
      console.log(`[Auth Service] Super admin initialized successfully: ${env.DEFAULT_ADMIN_EMAIL}`);
    }
  } catch (error) {
    console.error('[Auth Service] Failed to initialize default admin:', error.message);
  }
};
