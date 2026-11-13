import XLSX from 'xlsx';
import { Inquiry } from '../models/Inquiry.js';
import { Contact } from '../models/Contact.js';

// POST /api/v1/inquiries (Public)
export const handleSubmitInquiry = async (req, res, next) => {
  try {
    const {
      type = 'PRODUCT_INQUIRY',
      fullName = '',
      email,
      phone = '',
      company = '',
      productType = '',
      careerDept = '',
      yearsExperience = '',
      resumeUrl = '',
      description = '',
      source = 'Contact Page'
    } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.'
      });
    }

    const inquiry = await Inquiry.create({
      type,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      company: company.trim(),
      productType: productType.trim(),
      careerDept: careerDept.trim(),
      yearsExperience: yearsExperience.trim(),
      resumeUrl: resumeUrl.trim(),
      description: description.trim(),
      source: source.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Submission received successfully.',
      inquiry
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/inquiries (Admin)
export const handleGetInquiries = async (req, res, next) => {
  try {
    const { type = 'ALL', status = 'ALL', search = '', page = 1, limit = 25 } = req.query;
    const query = {};

    if (type && type !== 'ALL') query.type = type;
    if (status && status !== 'ALL') query.status = status;

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { fullName: regex },
        { email: regex },
        { company: regex },
        { phone: regex },
        { productType: regex },
        { careerDept: regex },
        { description: regex }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 25));

    const [inquiries, total, newCount, inReviewCount, repliedCount, totalAll] = await Promise.all([
      Inquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Inquiry.countDocuments(query),
      Inquiry.countDocuments({ status: 'NEW' }),
      Inquiry.countDocuments({ status: 'IN_REVIEW' }),
      Inquiry.countDocuments({ status: 'REPLIED' }),
      Inquiry.countDocuments({})
    ]);

    res.status(200).json({
      success: true,
      data: {
        inquiries,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        counts: {
          total: totalAll,
          NEW: newCount,
          IN_REVIEW: inReviewCount,
          REPLIED: repliedCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/inquiries/:id (Admin)
export const handleUpdateInquiry = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;

    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.status(200).json({
      success: true,
      inquiry
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/inquiries/:id (Admin)
export const handleDeleteInquiry = async (req, res, next) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/inquiries/:id/add-to-contacts (Admin)
export const handleAddInquiryToContacts = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const defaultTag =
      inquiry.type === 'CAREER_APPLICATION'
        ? 'Career-Applicants'
        : inquiry.type === 'EVENT_UPDATE'
          ? 'Event-Leads'
          : 'Website-Inquiries';

    const existing = await Contact.findOne({ email: inquiry.email });
    let contact;

    if (existing) {
      const mergedTags = Array.from(new Set([...(existing.tags || []), defaultTag]));
      existing.tags = mergedTags;
      if (!existing.name && inquiry.fullName) existing.name = inquiry.fullName;
      if (!existing.company && inquiry.company) existing.company = inquiry.company;
      if (!existing.phone && inquiry.phone) existing.phone = inquiry.phone;
      contact = await existing.save();
    } else {
      contact = await Contact.create({
        email: inquiry.email,
        name: inquiry.fullName || '',
        company: inquiry.company || '',
        phone: inquiry.phone || '',
        tags: [defaultTag],
        source: inquiry.source || 'Website Inquiry'
      });
    }

    inquiry.addedToContacts = true;
    await inquiry.save();

    res.status(200).json({
      success: true,
      message: existing ? 'Contact updated with inquiry tag.' : 'Added to Contacts successfully.',
      contact,
      inquiry
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/inquiries/export (Admin)
export const handleExportInquiries = async (req, res, next) => {
  try {
    const { type = 'ALL', status = 'ALL' } = req.query;
    const query = {};
    if (type && type !== 'ALL') query.type = type;
    if (status && status !== 'ALL') query.status = status;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).lean();

    const rows = inquiries.map((item) => ({
      Type: item.type,
      Status: item.status,
      Name: item.fullName || '',
      Email: item.email,
      Phone: item.phone || '',
      Company: item.company || '',
      'Product / Dept': item.productType || item.careerDept || '',
      Experience: item.yearsExperience || '',
      'Resume URL': item.resumeUrl || '',
      Message: item.description || '',
      Source: item.source || '',
      Notes: item.notes || '',
      'Submitted At': item.createdAt ? new Date(item.createdAt).toLocaleString() : ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inquiries');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Ashirwad_Inquiries_Export.xlsx"');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

