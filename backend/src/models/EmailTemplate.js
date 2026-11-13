import mongoose from 'mongoose';

const emailTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      trim: true,
      default: 'General'
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    contentHtml: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

