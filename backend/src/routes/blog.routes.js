import { Router } from 'express';
import {
  getPublishedBlogs,
  getBlogBySlug,
  recordBlogView,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  togglePublishBlog
} from '../controllers/blog.controller.js';
import { protectAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getPublishedBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/:slug/view', recordBlogView);

// Admin-protected routes
router.get('/admin/all', protectAdmin, getAdminBlogs);
router.post('/', protectAdmin, createBlog);
router.put('/:id', protectAdmin, updateBlog);
router.delete('/:id', protectAdmin, deleteBlog);
router.patch('/:id/publish', protectAdmin, togglePublishBlog);

export default router;
