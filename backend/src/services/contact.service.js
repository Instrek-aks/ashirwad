import * as XLSX from 'xlsx';
import { Contact } from '../models/Contact.js';

// Standard email regex validator
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const previewSheetBuffer = (buffer) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  if (!rawRows || rawRows.length === 0) {
    throw new Error('The uploaded spreadsheet contains no readable rows or headers.');
  }

  // Collect all unique column names
  const columns = Array.from(
    new Set(rawRows.flatMap((r) => Object.keys(r)))
  ).filter((col) => col && typeof col === 'string' && !col.startsWith('__EMPTY'));

  // Intelligent column detection
  let autoEmail = '';
  let autoName = '';
  let autoCompany = '';
  let autoPhone = '';

  for (const col of columns) {
    const lower = col.toLowerCase().trim();
    if (!autoEmail && (lower.includes('email') || lower.includes('mail') || lower === 'e-mail')) {
      autoEmail = col;
    }
    if (!autoName && (lower.includes('name') || lower.includes('contact') || lower.includes('person') || lower.includes('client'))) {
      autoName = col;
    }
    if (!autoCompany && (lower.includes('company') || lower.includes('org') || lower.includes('firm') || lower.includes('business'))) {
      autoCompany = col;
    }
    if (!autoPhone && (lower.includes('phone') || lower.includes('mobile') || lower.includes('cell') || lower.includes('contact no') || lower.includes('tel'))) {
      autoPhone = col;
    }
  }

  // If email column header not obvious, scan first 30 rows cell values
  if (!autoEmail) {
    for (const col of columns) {
      const matchCount = rawRows.slice(0, 30).filter((r) => {
        const val = String(r[col] || '').trim().toLowerCase();
        return EMAIL_REGEX.test(val);
      }).length;
      if (matchCount > 0) {
        autoEmail = col;
        break;
      }
    }
  }

  // Count estimated valid emails based on autoEmail
  let detectedEmailCount = 0;
  if (autoEmail) {
    detectedEmailCount = rawRows.filter((r) => {
      const val = String(r[autoEmail] || '').trim().toLowerCase();
      return EMAIL_REGEX.test(val);
    }).length;
  }

  return {
    sheetNames: workbook.SheetNames,
    activeSheet: firstSheetName,
    totalRows: rawRows.length,
    columns,
    sampleRows: rawRows.slice(0, 8),
    autoDetected: {
      emailCol: autoEmail || columns[0] || '',
      nameCol: autoName || '',
      companyCol: autoCompany || '',
      phoneCol: autoPhone || ''
    },
    detectedEmailCount
  };
};

export const parseSheetBuffer = (buffer, mapping = {}) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  if (!rawRows || rawRows.length === 0) {
    throw new Error('The spreadsheet contains no data or rows.');
  }

  const parsedContacts = [];
  const seenEmails = new Set();
  let invalidRows = 0;

  const emailCol = mapping.emailCol;
  const nameCol = mapping.nameCol;
  const companyCol = mapping.companyCol;
  const phoneCol = mapping.phoneCol;
  const targetTag = mapping.tag || 'Imported';

  for (const row of rawRows) {
    let email = '';
    let name = '';
    let company = '';
    let phone = '';

    if (emailCol && row[emailCol] !== undefined) {
      email = String(row[emailCol] || '').trim();
      name = nameCol && row[nameCol] !== undefined ? String(row[nameCol] || '').trim() : '';
      company = companyCol && row[companyCol] !== undefined ? String(row[companyCol] || '').trim() : '';
      phone = phoneCol && row[phoneCol] !== undefined ? String(row[phoneCol] || '').trim() : '';
    } else {
      // Dynamic fallback
      const normalizedRow = {};
      for (const [key, value] of Object.entries(row)) {
        normalizedRow[key.trim().toLowerCase()] = String(value).trim();
      }

      email =
        normalizedRow['email'] ||
        normalizedRow['e-mail'] ||
        normalizedRow['mail'] ||
        normalizedRow['email address'] ||
        '';

      name =
        normalizedRow['name'] ||
        normalizedRow['full name'] ||
        normalizedRow['contact person'] ||
        '';

      company =
        normalizedRow['company'] ||
        normalizedRow['organization'] ||
        normalizedRow['business name'] ||
        '';

      phone =
        normalizedRow['phone'] ||
        normalizedRow['mobile'] ||
        normalizedRow['contact number'] ||
        '';
    }

    const cleanEmail = email.toLowerCase().trim();

    if (cleanEmail && EMAIL_REGEX.test(cleanEmail)) {
      if (!seenEmails.has(cleanEmail)) {
        seenEmails.add(cleanEmail);
        parsedContacts.push({
          email: cleanEmail,
          name: name,
          company: company,
          phone: phone,
          tags: [targetTag]
        });
      }
    } else {
      invalidRows++;
    }
  }

  return {
    totalRows: rawRows.length,
    validContacts: parsedContacts,
    invalidRows
  };
};

export const importContactsBulk = async (contacts, defaultTag = 'Imported', source = 'EXCEL_IMPORT') => {
  if (!contacts || contacts.length === 0) {
    return { added: 0, updated: 0, total: 0 };
  }

  const operations = contacts.map((c) => ({
    updateOne: {
      filter: { email: c.email },
      update: {
        $set: {
          email: c.email,
          ...(c.name && { name: c.name }),
          ...(c.company && { company: c.company }),
          ...(c.phone && { phone: c.phone }),
          source
        },
        $addToSet: {
          tags: { $each: [...(c.tags || []), defaultTag] }
        }
      },
      upsert: true
    }
  }));

  const result = await Contact.bulkWrite(operations, { ordered: false });

  return {
    added: result.upsertedCount || 0,
    updated: result.modifiedCount || 0,
    total: contacts.length
  };
};

export const getContacts = async ({ page = 1, limit = 50, search = '', tag = '' }) => {
  const query = {};

  if (search) {
    query.$or = [
      { email: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
  }

  if (tag && tag !== 'ALL') {
    query.tags = tag;
  }

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 50;
  const skip = (pageNum - 1) * limitNum;

  const [contacts, totalCount, tagsList] = await Promise.all([
    Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Contact.countDocuments(query),
    Contact.distinct('tags')
  ]);

  return {
    contacts,
    pagination: {
      total: totalCount,
      page: pageNum,
      pages: Math.ceil(totalCount / limitNum),
      limit: limitNum
    },
    availableTags: tagsList.filter(Boolean)
  };
};

export const getGroupsWithCounts = async () => {
  const groups = await Contact.aggregate([
    { $unwind: { path: '$tags', preserveNullAndEmptyArrays: false } },
    { $match: { tags: { $type: 'string', $nin: ['', null] } } },
    { $group: { _id: { $trim: { input: '$tags' } }, count: { $sum: 1 } } },
    { $match: { _id: { $ne: '' } } },
    { $sort: { count: -1 } }
  ]);
  return groups.map((g) => ({ name: g._id, count: g.count }));
};

export const renameGroupByName = async (oldName, newName) => {
  const cleanOld = (oldName || '').trim();
  const cleanNew = (newName || '').trim();
  if (!cleanNew) throw new Error('New group name cannot be empty');

  await Contact.updateMany(
    { tags: cleanOld },
    {
      $addToSet: { tags: cleanNew },
      $pull: { tags: cleanOld }
    }
  );
  return { success: true };
};

export const deleteGroupByName = async (groupName) => {
  const clean = (groupName || '').trim();
  await Contact.updateMany(
    { tags: clean },
    { $pull: { tags: clean } }
  );
  return { success: true };
};

export const updateContactById = async (id, data) => {
  const cleanData = {};
  if (data.name !== undefined) cleanData.name = (data.name || '').trim();
  if (data.email !== undefined) cleanData.email = (data.email || '').toLowerCase().trim();
  if (data.company !== undefined) cleanData.company = (data.company || '').trim();
  if (data.phone !== undefined) cleanData.phone = (data.phone || '').trim();
  if (data.tags !== undefined) {
    cleanData.tags = Array.isArray(data.tags)
      ? data.tags.map((t) => String(t).trim()).filter(Boolean)
      : [String(data.tags).trim()].filter(Boolean);
  }
  if (data.source !== undefined) cleanData.source = (data.source || '').trim() || 'Website Inquiry';

  return await Contact.findByIdAndUpdate(id, cleanData, { new: true });
};

