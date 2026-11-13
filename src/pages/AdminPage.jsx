import { useState, useEffect, useRef } from 'react';
import BlogManager from '../components/admin/BlogManager';
import BlogEditor from '../components/admin/BlogEditor';
import OverviewDashboard from '../components/admin/OverviewDashboard';
import InquiriesManager from '../components/admin/InquiriesManager';
import SettingsPanel from '../components/admin/SettingsPanel';
import RecipientAutocomplete from '../components/admin/RecipientAutocomplete';
import TemplatesManager from '../components/admin/TemplatesManager';
import ExportDropdown from '../components/admin/ExportDropdown';
import { exportTableToExcel, exportTableToPdf, downloadAuthorizedFile } from '../utils/exportUtils';
import { blogService } from '../services/blogService';

// Dynamic API Base URL from Vite Environment or fallback to local backend
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl || !envUrl.trim()) return 'http://localhost:5000/api/v1';
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api/v1') ? clean : `${clean}/api/v1`;
};

const API_BASE_URL = getApiBaseUrl();

// ==================== VECTOR SVG ICONS ====================

const IconBookOpen = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconUsers = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconMail = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconHistory = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const IconSettings = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconUploadCloud = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const IconFileSpreadsheet = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h2" />
    <path d="M8 17h2" />
    <path d="M14 13h2" />
    <path d="M14 17h2" />
  </svg>
);

const IconDownload = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const IconPlus = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconTrash = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const IconSearch = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);

const IconSend = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="11" y1="2" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconPaperclip = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const IconCheck = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconAlertCircle = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const IconLogOut = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

const IconRefresh = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M21 21v-5h-5" />
  </svg>
);

const IconLock = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconClose = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const IconFolder = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const IconEye = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const IconLayers = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconTable = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

const IconEdit = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconMenu = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconExternalLink = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// Formatting Icons for WYSIWYG
const IconBold = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12h9a4 4 0 0 0 0-8H6v8Zm0 0h10a4 4 0 0 1 0 8H6v-8Z" />
  </svg>
);

const IconItalic = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

const IconUnderline = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
    <line x1="4" x2="20" y1="21" y2="21" />
  </svg>
);

const IconList = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);

const IconListOrdered = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" x2="21" y1="6" y2="6" />
    <line x1="10" x2="21" y1="12" y2="12" />
    <line x1="10" x2="21" y1="18" y2="18" />
    <path d="M4 6h1v4" />
    <path d="M4 10h2" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);

const IconLink = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconCode = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconFileText = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

// Pre-made corporate email templates
const EMAIL_TEMPLATES = [
  {
    name: 'Pharmaceutical Introduction',
    subject: 'Precision Dispensing & Closure Systems - Ashirwad Plastics',
    html: `<p>Dear {{name}},</p>
<p>Greetings from <strong>Ashirwad Plastics</strong>.</p>
<p>We are an ISO-certified manufacturer dedicated to precision dispensing solutions for the pharmaceutical and healthcare industries. Our primary cleanroom-manufactured products include:</p>
<ul>
  <li>Precision Nasal Spray Pumps (0.05ml - 0.14ml dosage accuracy)</li>
  <li>Ophthalmic Dropper Bottles with tamper-evident rings</li>
  <li>Glass Droppers & Injection Flip-off Seals</li>
</ul>
<p>We would welcome the opportunity to submit our technical specifications and send product samples for {{company}}.</p>
<p>Best regards,<br><strong>Business Development Team</strong><br>Ashirwad Plastics</p>`
  },
  {
    name: 'Catalog & Free Sample Dispatch',
    subject: 'Product Catalog & Complimentary Samples Offer',
    html: `<p>Dear {{name}},</p>
<p>Following up on our recent communications, we would be delighted to dispatch our latest product catalog and production samples directly to {{company}}.</p>
<p>Please reply with your preferred shipping address and specifications (neck size, dosage volume, bottle capacity) so our engineering division can prepare your test package.</p>
<p>Warm regards,<br><strong>Sample Fulfillment Team</strong><br>Ashirwad Plastics</p>`
  },
  {
    name: 'Quotation & Pricing Proposal',
    subject: 'Quotation for Specialized Components',
    html: `<p>Dear {{name}},</p>
<p>Thank you for your interest in Ashirwad Plastics.</p>
<p>Please find attached our competitive pricing structure. All components undergo optical inspection and microbial compliance testing.</p>
<p>Feel free to reach out directly if you have any questions or require custom mold development.</p>
<p>Sincerely,<br><strong>Commercial Sales Department</strong><br>Ashirwad Plastics</p>`
  },
  {
    name: 'Clean Blank Letter',
    subject: '',
    html: `<p>Dear {{name}},</p><p><br></p><p>Best regards,<br>Ashirwad Plastics</p>`
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

  // Active Tab: 'overview' | 'inquiries' | 'blogs' | 'new-blog' | 'edit-blog' | 'contacts' | 'campaign' | 'history' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');
  const [editingBlog, setEditingBlog] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = sidebarCollapsed ? 64 : 230;
  const effectiveSidebarWidth = isMobile ? 0 : sidebarWidth;

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
  const [subscribedFilter, setSubscribedFilter] = useState('all');
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [bulkTagInput, setBulkTagInput] = useState('');
  const [allContactsForAutocomplete, setAllContactsForAutocomplete] = useState([]);

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
  const [editingGroup, setEditingGroup] = useState(null);
  const [renamingGroupLoading, setRenamingGroupLoading] = useState(false);

  // Advanced CRM Spreadsheet Import State
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

  // Campaign Composer State
  const [showEmailPreview, setShowEmailPreview] = useState(false);
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
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [activeDraftId, setActiveDraftId] = useState(null);

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
      fetchAllContactsForAutocomplete();
      fetchSavedTemplates();
    }
  }, [token]);

  // Load contacts
  useEffect(() => {
    if (token) {
      fetchContactsList();
    }
  }, [token, currentPage, searchQuery, selectedGroup, pageSize, subscribedFilter]);

  // Refresh autocomplete contacts & templates when entering campaign or templates tab
  useEffect(() => {
    if (token && (activeTab === 'campaign' || activeTab === 'templates')) {
      fetchAllContactsForAutocomplete();
      fetchSavedTemplates();
    }
  }, [token, activeTab]);

  // Load history + auto-poll if any campaign is PROCESSING
  useEffect(() => {
    if (token && activeTab === 'history') {
      fetchCampaignHistory();
    }
  }, [token, activeTab]);

  useEffect(() => {
    if (!token || activeTab !== 'history') return;
    const hasProcessing = campaigns.some((c) => c.status === 'PROCESSING');
    if (!hasProcessing) return;
    const timer = setInterval(() => {
      fetchCampaignHistory();
    }, 4000);
    return () => clearInterval(timer);
  }, [token, activeTab, campaigns]);

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
        setLoginError(data.message || 'Invalid email or password.');
      }
    } catch {
      setLoginError('Could not connect to backend server.');
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
    if (!window.confirm(`Remove group tag "${groupName}" from all contacts?`)) return;
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

  const fetchAllContactsForAutocomplete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts?page=1&limit=500`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setAllContactsForAutocomplete(data.data.contacts || []);
      }
    } catch (err) {
      console.warn('Autocomplete contacts load error', err);
    }
  };

  const fetchContactsList = async () => {
    setContactsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
        tag: selectedGroup,
        subscribed: subscribedFilter
      });
      const res = await fetch(`${API_BASE_URL}/contacts?${queryParams}`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data.contacts || []);
        setTotalContacts(data.data.pagination?.total || 0);
        setSelectedContactIds([]);
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

  const handleExecuteConfirmedImport = async () => {
    if (!sheetStagedFile) return;
    if (!mappingState.emailCol) {
      alert('Please specify which column contains the Email Address.');
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
        alert(data.message || 'Import failed. Check column mappings.');
      }
    } catch (err) {
      alert('Import error: ' + err.message);
    } finally {
      setImportInProgress(false);
    }
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
    const contactTags = Array.isArray(contact.tags) && contact.tags.length > 0
      ? Array.from(new Set(contact.tags.map((t) => String(t).trim()).filter(Boolean)))
      : ['General'];
    setAvailableGroups((prev) => Array.from(new Set([...prev, ...contactTags])));

    setEditingContact({
      _id: contact._id,
      email: contact.email || '',
      name: contact.name || '',
      company: contact.company || '',
      phone: contact.phone || '',
      tags: contactTags,
      newGroupInput: '',
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

    const finalTags = Array.isArray(editingContact.tags) && editingContact.tags.length > 0
      ? Array.from(new Set(editingContact.tags.map((t) => String(t).trim()).filter(Boolean)))
      : ['General'];

    try {
      const res = await fetch(`${API_BASE_URL}/contacts/${editingContact._id}`, {
        method: 'PUT',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: editingContact.email,
          name: editingContact.name,
          company: editingContact.company,
          phone: editingContact.phone,
          tags: finalTags,
          source: finalSource
        })
      });
      const data = await res.json();

      if (data.success) {
        setShowEditModal(false);
        setEditingContact(null);
        setAvailableGroups((prev) => Array.from(new Set([...prev, ...finalTags])));
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
    if (!window.confirm('Delete this contact?')) return;
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
      link.download = `Contacts_Export_${new Date().toISOString().slice(0, 10)}.xlsx`;
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

  // WYSIWYG commands
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
    const url = window.prompt('Enter link URL:', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const toggleEditorMode = () => {
    if (!isHtmlMode) {
      setIsHtmlMode(true);
    } else {
      setIsHtmlMode(false);
      setTimeout(() => {
        if (visualEditorRef.current) {
          visualEditorRef.current.innerHTML = campaignContent;
        }
      }, 0);
    }
  };

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
          subject: campaignSubject || 'Test Email Dispatch',
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

  const handleBulkContacts = async (action, tagValue = '') => {
    if (selectedContactIds.length === 0) return;
    if (action === 'delete' && !window.confirm(`Delete ${selectedContactIds.length} selected contact(s)?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/contacts/bulk`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedContactIds, action, tag: tagValue })
      });
      const data = await res.json();
      if (data.success) {
        setBulkTagInput('');
        fetchContactsList();
        fetchAllContactsForAutocomplete();
      } else {
        alert(data.message || 'Bulk action failed');
      }
    } catch (err) {
      alert('Bulk action error: ' + err.message);
    }
  };

  const fetchSavedTemplates = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/templates`, { headers: authHeaders });
      const data = await res.json();
      if (data.success) setSavedTemplates(data.templates || []);
    } catch (err) {
      console.warn('Templates load error', err);
    }
  };

  const handleSaveAsTemplate = async () => {
    const name = window.prompt('Enter a name for this email template:');
    if (!name || !name.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/templates`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          subject: campaignSubject,
          contentHtml: campaignContent
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchSavedTemplates();
        setCampaignFeedback({ type: 'success', message: `Template "${name.trim()}" saved.` });
      }
    } catch (err) {
      alert('Failed to save template');
    }
  };

  const handleSaveCampaignDraft = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/draft`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeDraftId,
          title: campaignTitle || campaignSubject,
          subject: campaignSubject,
          contentHtml: campaignContent,
          targetTags: recipientMode === 'direct' ? [] : [selectedCampaignGroup],
          directRecipients: parseEmailsList(directRecipientsInput),
          cc: parseEmailsList(ccInput),
          bcc: parseEmailsList(bccInput),
          attachments: emailAttachments
        })
      });
      const data = await res.json();
      if (data.success) {
        setActiveDraftId(data.campaign._id);
        setCampaignFeedback({ type: 'success', message: 'Draft saved! You can resume it anytime from Broadcast History.' });
      }
    } catch (err) {
      alert('Failed to save draft');
    }
  };

  const handleRetryFailedCampaign = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/${id}/retry-failed`, {
        method: 'POST',
        headers: authHeaders
      });
      const data = await res.json();
      if (data.success) {
        fetchCampaignHistory();
        alert(data.message);
      } else {
        alert(data.message || 'Retry failed');
      }
    } catch (err) {
      alert('Retry error: ' + err.message);
    }
  };

  const handleCloneCampaign = (camp) => {
    setActiveDraftId(camp.status === 'DRAFT' ? camp._id : null);
    setCampaignSubject(camp.subject || '');
    setCampaignContent(camp.contentHtml || '');
    setDirectRecipientsInput((camp.directRecipients || []).join(', '));
    setCcInput((camp.cc || []).join(', '));
    setBccInput((camp.bcc || []).join(', '));
    if (camp.targetTags?.length && camp.directRecipients?.length) {
      setRecipientMode('both');
      setSelectedCampaignGroup(camp.targetTags[0]);
    } else if (camp.directRecipients?.length) {
      setRecipientMode('direct');
    } else {
      setRecipientMode('group');
      setSelectedCampaignGroup(camp.targetTags?.[0] || 'ALL');
    }
    setActiveTab('campaign');
  };

  const handleLaunchCampaign = async () => {
    if (!campaignSubject.trim() || !campaignContent.trim()) {
      alert('Subject line and content are required.');
      return;
    }

    const directList = parseEmailsList(directRecipientsInput);
    const targetTags = recipientMode === 'direct' ? [] : [selectedCampaignGroup];

    if (recipientMode === 'direct' && directList.length === 0) {
      alert('Please enter at least one recipient email address.');
      return;
    }

    if (!window.confirm(`Dispatch email campaign with ${emailAttachments.length} attachment(s)?`)) return;

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
          attachments: emailAttachments,
          draftId: activeDraftId
        })
      });
      const data = await res.json();

      if (data.success) {
        setActiveDraftId(null);
        setCampaignFeedback({
          type: 'success',
          message: 'Campaign has been queued for dispatch.'
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
      console.warn('Could not refresh inspector data:', err);
    }
  };

  const handlePurgeAllTestData = async (type = 'all') => {
    const label = type === 'contacts'
      ? 'All Contacts'
      : type === 'history'
      ? 'All Broadcast History'
      : 'All Test Contacts and History';

    if (!window.confirm(`Permanently clear ${label}? Login credentials will NOT be affected.`)) {
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

      setPurgeFeedback({ type: 'success', message: msgs.join(' · ') });
      fetchContactsList();
      fetchCampaignHistory();
      fetchGroups();
    } catch (err) {
      setPurgeFeedback({ type: 'error', message: 'Clear operation failed: ' + err.message });
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
    return 'AD';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ==================== LOGIN VIEW ====================
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', padding: '36px 32px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img
              src="/logo.webp"
              alt="Logo"
              style={{ height: '36px', width: 'auto', objectFit: 'contain', margin: '0 auto 16px', display: 'block' }}
            />
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
              Sign In
            </h1>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
              Enter your administrator credentials to access the console
            </p>
          </div>

          {loginError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '10px 12px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '18px' }}>
              <IconAlertCircle size={15} color="#DC2626" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', display: 'flex' }}>
                  <IconMail size={15} color="#94A3B8" />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@ashirwad.com"
                  style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', display: 'flex' }}>
                  <IconLock size={15} color="#94A3B8" />
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              style={{ width: '100%', padding: '9px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', cursor: loginLoading ? 'wait' : 'pointer', marginTop: '6px' }}
            >
              {loginLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => onNavigate && onNavigate('home')}
              style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '12.5px', cursor: 'pointer' }}
            >
              ← Back to public website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Current page display title
  const getPageTitle = () => {
    switch (activeTab) {
      case 'blogs': return 'Articles';
      case 'new-blog': return 'New Article';
      case 'edit-blog': return 'Edit Article';
      case 'contacts': return 'Contacts';
      case 'campaign': return 'Email Campaigns';
      case 'templates': return 'Campaign Templates';
      case 'history': return 'Broadcast History';
      case 'settings': return 'Settings';
      default: return 'Overview';
    }
  };

  // ==================== DASHBOARD VIEW ====================
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0F172A', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex' }}>
      
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 1090 }}
        />
      )}

      {/* Left Fixed Minimalist Sidebar */}
      <aside
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${sidebarWidth}px`,
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #E5E7EB',
                transform: mobileSidebarOpen || (typeof window !== 'undefined' && window.innerWidth > 1024) ? 'none' : 'translateX(-100%)',
                transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease'
              }}
            >
              {/* Toggle Button on the sidebar border line below page header */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                type="button"
                style={{
                  position: 'absolute',
                  right: '-11px',
                  top: '68px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                  zIndex: 1200,
                  padding: 0,
                  outline: 'none',
                  transition: 'color 0.15s, background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.color = '#0F172A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#64748B';
                }}
              >
                {sidebarCollapsed ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                )}
              </button>

              {/* Brand Header: Logo centered */}
              <div style={{ height: '56px', padding: sidebarCollapsed ? '0 8px' : '0 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={sidebarCollapsed ? "/logo-icon.webp" : "/logo.webp"}
                  alt="Logo"
                  style={{
                    height: sidebarCollapsed ? '24px' : '26px',
                    width: sidebarCollapsed ? '24px' : 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>

              {/* Quick Action Button: New Article */}
              <div style={{ padding: sidebarCollapsed ? '12px 8px 4px' : '14px 14px 6px' }}>
                <button
                  onClick={() => {
                    setEditingBlog(null);
                    setActiveTab('new-blog');
                    setMobileSidebarOpen(false);
                  }}
                  type="button"
                  title="New Article"
                  style={{
                    width: sidebarCollapsed ? '36px' : '100%',
                    height: '34px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: sidebarCollapsed ? '0' : '7px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <IconPlus size={13} color="#FFFFFF" />
                  {!sidebarCollapsed && <span>New Article</span>}
                </button>
              </div>

              {/* Navigation Groups */}
              <div style={{ flex: 1, overflowY: 'auto', padding: sidebarCollapsed ? '8px 6px' : '10px 10px' }}>

                {/* Section 0: Dashboard & Inbox */}
                <div style={{ marginBottom: sidebarCollapsed ? '8px' : '18px' }}>
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', padding: '4px 10px', marginBottom: '2px' }}>
                      Workspace
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setActiveTab('overview');
                      setMobileSidebarOpen(false);
                    }}
                    title="Overview"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'overview' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'overview' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'overview' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconLayers size={15} color={activeTab === 'overview' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>Overview</span>}
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('inquiries');
                      setMobileSidebarOpen(false);
                    }}
                    title="Inquiries & Applications"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'inquiries' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'inquiries' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'inquiries' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconFolder size={15} color={activeTab === 'inquiries' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>Inquiries & Jobs</span>}
                  </button>
                </div>
                
                {/* Section 1: Content */}
                <div style={{ marginBottom: sidebarCollapsed ? '8px' : '18px' }}>
                  {!sidebarCollapsed ? (
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', padding: '4px 10px', marginBottom: '2px' }}>
                      Content
                    </span>
                  ) : (
                    <div style={{ borderTop: '1px solid #F1F5F9', margin: '6px 4px' }} />
                  )}

                  {/* Articles */}
                  <button
                    onClick={() => {
                      setActiveTab('blogs');
                      setMobileSidebarOpen(false);
                    }}
                    title="Articles"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'blogs' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'blogs' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'blogs' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconBookOpen size={15} color={activeTab === 'blogs' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>Articles</span>}
                  </button>

                  {/* Create / Edit Article */}
                  <button
                    onClick={() => {
                      setEditingBlog(null);
                      setActiveTab('new-blog');
                      setMobileSidebarOpen(false);
                    }}
                    title={editingBlog ? 'Edit Article' : 'Editor'}
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: (activeTab === 'new-blog' || activeTab === 'edit-blog') ? '#F1F5F9' : 'transparent',
                      color: (activeTab === 'new-blog' || activeTab === 'edit-blog') ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: (activeTab === 'new-blog' || activeTab === 'edit-blog') ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconEdit size={15} color={(activeTab === 'new-blog' || activeTab === 'edit-blog') ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>{editingBlog ? 'Edit Article' : 'Editor'}</span>}
                  </button>
                </div>

                {/* Section 2: Audience & Broadcasts */}
                <div style={{ marginBottom: sidebarCollapsed ? '8px' : '18px' }}>
                  {!sidebarCollapsed ? (
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', padding: '4px 10px', marginBottom: '2px' }}>
                      Communications
                    </span>
                  ) : (
                    <div style={{ borderTop: '1px solid #F1F5F9', margin: '6px 4px' }} />
                  )}

                  {/* Contacts */}
                  <button
                    onClick={() => {
                      setActiveTab('contacts');
                      setMobileSidebarOpen(false);
                    }}
                    title={`Contacts (${totalContacts})`}
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'contacts' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'contacts' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'contacts' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconUsers size={15} color={activeTab === 'contacts' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && (
                      <>
                        <span style={{ flex: 1 }}>Contacts</span>
                        {totalContacts > 0 && (
                          <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '10px', backgroundColor: '#F1F5F9', color: '#475569', fontWeight: '600' }}>
                            {totalContacts}
                          </span>
                        )}
                      </>
                    )}
                  </button>

                  {/* Campaigns */}
                  <button
                    onClick={() => {
                      setActiveTab('campaign');
                      setMobileSidebarOpen(false);
                    }}
                    title="Email Campaigns"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'campaign' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'campaign' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'campaign' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconMail size={15} color={activeTab === 'campaign' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>Email Campaigns</span>}
                  </button>

                  {/* Campaign Templates */}
                  <button
                    onClick={() => {
                      setActiveTab('templates');
                      setMobileSidebarOpen(false);
                    }}
                    title="Campaign Templates"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'templates' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'templates' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'templates' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconFileText size={15} color={activeTab === 'templates' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && (
                      <>
                        <span style={{ flex: 1 }}>Templates</span>
                        {savedTemplates.length > 0 && (
                          <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '10px', backgroundColor: '#F1F5F9', color: '#475569', fontWeight: '600' }}>
                            {savedTemplates.length}
                          </span>
                        )}
                      </>
                    )}
                  </button>

                  {/* History */}
                  <button
                    onClick={() => {
                      setActiveTab('history');
                      setMobileSidebarOpen(false);
                    }}
                    title="Broadcast History"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'history' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'history' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'history' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconHistory size={15} color={activeTab === 'history' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>Broadcast History</span>}
                  </button>
                </div>

                {/* Section 3: System */}
                <div>
                  {!sidebarCollapsed ? (
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', padding: '4px 10px', marginBottom: '2px' }}>
                      System
                    </span>
                  ) : (
                    <div style={{ borderTop: '1px solid #F1F5F9', margin: '6px 4px' }} />
                  )}

                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setMobileSidebarOpen(false);
                    }}
                    title="Settings"
                    style={{
                      width: sidebarCollapsed ? '36px' : '100%',
                      height: '34px',
                      margin: sidebarCollapsed ? '0 auto 4px' : '0 0 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                      gap: '8px',
                      padding: sidebarCollapsed ? '0' : '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'settings' ? '#F1F5F9' : 'transparent',
                      color: activeTab === 'settings' ? '#0F172A' : '#475569',
                      fontSize: '13px',
                      fontWeight: activeTab === 'settings' ? '600' : '500',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconSettings size={15} color={activeTab === 'settings' ? '#0F172A' : '#64748B'} />
                    {!sidebarCollapsed && <span>Settings</span>}
                  </button>
                </div>

              </div>

              {/* Sidebar Footer User Info (No public website button) */}
              <div style={{ padding: sidebarCollapsed ? '12px 6px' : '12px 14px', borderTop: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
                {!sidebarCollapsed ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E2E8F0', color: '#334155', fontWeight: '600', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {getInitials(user?.name, user?.email)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user?.name || 'Administrator'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user?.email || 'admin@ashirwad.com'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      title="Sign Out"
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                    >
                      <IconLogOut size={15} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div
                      title={`${user?.name || 'Administrator'} (${user?.email || 'admin@ashirwad.com'})`}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E2E8F0', color: '#334155', fontWeight: '600', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'default' }}
                    >
                      {getInitials(user?.name, user?.email)}
                    </div>
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      title="Sign Out"
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                    >
                      <IconLogOut size={15} />
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Main Content Area */}
            <div
              style={{
                flex: 1,
                marginLeft: `${effectiveSidebarWidth}px`,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                width: `calc(100% - ${effectiveSidebarWidth}px)`,
                backgroundColor: '#F9FAFB',
                transition: 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              
              {/* Top Navbar: Fixed Header */}
              <header
                style={{
                  position: 'fixed',
                  top: 0,
                  left: `${effectiveSidebarWidth}px`,
                  right: 0,
                  height: '56px',
                  backgroundColor: '#FFFFFF',
                  borderBottom: '1px solid #E5E7EB',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  boxSizing: 'border-box',
                  transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Breadcrumb / Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    style={{
                      display: isMobile ? 'flex' : 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    className="admin-mobile-toggle"
                  >
                    <IconMenu size={18} color="#0F172A" />
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', letterSpacing: '-0.2px' }}>
                    {getPageTitle()}
                  </span>
                </div>

                {/* Right Status Indicators (No view blog link) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: systemStatus.database === 'CONNECTED' ? '#10B981' : '#F59E0B' }} />
                    <span>DB</span>
                  </div>
                  <span>·</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: systemStatus.smtp?.configured ? '#10B981' : '#94A3B8' }} />
                    <span>SMTP</span>
                  </div>
                </div>
              </header>

        {/* Main Content Body (with marginTop for fixed 56px header) */}
        <main style={{ marginTop: '56px', padding: '24px', flex: 1, maxWidth: '1440px', width: '100%', boxSizing: 'border-box' }}>
          <style>{`
            .email-rich-content ul { list-style-type: disc; list-style-position: outside; padding-left: 28px; margin: 10px 0 14px; }
            .email-rich-content ol { list-style-type: decimal; list-style-position: outside; padding-left: 28px; margin: 10px 0 14px; }
            .email-rich-content li { margin-bottom: 5px; padding-left: 4px; }
            .email-rich-content ul ul { list-style-type: circle; margin: 4px 0; }
            .email-rich-content p { margin: 0 0 10px 0; }
          `}</style>
          
          {/* TAB: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <OverviewDashboard
              apiBaseUrl={API_BASE_URL}
              token={token}
              systemStatus={systemStatus}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onCreateNewBlog={() => {
                setEditingBlog(null);
                setActiveTab('new-blog');
              }}
            />
          )}

          {/* TAB: INQUIRIES & CAREER APPLICATIONS */}
          {activeTab === 'inquiries' && (
            <InquiriesManager
              apiBaseUrl={API_BASE_URL}
              token={token}
              onContactsUpdated={() => {
                fetchContactsList();
                fetchAllContactsForAutocomplete();
              }}
            />
          )}

          {/* TAB: BLOG ARTICLES */}
          {activeTab === 'blogs' && (
            <BlogManager
              onEditBlog={(b) => {
                setEditingBlog(b);
                setActiveTab('edit-blog');
              }}
              onCreateNew={() => {
                setEditingBlog(null);
                setActiveTab('new-blog');
              }}
              token={token}
              onNavigate={onNavigate}
            />
          )}

          {/* TAB: CREATE / EDIT BLOG ARTICLE */}
          {(activeTab === 'new-blog' || activeTab === 'edit-blog') && (
            <BlogEditor
              blog={editingBlog}
              onSave={async (data) => {
                await blogService.saveBlog(data, token);
                setEditingBlog(null);
                setActiveTab('blogs');
              }}
              onCancel={() => {
                setEditingBlog(null);
                setActiveTab('blogs');
              }}
              token={token}
            />
          )}

          {/* TAB: CONTACT DIRECTORY & GROUPS */}
          {activeTab === 'contacts' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '20px', alignItems: 'start' }}>
              
              {/* Contacts Table Card */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                      Directory
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                      Audience subscribers and leads segmented by group tags.
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
                        fetchGroups();
                        setShowGroupsModal(true);
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      <IconLayers size={13} color="#64748B" />
                      <span>Groups ({groupsWithCounts.length || availableGroups.length})</span>
                    </button>

                    <button
                      onClick={() => setShowAddModal(true)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      <IconPlus size={13} color="#FFFFFF" />
                      <span>Add Contact</span>
                    </button>

                    <ExportDropdown
                      loading={exportLoading}
                      onExportExcel={handleExportExcel}
                      onExportPdf={() =>
                        exportTableToPdf({
                          title: 'Contacts & Subscribers Directory',
                          subtitle: `Group: ${selectedGroup} • Subscription: ${subscribedFilter}`,
                          summary: [
                            { label: 'Total Directory', value: totalContacts },
                            { label: 'Shown on Page', value: contacts.length }
                          ],
                          columns: [
                            { label: 'Name', accessor: (c) => c.name || '—' },
                            { label: 'Email', key: 'email' },
                            { label: 'Company', accessor: (c) => c.company || '—' },
                            { label: 'Phone', accessor: (c) => c.phone || '—' },
                            { label: 'Groups', accessor: (c) => (c.tags || []).join(', ') },
                            { label: 'Status', accessor: (c) => (c.isSubscribed === false ? 'Unsubscribed' : 'Subscribed') }
                          ],
                          rows: contacts
                        })
                      }
                    />
                  </div>
                </div>

                {/* Filter Toolbar */}
                <div style={{ padding: '10px 16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E5E7EB', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: '#94A3B8' }}>
                      <IconSearch size={14} color="#94A3B8" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, email, or company..."
                      style={{ width: '100%', padding: '6px 10px 6px 30px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '12.5px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '12px', color: '#334155', outline: 'none', minWidth: '150px' }}
                  >
                    <option value="ALL">All Groups ({totalContacts})</option>
                    {availableGroups.map((grp) => {
                      const matched = groupsWithCounts.find((g) => g.name === grp);
                      return (
                        <option key={grp} value={grp}>
                          {grp} {matched ? `(${matched.count})` : ''}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    value={subscribedFilter}
                    onChange={(e) => setSubscribedFilter(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '12px', color: '#334155', outline: 'none' }}
                  >
                    <option value="all">All Status</option>
                    <option value="true">Subscribed</option>
                    <option value="false">Unsubscribed</option>
                  </select>
                </div>

                {/* Bulk Actions Bar */}
                {selectedContactIds.length > 0 && (
                  <div style={{ padding: '8px 16px', backgroundColor: '#EFF6FF', borderBottom: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#1E3A8A' }}>
                      {selectedContactIds.length} contact(s) selected
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={bulkTagInput}
                        onChange={(e) => setBulkTagInput(e.target.value)}
                        placeholder="Tag name..."
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #93C5FD', fontSize: '11.5px', width: '110px' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleBulkContacts('addTag', bulkTagInput)}
                        style={{ padding: '4px 9px', borderRadius: '4px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        + Add Tag
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBulkContacts('subscribe')}
                        style={{ padding: '4px 9px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '11.5px', cursor: 'pointer' }}
                      >
                        Subscribe
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBulkContacts('unsubscribe')}
                        style={{ padding: '4px 9px', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11.5px', cursor: 'pointer' }}
                      >
                        Unsubscribe
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBulkContacts('delete')}
                        style={{ padding: '4px 9px', borderRadius: '4px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {/* Data Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E5E7EB', color: '#64748B', fontSize: '11.5px', fontWeight: '600' }}>
                        <th style={{ padding: '10px 10px 10px 16px', width: '28px' }}>
                          <input
                            type="checkbox"
                            checked={contacts.length > 0 && selectedContactIds.length === contacts.length}
                            onChange={(e) =>
                              setSelectedContactIds(e.target.checked ? contacts.map((c) => c._id) : [])
                            }
                          />
                        </th>
                        <th style={{ padding: '10px 12px' }}>Contact</th>
                        <th style={{ padding: '10px 14px' }}>Company</th>
                        <th style={{ padding: '10px 14px' }}>Group Tag</th>
                        <th style={{ padding: '10px 14px' }}>Source</th>
                        <th style={{ padding: '10px 16px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactsLoading ? (
                        <tr>
                          <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
                            Loading contacts...
                          </td>
                        </tr>
                      ) : contacts.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ padding: '36px', textAlign: 'center' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '2px' }}>No contacts found</div>
                            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                              Import an Excel/CSV file on the right or add a contact manually.
                            </div>
                          </td>
                        </tr>
                      ) : (
                        contacts.map((c) => (
                          <tr 
                            key={c._id} 
                            style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <td style={{ padding: '10px 10px 10px 16px' }}>
                              <input
                                type="checkbox"
                                checked={selectedContactIds.includes(c._id)}
                                onChange={(e) =>
                                  setSelectedContactIds((prev) =>
                                    e.target.checked ? [...prev, c._id] : prev.filter((id) => id !== c._id)
                                  )
                                }
                              />
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155', fontWeight: '600', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  {getInitials(c.name, c.email)}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontWeight: '600', color: '#0F172A' }}>{c.name || 'Unnamed Contact'}</span>
                                  <span style={{ color: '#64748B', fontSize: '11.5px' }}>{c.email}</span>
                                </div>
                              </div>
                            </td>

                            <td style={{ padding: '10px 14px', color: '#475569' }}>
                              {c.company || '—'}
                            </td>

                            <td style={{ padding: '10px 14px' }}>
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {(c.tags || []).map((t, idx) => (
                                  <span key={idx} style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155', border: '1px solid #E2E8F0' }}>
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td style={{ padding: '10px 14px' }}>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>
                                {c.source || 'Website'}
                              </span>
                            </td>

                            <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <button
                                  onClick={() => handleOpenEditModal(c)}
                                  title="Edit"
                                  style={{ background: 'none', border: 'none', padding: '4px', borderRadius: '4px', color: '#64748B', cursor: 'pointer', display: 'inline-flex' }}
                                >
                                  <IconEdit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteContact(c._id)}
                                  title="Delete"
                                  style={{ background: 'none', border: 'none', padding: '4px', borderRadius: '4px', color: '#94A3B8', cursor: 'pointer', display: 'inline-flex' }}
                                >
                                  <IconTrash size={14} />
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
                <div style={{ padding: '10px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', flexWrap: 'wrap', gap: '8px' }}>
                  <span>{totalContacts} total records</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Page {currentPage} of {Math.max(1, Math.ceil(totalContacts / pageSize))}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer', opacity: currentPage <= 1 ? 0.5 : 1 }}
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage >= Math.ceil(totalContacts / pageSize) || contacts.length < pageSize}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', cursor: (currentPage >= Math.ceil(totalContacts / pageSize) || contacts.length < pageSize) ? 'not-allowed' : 'pointer', opacity: (currentPage >= Math.ceil(totalContacts / pageSize) || contacts.length < pageSize) ? 0.5 : 1 }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Spreadsheet Importer Card */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <IconFileSpreadsheet size={16} color="#0F172A" />
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                    Import Contacts
                  </h3>
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 14px 0' }}>
                  Upload Excel or CSV files. A mapping dialog will verify columns before importing.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>
                      Group Tag
                    </label>
                    <select
                      value={uploadGroup}
                      onChange={(e) => setUploadGroup(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#0F172A', outline: 'none' }}
                    >
                      {availableGroups.map((grp) => (
                        <option key={grp} value={grp}>{grp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>
                      Lead Source
                    </label>
                    <select
                      value={uploadSource}
                      onChange={(e) => setUploadSource(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#0F172A', outline: 'none' }}
                    >
                      {LEAD_SOURCES.map((src) => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {uploadSource === 'Other' && (
                  <div style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Specify custom source..."
                      value={uploadCustomSource}
                      onChange={(e) => setUploadCustomSource(e.target.value)}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                )}

                <div
                  style={{
                    border: '1px dashed #CBD5E1',
                    borderRadius: '6px',
                    padding: '20px 14px',
                    textAlign: 'center',
                    backgroundColor: uploadLoading ? '#F1F5F9' : '#F8FAFC',
                    cursor: uploadLoading ? 'wait' : 'pointer'
                  }}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#0F172A'; }}
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

                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', marginBottom: '8px' }}>
                    <IconUploadCloud size={16} color="#64748B" />
                  </div>

                  <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A' }}>
                    {uploadLoading ? 'Reading sheet...' : 'Select or drop .xlsx / .csv'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    Auto-maps fields with live review
                  </div>
                </div>

                {uploadFeedback && (
                  <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', backgroundColor: uploadFeedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: uploadFeedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA', color: uploadFeedback.type === 'success' ? '#166534' : '#991B1B' }}>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                      {uploadFeedback.message}
                    </div>
                    {uploadFeedback.stats && (
                      <div style={{ fontSize: '11px', opacity: 0.9, lineHeight: '1.5', marginTop: '4px' }}>
                        <div>+{uploadFeedback.stats.newAdded} added, {uploadFeedback.stats.updated} updated</div>
                        <div>
                          Total rows: {uploadFeedback.stats.totalRows} · Valid unique: {uploadFeedback.stats.validProcessed} · Invalid skipped: {uploadFeedback.stats.invalidSkipped} · Duplicates in file: {uploadFeedback.stats.duplicatesSkipped ?? Math.max(0, (uploadFeedback.stats.totalRows || 0) - (uploadFeedback.stats.validProcessed || 0) - (uploadFeedback.stats.invalidSkipped || 0))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: EMAIL CAMPAIGN STUDIO */}
          {activeTab === 'campaign' && (
            <div style={{ display: 'grid', gridTemplateColumns: showEmailPreview ? '1fr 380px' : '1fr', gap: '20px', alignItems: 'start' }}>
              
              {/* Compose Studio */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', overflow: 'visible' }}>
                
                {/* Header */}
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                      Composer
                    </h2>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(!showEmailPreview)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: showEmailPreview ? '#F1F5F9' : '#FFFFFF',
                        color: '#334155',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {showEmailPreview ? <IconEyeOff size={13} color="#475569" /> : <IconEye size={13} color="#475569" />}
                      <span>{showEmailPreview ? 'Hide Preview' : 'Preview'}</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Template:</span>
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          const preset = EMAIL_TEMPLATES.find((t) => t.name === val);
                          if (preset) {
                            handleApplyTemplate(preset);
                            return;
                          }
                          const custom = savedTemplates.find((t) => t._id === val);
                          if (custom) {
                            handleApplyTemplate({ subject: custom.subject, html: custom.contentHtml });
                          }
                        }}
                        style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#334155', backgroundColor: '#FFFFFF', outline: 'none' }}
                      >
                        <optgroup label="Built-in Templates">
                          {EMAIL_TEMPLATES.map((t) => (
                            <option key={t.name} value={t.name}>{t.name}</option>
                          ))}
                        </optgroup>
                        {savedTemplates.length > 0 && (
                          <optgroup label="Saved Templates">
                            {savedTemplates.map((t) => (
                              <option key={t._id} value={t._id}>{t.name}</option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                      <button
                        type="button"
                        onClick={handleSaveAsTemplate}
                        style={{ padding: '5px 9px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#334155', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Save Template
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('templates')}
                        style={{ padding: '5px 9px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#2563EB', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>

                {campaignFeedback && (
                  <div style={{ margin: '14px 20px 0', display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px', borderRadius: '6px', fontSize: '12.5px', backgroundColor: campaignFeedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: campaignFeedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA', color: campaignFeedback.type === 'success' ? '#166534' : '#991B1B' }}>
                    {campaignFeedback.type === 'success' ? <IconCheck size={14} color="#166534" /> : <IconAlertCircle size={14} color="#991B1B" />}
                    <span>{campaignFeedback.message}</span>
                  </div>
                )}

                {/* Form Body */}
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Recipient Segmented Row */}
                  <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '2px', borderRadius: '6px' }}>
                        {[
                          { id: 'group', label: 'By Group' },
                          { id: 'direct', label: 'Direct Emails' },
                          { id: 'both', label: 'Group + Direct' }
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setRecipientMode(m.id)}
                            style={{
                              border: 'none',
                              backgroundColor: recipientMode === m.id ? '#FFFFFF' : 'transparent',
                              color: recipientMode === m.id ? '#0F172A' : '#64748B',
                              fontSize: '11.5px',
                              fontWeight: recipientMode === m.id ? '600' : '500',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => setShowCc(!showCc)}
                          style={{ padding: '2px 6px', borderRadius: '4px', border: 'none', background: showCc ? '#F1F5F9' : 'none', color: showCc ? '#0F172A' : '#64748B', fontSize: '11.5px', cursor: 'pointer' }}
                        >
                          Cc
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowBcc(!showBcc)}
                          style={{ padding: '2px 6px', borderRadius: '4px', border: 'none', background: showBcc ? '#F1F5F9' : 'none', color: showBcc ? '#0F172A' : '#64748B', fontSize: '11.5px', cursor: 'pointer' }}
                        >
                          Bcc
                        </button>
                      </div>
                    </div>

                    {(recipientMode === 'group' || recipientMode === 'both') && (
                      <div style={{ marginBottom: recipientMode === 'both' ? '8px' : '0' }}>
                        <select
                          value={selectedCampaignGroup}
                          onChange={(e) => setSelectedCampaignGroup(e.target.value)}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#0F172A', outline: 'none' }}
                        >
                          <option value="ALL">All Active Directory Contacts ({totalContacts} recipients)</option>
                          {availableGroups.map((grp) => (
                            <option key={grp} value={grp}>Group: "{grp}"</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {(recipientMode === 'direct' || recipientMode === 'both') && (
                      <div>
                        <RecipientAutocomplete
                          value={directRecipientsInput}
                          onChange={setDirectRecipientsInput}
                          allContacts={allContactsForAutocomplete}
                          apiBaseUrl={API_BASE_URL}
                          authHeaders={authHeaders}
                          placeholder="Type contact name, company, or email (Gmail-style suggestions)..."
                        />
                      </div>
                    )}

                    {showCc && (
                      <div style={{ marginTop: '8px' }}>
                        <RecipientAutocomplete
                          value={ccInput}
                          onChange={setCcInput}
                          allContacts={allContactsForAutocomplete}
                          apiBaseUrl={API_BASE_URL}
                          authHeaders={authHeaders}
                          placeholder="Cc: type contact name or email..."
                        />
                      </div>
                    )}

                    {showBcc && (
                      <div style={{ marginTop: '8px' }}>
                        <RecipientAutocomplete
                          value={bccInput}
                          onChange={setBccInput}
                          allContacts={allContactsForAutocomplete}
                          apiBaseUrl={API_BASE_URL}
                          authHeaders={authHeaders}
                          placeholder="Bcc: type contact name or email..."
                        />
                      </div>
                    )}
                  </div>

                  {/* Subject Line */}
                  <div>
                    <input
                      type="text"
                      value={campaignSubject}
                      onChange={(e) => setCampaignSubject(e.target.value)}
                      placeholder="Subject Line..."
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13.5px', fontWeight: '600', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  {/* WYSIWYG Content Area */}
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
                    
                    {/* Toolbar */}
                    <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'wrap' }}>
                        <select
                          onChange={(e) => executeCommand('formatBlock', e.target.value)}
                          defaultValue="<p>"
                          style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '11.5px', color: '#334155', outline: 'none' }}
                        >
                          <option value="<p>">Normal</option>
                          <option value="<h2>">Heading 2</option>
                          <option value="<h3>">Heading 3</option>
                        </select>

                        <div style={{ height: '14px', width: '1px', backgroundColor: '#E2E8F0', margin: '0 3px' }} />

                        <button
                          type="button"
                          title="Bold"
                          onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                          style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <IconBold size={12} />
                        </button>

                        <button
                          type="button"
                          title="Italic"
                          onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                          style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <IconItalic size={12} />
                        </button>

                        <button
                          type="button"
                          title="Underline"
                          onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
                          style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <IconUnderline size={12} />
                        </button>

                        <div style={{ height: '14px', width: '1px', backgroundColor: '#E2E8F0', margin: '0 3px' }} />

                        <button
                          type="button"
                          title="Bullet List"
                          onMouseDown={(e) => { e.preventDefault(); executeCommand('insertUnorderedList'); }}
                          style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <IconList size={12} />
                        </button>

                        <button
                          type="button"
                          title="Link"
                          onMouseDown={(e) => { e.preventDefault(); handleAddLink(); }}
                          style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <IconLink size={12} />
                        </button>
                      </div>

                      {/* Merge tags & mode */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{name}}'); }}
                          style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', cursor: 'pointer' }}
                        >
                          + Name
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{company}}'); }}
                          style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', cursor: 'pointer' }}
                        >
                          + Company
                        </button>

                        <button
                          type="button"
                          onClick={toggleEditorMode}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: isHtmlMode ? '#0F172A' : '#FFFFFF', color: isHtmlMode ? '#FFFFFF' : '#475569', fontSize: '11px', cursor: 'pointer' }}
                        >
                          <IconCode size={11} color={isHtmlMode ? '#FFFFFF' : '#475569'} />
                          <span>{isHtmlMode ? 'Visual' : 'Code'}</span>
                        </button>
                      </div>

                    </div>

                    {!isHtmlMode ? (
                      <div
                        ref={visualEditorRef}
                        className="email-rich-content"
                        contentEditable
                        onInput={handleVisualInput}
                        style={{
                          minHeight: '240px',
                          maxHeight: '400px',
                          overflowY: 'auto',
                          padding: '16px',
                          backgroundColor: '#FFFFFF',
                          color: '#0F172A',
                          fontSize: '13.5px',
                          lineHeight: '1.6',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    ) : (
                      <textarea
                        rows="10"
                        value={campaignContent}
                        onChange={(e) => setCampaignContent(e.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '240px',
                          padding: '14px',
                          border: 'none',
                          outline: 'none',
                          fontSize: '12px',
                          color: '#0F172A',
                          fontFamily: 'monospace',
                          boxSizing: 'border-box',
                          backgroundColor: '#F8FAFC'
                        }}
                      />
                    )}
                  </div>

                  {/* Attachments Section */}
                  {emailAttachments.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {emailAttachments.map((att, idx) => (
                        <div
                          key={idx}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', fontSize: '11.5px' }}
                        >
                          <IconPaperclip size={12} color="#64748B" />
                          <span style={{ fontWeight: '500', color: '#0F172A' }}>{att.filename}</span>
                          <span style={{ color: '#94A3B8' }}>({formatFileSize(att.size)})</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                          >
                            <IconClose size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleAttachmentUpload}
                  />

                  {/* Action Bar */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        disabled={campaignLaunching}
                        onClick={handleLaunchCampaign}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        <IconSend size={13} color="#FFFFFF" />
                        <span>{campaignLaunching ? 'Sending...' : 'Send Broadcast'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveCampaignDraft}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#0F172A', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                      >
                        <span>Save Draft</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '12.5px', cursor: 'pointer' }}
                      >
                        <IconPaperclip size={13} color="#64748B" />
                        <span>Attach</span>
                      </button>
                    </div>

                    {/* Test Dispatch Box */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input
                        type="email"
                        placeholder="Test email address..."
                        value={testEmailRecipient}
                        onChange={(e) => setTestEmailRecipient(e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', width: '180px', outline: 'none' }}
                      />
                      <button
                        type="button"
                        disabled={testEmailSending}
                        onClick={handleSendTestEmail}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}
                      >
                        {testEmailSending ? 'Sending...' : 'Send Test'}
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* Clean Email Preview Pane */}
              {showEmailPreview && (
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '16px', position: 'sticky', top: '80px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                      Preview
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(false)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', padding: '2px' }}
                    >
                      <IconClose size={15} />
                    </button>
                  </div>

                  <div style={{ borderRadius: '6px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    {/* Clean Minimal Email Header (No flashy gradient) */}
                    <div style={{ backgroundColor: '#0F172A', padding: '14px 18px', color: '#FFFFFF' }}>
                      <img
                        src="/logo-white.webp"
                        alt="Logo"
                        style={{ height: '20px', width: 'auto', marginBottom: '8px', display: 'block' }}
                      />
                      <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#FFFFFF' }}>
                        {campaignSubject || 'Subject preview'}
                      </div>
                    </div>

                    <div style={{ padding: '18px 16px', backgroundColor: '#FFFFFF', fontSize: '12.5px', lineHeight: '1.6', color: '#1E293B', minHeight: '180px' }}>
                      <div
                        className="email-rich-content"
                        dangerouslySetInnerHTML={{
                          __html: campaignContent
                            .replace(/{{name}}/gi, 'Valued Client')
                            .replace(/{{company}}/gi, 'Your Organization')
                        }}
                      />

                      {emailAttachments.length > 0 && (
                        <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px dashed #E2E8F0', fontSize: '11.5px', color: '#64748B' }}>
                          <span>Attachments ({emailAttachments.length}):</span>
                          <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {emailAttachments.map((a, i) => (
                              <span key={i} style={{ color: '#0F172A' }}>• {a.filename}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '11px', color: '#94A3B8', textAlign: 'center' }}>
                      Ashirwad Plastics
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: CAMPAIGN TEMPLATES */}
          {activeTab === 'templates' && (
            <TemplatesManager
              savedTemplates={savedTemplates}
              builtInTemplates={EMAIL_TEMPLATES}
              apiBaseUrl={API_BASE_URL}
              authHeaders={authHeaders}
              onTemplatesChanged={fetchSavedTemplates}
              onUseTemplate={(tpl) => {
                handleApplyTemplate({ subject: tpl.subject, html: tpl.html });
                setActiveTab('campaign');
                setCampaignFeedback({ type: 'success', message: `Loaded template "${tpl.name}" into Composer.` });
              }}
            />
          )}

          {/* TAB: CAMPAIGN HISTORY */}
          {activeTab === 'history' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                    Broadcast History
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                    Audit trail of past dispatches, drafts, and delivery statuses.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <ExportDropdown
                    onExportExcel={() =>
                      exportTableToExcel(
                        'Ashirwad_Broadcast_History.xls',
                        'Broadcast History',
                        [
                          { label: 'Subject', key: 'subject' },
                          { label: 'Status', key: 'status' },
                          { label: 'Audience', accessor: (c) => (c.targetTags?.length > 0 ? c.targetTags.join(', ') : `${c.directRecipients?.length || 0} direct`) },
                          { label: 'Delivered', accessor: (c) => c.sentCount || 0 },
                          { label: 'Failed', accessor: (c) => c.failedCount || 0 },
                          { label: 'Date', accessor: (c) => new Date(c.createdAt).toLocaleDateString() }
                        ],
                        campaigns
                      )
                    }
                    onExportPdf={() =>
                      exportTableToPdf({
                        title: 'Email Broadcast History Report',
                        subtitle: 'Campaign delivery & audit summary',
                        summary: [
                          { label: 'Total Campaigns', value: campaigns.length },
                          { label: 'Total Delivered', value: campaigns.reduce((s, c) => s + (c.sentCount || 0), 0) },
                          { label: 'Total Failed', value: campaigns.reduce((s, c) => s + (c.failedCount || 0), 0) }
                        ],
                        columns: [
                          { label: 'Subject', key: 'subject' },
                          { label: 'Status', key: 'status' },
                          { label: 'Audience', accessor: (c) => (c.targetTags?.length > 0 ? c.targetTags.join(', ') : `${c.directRecipients?.length || 0} direct`) },
                          { label: 'Delivered', accessor: (c) => c.sentCount || 0 },
                          { label: 'Failed', accessor: (c) => c.failedCount || 0 },
                          { label: 'Date', accessor: (c) => new Date(c.createdAt).toLocaleDateString() }
                        ],
                        rows: campaigns
                      })
                    }
                  />
                  <button
                    onClick={fetchCampaignHistory}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <IconRefresh size={13} color="#64748B" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {campaignsLoading ? (
                <div style={{ padding: '36px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>Loading history...</div>
              ) : campaigns.length === 0 ? (
                <div style={{ padding: '36px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                  No past campaigns found.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E5E7EB', color: '#64748B', fontSize: '11.5px', fontWeight: '600' }}>
                        <th style={{ padding: '10px 14px' }}>Subject</th>
                        <th style={{ padding: '10px 12px' }}>Status</th>
                        <th style={{ padding: '10px 12px' }}>Audience</th>
                        <th style={{ padding: '10px 12px' }}>Delivered</th>
                        <th style={{ padding: '10px 12px' }}>Failed</th>
                        <th style={{ padding: '10px 12px' }}>Date</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
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
                          <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0F172A' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{camp.subject}</span>
                              {camp.attachments?.length > 0 && (
                                <span style={{ fontSize: '10.5px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '1px 5px', borderRadius: '4px' }}>
                                  {camp.attachments.length} file(s)
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              backgroundColor: camp.status === 'COMPLETED' ? '#ECFDF5' : camp.status === 'PROCESSING' ? '#FEF3C7' : '#FEF2F2',
                              color: camp.status === 'COMPLETED' ? '#065F46' : camp.status === 'PROCESSING' ? '#92400E' : '#991B1B'
                            }}>
                              {camp.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', color: '#475569' }}>
                            {camp.targetTags?.length > 0 ? camp.targetTags.join(', ') : `${camp.directRecipients?.length || 0} direct`}
                          </td>
                          <td style={{ padding: '10px 12px', color: '#059669', fontWeight: '600' }}>
                            {camp.sentCount || 0}
                          </td>
                          <td style={{ padding: '10px 12px', color: camp.failedCount > 0 ? '#DC2626' : '#94A3B8' }}>
                            {camp.failedCount || 0}
                          </td>
                          <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '11.5px' }}>
                            {new Date(camp.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => handleCloneCampaign(camp)}
                                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                              >
                                {camp.status === 'DRAFT' ? 'Resume' : 'Clone'}
                              </button>
                              {camp.failedCount > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleRetryFailedCampaign(camp._id)}
                                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #FDE68A', backgroundColor: '#FFFBEB', color: '#B45309', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                  Retry Failed
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  downloadAuthorizedFile(
                                    `${API_BASE_URL}/campaigns/${camp._id}/export`,
                                    token,
                                    `Campaign_${camp._id}.xlsx`
                                  )
                                }
                                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                              >
                                Excel
                              </button>
                              <button
                                onClick={() => handleOpenCampaignInspector(camp)}
                                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                              >
                                Inspect
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsPanel
              apiBaseUrl={API_BASE_URL}
              token={token}
              user={user}
              onUserUpdated={(updatedUser) => setUser(updatedUser)}
              systemStatus={systemStatus}
              onRefreshDiagnostics={fetchSystemStatus}
              totalContacts={totalContacts}
              totalCampaigns={campaigns.length}
              purgeLoading={purgeLoading}
              purgeFeedback={purgeFeedback}
              onPurgeData={handlePurgeAllTestData}
            />
          )}

        </main>
      </div>

      {/* ==================== LOGOUT MODAL ==================== */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '360px', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '22px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
              Sign Out
            </h3>
            <p style={{ margin: '0 0 18px 0', fontSize: '12.5px', color: '#64748B' }}>
              Are you sure you want to log out of the admin panel?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                style={{ flex: 1, padding: '7px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '12.5px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                style={{ flex: 1, padding: '7px', borderRadius: '6px', border: 'none', backgroundColor: '#DC2626', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ADD CONTACT MODAL ==================== */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>Add Contact</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <IconClose size={16} />
              </button>
            </div>

            <form onSubmit={handleManualAddContact} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Email *</label>
                <input
                  type="email"
                  required
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="contact@company.com"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Contact Name"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Company</label>
                <input
                  type="text"
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  placeholder="Company Name"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Phone</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="+91..."
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Group Tag</label>
                <select
                  value={newContact.group}
                  onChange={(e) => setNewContact({ ...newContact, group: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', outline: 'none' }}
                >
                  {availableGroups.map((grp) => (
                    <option key={grp} value={grp}>{grp}</option>
                  ))}
                  <option value="__NEW__">+ New Group...</option>
                </select>
                {newContact.group === '__NEW__' && (
                  <input
                    type="text"
                    required
                    placeholder="New group name..."
                    value={newContact.customGroup}
                    onChange={(e) => setNewContact({ ...newContact, customGroup: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', marginTop: '6px', boxSizing: 'border-box', outline: 'none' }}
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Source</label>
                <select
                  value={newContact.source}
                  onChange={(e) => setNewContact({ ...newContact, source: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', outline: 'none' }}
                >
                  {LEAD_SOURCES.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', cursor: 'pointer', fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addContactLoading}
                  style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontWeight: '600', cursor: 'pointer', fontSize: '12px' }}
                >
                  {addContactLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== EDIT CONTACT MODAL ==================== */}
      {showEditModal && editingContact && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>Edit Contact</h3>
              <button onClick={() => { setShowEditModal(false); setEditingContact(null); }} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <IconClose size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Email *</label>
                <input
                  type="email"
                  required
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Name</label>
                <input
                  type="text"
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Company</label>
                <input
                  type="text"
                  value={editingContact.company}
                  onChange={(e) => setEditingContact({ ...editingContact, company: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '3px' }}>Phone</label>
                <input
                  type="tel"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '5px' }}>
                  Group Tags ({editingContact.tags?.length || 0} selected)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '110px', overflowY: 'auto', padding: '6px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  {Array.from(new Set([...availableGroups, ...(editingContact.tags || [])])).map((grp) => {
                    const isSelected = (editingContact.tags || []).includes(grp);
                    return (
                      <button
                        key={grp}
                        type="button"
                        onClick={() => {
                          const current = editingContact.tags || [];
                          const next = isSelected
                            ? current.filter((t) => t !== grp)
                            : [...current, grp];
                          setEditingContact({ ...editingContact, tags: next });
                        }}
                        style={{
                          padding: '4px 9px',
                          borderRadius: '999px',
                          border: isSelected ? '1px solid #0F172A' : '1px solid #CBD5E1',
                          backgroundColor: isSelected ? '#0F172A' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          fontSize: '11.5px',
                          fontWeight: isSelected ? '600' : '500',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected ? `✓ ${grp}` : grp}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <input
                    type="text"
                    placeholder="Add new group tag..."
                    value={editingContact.newGroupInput || ''}
                    onChange={(e) => setEditingContact({ ...editingContact, newGroupInput: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (editingContact.newGroupInput || '').trim();
                        if (!val) return;
                        const nextTags = Array.from(new Set([...(editingContact.tags || []), val]));
                        setAvailableGroups((prev) => Array.from(new Set([...prev, val])));
                        setEditingContact({ ...editingContact, tags: nextTags, newGroupInput: '' });
                      }
                    }}
                    style={{ flex: 1, padding: '6px 9px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = (editingContact.newGroupInput || '').trim();
                      if (!val) return;
                      const nextTags = Array.from(new Set([...(editingContact.tags || []), val]));
                      setAvailableGroups((prev) => Array.from(new Set([...prev, val])));
                      setEditingContact({ ...editingContact, tags: nextTags, newGroupInput: '' });
                    }}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#0F172A', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingContact(null); }}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', cursor: 'pointer', fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editContactLoading}
                  style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontWeight: '600', cursor: 'pointer', fontSize: '12px' }}
                >
                  {editContactLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MANAGE GROUPS MODAL ==================== */}
      {showGroupsModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '440px', maxHeight: '80vh', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>Contact Groups</h3>
              <button onClick={() => setShowGroupsModal(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <IconClose size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateNewGroup(newGroupNameInput);
              }}
              style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}
            >
              <input
                type="text"
                placeholder="New group name..."
                value={newGroupNameInput}
                onChange={(e) => setNewGroupNameInput(e.target.value)}
                style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={!newGroupNameInput.trim()}
                style={{
                  padding: '7px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: newGroupNameInput.trim() ? '#0F172A' : '#E2E8F0',
                  color: newGroupNameInput.trim() ? '#FFFFFF' : '#94A3B8',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: newGroupNameInput.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Create
              </button>
            </form>

            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(() => {
                const allGroupNames = Array.from(new Set([
                  ...groupsWithCounts.map((g) => g.name),
                  ...availableGroups
                ])).filter(Boolean);

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
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      {isEditingThis ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                          <input
                            type="text"
                            value={editingGroup.newName}
                            onChange={(e) => setEditingGroup({ ...editingGroup, newName: e.target.value })}
                            style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid #0F172A', fontSize: '12px', outline: 'none' }}
                            autoFocus
                          />
                          <button
                            type="button"
                            disabled={renamingGroupLoading || !editingGroup.newName.trim()}
                            onClick={handleSaveRenameGroup}
                            style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingGroup(null)}
                            style={{ padding: '4px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', fontSize: '11px', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                            <IconFolder size={14} color="#64748B" />
                            <span style={{ fontWeight: '500', color: '#0F172A', fontSize: '12.5px' }}>{groupName}</span>
                            <span style={{ fontSize: '11px', color: '#64748B' }}>
                              ({count})
                            </span>
                            <button
                              type="button"
                              onClick={() => setEditingGroup({ oldName: groupName, newName: groupName })}
                              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex' }}
                            >
                              <IconEdit size={12} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedGroup(groupName);
                                setShowGroupsModal(false);
                              }}
                              style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', cursor: 'pointer' }}
                            >
                              Filter
                            </button>
                            {groupName !== 'General' && (
                              <button
                                type="button"
                                onClick={() => handleDeleteGroup(groupName)}
                                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '3px', display: 'flex' }}
                              >
                                <IconTrash size={13} />
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

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowGroupsModal(false)}
                style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SPREADSHEET MAPPING MODAL ==================== */}
      {sheetModalOpen && sheetPreviewData && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '780px', maxHeight: '85vh', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '22px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
                  Column Mapping
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                  File: {sheetStagedFile?.name} ({sheetPreviewData.totalRows} rows)
                </p>
              </div>

              <button onClick={() => setSheetModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <IconClose size={18} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Field mapping grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                    Email Column *
                  </label>
                  <select
                    value={mappingState.emailCol}
                    onChange={(e) => setMappingState({ ...mappingState, emailCol: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none' }}
                  >
                    <option value="">-- Select Column --</option>
                    {sheetPreviewData.columns.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                    Contact Name Column
                  </label>
                  <select
                    value={mappingState.nameCol}
                    onChange={(e) => setMappingState({ ...mappingState, nameCol: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none' }}
                  >
                    <option value="">(None)</option>
                    {sheetPreviewData.columns.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                    Company Column
                  </label>
                  <select
                    value={mappingState.companyCol}
                    onChange={(e) => setMappingState({ ...mappingState, companyCol: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none' }}
                  >
                    <option value="">(None)</option>
                    {sheetPreviewData.columns.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                    Phone Column
                  </label>
                  <select
                    value={mappingState.phoneCol}
                    onChange={(e) => setMappingState({ ...mappingState, phoneCol: e.target.value })}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#0F172A', outline: 'none' }}
                  >
                    <option value="">(None)</option>
                    {sheetPreviewData.columns.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sample Rows Preview */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', display: 'block', marginBottom: '6px' }}>
                  Data Sample (First 5 Rows)
                </span>
                <div style={{ overflowX: 'auto', borderRadius: '6px', border: '1px solid #E2E8F0', maxHeight: '180px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11.5px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        {sheetPreviewData.columns.map((col) => (
                          <th key={col} style={{ padding: '6px 10px', color: '#64748B', fontWeight: '600', whiteSpace: 'nowrap' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sheetPreviewData.sampleRows.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          {sheetPreviewData.columns.map((col) => (
                            <td key={col} style={{ padding: '6px 10px', color: '#334155', whiteSpace: 'nowrap' }}>
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

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSheetModalOpen(false)}
                style={{ padding: '7px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '12px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={importInProgress || !mappingState.emailCol}
                onClick={handleExecuteConfirmedImport}
                style={{
                  padding: '7px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: mappingState.emailCol && !importInProgress ? '#0F172A' : '#94A3B8',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: mappingState.emailCol && !importInProgress ? 'pointer' : 'not-allowed'
                }}
              >
                {importInProgress ? 'Importing...' : `Import (${sheetPreviewData.totalRows} Contacts)`}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== CAMPAIGN DETAILS INSPECTOR MODAL ==================== */}
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
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
            onClick={() => setSelectedCampaignDetails(null)}
          >
            <div
              style={{ width: '100%', maxWidth: '720px', height: '80vh', backgroundColor: '#FFFFFF', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #E5E7EB' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F8FAFC' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: '700', color: '#0F172A' }}>
                    {selectedCampaignDetails.subject}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>
                    {new Date(selectedCampaignDetails.createdAt).toLocaleString()} · {selectedCampaignDetails.status}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetails(null)}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
                >
                  <IconClose size={16} />
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', padding: '0 18px', backgroundColor: '#FFFFFF' }}>
                <button
                  type="button"
                  onClick={() => setCampaignModalTab('email')}
                  style={{ padding: '8px 12px', border: 'none', background: 'none', borderBottom: campaignModalTab === 'email' ? '2px solid #0F172A' : '2px solid transparent', color: campaignModalTab === 'email' ? '#0F172A' : '#64748B', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Message
                </button>
                <button
                  type="button"
                  onClick={() => setCampaignModalTab('recipients')}
                  style={{ padding: '8px 12px', border: 'none', background: 'none', borderBottom: campaignModalTab === 'recipients' ? '2px solid #0F172A' : '2px solid transparent', color: campaignModalTab === 'recipients' ? '#0F172A' : '#64748B', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Recipients ({allRecipientsList.length})
                </button>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
                {campaignModalTab === 'email' ? (
                  <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#1E293B' }}>
                    <div
                      className="email-rich-content"
                      dangerouslySetInnerHTML={{
                        __html: selectedCampaignDetails.contentHtml
                          .replace(/{{name}}/gi, 'Client Name')
                          .replace(/{{company}}/gi, 'Organization')
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={campaignRecipientSearch}
                      onChange={(e) => setCampaignRecipientSearch(e.target.value)}
                      placeholder="Filter recipients..."
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }}
                    />
                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '4px', overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11px' }}>
                            <th style={{ padding: '6px 10px' }}>Email</th>
                            <th style={{ padding: '6px 10px' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRecipients.map((rec, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '6px 10px', color: '#0F172A' }}>{rec.email}</td>
                              <td style={{ padding: '6px 10px' }}>
                                <span style={{ fontSize: '10.5px', color: rec.status === 'DELIVERED' ? '#059669' : '#DC2626' }}>
                                  {rec.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '10px 18px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#F8FAFC' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetails(null)}
                  style={{ padding: '5px 12px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12px', cursor: 'pointer' }}
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
