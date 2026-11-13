import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['PRODUCT_INQUIRY', 'CAREER_APPLICATION', 'EVENT_UPDATE'],
      default: 'PRODUCT_INQUIRY'
    },
    fullName: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    productType: {
      type: String,
      trim: true,
      default: ''
    },
    careerDept: {
      type: String,
      trim: true,
      default: ''
    },
    yearsExperience: {
      type: String,
      trim: true,
      default: ''
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    source: {
      type: String,
      trim: true,
      default: 'Contact Page'
    },
    status: {
      type: String,
      enum: ['NEW', 'IN_REVIEW', 'REPLIED', 'ARCHIVED'],
      default: 'NEW'
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    addedToContacts: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

inquirySchema.index({ type: 1, status: 1, createdAt: -1 });
inquirySchema.index({ email: 'text', fullName: 'text', company: 'text', description: 'text' });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);

