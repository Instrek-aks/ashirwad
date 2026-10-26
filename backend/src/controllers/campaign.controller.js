import { Campaign } from '../models/Campaign.js';
import { processCampaignQueue, sendTestEmail } from '../services/email.service.js';

export const handleSendCampaign = async (req, res, next) => {
  try {
    const { title, subject, contentHtml, targetTags, directRecipients, cc, bcc, attachments } = req.body;

    if (!subject || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Subject and email content are required.'
      });
    }

    const campaign = await Campaign.create({
      title: title || subject,
      subject,
      contentHtml,
      targetTags: targetTags || [],
      directRecipients: directRecipients || [],
      cc: cc || [],
      bcc: bcc || [],
      attachments: attachments || [],
      createdBy: req.user._id,
      status: 'PROCESSING',
      totalRecipients: 0,
      sentCount: 0,
      failedCount: 0,
      failureLogs: [],
      recipientLogs: []
    });

    // Run queue in background so the HTTP response is instantaneous
    processCampaignQueue(campaign._id).catch((err) => {
      console.error('[Queue Error] Campaign processing error:', err);
    });

    res.status(202).json({
      success: true,
      message: 'Campaign has been queued and is now sending.',
      campaignId: campaign._id
    });
  } catch (error) {
    next(error);
  }
};

export const handleSendTestEmail = async (req, res, next) => {
  try {
    const { to, subject, contentHtml, attachments, cc, bcc } = req.body;

    if (!to || !subject || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email, subject, and content are required.'
      });
    }

    const cleanTo = (to || '').toLowerCase().trim();
    let sendError = null;
    let result = null;

    try {
      result = await sendTestEmail({ to: cleanTo, subject, contentHtml, attachments, cc, bcc });
    } catch (err) {
      sendError = err;
    }

    // Record test email dispatch to Campaign history for auditing and recipient inspection
    const campaign = await Campaign.create({
      title: `[Test Dispatch] ${subject}`,
      subject: `[TEST] ${subject}`,
      contentHtml,
      targetTags: ['Direct Test'],
      directRecipients: [cleanTo],
      cc: cc || [],
      bcc: bcc || [],
      attachments: attachments || [],
      totalRecipients: 1,
      sentCount: sendError ? 0 : 1,
      failedCount: sendError ? 1 : 0,
      status: sendError ? 'FAILED' : 'COMPLETED',
      failureLogs: sendError ? [{ email: cleanTo, reason: sendError.message, timestamp: new Date() }] : [],
      recipientLogs: [
        {
          email: cleanTo,
          name: 'Direct Recipient',
          company: 'Ashirwad Plastics Partner',
          status: sendError ? 'FAILED' : 'DELIVERED',
          error: sendError ? sendError.message : undefined,
          timestamp: new Date()
        }
      ],
      createdBy: req.user?._id
    });

    if (sendError) {
      return res.status(500).json({
        success: false,
        message: sendError.message,
        campaignId: campaign._id
      });
    }

    res.status(200).json({
      success: true,
      message: `Test email sent successfully to ${cleanTo}`,
      result,
      campaignId: campaign._id
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      campaigns
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.status(200).json({
      success: true,
      campaign
    });
  } catch (error) {
    next(error);
  }
};

export const handleClearCampaignHistory = async (req, res, next) => {
  try {
    const result = await Campaign.deleteMany({});
    res.status(200).json({
      success: true,
      message: `Successfully cleared ${result.deletedCount} broadcast campaign records.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    next(error);
  }
};

