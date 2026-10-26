import multer from 'multer';

// Use memory storage for fast in-memory Excel/CSV streaming without writing temporary files to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'text/csv',
    'application/csv',
    'text/plain'
  ];

  const allowedExtensions = ['.xlsx', '.xls', '.csv'];
  const ext = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();

  if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.'), false);
  }
};

export const uploadSheet = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter
});
