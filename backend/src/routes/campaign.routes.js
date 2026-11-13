import { Router } from 'express';
import {
  handleSendCampaign,
  handleSaveDraft,
  handleRetryFailed,
  handleDeleteCampaign,
  handleExportCampaign,
  handleSendTestEmail,
  handleGetCampaigns,
  handleGetCampaignById,
  handleClearCampaignHistory,
  handleGetTemplates,
  handleCreateTemplate,
  handleUpdateTemplate,
  handleDeleteTemplate
} from '../controllers/campaign.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protectAdmin); // All campaign routes are secured

router.get('/templates', handleGetTemplates);
router.post('/templates', handleCreateTemplate);
router.put('/templates/:id', handleUpdateTemplate);
router.delete('/templates/:id', handleDeleteTemplate);

router.delete('/purge/all', handleClearCampaignHistory);
router.get('/', handleGetCampaigns);
router.post('/draft', handleSaveDraft);
router.post('/send', handleSendCampaign);
router.post('/test', handleSendTestEmail);
router.get('/:id/export', handleExportCampaign);
router.post('/:id/retry-failed', handleRetryFailed);
router.get('/:id', handleGetCampaignById);
router.delete('/:id', handleDeleteCampaign);

export default router;
