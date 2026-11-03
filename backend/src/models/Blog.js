import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true
    },
    contentHtml: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'Packaging Innovation',
      trim: true
    },
    coverImage: {
      type: String,
      default: '/Product_Images/32.png'
    },
    readTime: {
      type: String,
      default: '5 min read'
    },
    author: {
      name: {
        type: String,
        default: 'Ashirwad Plastics Editorial Team'
      },
      role: {
        type: String,
        default: 'Packaging & R&D Specialist'
      },
      avatar: {
        type: String,
        default: '/logo-icon.png'
      }
    },
    tags: {
      type: [String],
      default: []
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ title: 'text', excerpt: 'text' });

export const Blog = mongoose.model('Blog', blogSchema);
export default Blog;

