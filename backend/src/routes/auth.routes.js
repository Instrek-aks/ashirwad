import { Router } from 'express';
import {
  handleLogin,
  handleGetMe,
  handleUpdateProfile,
  handleChangePassword,
  handleSystemStatus,
  handleDiagnosticTestEmail,
  handleDashboardStats
} from '../controllers/auth.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', handleLogin);
router.get('/me', protectAdmin, handleGetMe);
router.put('/profile', protectAdmin, handleUpdateProfile);
router.put('/password', protectAdmin, handleChangePassword);
router.get('/status', protectAdmin, handleSystemStatus);
router.post('/test-email', protectAdmin, handleDiagnosticTestEmail);
router.get('/dashboard', protectAdmin, handleDashboardStats);

export default router;
