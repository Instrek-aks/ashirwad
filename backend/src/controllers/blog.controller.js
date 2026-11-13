import Blog from '../models/Blog.js';

// Generate url-safe slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// GET /api/v1/blogs - Get published blogs (Public)
export const getPublishedBlogs = async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { excerpt: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        blogs,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Recent view deduplication cache (key: "slug:visitorKey" -> expiresAtMs)
const VIEW_TTL_MS = 24 * 60 * 60 * 1000;
const recentBlogViews = new Map();

// GET /api/v1/blogs/:slug - Get single blog by slug (Public)
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    // Get 3 related articles
    const related = await Blog.find({
      _id: { $ne: blog._id },
      isPublished: true,
      category: blog.category
    })
      .sort({ publishedAt: -1 })
      .limit(3);

    // If less than 3 in same category, fill with other recent published
    let fallback = [];
    if (related.length < 3) {
      fallback = await Blog.find({
        _id: { $nin: [blog._id, ...related.map((r) => r._id)] },
        isPublished: true
      })
        .sort({ publishedAt: -1 })
        .limit(3 - related.length);
    }

    res.json({
      success: true,
      data: {
        blog,
        related: [...related, ...fallback]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/blogs/:slug/view - Record a deduplicated view for a published blog
export const recordBlogView = async (req, res) => {
  try {
    const { slug } = req.params;
    const rawVisitorId = req.body?.visitorId ? String(req.body.visitorId).trim() : '';
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().split(',')[0].trim();
    const visitorKey = rawVisitorId || ip;

    const now = Date.now();
    if (recentBlogViews.size > 10000) {
      for (const [key, expiresAt] of recentBlogViews.entries()) {
        if (expiresAt <= now) recentBlogViews.delete(key);
      }
    }

    const cacheKey = `${slug}:${visitorKey}`;
    const existingExpiry = recentBlogViews.get(cacheKey);
    if (existingExpiry && existingExpiry > now) {
      return res.json({ success: true, counted: false });
    }

    const updated = await Blog.findOneAndUpdate(
      { slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true, select: 'views' }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Published blog article not found' });
    }

    recentBlogViews.set(cacheKey, now + VIEW_TTL_MS);
    res.json({ success: true, counted: true, views: updated.views });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/blogs/admin/all - Get all blogs for Admin (Admin only)
export const getAdminBlogs = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status === 'published') query.isPublished = true;
    if (status === 'draft') query.isPublished = false;

    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { excerpt: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query).sort({ updatedAt: -1, createdAt: -1 });

    res.json({
      success: true,
      data: {
        blogs,
        total: blogs.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/blogs - Create blog (Admin only)
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      contentHtml,
      category,
      coverImage,
      readTime,
      author,
      tags,
      isPublished,
      featured,
      publishedAt
    } = req.body;

    if (!title || !excerpt || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Title, excerpt, and content are required'
      });
    }

    let finalSlug = slug && slug.trim() ? generateSlug(slug) : generateSlug(title);

    // Ensure slug uniqueness
    const existing = await Blog.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const blog = new Blog({
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      contentHtml,
      category: category || 'Packaging Innovation',
      coverImage: coverImage || '/Product_Images/32.png',
      readTime: readTime || '5 min read',
      author: author || {
        name: 'Ashirwad Plastics Editorial Team',
        role: 'Packaging & R&D Specialist',
        avatar: '/logo-icon.png'
      },
      tags: Array.isArray(tags) ? tags : [],
      isPublished: isPublished !== undefined ? isPublished : true,
      featured: Boolean(featured),
      publishedAt: publishedAt ? new Date(publishedAt) : new Date()
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/blogs/:id - Update blog (Admin only)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.title && !updates.slug) {
      updates.slug = generateSlug(updates.title);
    } else if (updates.slug) {
      updates.slug = generateSlug(updates.slug);
    }

    const blog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    res.json({
      success: true,
      message: 'Article updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/blogs/:id - Delete blog (Admin only)
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/v1/blogs/:id/publish - Toggle Publish status (Admin only)
export const togglePublishBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    blog.isPublished = !blog.isPublished;
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();

    res.json({
      success: true,
      message: `Article ${blog.isPublished ? 'published' : 'moved to draft'}`,
      data: blog
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

