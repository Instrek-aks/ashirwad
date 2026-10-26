import { Router } from 'express';
import {
  handleLogin,
  handleGetMe,
  handleSystemStatus
} from '../controllers/auth.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', handleLogin);
router.get('/me', protectAdmin, handleGetMe);
router.get('/status', protectAdmin, handleSystemStatus);

export default router;
