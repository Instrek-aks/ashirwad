import { useState, useEffect, useRef } from 'react';

// Dynamic API Base URL from Vite Environment or fallback to local backend
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl || !envUrl.trim()) return 'http://localhost:5000/api/v1';
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api/v1') ? clean : `${clean}/api/v1`;
};

const API_BASE_URL = getApiBaseUrl();

// ==================== VECTOR SVG ICONS ====================
const IconUsers = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconMail = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconHistory = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const IconSettings = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconUploadCloud = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const IconFileSpreadsheet = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h2" />
    <path d="M8 17h2" />
    <path d="M14 13h2" />
    <path d="M14 17h2" />
  </svg>
);

const IconDownload = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const IconPlus = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
);

const IconTrash = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const IconSearch = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);

const IconSend = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="11" y1="2" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconPaperclip = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const IconCheck = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconAlertCircle = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const IconLogOut = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const IconRefresh = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M21 21v-5h-5" />
  </svg>
);

const IconShield = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLock = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconClose = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const IconFolder = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const IconEye = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const IconLayers = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconTable = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

const IconEdit = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);


// Formatting Icons for Rich Text WYSIWYG
const IconBold = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12h9a4 4 0 0 0 0-8H6v8Zm0 0h10a4 4 0 0 1 0 8H6v-8Z" />
  </svg>
);

const IconItalic = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" x2="10" y1="4" y2="4" />
    <line x1="14" x2="5" y1="20" y2="20" />
    <line x1="15" x2="9" y1="4" y2="20" />
  </svg>
);

const IconUnderline = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
    <line x1="4" x2="20" y1="21" y2="21" />
  </svg>
);

const IconList = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);

const IconListOrdered = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" x2="21" y1="6" y2="6" />
    <line x1="10" x2="21" y1="12" y2="12" />
    <line x1="10" x2="21" y1="18" y2="18" />
    <path d="M4 6h1v4" />
    <path d="M4 10h2" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);

const IconLink = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconCode = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconAlignLeft = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" x2="3" y1="6" y2="6" />
    <line x1="15" x2="3" y1="12" y2="12" />
    <line x1="17" x2="3" y1="18" y2="18" />
  </svg>
);

const IconAlignCenter = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="6" />
    <line x1="21" x2="3" y1="12" y2="12" />
    <line x1="18" x2="6" y1="18" y2="18" />
  </svg>
);

// Pre-made corporate email templates
const EMAIL_TEMPLATES = [
  {
    name: 'Pharmaceutical Introduction',
    subject: 'Precision Dispensing & Closure Systems - Ashirwad Plastics',
    html: `<p>Dear {{name}},</p>
<p>Greetings from <strong>Ashirwad Plastics</strong>.</p>
<p>We are a specialized ISO-certified plastics manufacturer dedicated to precision dispensing solutions for the pharmaceutical and healthcare industries. Our primary cleanroom-manufactured products include:</p>
<ul>
  <li>Precision Nasal Spray Pumps (0.05ml - 0.14ml dosage accuracy)</li>
  <li>Ophthalmic Dropper Bottles with tamper-evident rings</li>
  <li>Glass Droppers & Injection Flip-off Seals</li>
</ul>
<p>We would welcome the opportunity to submit our official technical dossier and send custom product samples for {{company}}.</p>
<p>Best regards,<br><strong>Business Development Team</strong><br>Ashirwad Plastics</p>`
  },
  {
    name: 'Catalog & Free Sample Dispatch',
    subject: 'Ashirwad Plastics - Product Catalog & Complimentary Samples Offer',
    html: `<p>Dear {{name}},</p>
<p>Following up on our recent communications, we would be delighted to dispatch our latest official product catalog and complimentary production samples directly to {{company}}.</p>
<p>Please reply with your preferred shipping address and specifications (neck size, dosage volume, bottle capacity) so our engineering division can prepare your test package.</p>
<p>Warm regards,<br><strong>Sample Fulfillment Team</strong><br>Ashirwad Plastics</p>`
  },
  {
    name: 'Quotation & Pricing Proposal',
    subject: 'Quotation for Specialized Components - Ashirwad Plastics',
    html: `<p>Dear {{name}},</p>
<p>Thank you for your interest in Ashirwad Plastics.</p>
<p>Please find attached our competitive pricing structure. All our components undergo 100% optical inspection and microbial compliance testing.</p>
<p>Feel free to reach out directly if you have any questions or require custom mold development.</p>
<p>Sincerely,<br><strong>Commercial Sales Department</strong><br>Ashirwad Plastics</p>`
  },
  {
    name: 'Clean Blank Letter',
    subject: '',
    html: `<p>Dear {{name}},</p><p><br></p><p>Best regards,<br>Ashirwad Plastics Team</p>`
  }
];

export default function AdminPage({ onNavigate }) {
  // Authentication State
  const [token, setToken] = useState(() => localStorage.getItem('ashirwad_admin_token') || '');
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Logout Modal State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('contacts');

  // System Status
  const [systemStatus, setSystemStatus] = useState({ database: 'UNKNOWN', smtp: { configured: false } });

  // Contacts State
  const [contacts, setContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [availableGroups, setAvailableGroups] = useState(['Pharma-Leads', 'Export-VIP', 'General', 'Cosmetic-Pack', 'Wholesale-Buyers']);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Lead Source Options preset
  const LEAD_SOURCES = [
    'Trade Show / Expo',
    'Website Inquiry',
    'LinkedIn / Social Media',
    'Cold Outreach',
    'WhatsApp / Direct Call',
    'Client Referral',
    'Distributor Network',
    'Other'
  ];

  // Group Management State
  const [groupsWithCounts, setGroupsWithCounts] = useState([]);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [newGroupNameInput, setNewGroupNameInput] = useState('');
  const [editingGroup, setEditingGroup] = useState(null); // { oldName: '', newName: '' }
  const [renamingGroupLoading, setRenamingGroupLoading] = useState(false);

  // Advanced CRM Spreadsheet Import & Column Mapping State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadGroup, setUploadGroup] = useState('Pharma-Leads');
  const [uploadSource, setUploadSource] = useState('Trade Show / Expo');
  const [uploadCustomSource, setUploadCustomSource] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState(null);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);
  const [sheetPreviewData, setSheetPreviewData] = useState(null);
  const [sheetStagedFile, setSheetStagedFile] = useState(null);
  const [mappingState, setMappingState] = useState({
    emailCol: '',
    nameCol: '',
    companyCol: '',
    phoneCol: '',
    tag: 'Pharma-Leads',
    source: 'Trade Show / Expo',
    customSource: ''
  });
  const [customTagInput, setCustomTagInput] = useState('');
  const [importInProgress, setImportInProgress] = useState(false);

  // Manual Contact Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    email: '',
    name: '',
    company: '',
    phone: '',
    group: 'Pharma-Leads',
    customGroup: '',
    source: 'Website Inquiry',
    customSource: ''
  });
  const [addContactLoading, setAddContactLoading] = useState(false);

  // Edit Contact Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [editContactLoading, setEditContactLoading] = useState(false);

  // ==================== CAMPAIGN COMPOSER STATE ====================
  const [showEmailPreview, setShowEmailPreview] = useState(false); // Controlled via Preview Email button
  const [recipientMode, setRecipientMode] = useState('group'); // 'group' | 'direct' | 'both'
  const [selectedCampaignGroup, setSelectedCampaignGroup] = useState('ALL');
  const [directRecipientsInput, setDirectRecipientsInput] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [ccInput, setCcInput] = useState('');
  const [bccInput, setBccInput] = useState('');

  const [campaignSubject, setCampaignSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignContent, setCampaignContent] = useState(EMAIL_TEMPLATES[0].html);

  // WYSIWYG Editor State
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const visualEditorRef = useRef(null);

  // Attached files for email
  const [emailAttachments, setEmailAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const [testEmailRecipient, setTestEmailRecipient] = useState('');
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [campaignLaunching, setCampaignLaunching] = useState(false);
  const [campaignFeedback, setCampaignFeedback] = useState(null);

  // Campaign History State
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [selectedCampaignDetails, setSelectedCampaignDetails] = useState(null);
  const [campaignModalTab, setCampaignModalTab] = useState('recipients');
  const [campaignRecipientSearch, setCampaignRecipientSearch] = useState('');

  // Maintenance & Purge State
  const [purgeLoading, setPurgeLoading] = useState(false);
  const [purgeFeedback, setPurgeFeedback] = useState(null);

  // Load session, status, and groups
  useEffect(() => {
    if (token) {
      fetchCurrentUser();
      fetchSystemStatus();
      fetchGroups();
    }
  }, [token]);

  // Load contacts
  useEffect(() => {
    if (token) {
      fetchContactsList();
    }
  }, [token, currentPage, searchQuery, selectedGroup, pageSize]);

  // Load history
  useEffect(() => {
    if (token && activeTab === 'history') {
      fetchCampaignHistory();
    }
  }, [token, activeTab]);

  // Sync WYSIWYG editor content when tab is switched to campaign or editor mounts
  useEffect(() => {
    if (activeTab === 'campaign' && !isHtmlMode && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== campaignContent) {
        visualEditorRef.current.innerHTML = campaignContent;
      }
    }
  }, [activeTab, isHtmlMode]);

  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const fetchSystemStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/status`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setSystemStatus(data.status);
      }
    } catch (err) {
      console.warn('Backend offline or unreachable', err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();

      if (data.success && data.data?.token) {
        localStorage.setItem('ashirwad_admin_token', data.data.token);
        setToken(data.data.token);
        setUser(data.data.user);
      } else {
        setLoginError(data.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch {
      setLoginError('Could not connect to backend server on port 5000.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ashirwad_admin_token');
    setToken('');
    setUser(null);
    setShowLogoutConfirm(false);
  };

  const fetchGroups = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/groups`, { headers: authHeaders });
      const data = await res.json();
      if (data.success && data.groups) {
        setGroupsWithCounts(data.groups);
        const names = data.groups.map((g) => g.name).filter(Boolean);
        setAvailableGroups((prev) => Array.from(new Set([...names, ...prev])).filter(Boolean));
      }
    } catch (err) {
      console.warn('Failed to fetch groups', err);
    }
  };

  const handleSaveRenameGroup = async () => {
    if (!editingGroup || !editingGroup.newName.trim()) return;
    if (editingGroup.oldName.trim() === editingGroup.newName.trim()) {
      setEditingGroup(null);
      return;
    }

    setRenamingGroupLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/groups/${encodeURIComponent(editingGroup.oldName)}`, {
        method: 'PUT',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: editingGroup.newName.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setEditingGroup(null);
        fetchGroups();
        fetchContactsList();
      } else {
        alert(data.message || 'Failed to rename group');
      }
    } catch (err) {
      alert('Error renaming group: ' + err.message);
    } finally {
      setRenamingGroupLoading(false);
    }
  };

  const handleDeleteGroup = async (groupName) => {
    if (!window.confirm(`Are you sure you want to remove the group tag "${groupName}" from all contacts?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/groups/${encodeURIComponent(groupName)}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      const data = await res.json();
      if (data.success) {
        fetchGroups();
        fetchContactsList();
      }
    } catch (err) {
      alert('Failed to delete group: ' + err.message);
    }
  };

  const handleCreateNewGroup = (name) => {
    if (!name || !name.trim()) return;
    const clean = name.trim();
    if (!availableGroups.includes(clean)) {
      setAvailableGroups((prev) => [...prev, clean]);
      setGroupsWithCounts((prev) => [{ name: clean, count: 0 }, ...prev]);
    }
    setNewGroupNameInput('');
  };

  const fetchContactsList = async () => {
    setContactsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
        tag: selectedGroup
      });
      const res = await fetch(`${API_BASE_URL}/contacts?${queryParams}`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data.contacts || []);
        setTotalContacts(data.data.pagination?.total || 0);
        if (data.data.availableTags?.length) {
          setAvailableGroups((prev) => Array.from(new Set([...data.data.availableTags, ...prev])).filter(Boolean));
        }
        fetchGroups();
      }
    } catch (err) {
      console.error('Failed to fetch contacts', err);
    } finally {
      setContactsLoading(false);
    }
  };

  // Called when user selects or drops a spreadsheet file -> triggers CRM Sheet Preview Modal
  const handleSheetFilePicked = async (file) => {
    if (!file) return;
    setUploadLoading(true);
    setUploadFeedback(null);
    setSheetStagedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/contacts/preview-sheet`, {
        method: 'POST',
        headers: authHeaders,
        body: formData
      });
      const data = await res.json();

      if (data.success && data.data) {
        setSheetPreviewData(data.data);
        setMappingState({
          emailCol: data.data.autoDetected?.emailCol || (data.data.columns?.[0] || ''),
          nameCol: data.data.autoDetected?.nameCol || '',
          companyCol: data.data.autoDetected?.companyCol || '',
          phoneCol: data.data.autoDetected?.phoneCol || '',
          tag: uploadGroup || (availableGroups[0] || 'Pharma-Leads'),
          source: uploadSource || 'Trade Show / Expo',
          customSource: uploadCustomSource || ''
        });
        setSheetModalOpen(true);
      } else {
        setUploadFeedback({ type: 'error', message: data.message || 'Could not parse spreadsheet.' });
      }
    } catch (err) {
      setUploadFeedback({ type: 'error', message: 'Error reading spreadsheet: ' + err.message });
    } finally {
      setUploadLoading(false);
    }
  };

  // Dispatches mapped spreadsheet to import endpoint
  const handleExecuteConfirmedImport = async () => {
    if (!sheetStagedFile) return;
    if (!mappingState.emailCol) {
      alert('Please specify which column contains the Email Address before importing.');
      return;
    }

    setImportInProgress(true);
    const formData = new FormData();
    formData.append('file', sheetStagedFile);
    formData.append('emailCol', mappingState.emailCol);
    if (mappingState.nameCol) formData.append('nameCol', mappingState.nameCol);
    if (mappingState.companyCol) formData.append('companyCol', mappingState.companyCol);
    if (mappingState.phoneCol) formData.append('phoneCol', mappingState.phoneCol);

    const finalTag = mappingState.tag === '__NEW__'
      ? (customTagInput.trim() || 'Imported')
      : (mappingState.tag || 'Imported');
    formData.append('tag', finalTag);

    const finalSource = mappingState.source === 'Other'
      ? (mappingState.customSource?.trim() || 'Other')
      : (mappingState.source || 'Trade Show / Expo');
    formData.append('source', finalSource);

    try {
      const res = await fetch(`${API_BASE_URL}/contacts/import`, {
        method: 'POST',
        headers: authHeaders,
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        setUploadFeedback({
          type: 'success',
          message: data.message,
          stats: data.stats
        });
        setSheetModalOpen(false);
        setSheetStagedFile(null);
        setSheetPreviewData(null);
        setUploadFile(null);
        fetchContactsList();
        fetchGroups();
      } else {
        alert(data.message || 'Import failed. Please check column mappings.');
      }
    } catch (err) {
      alert('Import error: ' + err.message);
    } finally {
      setImportInProgress(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;
    handleSheetFilePicked(uploadFile);
  };

  const handleManualAddContact = async (e) => {
    e.preventDefault();
    setAddContactLoading(true);

    const finalSource = newContact.source === 'Other'
      ? (newContact.customSource?.trim() || 'Other')
      : (newContact.source || 'Website Inquiry');

    const finalGroup = newContact.group === '__NEW__'
      ? (newContact.customGroup?.trim() || 'General')
      : (newContact.group || 'General');

    try {
      const res = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newContact.email,
          name: newContact.name,
          company: newContact.company,
          phone: newContact.phone,
          tags: [finalGroup],
          source: finalSource
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowAddModal(false);
        setNewContact({
          email: '',
          name: '',
          company: '',
          phone: '',
          group: finalGroup,
          customGroup: '',
          source: 'Website Inquiry',
          customSource: ''
        });
        setAvailableGroups((prev) => Array.from(new Set([...prev, finalGroup])));
        fetchContactsList();
        fetchGroups();
      } else {
        alert(data.message || 'Failed to add contact');
      }
    } catch (err) {
      alert('Error connecting to backend: ' + err.message);
    } finally {
      setAddContactLoading(false);
    }
  };

  const handleOpenEditModal = (contact) => {
    const isCustom = !LEAD_SOURCES.includes(contact.source);
    const contactGroup = contact.tags?.[0] || 'General';
    setAvailableGroups((prev) => Array.from(new Set([...prev, contactGroup])));

    setEditingContact({
      _id: contact._id,
      email: contact.email || '',
      name: contact.name || '',
      company: contact.company || '',
      phone: contact.phone || '',
      group: contactGroup,
      customGroup: '',
      source: isCustom && contact.source ? 'Other' : (contact.source || 'Website Inquiry'),
      customSource: isCustom ? (contact.source || '') : ''
    });
    setShowEditModal(true);
  };

  const handleUpdateContactSubmit = async (e) => {
    e.preventDefault();
    if (!editingContact) return;
    setEditContactLoading(true);

    const finalSource = editingContact.source === 'Other'
      ? (editingContact.customSource?.trim() || 'Other')
      : (editingContact.source || 'Website Inquiry');

    const finalGroup = editingContact.group === '__NEW__'
      ? (editingContact.customGroup?.trim() || 'General')
      : (editingContact.group || 'General');

    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${editingContact._id}`, {
        method: 'PUT',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: editingContact.email,
          name: editingContact.name,
          company: editingContact.company,
          phone: editingContact.phone,
          tags: [finalGroup],
          source: finalSource
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowEditModal(false);
        setEditingContact(null);
        setAvailableGroups((prev) => Array.from(new Set([...prev, finalGroup])));
        fetchContactsList();
        fetchGroups();
      } else {
        alert(data.message || 'Failed to update contact');
      }
    } catch (err) {
      alert('Error updating contact: ' + err.message);
    } finally {
      setEditContactLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact from directory?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      const data = await res.json();
      if (data.success) {
        fetchContactsList();
      }
    } catch (err) {
      alert('Failed to delete contact: ' + err.message);
    }
  };

  const handleExportExcel = async () => {
    try {
      setExportLoading(true);
      const res = await fetch(`${API_BASE_URL}/contacts/export?token=${encodeURIComponent(token)}`, {
        headers: authHeaders
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Export failed with status ${res.status}`);
      }
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Ashirwad_Plastics_Contacts_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert('Export failed: ' + err.message);
    } finally {
      setExportLoading(false);
    }
  };

  // ==================== WYSIWYG FORMATTING COMMANDS ====================
  const executeCommand = (command, value = null) => {
    if (isHtmlMode) return;
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (visualEditorRef.current) {
      setCampaignContent(visualEditorRef.current.innerHTML);
    }
  };

  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      setCampaignContent(visualEditorRef.current.innerHTML);
    }
  };

  const insertMergeTag = (tag) => {
    if (isHtmlMode) {
      setCampaignContent((prev) => prev + tag);
      return;
    }
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      document.execCommand('insertText', false, tag);
      setCampaignContent(visualEditorRef.current.innerHTML);
    }
  };

  const handleApplyTemplate = (tpl) => {
    setCampaignSubject(tpl.subject);
    setCampaignContent(tpl.html);
    if (visualEditorRef.current && !isHtmlMode) {
      visualEditorRef.current.innerHTML = tpl.html;
    }
  };

  const handleAddLink = () => {
    if (isHtmlMode) return;
    const url = window.prompt('Enter link URL (e.g. https://ashirwadplastics.com):', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const toggleEditorMode = () => {
    if (!isHtmlMode) {
      // Switching to HTML mode: current innerHTML is in campaignContent
      setIsHtmlMode(true);
    } else {
      // Switching back to visual mode: update innerHTML
      setIsHtmlMode(false);
      setTimeout(() => {
        if (visualEditorRef.current) {
          visualEditorRef.current.innerHTML = campaignContent;
        }
      }, 0);
    }
  };

  // Handle file attachment selection
  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setEmailAttachments((prev) => [
          ...prev,
          {
            filename: file.name,
            contentType: file.type || 'application/octet-stream',
            size: file.size,
            dataUrl: reader.result
          }
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index) => {
    setEmailAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const parseEmailsList = (text) => {
    if (!text) return [];
    return text
      .split(/[\n,; ]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
  };

  const handleSendTestEmail = async () => {
    if (!testEmailRecipient) {
      alert('Please enter your test email address.');
      return;
    }
    setTestEmailSending(true);
    setCampaignFeedback(null);

    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/test`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmailRecipient,
          subject: campaignSubject || 'Test Email from Ashirwad Plastics',
          contentHtml: campaignContent,
          attachments: emailAttachments,
          cc: parseEmailsList(ccInput),
          bcc: parseEmailsList(bccInput)
        })
      });
      const data = await res.json();

      if (data.success) {
        setCampaignFeedback({ type: 'success', message: data.message });
      } else {
        setCampaignFeedback({ type: 'error', message: data.message });
      }
    } catch (err) {
      setCampaignFeedback({ type: 'error', message: 'Failed to send test email: ' + err.message });
    } finally {
      setTestEmailSending(false);
    }
  };

  const handleLaunchCampaign = async () => {
    if (!campaignSubject.trim() || !campaignContent.trim()) {
      alert('Both Subject Line and Email Content are required.');
      return;
    }

    const directList = parseEmailsList(directRecipientsInput);
    const targetTags = recipientMode === 'direct' ? [] : [selectedCampaignGroup];

    if (recipientMode === 'direct' && directList.length === 0) {
      alert('Please enter at least one valid recipient email address.');
      return;
    }

    const confirmMsg = `Confirm dispatching this email campaign with ${emailAttachments.length} attachment(s)?`;
    if (!window.confirm(confirmMsg)) return;

    setCampaignLaunching(true);
    setCampaignFeedback(null);

    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/send`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: campaignTitle || campaignSubject,
          subject: campaignSubject,
          contentHtml: campaignContent,
          targetTags: targetTags,
          directRecipients: directList,
          cc: parseEmailsList(ccInput),
          bcc: parseEmailsList(bccInput),
          attachments: emailAttachments
        })
      });
      const data = await res.json();

      if (data.success) {
        setCampaignFeedback({
          type: 'success',
          message: 'Campaign has been queued for background dispatch.'
        });
        setActiveTab('history');
      } else {
        setCampaignFeedback({ type: 'error', message: data.message });
      }
    } catch (err) {
      setCampaignFeedback({ type: 'error', message: 'Failed to launch campaign: ' + err.message });
    } finally {
      setCampaignLaunching(false);
    }
  };

  const fetchCampaignHistory = async () => {
    setCampaignsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error('Failed to load campaigns', err);
    } finally {
      setCampaignsLoading(false);
    }
  };

  const handleOpenCampaignInspector = async (camp) => {
    setSelectedCampaignDetails(camp);
    setCampaignModalTab(camp.failureLogs?.length > 0 ? 'errors' : 'recipients');
    setCampaignRecipientSearch('');

    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/${camp._id}`, { headers: authHeaders });
      const data = await res.json();
      if (data.success && data.campaign) {
        setSelectedCampaignDetails(data.campaign);
      }
    } catch (err) {
      console.warn('Could not refresh campaign inspector data:', err);
    }
  };

  const handlePurgeAllTestData = async (type = 'all') => {
    const label = type === 'contacts'
      ? 'ALL Contacts'
      : type === 'history'
      ? 'ALL Broadcast History'
      : 'ALL Test Contacts and Broadcast Campaigns';

    if (!window.confirm(`⚠️ WARNING: Are you sure you want to permanently clear ${label}?\n\nThis will remove test records from MongoDB. Admin login accounts will NOT be affected.`)) {
      return;
    }

    setPurgeLoading(true);
    setPurgeFeedback(null);
    try {
      const msgs = [];
      if (type === 'all' || type === 'contacts') {
        const resContacts = await fetch(`${API_BASE_URL}/contacts/purge/all`, {
          method: 'DELETE',
          headers: authHeaders
        });
        const dataContacts = await resContacts.json();
        msgs.push(dataContacts.message || 'Contacts cleared');
      }

      if (type === 'all' || type === 'history') {
        const resHistory = await fetch(`${API_BASE_URL}/campaigns/purge/all`, {
          method: 'DELETE',
          headers: authHeaders
        });
        const dataHistory = await resHistory.json();
        msgs.push(dataHistory.message || 'History cleared');
      }

      setPurgeFeedback({ type: 'success', message: msgs.join(' | ') });
      fetchContactsList();
      fetchCampaignHistory();
      fetchGroups();
    } catch (err) {
      setPurgeFeedback({ type: 'error', message: 'Cleanup operation failed: ' + err.message });
    } finally {
      setPurgeLoading(false);
    }
  };

  const getInitials = (name, email) => {
    if (name && name.trim()) {
      const parts = name.trim().split(' ');
      if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
      return name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return 'AP';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ==================== LOGIN VIEW ====================
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)', padding: '40px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <img
                src="/logo.webp"
                alt="Ashirwad Plastics Logo"
                style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
              Ashirwad Plastics
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Admin CRM & Campaign Dispatcher
            </p>
          </div>

          {loginError && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', color: '#991B1B', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '22px' }}>
              <IconAlertCircle size={16} color="#DC2626" />
              <span style={{ lineHeight: '1.4' }}>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>
                Administrator Email
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', display: 'flex' }}>
                  <IconMail size={16} color="#94A3B8" />
                </span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@ashirwad.com"
                  style={{ width: '100%', padding: '11px 14px 11px 38px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', display: 'flex' }}>
                  <IconLock size={16} color="#94A3B8" />
                </span>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ width: '100%', padding: '11px 14px 11px 38px', borderRadius: '10px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', cursor: loginLoading ? 'wait' : 'pointer', marginTop: '6px' }}
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Workspace'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '13px', cursor: 'pointer' }}
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== DASHBOARD VIEW ====================
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* 1. Header (Fixed at Top) */}
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/logo.webp"
              alt="Ashirwad Plastics Logo"
              style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ width: '1px', height: '20px', backgroundColor: '#CBD5E1' }} />
            <span style={{ fontSize: '15.5px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.3px' }}>
              Campaigns & Leads CRM
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: '500' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: systemStatus.database === 'CONNECTED' ? '#10B981' : '#F59E0B' }} />
                <span style={{ color: '#475569' }}>Atlas DB:</span>
                <span style={{ color: systemStatus.database === 'CONNECTED' ? '#059669' : '#D97706', fontWeight: '600' }}>
                  {systemStatus.database === 'CONNECTED' ? 'Active' : 'Offline'}
                </span>
              </div>

              <div style={{ width: '1px', height: '14px', backgroundColor: '#CBD5E1' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: systemStatus.smtp?.configured ? '#10B981' : '#94A3B8' }} />
                <span style={{ color: '#475569' }}>SMTP:</span>
                <span style={{ color: systemStatus.smtp?.configured ? '#059669' : '#64748B', fontWeight: '600' }}>
                  {systemStatus.smtp?.configured ? 'Ready' : 'Not Set'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid #E2E8F0' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', color: '#2563EB', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getInitials(user?.name, user?.email)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', lineHeight: '1.2' }}>
                  {user?.name || 'Super Admin'}
                </span>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  {user?.email || 'admin@ashirwad.com'}
                </span>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                title="Sign out of portal"
                style={{ marginLeft: '6px', background: 'none', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
              >
                <IconLogOut size={16} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Body */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 28px', paddingTop: '88px' }}>
        
        {/* 2. Tab Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '24px' }}>
          <nav style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'contacts', label: 'Contact Directory & Importer', icon: IconUsers, count: totalContacts },
              { id: 'campaign', label: 'Email Campaign Studio', icon: IconMail },
              { id: 'history', label: 'Broadcast History & Deliverability', icon: IconHistory },
              { id: 'settings', label: 'System & SMTP Settings', icon: IconSettings }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isActive ? '#2563EB' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#64748B',
                    fontSize: '13px',
                    fontWeight: isActive ? '600' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#F1F5F9';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <TabIcon size={16} color={isActive ? '#FFFFFF' : '#64748B'} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '1px 6px', borderRadius: '10px', backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#E2E8F0', color: isActive ? '#FFFFFF' : '#475569' }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ==================== TAB 1: CONTACT DIRECTORY & GROUPS ==================== */}
        {activeTab === 'contacts' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>
            
            {/* Contacts Table Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>
                    Subscriber & Lead Directory
                  </h2>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                    Organize contacts into custom groups and categories for targeted broadcasts.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => {
                      fetchGroups();
                      setShowGroupsModal(true);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    <IconLayers size={14} color="#2563EB" />
                    <span>Manage Groups ({groupsWithCounts.length || availableGroups.length})</span>
                  </button>

                  <button
                    onClick={() => setShowAddModal(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    <IconPlus size={15} color="#FFFFFF" />
                    <span>Add Contact</span>
                  </button>

                  <button
                    onClick={handleExportExcel}
                    disabled={exportLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: exportLoading ? '#F1F5F9' : '#FFFFFF',
                      color: exportLoading ? '#94A3B8' : '#334155',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: exportLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <IconDownload size={14} color={exportLoading ? '#94A3B8' : '#64748B'} />
                    <span>{exportLoading ? 'Exporting...' : 'Export Excel'}</span>
                  </button>
                </div>
              </div>

              {/* Filter Toolbar */}
              <div style={{ padding: '14px 24px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: '#94A3B8' }}>
                    <IconSearch size={15} color="#94A3B8" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by contact name, email, or company..."
                    style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '13px', color: '#334155', outline: 'none', minWidth: '180px' }}
                  >
                    <option value="ALL">All Contact Groups ({totalContacts})</option>
                    {availableGroups.map((grp) => {
                      const matched = groupsWithCounts.find((g) => g.name === grp);
                      return (
                        <option key={grp} value={grp}>
                          Group: {grp} {matched ? `(${matched.count})` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      <th style={{ padding: '12px 24px' }}>Contact</th>
                      <th style={{ padding: '12px 16px' }}>Company</th>
                      <th style={{ padding: '12px 16px' }}>Assigned Group(s)</th>
                      <th style={{ padding: '12px 16px' }}>Source</th>
                      <th style={{ padding: '12px 24px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsLoading ? (
                      <tr>
                        <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#64748B' }}>
                          Loading contacts...
                        </td>
                      </tr>
                    ) : contacts.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ padding: '48px', textAlign: 'center' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F1F5F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', marginBottom: '12px' }}>
                            <IconUsers size={22} color="#94A3B8" />
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>No contacts in this group</div>
                          <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                            Upload an Excel or CSV file via the importer on the right to populate your directory.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      contacts.map((c) => (
                        <tr 
                          key={c._id} 
                          style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAFAFA'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <td style={{ padding: '14px 24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: '600', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {getInitials(c.name, c.email)}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '600', color: '#0F172A' }}>{c.name || 'Unnamed Contact'}</span>
                                <span style={{ color: '#64748B', fontSize: '12px' }}>{c.email}</span>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px', color: '#334155' }}>
                            {c.company || '—'}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {(c.tags || []).map((t, idx) => (
                                <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '500', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE' }}>
                                  <IconFolder size={11} color="#3B82F6" />
                                  <span>{t}</span>
                                </span>
                              ))}
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ display: 'inline-block', fontSize: '11.5px', color: '#475569', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', padding: '3px 8px', borderRadius: '6px', fontWeight: '500' }}>
                              {c.source || 'Website Inquiry'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <button
                                onClick={() => handleOpenEditModal(c)}
                                title="Edit contact details"
                                style={{ background: 'none', border: 'none', padding: '6px', borderRadius: '6px', color: '#64748B', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', transition: 'color 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
                              >
                                <IconEdit size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteContact(c._id)}
                                title="Delete contact"
                                style={{ background: 'none', border: 'none', padding: '6px', borderRadius: '6px', color: '#94A3B8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', transition: 'color 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                              >
                                <IconTrash size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div style={{ padding: '14px 24px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                  <span>Total records: <strong>{totalContacts}</strong></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#475569', fontWeight: '500' }}>Rows per page:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value={20}>20 rows</option>
                      <option value={50}>50 rows</option>
                      <option value={100}>100 rows</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>Page <strong>{currentPage}</strong> of <strong>{Math.max(1, Math.ceil(totalContacts / pageSize))}</strong></span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer', opacity: currentPage <= 1 ? 0.5 : 1 }}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage >= Math.ceil(totalContacts / pageSize) || contacts.length < pageSize}
                      style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', cursor: (currentPage >= Math.ceil(totalContacts / pageSize) || contacts.length < pageSize) ? 'not-allowed' : 'pointer', opacity: (currentPage >= Math.ceil(totalContacts / pageSize) || contacts.length < pageSize) ? 0.5 : 1 }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Importer Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconFileSpreadsheet size={18} color="#2563EB" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                  Import Spreadsheet
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: '0 0 18px 0' }}>
                Upload customer files in <code>.xlsx</code>, <code>.xls</code>, or <code>.csv</code>. An interactive column mapping modal will open to verify and map fields before saving.
              </p>

              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Default Group
                    </label>
                    <select
                      value={uploadGroup}
                      onChange={(e) => setUploadGroup(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      {availableGroups.map((grp) => (
                        <option key={grp} value={grp}>{grp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Lead Source
                    </label>
                    <select
                      value={uploadSource}
                      onChange={(e) => setUploadSource(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      {LEAD_SOURCES.map((src) => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {uploadSource === 'Other' && (
                  <div style={{ marginBottom: '12px' }}>
                    <input
                      type="text"
                      placeholder="Specify custom lead source..."
                      value={uploadCustomSource}
                      onChange={(e) => setUploadCustomSource(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '12.5px', outline: 'none', backgroundColor: '#FFFFFF' }}
                    />
                  </div>
                )}

                <div
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '12px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    backgroundColor: uploadLoading ? '#F1F5F9' : '#F8FAFC',
                    cursor: uploadLoading ? 'wait' : 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#2563EB'; }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#CBD5E1'; }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleSheetFilePicked(file);
                  }}
                  onClick={() => {
                    const el = document.getElementById('sheetFileInput');
                    if (el) el.click();
                  }}
                >
                  <input
                    id="sheetFileInput"
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleSheetFilePicked(file);
                      e.target.value = '';
                    }}
                  />

                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', marginBottom: '10px' }}>
                    <IconUploadCloud size={22} color="#2563EB" />
                  </div>

                  <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#0F172A' }}>
                    {uploadLoading ? 'Analyzing spreadsheet columns...' : 'Click to select or drop Excel / CSV here'}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '4px' }}>
                    Auto-detects emails, columns & provides live verification modal
                  </div>
                </div>
              </div>

              {uploadFeedback && (
                <div style={{ marginTop: '16px', padding: '12px 14px', borderRadius: '8px', fontSize: '12.5px', backgroundColor: uploadFeedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: uploadFeedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA', color: uploadFeedback.type === 'success' ? '#166534' : '#991B1B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', marginBottom: '4px' }}>
                    {uploadFeedback.type === 'success' ? <IconCheck size={14} color="#166534" /> : <IconAlertCircle size={14} color="#991B1B" />}
                    <span>{uploadFeedback.message}</span>
                  </div>
                  {uploadFeedback.stats && (
                    <div style={{ fontSize: '11.5px', opacity: 0.9, lineHeight: '1.5', marginTop: '4px' }}>
                      • Group Assigned: <strong>{uploadFeedback.stats.assignedGroup || uploadGroup}</strong><br />
                      • Lead Source: <strong>{uploadFeedback.stats.assignedSource || uploadSource}</strong><br />
                      • New Contacts Created: <strong>{uploadFeedback.stats.newAdded}</strong><br />
                      • Existing Updated: <strong>{uploadFeedback.stats.updated}</strong><br />
                      • Invalid/Skipped Rows: <strong>{uploadFeedback.stats.invalidSkipped}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================== TAB 2: ADVANCED EMAIL CAMPAIGN STUDIO ==================== */}
        {activeTab === 'campaign' && (
          <div style={{ display: 'grid', gridTemplateColumns: showEmailPreview ? '1fr 420px' : '1fr', gap: '28px', alignItems: 'start', transition: 'grid-template-columns 0.2s' }}>
            
            {/* Left: Professional Email Studio */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              
              {/* Studio Header & Quick Template Picker */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>
                    Email Campaign Studio
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                    Compose and dispatch personalized corporate broadcasts with attachments.
                  </p>
                </div>

                {/* Right controls: Templates Selector & Preview Toggle Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowEmailPreview(!showEmailPreview)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: showEmailPreview ? '#2563EB' : '#CBD5E1',
                      backgroundColor: showEmailPreview ? '#EFF6FF' : '#FFFFFF',
                      color: showEmailPreview ? '#2563EB' : '#334155',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {showEmailPreview ? <IconEyeOff size={15} color="#2563EB" /> : <IconEye size={15} color="#475569" />}
                    <span>{showEmailPreview ? 'Hide Preview' : 'Preview Email'}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Template:</span>
                    <select
                      onChange={(e) => {
                        const tpl = EMAIL_TEMPLATES.find((t) => t.name === e.target.value);
                        if (tpl) handleApplyTemplate(tpl);
                      }}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', color: '#334155', backgroundColor: '#FFFFFF', outline: 'none' }}
                    >
                      {EMAIL_TEMPLATES.map((t) => (
                        <option key={t.name} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {campaignFeedback && (
                <div style={{ margin: '16px 24px 0 24px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', backgroundColor: campaignFeedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: campaignFeedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA', color: campaignFeedback.type === 'success' ? '#166534' : '#991B1B' }}>
                  {campaignFeedback.type === 'success' ? <IconCheck size={16} color="#166534" /> : <IconAlertCircle size={16} color="#991B1B" />}
                  <span>{campaignFeedback.message}</span>
                </div>
              )}

              {/* Compose Body Form */}
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* 1. Recipient Selector Row */}
                <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setRecipientMode('group')}
                        style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid', borderColor: recipientMode === 'group' ? '#2563EB' : '#E2E8F0', backgroundColor: recipientMode === 'group' ? '#EFF6FF' : '#FFFFFF', color: recipientMode === 'group' ? '#2563EB' : '#64748B', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Target by Group
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipientMode('direct')}
                        style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid', borderColor: recipientMode === 'direct' ? '#2563EB' : '#E2E8F0', backgroundColor: recipientMode === 'direct' ? '#EFF6FF' : '#FFFFFF', color: recipientMode === 'direct' ? '#2563EB' : '#64748B', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Direct Email Input
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecipientMode('both')}
                        style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid', borderColor: recipientMode === 'both' ? '#2563EB' : '#E2E8F0', backgroundColor: recipientMode === 'both' ? '#EFF6FF' : '#FFFFFF', color: recipientMode === 'both' ? '#2563EB' : '#64748B', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Group + Manual List
                      </button>
                    </div>

                    {/* CC / BCC Toggle Buttons */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setShowCc(!showCc)}
                        style={{ padding: '3px 8px', borderRadius: '4px', border: 'none', background: showCc ? '#EFF6FF' : 'none', color: showCc ? '#2563EB' : '#64748B', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Cc
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBcc(!showBcc)}
                        style={{ padding: '3px 8px', borderRadius: '4px', border: 'none', background: showBcc ? '#EFF6FF' : 'none', color: showBcc ? '#2563EB' : '#64748B', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Bcc
                      </button>
                    </div>
                  </div>

                  {(recipientMode === 'group' || recipientMode === 'both') && (
                    <div style={{ marginBottom: recipientMode === 'both' ? '10px' : '0' }}>
                      <select
                        value={selectedCampaignGroup}
                        onChange={(e) => setSelectedCampaignGroup(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none' }}
                      >
                        <option value="ALL">All Active Directory Subscribers ({totalContacts} recipients)</option>
                        {availableGroups.map((grp) => (
                          <option key={grp} value={grp}>Group: "{grp}"</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {(recipientMode === 'direct' || recipientMode === 'both') && (
                    <div>
                      <textarea
                        rows="2"
                        value={directRecipientsInput}
                        onChange={(e) => setDirectRecipientsInput(e.target.value)}
                        placeholder="Enter email addresses (separated by commas, spaces, or newlines)..."
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  )}

                  {showCc && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        value={ccInput}
                        onChange={(e) => setCcInput(e.target.value)}
                        placeholder="Cc: manager@ashirwad.com, partner@company.com"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  )}

                  {showBcc && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        value={bccInput}
                        onChange={(e) => setBccInput(e.target.value)}
                        placeholder="Bcc: archive@ashirwad.com, audit@ashirwad.com"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  )}
                </div>

                {/* 2. Subject Line */}
                <div>
                  <input
                    type="text"
                    value={campaignSubject}
                    onChange={(e) => setCampaignSubject(e.target.value)}
                    placeholder="Email Subject Line..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: '600', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* 3. VISUAL WYSIWYG FORMATTING TOOLBAR & EDITOR */}
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                  
                  {/* Rich Text Toolbar */}
                  <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    
                    {/* Formatting Action Buttons (execCommand with preventDefault to keep text selection) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                      
                      {/* Paragraph / Headings Selector */}
                      <select
                        onChange={(e) => executeCommand('formatBlock', e.target.value)}
                        defaultValue="<p>"
                        style={{ padding: '4px 6px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '12px', color: '#334155', outline: 'none' }}
                      >
                        <option value="<p>">Normal Text</option>
                        <option value="<h2>">Large Heading</option>
                        <option value="<h3>">Medium Heading</option>
                        <option value="<h4>">Small Heading</option>
                      </select>

                      <div style={{ height: '18px', width: '1px', backgroundColor: '#CBD5E1', margin: '0 4px' }} />

                      {/* Bold */}
                      <button
                        type="button"
                        title="Bold (Ctrl+B)"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconBold size={13} />
                      </button>

                      {/* Italic */}
                      <button
                        type="button"
                        title="Italic (Ctrl+I)"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconItalic size={13} />
                      </button>

                      {/* Underline */}
                      <button
                        type="button"
                        title="Underline (Ctrl+U)"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconUnderline size={13} />
                      </button>

                      <div style={{ height: '18px', width: '1px', backgroundColor: '#CBD5E1', margin: '0 4px' }} />

                      {/* Lists */}
                      <button
                        type="button"
                        title="Bulleted List"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('insertUnorderedList'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconList size={13} />
                      </button>

                      <button
                        type="button"
                        title="Numbered List"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('insertOrderedList'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconListOrdered size={13} />
                      </button>

                      <div style={{ height: '18px', width: '1px', backgroundColor: '#CBD5E1', margin: '0 4px' }} />

                      {/* Alignment */}
                      <button
                        type="button"
                        title="Align Left"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyLeft'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconAlignLeft size={13} />
                      </button>

                      <button
                        type="button"
                        title="Align Center"
                        onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyCenter'); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconAlignCenter size={13} />
                      </button>

                      {/* Add Link */}
                      <button
                        type="button"
                        title="Insert Hyperlink"
                        onMouseDown={(e) => { e.preventDefault(); handleAddLink(); }}
                        style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <IconLink size={13} />
                      </button>
                    </div>

                    {/* Right side: Merge Tags & View Switcher */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '500' }}>Insert:</span>
                      <button
                        type="button"
                        title="Insert Customer Name Tag"
                        onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{name}}'); }}
                        style={{ padding: '3px 8px', borderRadius: '6px', border: '1px solid #DBEAFE', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        + Name
                      </button>
                      <button
                        type="button"
                        title="Insert Company Name Tag"
                        onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{company}}'); }}
                        style={{ padding: '3px 8px', borderRadius: '6px', border: '1px solid #DBEAFE', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        + Company
                      </button>

                      <div style={{ height: '18px', width: '1px', backgroundColor: '#CBD5E1', margin: '0 4px' }} />

                      {/* Toggle Code / Visual */}
                      <button
                        type="button"
                        onClick={toggleEditorMode}
                        title={isHtmlMode ? 'Switch to Visual Editor' : 'Switch to Raw HTML Code View'}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: isHtmlMode ? '#1E293B' : '#FFFFFF', color: isHtmlMode ? '#FFFFFF' : '#475569', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        <IconCode size={13} color={isHtmlMode ? '#93C5FD' : '#475569'} />
                        <span>{isHtmlMode ? 'Visual Mode' : 'HTML View'}</span>
                      </button>
                    </div>

                  </div>

                  {/* Visual ContentEditable Area (Normal people type here without HTML tags!) */}
                  {!isHtmlMode ? (
                    <div
                      ref={visualEditorRef}
                      contentEditable={true}
                      onInput={handleVisualInput}
                      style={{
                        minHeight: '260px',
                        maxHeight: '440px',
                        overflowY: 'auto',
                        padding: '18px 20px',
                        backgroundColor: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '14px',
                        lineHeight: '1.65',
                        outline: 'none',
                        cursor: 'text',
                        boxSizing: 'border-box'
                      }}
                    />
                  ) : (
                    /* Optional Raw HTML View for developers/power users */
                    <textarea
                      rows="12"
                      value={campaignContent}
                      onChange={(e) => setCampaignContent(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '260px',
                        padding: '16px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '12.5px',
                        color: '#0F172A',
                        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                        lineHeight: '1.5',
                        boxSizing: 'border-box',
                        backgroundColor: '#F8FAFC'
                      }}
                    />
                  )}

                  {/* Editor Info Bar */}
                  <div style={{ padding: '6px 14px', backgroundColor: '#F8FAFC', borderTop: '1px solid #F1F5F9', fontSize: '11px', color: '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      {isHtmlMode ? 'HTML Source Mode' : 'Normal Visual Mode — Highlight text to format'}
                    </span>
                    <span>
                      Variables like <code>{'{{name}}'}</code> are replaced automatically per recipient
                    </span>
                  </div>
                </div>

                {/* 4. Attached Files Section */}
                {emailAttachments.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                      Attached Files ({emailAttachments.length}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {emailAttachments.map((att, idx) => (
                        <div
                          key={idx}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '8px', backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', fontSize: '12px' }}
                        >
                          <IconPaperclip size={13} color="#2563EB" />
                          <span style={{ fontWeight: '600', color: '#0F172A' }}>{att.filename}</span>
                          <span style={{ color: '#64748B', fontSize: '11px' }}>({formatFileSize(att.size)})</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', padding: 0 }}
                          >
                            <IconClose size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleAttachmentUpload}
                />

                {/* 5. Bottom Action Bar */}
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      disabled={campaignLaunching}
                      onClick={handleLaunchCampaign}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                    >
                      <IconSend size={15} color="#FFFFFF" />
                      <span>{campaignLaunching ? 'Sending...' : 'Send Broadcast'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      title="Attach file (PDF, brochure, catalog, images)"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      <IconPaperclip size={15} color="#475569" />
                      <span>Attach File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(!showEmailPreview)}
                      title="Toggle live recipient preview"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '8px', border: '1px solid', borderColor: showEmailPreview ? '#2563EB' : '#CBD5E1', backgroundColor: showEmailPreview ? '#EFF6FF' : '#FFFFFF', color: showEmailPreview ? '#2563EB' : '#334155', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      {showEmailPreview ? <IconEyeOff size={15} color="#2563EB" /> : <IconEye size={15} color="#475569" />}
                      <span>{showEmailPreview ? 'Hide Preview' : 'Preview Email'}</span>
                    </button>
                  </div>

                  {/* Send Test Box */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type="email"
                      placeholder="Enter test email..."
                      value={testEmailRecipient}
                      onChange={(e) => setTestEmailRecipient(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', width: '180px', outline: 'none' }}
                    >
                    </input>
                    <button
                      type="button"
                      disabled={testEmailSending}
                      onClick={handleSendTestEmail}
                      style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      {testEmailSending ? 'Sending...' : 'Send Test'}
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Right: Email Client Preview (Only displays when showEmailPreview is TRUE) */}
            {showEmailPreview && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '24px', position: 'sticky', top: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                      Live Recipient Preview
                    </h3>
                    <span style={{ fontSize: '11px', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                      Mock Client
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEmailPreview(false)}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', padding: '4px', borderRadius: '6px', transition: 'color 0.15s' }}
                    title="Close Preview Pane"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0F172A'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                  >
                    <IconClose size={16} />
                  </button>
                </div>

                <div style={{ borderRadius: '10px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)', padding: '20px 24px', color: '#FFFFFF' }}>
                    <div style={{ fontSize: '12px', color: '#E0F2FE', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: '700' }}>
                      Ashirwad Plastics
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '4px', color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                      {campaignSubject || 'Subject preview will appear here...'}
                    </div>
                  </div>

                  <div style={{ padding: '24px 20px', backgroundColor: '#FFFFFF', fontSize: '13px', lineHeight: '1.6', color: '#1E293B', minHeight: '220px' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: campaignContent
                          .replace(/{{name}}/gi, 'Dr. Rajesh Sharma')
                          .replace(/{{company}}/gi, 'Apex Healthcare Ltd')
                      }}
                    />

                    {emailAttachments.length > 0 && (
                      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #E2E8F0' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#64748B' }}>
                          {emailAttachments.length} Attachment(s) included:
                        </span>
                        <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {emailAttachments.map((a, i) => (
                            <div key={i} style={{ fontSize: '12px', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <IconPaperclip size={12} color="#2563EB" />
                              <span>{a.filename} ({formatFileSize(a.size)})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '14px 20px', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '11px', color: '#64748B', textAlign: 'center', lineHeight: '1.4' }}>
                    © {new Date().getFullYear()} Ashirwad Plastics. All rights reserved.
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 3: CAMPAIGN HISTORY ==================== */}
        {activeTab === 'history' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>
                  Broadcast History & Deliverability Logs
                </h2>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                  Audit log of past email campaigns dispatched from this server.
                </p>
              </div>

              <button
                onClick={fetchCampaignHistory}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer' }}
              >
                <IconRefresh size={14} color="#64748B" />
                <span>Refresh Log</span>
              </button>
            </div>

            {campaignsLoading ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#64748B' }}>Loading campaigns...</div>
            ) : campaigns.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F1F5F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', marginBottom: '12px' }}>
                  <IconMail size={22} color="#94A3B8" />
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>No campaigns sent yet</div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                  Switch to the "Email Campaign Studio" tab to create your first broadcast.
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      <th style={{ padding: '12px 20px' }}>Subject Line</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px' }}>Audience</th>
                      <th style={{ padding: '12px 16px' }}>Delivered</th>
                      <th style={{ padding: '12px 16px' }}>Failed</th>
                      <th style={{ padding: '12px 16px' }}>Dispatched At</th>
                      <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((camp) => (
                      <tr
                        key={camp._id}
                        style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0F172A' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              onClick={() => {
                                setSelectedCampaignDetails(camp);
                                setCampaignModalTab(camp.failureLogs?.length > 0 ? 'errors' : 'recipients');
                                setCampaignRecipientSearch('');
                              }}
                              style={{ cursor: 'pointer', color: '#2563EB' }}
                              title="Click to inspect email and recipients"
                            >
                              {camp.subject}
                            </span>
                            {camp.attachments && camp.attachments.length > 0 && (
                              <span style={{ fontSize: '11px', color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#F1F5F9', padding: '1px 6px', borderRadius: '4px' }}>
                                <IconPaperclip size={11} color="#64748B" />
                                {camp.attachments.length}
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: camp.status === 'COMPLETED' ? '#F0FDF4' : camp.status === 'PROCESSING' ? '#FEF3C7' : '#FEF2F2',
                            color: camp.status === 'COMPLETED' ? '#166534' : camp.status === 'PROCESSING' ? '#92400E' : '#991B1B',
                            border: camp.status === 'COMPLETED' ? '1px solid #BBF7D0' : camp.status === 'PROCESSING' ? '1px solid #FDE68A' : '1px solid #FECACA'
                          }}>
                            {camp.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#334155', fontSize: '12.5px' }}>
                          {camp.targetTags?.length > 0 ? (
                            <span style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', padding: '2px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '600' }}>
                              {camp.targetTags.join(', ')}
                            </span>
                          ) : (
                            <span>{camp.totalRecipients || (camp.directRecipients?.length || 0)} direct</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#059669', fontWeight: '700' }}>
                          {camp.sentCount || 0}
                        </td>
                        <td style={{ padding: '14px 16px', color: camp.failedCount > 0 ? '#DC2626' : '#94A3B8', fontWeight: camp.failedCount > 0 ? '700' : '400' }}>
                          {camp.failedCount || 0}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#64748B', fontSize: '12px' }}>
                          {new Date(camp.createdAt).toLocaleDateString()} {new Date(camp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td style={{ padding: '14px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            onClick={() => handleOpenCampaignInspector(camp)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              color: '#1E293B',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                            }}
                          >
                            <IconEye size={13} color="#2563EB" />
                            <span>View Details & Email</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: SETTINGS (CENTER ALIGNED) ==================== */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>
                System Connection & SMTP Configuration
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                The backend connects to your MongoDB Atlas cluster and dispatches emails via your company's SMTP or ESP service (Gmail App Password, Hostinger, Zoho, Amazon SES, or SendGrid).
              </p>

              <div style={{ padding: '18px 20px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>
                  Environment Configuration: <code>backend/.env</code>
                </div>
                <pre style={{ margin: 0, fontSize: '12px', color: '#334155', fontFamily: 'ui-monospace, SFMono-Regular, monospace', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
{`MONGO_URI=mongodb+srv://abcd:abcd@cluster0.fsxomwi.mongodb.net/AshirwadPlatics?retryWrites=true&w=majority&appName=Cluster0
SMTP_HOST=smtp.gmail.com        # Hostinger: smtp.hostinger.com | Zoho: smtp.zoho.com
SMTP_PORT=587
SMTP_USER=your-email@ashirwad.com
SMTP_PASS=your-app-password
EMAIL_FROM_NAME="Ashirwad Plastics"
EMAIL_FROM_ADDRESS=your-email@ashirwad.com`}
                </pre>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={fetchSystemStatus}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  <IconRefresh size={15} color="#FFFFFF" />
                  <span>Test Connection Diagnostics</span>
                </button>
              </div>
            </div>

            {/* Purge Test Data Card */}
            <div style={{ marginTop: '24px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #FEE2E2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                  <IconTrash size={18} color="#DC2626" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#991B1B', margin: 0 }}>
                    Clean Test Data & Production Reset
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                    Permanently clear test contacts and broadcast history. Admin user credentials will remain safe.
                  </p>
                </div>
              </div>

              <div style={{ margin: '16px 0', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', fontSize: '12.5px', color: '#92400E' }}>
                💡 <strong>CLI Alternative:</strong> You can also run <code>npm run clean</code> in your <code>backend/</code> terminal to wipe all test data via script.
              </div>

              {purgeFeedback && (
                <div style={{ margin: '14px 0', padding: '12px 14px', borderRadius: '8px', fontSize: '12.5px', backgroundColor: purgeFeedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: purgeFeedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA', color: purgeFeedback.type === 'success' ? '#166534' : '#991B1B' }}>
                  {purgeFeedback.message}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                <button
                  type="button"
                  disabled={purgeLoading}
                  onClick={() => handlePurgeAllTestData('contacts')}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', fontWeight: '600', cursor: purgeLoading ? 'wait' : 'pointer' }}
                >
                  Clear All Contacts ({totalContacts})
                </button>

                <button
                  type="button"
                  disabled={purgeLoading}
                  onClick={() => handlePurgeAllTestData('history')}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', fontWeight: '600', cursor: purgeLoading ? 'wait' : 'pointer' }}
                >
                  Clear Broadcast History ({campaigns.length})
                </button>

                <button
                  type="button"
                  disabled={purgeLoading}
                  onClick={() => handlePurgeAllTestData('all')}
                  style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid #DC2626', backgroundColor: '#DC2626', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: purgeLoading ? 'wait' : 'pointer', boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)' }}
                >
                  {purgeLoading ? 'Cleaning Database...' : 'Purge All Test Data (Contacts + History)'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==================== LOGOUT CONFIRMATION MODAL ==================== */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)', padding: '28px', color: '#0F172A', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626', marginBottom: '16px' }}>
              <IconLogOut size={22} color="#DC2626" />
            </div>

            <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>
              Confirm Sign Out
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
              Are you sure you want to sign out of the Admin CRM portal? You will need your credentials to log in again.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#DC2626', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Contact Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '440px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)', padding: '28px', color: '#0F172A' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Add Individual Lead</h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}
              >
                <IconClose size={18} />
              </button>
            </div>

            <form onSubmit={handleManualAddContact} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="client@organization.com"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Dr. Rajesh Sharma"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Company / Organization</label>
                <input
                  type="text"
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  placeholder="Apex Pharmaceuticals Ltd"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Phone / Mobile Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Assign to Group / Segment *</label>
                <select
                  value={newContact.group}
                  onChange={(e) => setNewContact({ ...newContact, group: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFFFFF', outline: 'none' }}
                >
                  {availableGroups.map((grp) => (
                    <option key={grp} value={grp}>{grp}</option>
                  ))}
                  <option value="__NEW__">+ Create New Group...</option>
                </select>
                {newContact.group === '__NEW__' && (
                  <input
                    type="text"
                    required
                    placeholder="Enter new group name (e.g. Pharma-VIP, Export-Agents)..."
                    value={newContact.customGroup}
                    onChange={(e) => setNewContact({ ...newContact, customGroup: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Lead Acquisition Source</label>
                <select
                  value={newContact.source}
                  onChange={(e) => setNewContact({ ...newContact, source: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFFFFF', outline: 'none' }}
                >
                  {LEAD_SOURCES.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
                {newContact.source === 'Other' && (
                  <input
                    type="text"
                    placeholder="Enter custom lead source..."
                    value={newContact.customSource}
                    onChange={(e) => setNewContact({ ...newContact, customSource: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addContactLoading}
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  {addContactLoading ? 'Saving...' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== EDIT CONTACT / LEAD MODAL ==================== */}
      {showEditModal && editingContact && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '460px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)', padding: '28px', color: '#0F172A' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconEdit size={16} color="#2563EB" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Edit Lead Details</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>{editingContact.email}</p>
                </div>
              </div>
              <button
                onClick={() => { setShowEditModal(false); setEditingContact(null); }}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}
              >
                <IconClose size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                  placeholder="Contact Name"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Company / Organization</label>
                <input
                  type="text"
                  value={editingContact.company}
                  onChange={(e) => setEditingContact({ ...editingContact, company: e.target.value })}
                  placeholder="Organization name"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Phone / Mobile Number</label>
                <input
                  type="tel"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                  placeholder="+91..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Contact Group / Segment</label>
                <select
                  value={editingContact.group}
                  onChange={(e) => setEditingContact({ ...editingContact, group: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFFFFF', outline: 'none' }}
                >
                  {availableGroups.map((grp) => (
                    <option key={grp} value={grp}>{grp}</option>
                  ))}
                  <option value="__NEW__">+ Create New Group...</option>
                </select>
                {editingContact.group === '__NEW__' && (
                  <input
                    type="text"
                    required
                    placeholder="Enter new group name..."
                    value={editingContact.customGroup}
                    onChange={(e) => setEditingContact({ ...editingContact, customGroup: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>Lead Acquisition Source</label>
                <select
                  value={editingContact.source}
                  onChange={(e) => setEditingContact({ ...editingContact, source: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', backgroundColor: '#FFFFFF', outline: 'none' }}
                >
                  {LEAD_SOURCES.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
                {editingContact.source === 'Other' && (
                  <input
                    type="text"
                    placeholder="Enter custom lead source..."
                    value={editingContact.customSource}
                    onChange={(e) => setEditingContact({ ...editingContact, customSource: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '13px', marginTop: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingContact(null); }}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editContactLoading}
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  {editContactLoading ? 'Updating...' : 'Update Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Failure Details Modal */}
      {selectedCampaignDetails && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '560px', maxHeight: '80vh', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>Delivery Diagnostic Logs</h3>
              <button
                onClick={() => setSelectedCampaignDetails(null)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}
              >
                <IconClose size={18} />
              </button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedCampaignDetails.failureLogs?.map((log, idx) => (
                <div key={idx} style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', fontSize: '12px' }}>
                  <div style={{ color: '#991B1B', fontWeight: '600' }}>{log.email}</div>
                  <div style={{ color: '#64748B', marginTop: '2px' }}>Reason: {log.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MANAGE CONTACT GROUPS MODAL ==================== */}
      {showGroupsModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '520px', maxHeight: '85vh', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)', padding: '26px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconLayers size={17} color="#2563EB" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0F172A' }}>Contact Groups</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Segment and target audiences for corporate broadcasts</p>
                </div>
              </div>
              <button
                onClick={() => setShowGroupsModal(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', padding: '4px' }}
              >
                <IconClose size={18} />
              </button>
            </div>

            {/* Quick Add Group Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateNewGroup(newGroupNameInput);
              }}
              style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}
            >
              <input
                type="text"
                placeholder="Enter new group name (e.g. Pharma-VIP, Export-Agents)..."
                value={newGroupNameInput}
                onChange={(e) => setNewGroupNameInput(e.target.value)}
                style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={!newGroupNameInput.trim()}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: newGroupNameInput.trim() ? '#2563EB' : '#E2E8F0',
                  color: newGroupNameInput.trim() ? '#FFFFFF' : '#94A3B8',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: newGroupNameInput.trim() ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap'
                }}
              >
                Create Group
              </button>
            </form>

            {/* Groups List */}
            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
              {(() => {
                const allGroupNames = Array.from(new Set([
                  ...groupsWithCounts.map((g) => g.name),
                  ...availableGroups
                ])).filter(Boolean);

                if (allGroupNames.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontSize: '13px' }}>
                      No custom groups yet. Type a group name above to get started.
                    </div>
                  );
                }

                return allGroupNames.map((groupName) => {
                  const matched = groupsWithCounts.find(
                    (g) => (g.name || '').trim().toLowerCase() === groupName.trim().toLowerCase()
                  );
                  const count = matched ? matched.count : 0;
                  const isEditingThis = editingGroup?.oldName === groupName;

                  return (
                    <div
                      key={groupName}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        gap: '10px'
                      }}
                    >
                      {isEditingThis ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                          <input
                            type="text"
                            value={editingGroup.newName}
                            onChange={(e) => setEditingGroup({ ...editingGroup, newName: e.target.value })}
                            style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #2563EB', fontSize: '13px', outline: 'none' }}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRenameGroup();
                              if (e.key === 'Escape') setEditingGroup(null);
                            }}
                          />
                          <button
                            type="button"
                            disabled={renamingGroupLoading || !editingGroup.newName.trim()}
                            onClick={handleSaveRenameGroup}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                          >
                            {renamingGroupLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingGroup(null)}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#64748B', fontSize: '12px', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <IconFolder size={16} color="#3B82F6" />
                            <span style={{ fontWeight: '600', color: '#0F172A', fontSize: '13.5px' }}>{groupName}</span>
                            <span style={{ fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE' }}>
                              {count} {count === 1 ? 'contact' : 'contacts'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingGroup({ oldName: groupName, newName: groupName })}
                              title="Rename group"
                              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '3px 5px', borderRadius: '4px', display: 'flex', transition: 'color 0.15s' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                            >
                              <IconEdit size={13} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedGroup(groupName);
                                setShowGroupsModal(false);
                              }}
                              style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', fontWeight: '500', cursor: 'pointer' }}
                            >
                              View Contacts
                            </button>
                            {groupName !== 'General' && (
                              <button
                                type="button"
                                onClick={() => handleDeleteGroup(groupName)}
                                title="Delete this group tag"
                                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', transition: 'color 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                              >
                                <IconTrash size={14} />
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            <div style={{ marginTop: '18px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowGroupsModal(false)}
                style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== INTERACTIVE SPREADSHEET IMPORT & COLUMN MAPPING MODAL ==================== */}
      {sheetModalOpen && sheetPreviewData && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' }}>
          <div style={{ width: '100%', maxWidth: '860px', maxHeight: '90vh', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '28px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconFileSpreadsheet size={20} color="#2563EB" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>
                    Spreadsheet Verification & Column Mapping
                  </h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#64748B' }}>
                    File: <strong>{sheetStagedFile?.name}</strong> • Sheet: <em>{sheetPreviewData.activeSheet}</em>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSheetModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', padding: '4px' }}
              >
                <IconClose size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Stat Badges Banner */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '500' }}>Total Sheet Rows</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>{sheetPreviewData.totalRows}</div>
                </div>
                <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '500' }}>Detected Columns</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>{sheetPreviewData.columns.length} columns</div>
                </div>
                <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: '11.5px', color: '#166534', fontWeight: '500' }}>Valid Email Records</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#15803D', marginTop: '2px' }}>
                    {sheetPreviewData.detectedEmailCount || 'Auto-scan ready'}
                  </div>
                </div>
              </div>

              {/* Step 1: Assign to Group & Select Lead Source */}
              <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>
                    Target Contact Group for Leads
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    <select
                      value={mappingState.tag}
                      onChange={(e) => setMappingState({ ...mappingState, tag: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      {availableGroups.map((grp) => (
                        <option key={grp} value={grp}>{grp}</option>
                      ))}
                      <option value="__NEW__">+ Create a new custom group...</option>
                    </select>

                    {mappingState.tag === '__NEW__' && (
                      <input
                        type="text"
                        placeholder="Enter new group name..."
                        value={customTagInput}
                        onChange={(e) => setCustomTagInput(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '13px', outline: 'none' }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>
                    Lead Acquisition Source
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    <select
                      value={mappingState.source || 'Trade Show / Expo'}
                      onChange={(e) => setMappingState({ ...mappingState, source: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      {LEAD_SOURCES.map((src) => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>

                    {mappingState.source === 'Other' && (
                      <input
                        type="text"
                        placeholder="Enter custom lead source name..."
                        value={mappingState.customSource || ''}
                        onChange={(e) => setMappingState({ ...mappingState, customSource: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2563EB', fontSize: '13px', outline: 'none' }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: CRM Field Mapping Grid */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                    Match Spreadsheet Columns to CRM Fields
                  </h4>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Verify or change which column holds each field
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  {/* Field: Email */}
                  <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#1E40AF' }}>
                        Email Address <span style={{ color: '#DC2626' }}>*</span>
                      </label>
                      <span style={{ fontSize: '10.5px', backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '1px 6px', borderRadius: '4px', fontWeight: '600' }}>
                        Required
                      </span>
                    </div>
                    <select
                      value={mappingState.emailCol}
                      onChange={(e) => setMappingState({ ...mappingState, emailCol: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #93C5FD', fontSize: '13px', color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none', fontWeight: '600' }}
                    >
                      <option value="">-- Select Email Column --</option>
                      {sheetPreviewData.columns.map((col) => (
                        <option key={col} value={col}>
                          Column: "{col}"
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field: Name */}
                  <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>
                        Contact / Person Name
                      </label>
                      <span style={{ fontSize: '10.5px', color: '#64748B' }}>Optional</span>
                    </div>
                    <select
                      value={mappingState.nameCol}
                      onChange={(e) => setMappingState({ ...mappingState, nameCol: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                    >
                      <option value="">(None / Don't import name)</option>
                      {sheetPreviewData.columns.map((col) => (
                        <option key={col} value={col}>
                          Column: "{col}"
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field: Company */}
                  <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>
                        Company / Organization
                      </label>
                      <span style={{ fontSize: '10.5px', color: '#64748B' }}>Optional</span>
                    </div>
                    <select
                      value={mappingState.companyCol}
                      onChange={(e) => setMappingState({ ...mappingState, companyCol: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                    >
                      <option value="">(None / Don't import company)</option>
                      {sheetPreviewData.columns.map((col) => (
                        <option key={col} value={col}>
                          Column: "{col}"
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field: Phone */}
                  <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>
                        Phone / Contact Number
                      </label>
                      <span style={{ fontSize: '10.5px', color: '#64748B' }}>Optional</span>
                    </div>
                    <select
                      value={mappingState.phoneCol}
                      onChange={(e) => setMappingState({ ...mappingState, phoneCol: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', backgroundColor: '#FFFFFF', outline: 'none' }}
                    >
                      <option value="">(None / Don't import phone)</option>
                      {sheetPreviewData.columns.map((col) => (
                        <option key={col} value={col}>
                          Column: "{col}"
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Live Sample Rows Preview from Spreadsheet */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <IconTable size={15} color="#475569" />
                  <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: '#0F172A' }}>
                    Spreadsheet Data Sample (First 5 Rows)
                  </h4>
                </div>

                <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E2E8F0', maxHeight: '200px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        {sheetPreviewData.columns.map((col) => {
                          const isEmail = mappingState.emailCol === col;
                          const isName = mappingState.nameCol === col;
                          const isComp = mappingState.companyCol === col;
                          const isPhone = mappingState.phoneCol === col;
                          const isMapped = isEmail || isName || isComp || isPhone;

                          return (
                            <th
                              key={col}
                              style={{
                                padding: '8px 14px',
                                color: isEmail ? '#1E40AF' : isMapped ? '#0F172A' : '#64748B',
                                backgroundColor: isEmail ? '#EFF6FF' : isMapped ? '#F1F5F9' : '#F8FAFC',
                                fontWeight: '700',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span>{col}</span>
                                {isEmail && <span style={{ fontSize: '10px', color: '#2563EB', fontWeight: '800' }}>→ [EMAIL]</span>}
                                {isName && <span style={{ fontSize: '10px', color: '#16A34A', fontWeight: '800' }}>→ [NAME]</span>}
                                {isComp && <span style={{ fontSize: '10px', color: '#9333EA', fontWeight: '800' }}>→ [COMPANY]</span>}
                                {isPhone && <span style={{ fontSize: '10px', color: '#D97706', fontWeight: '800' }}>→ [PHONE]</span>}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {sheetPreviewData.sampleRows.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          {sheetPreviewData.columns.map((col) => (
                            <td
                              key={col}
                              style={{
                                padding: '8px 14px',
                                color: '#334155',
                                backgroundColor: mappingState.emailCol === col ? '#F8FAFC' : 'transparent',
                                whiteSpace: 'nowrap',
                                maxWidth: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {String(row[col] || '—')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Mapped email column: <strong>{mappingState.emailCol || 'None selected'}</strong>
              </span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSheetModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={importInProgress || !mappingState.emailCol}
                  onClick={handleExecuteConfirmedImport}
                  style={{
                    padding: '9px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: mappingState.emailCol && !importInProgress ? '#2563EB' : '#94A3B8',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: mappingState.emailCol && !importInProgress ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                  }}
                >
                  <IconCheck size={16} color="#FFFFFF" />
                  <span>
                    {importInProgress ? 'Importing Leads...' : `Confirm & Import (${sheetPreviewData.totalRows} Contacts)`}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== CAMPAIGN DISPATCH & RECIPIENTS INSPECTOR MODAL ==================== */}
      {selectedCampaignDetails && (() => {
        const allRecipientsList = (() => {
          if (selectedCampaignDetails.recipientLogs && selectedCampaignDetails.recipientLogs.length > 0) {
            return selectedCampaignDetails.recipientLogs;
          }
          const list = [];
          const failedEmails = new Set((selectedCampaignDetails.failureLogs || []).map((f) => (f.email || '').toLowerCase()));

          (selectedCampaignDetails.failureLogs || []).forEach((f) => {
            list.push({
              email: f.email,
              name: '',
              company: '',
              status: 'FAILED',
              error: f.reason,
              timestamp: f.timestamp || selectedCampaignDetails.createdAt
            });
          });

          (selectedCampaignDetails.directRecipients || []).forEach((item) => {
            const email = typeof item === 'string' ? item : item?.email;
            if (email && !failedEmails.has(email.toLowerCase())) {
              list.push({
                email,
                name: typeof item === 'object' ? item.name || '' : '',
                company: typeof item === 'object' ? item.company || '' : '',
                status: 'DELIVERED',
                timestamp: selectedCampaignDetails.createdAt
              });
            }
          });

          return list;
        })();

        const filteredRecipients = allRecipientsList.filter((r) => {
          if (!campaignRecipientSearch.trim()) return true;
          const q = campaignRecipientSearch.toLowerCase();
          return (
            (r.email && r.email.toLowerCase().includes(q)) ||
            (r.name && r.name.toLowerCase().includes(q)) ||
            (r.company && r.company.toLowerCase().includes(q))
          );
        });

        return (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '16px'
            }}
            onClick={() => setSelectedCampaignDetails(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '820px',
                height: '86vh',
                maxHeight: '86vh',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid #E2E8F0'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconMail size={18} color="#2563EB" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '440px' }}>
                        {selectedCampaignDetails.subject}
                      </h3>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 7px',
                        borderRadius: '5px',
                        backgroundColor: selectedCampaignDetails.status === 'COMPLETED' ? '#F0FDF4' : selectedCampaignDetails.status === 'PROCESSING' ? '#FEF3C7' : '#FEF2F2',
                        color: selectedCampaignDetails.status === 'COMPLETED' ? '#166534' : selectedCampaignDetails.status === 'PROCESSING' ? '#92400E' : '#991B1B',
                        border: selectedCampaignDetails.status === 'COMPLETED' ? '1px solid #BBF7D0' : selectedCampaignDetails.status === 'PROCESSING' ? '1px solid #FDE68A' : '1px solid #FECACA',
                        flexShrink: 0
                      }}>
                        {selectedCampaignDetails.status}
                      </span>
                    </div>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11.5px', color: '#64748B' }}>
                      {new Date(selectedCampaignDetails.createdAt).toLocaleString()} • Audience: {selectedCampaignDetails.targetTags?.length > 0 ? selectedCampaignDetails.targetTags.join(', ') : 'Direct Recipients'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetails(null)}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', padding: '6px', borderRadius: '6px', flexShrink: 0 }}
                  title="Close Inspector"
                >
                  <IconClose size={18} />
                </button>
              </div>

              {/* Compact Bar: Navigation Tabs & Metrics */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setCampaignModalTab('email')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: campaignModalTab === 'email' ? '#EFF6FF' : 'transparent',
                      color: campaignModalTab === 'email' ? '#2563EB' : '#64748B',
                      fontWeight: campaignModalTab === 'email' ? '700' : '500',
                      fontSize: '12.5px',
                      cursor: 'pointer'
                    }}
                  >
                    <IconEye size={13} color={campaignModalTab === 'email' ? '#2563EB' : '#64748B'} />
                    <span>Email Content Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCampaignModalTab('recipients')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: campaignModalTab === 'recipients' ? '#EFF6FF' : 'transparent',
                      color: campaignModalTab === 'recipients' ? '#2563EB' : '#64748B',
                      fontWeight: campaignModalTab === 'recipients' ? '700' : '500',
                      fontSize: '12.5px',
                      cursor: 'pointer'
                    }}
                  >
                    <IconUsers size={13} color={campaignModalTab === 'recipients' ? '#2563EB' : '#64748B'} />
                    <span>Recipients ({allRecipientsList.length})</span>
                  </button>

                  {(selectedCampaignDetails.failureLogs?.length > 0 || selectedCampaignDetails.failedCount > 0) && (
                    <button
                      type="button"
                      onClick={() => setCampaignModalTab('errors')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: campaignModalTab === 'errors' ? '#FEF2F2' : 'transparent',
                        color: campaignModalTab === 'errors' ? '#DC2626' : '#64748B',
                        fontWeight: campaignModalTab === 'errors' ? '700' : '500',
                        fontSize: '12.5px',
                        cursor: 'pointer'
                      }}
                    >
                      <IconAlertCircle size={13} color={campaignModalTab === 'errors' ? '#DC2626' : '#64748B'} />
                      <span>Errors ({selectedCampaignDetails.failureLogs?.length || selectedCampaignDetails.failedCount})</span>
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px' }}>
                  <span style={{ color: '#059669', fontWeight: '600' }}>
                    ✓ {selectedCampaignDetails.sentCount || 0} Delivered
                  </span>
                  {selectedCampaignDetails.failedCount > 0 && (
                    <span style={{ color: '#DC2626', fontWeight: '600' }}>
                      ✕ {selectedCampaignDetails.failedCount} Failed
                    </span>
                  )}
                  {selectedCampaignDetails.attachments?.length > 0 && (
                    <span style={{ color: '#2563EB', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <IconPaperclip size={11} color="#2563EB" />
                      {selectedCampaignDetails.attachments.length} file(s)
                    </span>
                  )}
                </div>
              </div>

              {/* Scrollable Modal Content (minHeight: 0 ensures full vertical scroll) */}
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Tab 1: Sent Email Message Preview */}
                {campaignModalTab === 'email' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div>
                        <strong style={{ color: '#475569' }}>Subject: </strong>
                        <span style={{ color: '#0F172A', fontWeight: '600' }}>{selectedCampaignDetails.subject}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#475569' }}>From: </strong>
                        <span style={{ color: '#334155' }}>"Ashirwad Plastics Admin" &lt;admin@notelia.com&gt;</span>
                      </div>
                      {selectedCampaignDetails.attachments && selectedCampaignDetails.attachments.length > 0 && (
                        <div style={{ marginTop: '2px', paddingTop: '4px', borderTop: '1px dashed #E2E8F0', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <strong style={{ color: '#475569' }}>Attachments: </strong>
                          {selectedCampaignDetails.attachments.map((att, i) => (
                            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 7px', borderRadius: '4px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '11px', fontWeight: '600' }}>
                              <IconPaperclip size={10} color="#1E40AF" />
                              {att.filename} ({formatFileSize(att.size || 0)})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ borderRadius: '10px', border: '1px solid #CBD5E1', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)', padding: '16px 20px', color: '#FFFFFF' }}>
                        <div style={{ fontSize: '11px', color: '#E0F2FE', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: '700' }}>
                          Ashirwad Plastics
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '3px', color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                          {selectedCampaignDetails.subject}
                        </div>
                      </div>

                      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', fontSize: '13.5px', lineHeight: '1.65', color: '#1E293B' }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedCampaignDetails.contentHtml
                              .replace(/{{name}}/gi, 'Valued Partner')
                              .replace(/{{company}}/gi, 'Your Organization')
                          }}
                        />
                      </div>

                      <div style={{ padding: '12px 20px', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '11.5px', color: '#64748B', textAlign: 'center' }}>
                        © {new Date().getFullYear()} Ashirwad Plastics. All rights reserved.
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: All Recipients */}
                {campaignModalTab === 'recipients' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: '#94A3B8' }}>
                          <IconSearch size={14} color="#94A3B8" />
                        </span>
                        <input
                          type="text"
                          value={campaignRecipientSearch}
                          onChange={(e) => setCampaignRecipientSearch(e.target.value)}
                          placeholder="Search recipients by email, name, or company..."
                          style={{ width: '100%', padding: '7px 10px 7px 30px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        Showing {filteredRecipients.length} of {allRecipientsList.length} recipients
                      </span>
                    </div>

                    {filteredRecipients.length === 0 ? (
                      <div style={{ padding: '36px', textAlign: 'center', color: '#64748B', fontSize: '12.5px' }}>
                        {allRecipientsList.length === 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <div style={{ fontWeight: '600', color: '#0F172A', fontSize: '13px' }}>
                              Detailed recipient logs not recorded for this legacy dispatch
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              This dispatch completed with <strong>{selectedCampaignDetails.sentCount || 0} delivered</strong> and <strong>{selectedCampaignDetails.failedCount || 0} failed</strong>.
                            </div>
                          </div>
                        ) : (
                          'No recipients matched your search filter.'
                        )}
                      </div>
                    ) : (
                      <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflowX: 'auto', backgroundColor: '#FFFFFF' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                              <th style={{ padding: '9px 14px' }}>Recipient Email</th>
                              <th style={{ padding: '9px 12px' }}>Contact Name</th>
                              <th style={{ padding: '9px 12px' }}>Company</th>
                              <th style={{ padding: '9px 12px' }}>Status</th>
                              <th style={{ padding: '9px 14px', textAlign: 'right' }}>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRecipients.map((rec, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <td style={{ padding: '9px 14px', fontWeight: '600', color: '#0F172A' }}>
                                  {rec.email}
                                </td>
                                <td style={{ padding: '9px 12px', color: '#475569' }}>
                                  {rec.name || '—'}
                                </td>
                                <td style={{ padding: '9px 12px', color: '#64748B' }}>
                                  {rec.company || '—'}
                                </td>
                                <td style={{ padding: '9px 12px' }}>
                                  {rec.status === 'DELIVERED' ? (
                                    <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
                                      Delivered
                                    </span>
                                  ) : (
                                    <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }} title={rec.error}>
                                      Failed: {rec.error ? rec.error.slice(0, 30) + '...' : 'Rejection'}
                                    </span>
                                  )}
                                </td>
                                <td style={{ padding: '9px 14px', color: '#64748B', fontSize: '11px', textAlign: 'right' }}>
                                  {rec.timestamp ? new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Error Diagnostics */}
                {campaignModalTab === 'errors' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '10px 14px', borderRadius: '6px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: '12px' }}>
                      <strong>SMTP Delivery Diagnostic Report:</strong> The following recipients encountered delivery rejections.
                    </div>

                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                            <th style={{ padding: '9px 14px' }}>Recipient Email</th>
                            <th style={{ padding: '9px 12px' }}>Failure Reason & Server Log</th>
                            <th style={{ padding: '9px 14px', textAlign: 'right' }}>Timestamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(selectedCampaignDetails.failureLogs || []).map((f, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '9px 14px', fontWeight: '600', color: '#DC2626' }}>
                                {f.email}
                              </td>
                              <td style={{ padding: '9px 12px', color: '#334155', fontFamily: 'monospace', fontSize: '11px' }}>
                                {f.reason}
                              </td>
                              <td style={{ padding: '9px 14px', color: '#64748B', fontSize: '11px', textAlign: 'right' }}>
                                {f.timestamp ? new Date(f.timestamp).toLocaleTimeString() : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetails(null)}
                  style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
