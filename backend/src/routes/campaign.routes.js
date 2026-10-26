import { Router } from 'express';
import {
  handleSendCampaign,
  handleSendTestEmail,
  handleGetCampaigns,
  handleGetCampaignById,
  handleClearCampaignHistory
} from '../controllers/campaign.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protectAdmin); // All campaign routes are secured

router.delete('/purge/all', handleClearCampaignHistory);
router.get('/', handleGetCampaigns);
router.get('/:id', handleGetCampaignById);
router.post('/send', handleSendCampaign);
router.post('/test', handleSendTestEmail);

export default router;
