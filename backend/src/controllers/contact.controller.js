import {
  parseSheetBuffer,
  previewSheetBuffer,
  importContactsBulk,
  getContacts,
  getGroupsWithCounts,
  renameGroupByName,
  deleteGroupByName,
  updateContactById
} from '../services/contact.service.js';
import { Contact } from '../models/Contact.js';
import * as XLSX from 'xlsx';

export const handlePreviewSheet = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No spreadsheet file uploaded. Please upload a .xlsx, .xls, or .csv file.'
      });
    }

    const preview = previewSheetBuffer(req.file.buffer);
    res.status(200).json({
      success: true,
      data: preview
    });
  } catch (error) {
    next(error);
  }
};

export const handleImportFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No spreadsheet file uploaded. Please upload a .xlsx, .xls, or .csv file.'
      });
    }

    const mapping = {
      emailCol: req.body.emailCol,
      nameCol: req.body.nameCol,
      companyCol: req.body.companyCol,
      phoneCol: req.body.phoneCol,
      tag: req.body.tag || 'Imported'
    };

    const parsed = parseSheetBuffer(req.file.buffer, mapping);

    if (parsed.validContacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid email addresses found in the uploaded file based on the selected column mapping.',
        invalidRows: parsed.invalidRows
      });
    }

    const targetTag = req.body.tag && req.body.tag.trim() ? req.body.tag.trim() : 'Imported';
    const targetSource = req.body.source && req.body.source.trim()
      ? req.body.source.trim()
      : 'Trade Show / Expo';

    const importResult = await importContactsBulk(
      parsed.validContacts,
      targetTag,
      targetSource
    );

    res.status(200).json({
      success: true,
      message: `Successfully processed file: ${importResult.added} new contacts added, ${importResult.updated} existing contacts updated.`,
      stats: {
        totalRows: parsed.totalRows,
        validProcessed: parsed.validContacts.length,
        invalidSkipped: parsed.invalidRows,
        duplicatesSkipped: parsed.duplicateRows,
        newAdded: importResult.added,
        updated: importResult.updated,
        assignedGroup: targetTag,
        assignedSource: targetSource
      }
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetGroups = async (req, res, next) => {
  try {
    const groups = await getGroupsWithCounts();
    res.status(200).json({
      success: true,
      groups
    });
  } catch (error) {
    next(error);
  }
};

export const handleRenameGroup = async (req, res, next) => {
  try {
    const { oldName } = req.params;
    const { newName } = req.body;
    if (!newName || !newName.trim()) {
      return res.status(400).json({ success: false, message: 'New group name is required' });
    }
    await renameGroupByName(decodeURIComponent(oldName), newName.trim());
    res.status(200).json({
      success: true,
      message: `Group renamed successfully to '${newName.trim()}'.`
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteGroup = async (req, res, next) => {
  try {
    const { name } = req.params;
    const groupName = decodeURIComponent(name);
    await deleteGroupByName(groupName);
    res.status(200).json({
      success: true,
      message: `Group '${groupName}' removed from all contacts.`
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetContacts = async (req, res, next) => {
  try {
    const { page, limit, search, tag, subscribed } = req.query;
    const result = await getContacts({ page, limit, search, tag, subscribed });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const handleCreateContact = async (req, res, next) => {
  try {
    const { email, name, company, phone, tags, source } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await Contact.findOne({ email: cleanEmail });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A contact with this email address already exists.'
      });
    }

    const newContact = await Contact.create({
      email: cleanEmail,
      name: (name || '').trim(),
      company: (company || '').trim(),
      phone: (phone || '').trim(),
      tags: tags && tags.length > 0 ? tags : ['General'],
      source: (source || '').trim() || 'Website Inquiry'
    });

    res.status(201).json({
      success: true,
      message: 'Contact added successfully',
      contact: newContact
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateContactById(id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      contact: updated
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const handleExportContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ isSubscribed: true }).lean();

    const data = contacts.map((c) => ({
      Email: c.email,
      Name: c.name || '',
      Company: c.company || '',
      Phone: c.phone || '',
      Tags: (c.tags || []).join(', '),
      Source: c.source,
      CreatedAt: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Ashirwad_Contacts_Export.xlsx"'
    );
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const handleClearAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.deleteMany({});
    res.status(200).json({
      success: true,
      message: `Successfully cleared ${result.deletedCount} contact records.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    next(error);
  }
};

export const handleBulkContactAction = async (req, res, next) => {
  try {
    const { ids, action, tag } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No contacts selected.' });
    }

    if (action === 'delete') {
      const result = await Contact.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({ success: true, message: `Deleted ${result.deletedCount} contact(s).` });
    }

    if (action === 'unsubscribe') {
      await Contact.updateMany({ _id: { $in: ids } }, { $set: { isSubscribed: false } });
      return res.status(200).json({ success: true, message: `Unsubscribed ${ids.length} contact(s).` });
    }

    if (action === 'subscribe') {
      await Contact.updateMany({ _id: { $in: ids } }, { $set: { isSubscribed: true } });
      return res.status(200).json({ success: true, message: `Re-subscribed ${ids.length} contact(s).` });
    }

    if (action === 'addTag') {
      const cleanTag = (tag || '').trim();
      if (!cleanTag) {
        return res.status(400).json({ success: false, message: 'Tag name is required.' });
      }
      await Contact.updateMany({ _id: { $in: ids } }, { $addToSet: { tags: cleanTag } });
      return res.status(200).json({ success: true, message: `Added tag "${cleanTag}" to ${ids.length} contact(s).` });
    }

    return res.status(400).json({ success: false, message: 'Invalid bulk action.' });
  } catch (error) {
    next(error);
  }
};

export const handleUnsubscribe = async (req, res) => {
  try {
    const email = (req.query.email || '').toLowerCase().trim();
    if (email) {
      await Contact.findOneAndUpdate({ email }, { $set: { isSubscribed: false } });
    }
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><title>Unsubscribed - Ashirwad Plastics</title></head>
        <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;max-width:440px;text-align:center;">
            <h2 style="margin:0 0 8px 0;color:#0f172a;font-size:20px;">Unsubscribed Successfully</h2>
            <p style="margin:0;color:#64748b;font-size:14px;line-height:1.5;">
              ${email ? `<strong>${email}</strong> has been removed from future Ashirwad Plastics email campaigns.` : 'You have been unsubscribed from future Ashirwad Plastics email campaigns.'}
            </p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Unable to process unsubscribe request.');
  }
};

