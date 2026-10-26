import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      trim: true,
      default: ''
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    tags: {
      type: [String],
      default: ['General']
    },
    isSubscribed: {
      type: Boolean,
      default: true
    },
    source: {
      type: String,
      trim: true,
      default: 'Website Inquiry'
    }
  },
  {
    timestamps: true
  }
);

// Text index for search
contactSchema.index({ email: 'text', name: 'text', company: 'text' });

export const Contact = mongoose.model('Contact', contactSchema);
