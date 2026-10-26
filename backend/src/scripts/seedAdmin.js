import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

const seed = async () => {
  try {
    await connectDB();

    const email = env.DEFAULT_ADMIN_EMAIL;
    const password = env.DEFAULT_ADMIN_PASSWORD;

    await User.deleteOne({ email });

    await User.create({
      name: 'Super Admin',
      email,
      password,
      role: 'SUPER_ADMIN'
    });

    console.log('✅ Admin user created/reset successfully:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
