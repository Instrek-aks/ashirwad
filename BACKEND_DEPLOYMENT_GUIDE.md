# Ashirwad Plastics Website & CRM Backend - Multi-App Contabo VPS Deployment Guide

This guide provides instructions to deploy the **Ashirwad Plastics Website Backend** (Express, MongoDB Atlas, Zoho SMTP, Admin CRM & Blogs) on your **existing Contabo VPS (`13.140.57.60`)** alongside your active **Ashirwad ERP Backend** without causing conflicts or downtime.

---

## 🏗️ 1. Multi-App VPS Architecture Overview

Both backends run concurrently as isolated PM2 processes on the same server, proxied through Nginx via separate subdomains and ports.

```mermaid
graph TD
    Client[Visitor / Website Browser]
    ERP_Client[ERP User Browser]
    
    CF[Cloudflare DNS & WAF]
    Nginx[Contabo VPS - Nginx Reverse Proxy]
    
    PM2_ERP[PM2: ashirwad-backend - Port 3000]
    PM2_Web[PM2: ashirwad-website-backend - Port 5000]
    
    Supabase[(Supabase PostgreSQL - ERP)]
    Mongo[(MongoDB Atlas - Website)]
    Resend[Resend Mail - ERP]
    Zoho[Zoho SMTP - Website]

    Client -->|site-api.ashirwadplastics.com| CF
    ERP_Client -->|api.ashirwadplastics.com| CF
    
    CF -->|Port 443 SSL| Nginx
    
    Nginx -->|Proxy Host: api.ashirwadplastics.com| PM2_ERP
    Nginx -->|Proxy Host: site-api.ashirwadplastics.com| PM2_Web
    
    PM2_ERP --> Supabase
    PM2_ERP --> Resend
    
    PM2_Web --> Mongo
    PM2_Web --> Zoho
```

### Side-by-Side Coexistence Mapping

| Service / Parameter | Ashirwad ERP Backend (Existing) | Ashirwad Website Backend (New) | Conflict Risk & Mitigation |
| :--- | :--- | :--- | :--- |
| **Directory** | `/var/www/AshirwadErp/backend` | `/var/www/ashirwad-website/backend` | Separated folders |
| **Git Repository** | `Charu-sarswat/AshirwadErp.git` | `Instrek-aks/ashirwad.git` | Distinct repos & deploy keys |
| **Local Port** | `127.0.0.1:3000` | `127.0.0.1:5000` | No port clash |
| **PM2 Process Name** | `ashirwad-backend` | `ashirwad-website-backend` | Independent process control |
| **PM2 Config** | `dist/index.js` (TypeScript) | `ecosystem.config.cjs` (ESM) | No build step required for website |
| **Public Subdomain** | `api.ashirwadplastics.com` | `site-api.ashirwadplastics.com` | Dedicated Cloudflare DNS A record |
| **Nginx Site Config** | `/etc/nginx/sites-available/ashirwad-api` | `/etc/nginx/sites-available/ashirwad-website-api` | Independent virtual hosts |
| **Nginx Rate Limit Zone** | `zone=api_limit` | `zone=website_api_limit` | Separate memory zones |
| **Database** | Supabase (PostgreSQL) | MongoDB Atlas | Isolated cloud DBs |
| **Email Service** | Resend API | Zoho SMTP (`smtp.zoho.in:587`) | Independent mailers |

---

## 🔒 2. Backend Production `.env` (`/var/www/ashirwad-website/backend/.env`)

Create this file on your VPS at `/var/www/ashirwad-website/backend/.env`:

```env
PORT=5000
NODE_ENV=production

# Frontend Client URLs (Allowed CORS Origins)
CLIENT_URL=https://ashirwadplastics.com,https://www.ashirwadplastics.com,https://ashirwad-plastics.pages.dev,http://localhost:5173

# MongoDB Atlas Database Connection
MONGO_URI=mongodb+srv://abcd:abcd@cluster0.fsxomwi.mongodb.net/AshirwadPlatics?retryWrites=true&w=majority&appName=Cluster0

# Admin Authentication (JWT)
JWT_SECRET=ashirwad_super_secure_jwt_secret_key_2026_change_in_production
JWT_EXPIRES_IN=7d

# Default Super Admin Seed Credentials
DEFAULT_ADMIN_EMAIL=admin@ashirwad.com
DEFAULT_ADMIN_PASSWORD=Admin@12345

# Zoho SMTP Email Configuration
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=admin@notelia.com
SMTP_PASS=0"N:@X'Q"L
EMAIL_FROM_NAME="Ashirwad Plastics Admin"
EMAIL_FROM_ADDRESS=admin@notelia.com
```

---

## 🌐 3. Cloudflare DNS Setup

In your Cloudflare Dashboard under DNS management for `ashirwadplastics.com`:

| Type | Name | IPv4 Address | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `site-api` | `13.140.57.60` | **Proxied (Orange Cloud 🟠)** | Auto |

*(If you prefer another subdomain name, such as `web-api` or `crm-api`, simply use that name instead).*

---

## 🚀 4. Step-by-Step VPS Deployment Runbook

### Step 1: Connect to VPS
```bash
ssh root@13.140.57.60
```

### Step 2: Generate Dedicated SSH Deploy Key on VPS
GitHub does **not** allow the same Deploy Key to be reused across different repositories. Since your default key was already used for the ERP repository, generate a dedicated key for this website:

```bash
# 1. Generate a new SSH key specifically for this website
ssh-keygen -t ed25519 -C "ashirwad-website-deploy" -f ~/.ssh/id_ed25519_website -N ""

# 2. Print the new public key
cat ~/.ssh/id_ed25519_website.pub
```
1. Copy the printed key (`ssh-ed25519 AAA...`).
2. Go to **`https://github.com/Instrek-aks/ashirwad/settings/keys`**.
3. Click **Add deploy key** $\rightarrow$ Title: `Contabo VPS Website Key` $\rightarrow$ Paste key $\rightarrow$ Click **Add key**.

Next, configure SSH on your VPS to automatically route requests for this repository through the new key:
```bash
cat << 'EOF' >> ~/.ssh/config

Host github-website
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_website
    IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
```

### Step 3: Clone Repository & Install Backend
```bash
# Navigate to web root and clone using the dedicated host alias
cd /var/www
git clone git@github-website:Instrek-aks/ashirwad.git ashirwad-website

# (Note: If this GitHub repo is public, you can simply do:
# git clone https://github.com/Instrek-aks/ashirwad.git ashirwad-website)

# Enter backend folder and install production dependencies
cd /var/www/ashirwad-website/backend
npm install --omit=dev
```

### Step 4: Configure Production `.env`
```bash
nano /var/www/ashirwad-website/backend/.env
```
Paste the environment configuration from **Section 2**, then press `CTRL+O`, `Enter`, and `CTRL+X` to save.

### Step 5: Start Website Backend with PM2
```bash
cd /var/www/ashirwad-website/backend
pm2 start ecosystem.config.cjs
pm2 save
```

Verify both backends are running side-by-side:
```bash
pm2 status
```
*You should see both `ashirwad-backend` (ERP) and `ashirwad-website-backend` (Website) with `online` status.*

Test the local health check:
```bash
curl http://localhost:5000/health
# Expected Output: {"status":"healthy","timestamp":"...","service":"Ashirwad Bulk Email & CRM API"}
```

---

## 🛡️ 5. Nginx Reverse Proxy & SSL Setup

### Step 1: Create Nginx Virtual Host
```bash
nano /etc/nginx/sites-available/ashirwad-website-api
```

Paste the following configuration:
```nginx
# Rate Limiting Zone for Website API (Dedicated zone name to avoid conflict with ERP)
limit_req_zone $binary_remote_addr zone=website_api_limit:10m rate=30r/s;

server {
    listen 80;
    listen [::]:80;
    server_name site-api.ashirwadplastics.com;

    # Payload buffer for file uploads (contacts sheet, blog images)
    client_max_body_size 25M;

    # Enterprise Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Block access to hidden system and credential files
    location ~ /\.(env|git|htaccess|config) {
        deny all;
        return 404;
    }

    location / {
        limit_req zone=website_api_limit burst=60 nodelay;

        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Forward real client IP from Cloudflare
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for bulk mailing / campaign requests
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}
```

### Step 2: Enable Virtual Host & Verify
```bash
ln -sf /etc/nginx/sites-available/ashirwad-website-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 3: Issue Let's Encrypt SSL Certificate
```bash
certbot --nginx -d site-api.ashirwadplastics.com --non-interactive --agree-tos -m info@ashirwadplastics.com
```

### Step 4: Verify Public Endpoint
```bash
curl https://site-api.ashirwadplastics.com/health
```

---

## ⚡ 6. Automated CI/CD (Auto-Deploy on Push)

A GitHub Actions workflow is provided at `.github/workflows/deploy-backend.yml`. Whenever you push backend changes to the `main` branch, it deploys automatically to your Contabo VPS.

### Configure GitHub Secrets
In your GitHub Repository: **`https://github.com/Instrek-aks/ashirwad/settings/secrets/actions`**, add:
- `VPS_HOST`: `13.140.57.60`
- `VPS_USER`: `root`
- `VPS_PASSWORD`: *(Your Contabo VPS root password)*

---

## 🖥️ 7. Frontend Environment Variable Update

For your frontend deployment (Cloudflare Pages or Vercel):
Add or update the following environment variable:
```env
VITE_API_BASE_URL=https://site-api.ashirwadplastics.com/api/v1
```

---

## 🛠️ 8. Maintenance, Health & Troubleshooting

| Action | Command |
| :--- | :--- |
| **Check PM2 status (both apps)** | `pm2 status` |
| **View Website live logs** | `pm2 logs ashirwad-website-backend` |
| **View Website error logs** | `pm2 logs ashirwad-website-backend --err --lines 50` |
| **View ERP live logs** | `pm2 logs ashirwad-backend` |
| **Restart Website Backend only** | `pm2 restart ashirwad-website-backend` |
| **Zero-downtime Website reload** | `pm2 reload ashirwad-website-backend` |
| **Check Nginx syntax** | `nginx -t` |
| **Reload Nginx** | `systemctl reload nginx` |
| **Test Website Backend local** | `curl http://127.0.0.1:5000/health` |
| **Test ERP Backend local** | `curl http://127.0.0.1:3000/health` |

