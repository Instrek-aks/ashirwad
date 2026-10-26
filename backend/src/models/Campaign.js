import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
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
    targetTags: {
      type: [String],
      default: []
    },
    directRecipients: {
      type: [String],
      default: []
    },
    cc: {
      type: [String],
      default: []
    },
    bcc: {
      type: [String],
      default: []
    },
    attachments: [
      {
        filename: String,
        contentType: String,
        size: Number,
        dataUrl: String
      }
    ],
    totalRecipients: {
      type: Number,
      default: 0
    },
    sentCount: {
      type: Number,
      default: 0
    },
    failedCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PROCESSING', 'COMPLETED', 'FAILED'],
      default: 'DRAFT'
    },
    failureLogs: [
      {
        email: String,
        reason: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    recipientLogs: [
      {
        email: String,
        name: String,
        company: String,
        status: { type: String, enum: ['DELIVERED', 'FAILED'], default: 'DELIVERED' },
        error: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export const Campaign = mongoose.model('Campaign', campaignSchema);
