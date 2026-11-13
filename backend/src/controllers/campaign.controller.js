import XLSX from 'xlsx';
import { Campaign } from '../models/Campaign.js';
import { EmailTemplate } from '../models/EmailTemplate.js';
import { processCampaignQueue, retryFailedCampaignQueue, sendTestEmail } from '../services/email.service.js';

export const handleSendCampaign = async (req, res, next) => {
  try {
    const { title, subject, contentHtml, targetTags, directRecipients, cc, bcc, attachments, draftId } = req.body;

    if (!subject || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Subject and email content are required.'
      });
    }

    let campaign;
    if (draftId) {
      campaign = await Campaign.findByIdAndUpdate(
        draftId,
        {
          title: title || subject,
          subject,
          contentHtml,
          targetTags: targetTags || [],
          directRecipients: directRecipients || [],
          cc: cc || [],
          bcc: bcc || [],
          attachments: attachments || [],
          status: 'PROCESSING',
          totalRecipients: 0,
          sentCount: 0,
          failedCount: 0,
          failureLogs: [],
          recipientLogs: []
        },
        { new: true }
      );
    }

    if (!campaign) {
      campaign = await Campaign.create({
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
    }

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

export const handleSaveDraft = async (req, res, next) => {
  try {
    const { id, title, subject, contentHtml, targetTags, directRecipients, cc, bcc, attachments } = req.body;

    if (!subject && !title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least a title or subject to save a draft.'
      });
    }

    let draft;
    if (id) {
      draft = await Campaign.findOneAndUpdate(
        { _id: id, status: 'DRAFT' },
        {
          title: title || subject || 'Untitled Draft',
          subject: subject || '(No Subject)',
          contentHtml: contentHtml || '<p></p>',
          targetTags: targetTags || [],
          directRecipients: directRecipients || [],
          cc: cc || [],
          bcc: bcc || [],
          attachments: attachments || []
        },
        { new: true }
      );
    }

    if (!draft) {
      draft = await Campaign.create({
        title: title || subject || 'Untitled Draft',
        subject: subject || '(No Subject)',
        contentHtml: contentHtml || '<p></p>',
        targetTags: targetTags || [],
        directRecipients: directRecipients || [],
        cc: cc || [],
        bcc: bcc || [],
        attachments: attachments || [],
        status: 'DRAFT',
        createdBy: req.user._id
      });
    }

    res.status(200).json({
      success: true,
      message: 'Campaign draft saved.',
      campaign: draft
    });
  } catch (error) {
    next(error);
  }
};

export const handleRetryFailed = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const failedCount = (campaign.recipientLogs || []).filter((r) => r.status === 'FAILED').length;
    if (failedCount === 0) {
      return res.status(400).json({ success: false, message: 'No failed recipients to retry.' });
    }

    retryFailedCampaignQueue(campaign._id).catch((err) => {
      console.error('[Retry Error] Campaign retry error:', err);
    });

    res.status(202).json({
      success: true,
      message: `Retrying ${failedCount} failed recipient(s)...`
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteCampaign = async (req, res, next) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Campaign deleted.' });
  } catch (error) {
    next(error);
  }
};

export const handleExportCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id).lean();
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const rows = (campaign.recipientLogs || []).map((log) => ({
      Email: log.email,
      Name: log.name || '',
      Company: log.company || '',
      Status: log.status,
      Error: log.error || '',
      Timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(
      rows.length > 0
        ? rows
        : [{ Email: '-', Name: '-', Company: '-', Status: campaign.status, Error: '', Timestamp: '' }]
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Delivery Report');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const safeName = (campaign.subject || 'campaign').replace(/[^a-z0-9]/gi, '_').slice(0, 40);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Campaign_${safeName}.xlsx"`);
    res.send(buffer);
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
      .limit(100);

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
      message: `Successfully cleared ${result.deletedCount} campaign history logs.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    next(error);
  }
};

// ==================== EMAIL TEMPLATES ====================

export const handleGetTemplates = async (req, res, next) => {
  try {
    const templates = await EmailTemplate.find().sort({ updatedAt: -1 }).lean();
    res.status(200).json({ success: true, templates });
  } catch (error) {
    next(error);
  }
};

export const handleCreateTemplate = async (req, res, next) => {
  try {
    const { name, category = 'General', subject, contentHtml } = req.body;
    if (!name || !subject || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Template name, subject, and content are required.'
      });
    }

    const template = await EmailTemplate.create({
      name: name.trim(),
      category: category.trim(),
      subject: subject.trim(),
      contentHtml,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Email template saved.',
      template
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateTemplate = async (req, res, next) => {
  try {
    const { name, category = 'General', subject, contentHtml } = req.body;
    if (!name || !subject || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Template name, subject, and content are required.'
      });
    }

    const template = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        category: (category || 'General').trim(),
        subject: subject.trim(),
        contentHtml
      },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Email template updated.',
      template
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteTemplate = async (req, res, next) => {
  try {
    await EmailTemplate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Template deleted.' });
  } catch (error) {
    next(error);
  }
};
