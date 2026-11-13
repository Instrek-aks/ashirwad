import { Router } from 'express';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import campaignRoutes from './campaign.routes.js';
import blogRoutes from './blog.routes.js';
import inquiryRoutes from './inquiry.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/blogs', blogRoutes);
router.use('/inquiries', inquiryRoutes);

export default router;
