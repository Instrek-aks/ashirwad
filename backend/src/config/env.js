import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ashirwad_crm',
  JWT_SECRET: process.env.JWT_SECRET || 'ashirwad_super_secure_jwt_secret_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  DEFAULT_ADMIN_EMAIL: process.env.DEFAULT_ADMIN_EMAIL || 'admin@ashirwad.com',
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345',
  SMTP: {
    HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    PORT: parseInt(process.env.SMTP_PORT || '587', 10),
    SECURE: process.env.SMTP_SECURE === 'true',
    USER: (process.env.SMTP_USER || '').trim(),
    PASS: (process.env.SMTP_PASS || '').trim(),
    FROM_NAME: (process.env.EMAIL_FROM_NAME || 'Ashirwad Plastics Admin').replace(/^["']|["']$/g, '').trim(),
    FROM_ADDRESS: (process.env.EMAIL_FROM_ADDRESS || '').replace(/^["']|["']$/g, '').trim()
  }
};
