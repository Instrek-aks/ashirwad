import { createTransporter } from '../config/mailer.js';
import { env } from '../config/env.js';
import { Campaign } from '../models/Campaign.js';
import { Contact } from '../models/Contact.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const renderTemplate = (contentHtml, recipient) => {
  let rendered = contentHtml;
  const name = recipient.name || 'Valued Partner';
  const company = recipient.company || 'your organization';
  const email = recipient.email;

  rendered = rendered.replace(/{{name}}/gi, name);
  rendered = rendered.replace(/{{company}}/gi, company);
  rendered = rendered.replace(/{{email}}/gi, email);

  // Wrap in responsive, modern corporate email layout
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; line-height: 1.6; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
          .header { background: linear-gradient(135deg, #2563EB 0%, #38BDF8 100%); padding: 24px 32px; text-align: left; }
          .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
          .header p { color: #E0F2FE; margin: 4px 0 0 0; font-size: 13px; }
          .content { padding: 32px; font-size: 15px; }
          .footer { background: #f1f5f9; padding: 18px 32px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          .footer a { color: #2563eb; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ashirwad Plastics</h1>
          </div>
          <div class="content">
            ${rendered}
          </div>
          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} Ashirwad Plastics. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const formatAttachments = (attachments = []) => {
  return attachments
    .filter((att) => att && att.filename && att.dataUrl)
    .map((att) => ({
      filename: att.filename,
      path: att.dataUrl,
      contentType: att.contentType
    }));
};

export const sendTestEmail = async ({ to, subject, contentHtml, attachments = [], cc = [], bcc = [] }) => {
  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('SMTP credentials are not configured in backend/.env file.');
  }

  const html = renderTemplate(contentHtml, {
    email: to,
    name: 'Test Recipient',
    company: 'Ashirwad Plastics'
  });

  const senderEmail = env.SMTP.USER || env.SMTP.FROM_ADDRESS;
  const displayName = env.SMTP.FROM_NAME || 'Ashirwad Plastics Admin';

  const mailOptions = {
    from: `"${displayName}" <${senderEmail}>`,
    to,
    subject: `[TEST] ${subject}`,
    html,
    attachments: formatAttachments(attachments)
  };

  if (env.SMTP.FROM_ADDRESS && env.SMTP.FROM_ADDRESS !== senderEmail) {
    mailOptions.replyTo = env.SMTP.FROM_ADDRESS;
  }

  if (cc && cc.length > 0) mailOptions.cc = cc;
  if (bcc && bcc.length > 0) mailOptions.bcc = bcc;

  const info = await transporter.sendMail(mailOptions);
  return { messageId: info.messageId };
};

export const processCampaignQueue = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) return;

  const transporter = createTransporter();
  if (!transporter) {
    campaign.status = 'FAILED';
    campaign.failureLogs.push({
      email: 'SYSTEM',
      reason: 'SMTP transporter not configured in backend/.env'
    });
    await campaign.save();
    return;
  }

  // Ensure logs arrays exist
  if (!Array.isArray(campaign.recipientLogs)) campaign.recipientLogs = [];
  if (!Array.isArray(campaign.failureLogs)) campaign.failureLogs = [];

  // Build recipient list
  const seenEmails = new Set();
  const allRecipients = [];

  // 1. Group / Tag recipients
  if (campaign.targetTags && campaign.targetTags.length > 0) {
    const query = { isSubscribed: { $ne: false } };
    if (!campaign.targetTags.includes('ALL')) {
      const regexList = campaign.targetTags.map((t) => new RegExp(`^${t.trim()}$`, 'i'));
      query.tags = { $in: regexList };
    }
    const dbContacts = await Contact.find(query);
    for (const c of dbContacts) {
      const cleanEmail = c.email.toLowerCase().trim();
      if (!seenEmails.has(cleanEmail)) {
        seenEmails.add(cleanEmail);
        allRecipients.push({
          email: cleanEmail,
          name: c.name || '',
          company: c.company || ''
        });
      }
    }
  }

  // 2. Direct manual recipients
  if (campaign.directRecipients && campaign.directRecipients.length > 0) {
    for (const item of campaign.directRecipients) {
      const email = typeof item === 'string' ? item : item.email;
      const cleanEmail = (email || '').toLowerCase().trim();
      if (cleanEmail && !seenEmails.has(cleanEmail)) {
        seenEmails.add(cleanEmail);
        allRecipients.push({
          email: cleanEmail,
          name: typeof item === 'object' ? item.name || '' : '',
          company: typeof item === 'object' ? item.company || '' : ''
        });
      }
    }
  }

  campaign.totalRecipients = allRecipients.length;
  campaign.status = 'PROCESSING';
  await campaign.save();

  if (allRecipients.length === 0) {
    campaign.status = 'COMPLETED';
    await campaign.save();
    return;
  }

  const formattedAttachments = formatAttachments(campaign.attachments);

  // Process in batches of 20 with 1.2s delay to adhere to SMTP limits & avoid spam triggers
  const BATCH_SIZE = 20;
  const DELAY_BETWEEN_BATCHES_MS = 1200;

  for (let i = 0; i < allRecipients.length; i += BATCH_SIZE) {
    const batch = allRecipients.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (recipient) => {
        try {
          const personalizedHtml = renderTemplate(campaign.contentHtml, recipient);

          const senderEmail = env.SMTP.USER || env.SMTP.FROM_ADDRESS;
          const displayName = env.SMTP.FROM_NAME || 'Ashirwad Plastics Admin';

          const mailOptions = {
            from: `"${displayName}" <${senderEmail}>`,
            to: recipient.email,
            subject: campaign.subject,
            html: personalizedHtml,
            attachments: formattedAttachments
          };

          if (env.SMTP.FROM_ADDRESS && env.SMTP.FROM_ADDRESS !== senderEmail) {
            mailOptions.replyTo = env.SMTP.FROM_ADDRESS;
          }

          if (campaign.cc && campaign.cc.length > 0) mailOptions.cc = campaign.cc;
          if (campaign.bcc && campaign.bcc.length > 0) mailOptions.bcc = campaign.bcc;

          await transporter.sendMail(mailOptions);
          campaign.sentCount += 1;
          campaign.recipientLogs.push({
            email: recipient.email,
            name: recipient.name || '',
            company: recipient.company || '',
            status: 'DELIVERED',
            timestamp: new Date()
          });
        } catch (err) {
          campaign.failedCount += 1;
          campaign.failureLogs.push({
            email: recipient.email,
            reason: err.message
          });
          campaign.recipientLogs.push({
            email: recipient.email,
            name: recipient.name || '',
            company: recipient.company || '',
            status: 'FAILED',
            error: err.message,
            timestamp: new Date()
          });
        }
      })
    );

    // Save batch progress
    campaign.markModified('recipientLogs');
    campaign.markModified('failureLogs');
    await campaign.save();

    if (i + BATCH_SIZE < allRecipients.length) {
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  campaign.status = campaign.failedCount === allRecipients.length ? 'FAILED' : 'COMPLETED';
  campaign.markModified('recipientLogs');
  campaign.markModified('failureLogs');
  await campaign.save();
};
