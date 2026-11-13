# Ashirwad Plastics — Admin Panel Quick Guide

Access the Admin Panel at **`/admin`** (e.g., `https://ashirwadplastics.com/admin`).

---

## 1. What’s Inside the Admin Panel

| Section | Purpose |
| :--- | :--- |
| **Overview** | Snapshot of total contacts, inquiries, published articles, email campaigns, and quick-action shortcuts. |
| **Inquiries & Jobs** | Unified inbox for all website submissions, organized by type (**Product Inquiry**, **Career Application**, **Newsletter**). Open any row to view details, update status, **Add to Contacts**, or **Delete**. |
| **Articles (Blog)** | Create, edit, publish/unpublish, and delete blog posts. Includes an **Image Gallery** picker, rich formatting, and automatic read-time calculation (with manual override). |
| **Contacts** | B2B contact directory with **Group/Tag** management, **Excel/CSV Import** (with column mapping), bulk actions (tag, subscribe/unsubscribe, delete), and Excel/PDF export. |
| **Email Campaigns** | Compose and send emails by **Group**, **Direct Emails**, or **Group + Direct**, with Gmail-style recipient autocomplete, Cc/Bcc, attachments, live preview, **Send Test**, and **Save Draft**. |
| **Templates** | Dedicated manager to create, edit, duplicate, preview, and delete reusable email templates with `{{name}}`, `{{company}}`, and `{{email}}` variables. |
| **Broadcast History** | Track sent campaigns and drafts, inspect per-recipient delivery status, **Retry Failed** emails, resume drafts, and export reports. |
| **Settings** | View admin account status, verify MongoDB & SMTP health, send diagnostic test emails, and manage maintenance/purge tools. |

---

## 2. How It Connects to the Public Website

- **Contact Page (`/contact` — Product Tab)** & **Products Page (`/products` Quote Modal)** → Submissions appear under **Inquiries & Jobs → Product Inquiries**.
- **Contact Page (`/contact` — Careers Tab)** & **Careers Page (`/careers` Apply Modal)** → Submissions appear under **Inquiries & Jobs → Career Applications**.
- **Website Footer Newsletter Form** → Submissions appear under **Inquiries & Jobs → Newsletter**.
- **Articles (Blog)** → Published articles immediately appear on **`/blog`** and **`/blog/:slug`**; drafts remain hidden from visitors.
- **Email Unsubscribe Footer** → Every campaign email includes an automatic unsubscribe link wired to the Contacts database (`isSubscribed: false`).

---

## 3. Practical Tips

- **Personalize Emails Automatically**: Insert `{{name}}`, `{{company}}`, or `{{email}}` in templates or campaigns—each recipient receives their own details (with safe fallbacks if a field is blank).
- **Turn Leads Into Subscribers**: Open any Product Inquiry in **Inquiries & Jobs** and click **Add to Contacts** inside the modal to move them straight into a campaign group.
- **Save Time With Templates**: Build your recurring announcements or follow-ups in **Templates**, then click **Use in Campaign** to load them into the Composer in one click.
- **Test Before Sending**: Use **Send Test** in **Email Campaigns** to verify formatting, links, and attachments in your own inbox before sending to a full group.
- **Export Anytime**: Use the **Export** dropdown (Excel `.xlsx` or `.pdf`) in **Inquiries**, **Contacts**, and **Broadcast History** for offline reporting.

