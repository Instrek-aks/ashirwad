import { Router } from 'express';
import {
  handleSubmitInquiry,
  handleGetInquiries,
  handleUpdateInquiry,
  handleDeleteInquiry,
  handleAddInquiryToContacts,
  handleExportInquiries
} from '../controllers/inquiry.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public submission endpoint for website forms
router.post('/', handleSubmitInquiry);

// Admin-protected routes
router.get('/export', protectAdmin, handleExportInquiries);
router.get('/', protectAdmin, handleGetInquiries);
router.patch('/:id', protectAdmin, handleUpdateInquiry);
router.delete('/:id', protectAdmin, handleDeleteInquiry);
router.post('/:id/add-to-contacts', protectAdmin, handleAddInquiryToContacts);

export default router;

