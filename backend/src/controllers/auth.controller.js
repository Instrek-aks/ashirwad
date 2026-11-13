import mongoose from 'mongoose';
import { loginAdmin } from '../services/auth.service.js';
import { verifyTransporter, createTransporter } from '../config/mailer.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { Contact } from '../models/Contact.js';
import { Blog } from '../models/Blog.js';
import { Campaign } from '../models/Campaign.js';
import { Inquiry } from '../models/Inquiry.js';
import { sendTestEmail } from '../services/email.service.js';

const maskEmail = (email) => {
  if (!email || !email.includes('@')) return email || '';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0] || '*'}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
};

export const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const authData = await loginAdmin(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: authData
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

export const handleUpdateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin user not found.' });
    }

    if (name !== undefined && name.trim()) user.name = name.trim();
    if (email !== undefined && email.trim()) user.email = email.toLowerCase().trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
};

export const handleChangePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.'
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin user not found.' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const handleSystemStatus = async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED';
  const transporter = createTransporter();
  const smtpStatus = await verifyTransporter(transporter);

  res.status(200).json({
    success: true,
    status: {
      database: dbStatus,
      nodeEnv: env.NODE_ENV,
      uptimeSeconds: Math.floor(process.uptime()),
      smtp: {
        ...smtpStatus,
        host: env.SMTP.HOST,
        port: env.SMTP.PORT,
        secure: env.SMTP.SECURE,
        userMasked: maskEmail(env.SMTP.USER),
        fromName: env.SMTP.FROM_NAME,
        fromAddress: env.SMTP.FROM_ADDRESS || env.SMTP.USER
      }
    }
  });
};

export const handleDiagnosticTestEmail = async (req, res, next) => {
  try {
    const to = (req.body?.to || req.user?.email || '').trim();
    if (!to) {
      return res.status(400).json({ success: false, message: 'Recipient email is required.' });
    }

    await sendTestEmail({
      to,
      subject: 'Ashirwad Admin System Diagnostic',
      contentHtml: `
        <h2 style="margin-top:0;color:#0f172a;">SMTP Diagnostic Passed</h2>
        <p>This diagnostic email confirms that your Ashirwad Plastics Admin Panel SMTP configuration is active and delivering messages properly.</p>
        <p style="font-size:13px;color:#64748b;">Sent at: ${new Date().toLocaleString()}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: `Diagnostic email sent to ${to}.`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send diagnostic email.'
    });
  }
};

export const handleDashboardStats = async (req, res, next) => {
  try {
    const [
      totalContacts,
      subscribedContacts,
      totalBlogs,
      publishedBlogs,
      blogViewsAgg,
      totalInquiries,
      newInquiries,
      productInquiries,
      careerApplications,
      eventSignups,
      totalCampaigns,
      campaignAgg,
      recentInquiries,
      recentCampaigns,
      recentBlogs
    ] = await Promise.all([
      Contact.countDocuments({}),
      Contact.countDocuments({ isSubscribed: true }),
      Blog.countDocuments({}),
      Blog.countDocuments({ isPublished: true }),
      Blog.aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }]),
      Inquiry.countDocuments({}),
      Inquiry.countDocuments({ status: 'NEW' }),
      Inquiry.countDocuments({ type: 'PRODUCT_INQUIRY' }),
      Inquiry.countDocuments({ type: 'CAREER_APPLICATION' }),
      Inquiry.countDocuments({ type: 'EVENT_UPDATE' }),
      Campaign.countDocuments({ status: { $ne: 'DRAFT' } }),
      Campaign.aggregate([
        { $match: { status: { $ne: 'DRAFT' } } },
        {
          $group: {
            _id: null,
            totalSent: { $sum: '$sentCount' },
            totalFailed: { $sum: '$failedCount' }
          }
        }
      ]),
      Inquiry.find({}).sort({ createdAt: -1 }).limit(5).lean(),
      Campaign.find({}).sort({ createdAt: -1 }).limit(5).select('title subject status sentCount failedCount totalRecipients createdAt').lean(),
      Blog.find({}).sort({ createdAt: -1 }).limit(4).select('title slug category isPublished views createdAt').lean()
    ]);

    const totalViews = blogViewsAgg[0]?.totalViews || 0;
    const totalSent = campaignAgg[0]?.totalSent || 0;
    const totalFailed = campaignAgg[0]?.totalFailed || 0;

    res.status(200).json({
      success: true,
      data: {
        contacts: {
          total: totalContacts,
          subscribed: subscribedContacts,
          unsubscribed: Math.max(0, totalContacts - subscribedContacts)
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          drafts: Math.max(0, totalBlogs - publishedBlogs),
          totalViews
        },
        inquiries: {
          total: totalInquiries,
          newCount: newInquiries,
          byType: {
            PRODUCT_INQUIRY: productInquiries,
            CAREER_APPLICATION: careerApplications,
            EVENT_UPDATE: eventSignups
          }
        },
        campaigns: {
          total: totalCampaigns,
          totalSent,
          totalFailed
        },
        recentInquiries,
        recentCampaigns,
        recentBlogs
      }
    });
  } catch (error) {
    next(error);
  }
};
