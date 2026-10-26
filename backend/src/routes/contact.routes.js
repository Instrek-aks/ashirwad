import { Router } from 'express';
import {
  handlePreviewSheet,
  handleImportFile,
  handleGetContacts,
  handleCreateContact,
  handleUpdateContact,
  handleDeleteContact,
  handleClearAllContacts,
  handleExportContacts,
  handleGetGroups,
  handleRenameGroup,
  handleDeleteGroup
} from '../controllers/contact.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';
import { uploadSheet } from '../middlewares/upload.middleware.js';

const router = Router();

router.use(protectAdmin); // All contact management routes are secured

router.delete('/purge/all', handleClearAllContacts);
router.get('/', handleGetContacts);
router.post('/', handleCreateContact);
router.put('/:id', handleUpdateContact);
router.delete('/:id', handleDeleteContact);

router.post('/preview-sheet', uploadSheet.single('file'), handlePreviewSheet);
router.post('/import', uploadSheet.single('file'), handleImportFile);

router.get('/groups', handleGetGroups);
router.put('/groups/:oldName', handleRenameGroup);
router.delete('/groups/:name', handleDeleteGroup);

router.get('/export', handleExportContacts);

export default router;

