# Hammer House | Florida Certified Roofing Appointment Funnel

A high-converting, mobile-first appointment and lead generation engine engineered specifically for the **Florida roofing market**, featuring multi-step micro-commitments, real-time Florida zip/address lookup, phone masking, ironclad security, GoHighLevel (GHL) webhook sync, and one-click Railway deployment with PostgreSQL & Prisma.

---

## 🔨 Tech Stack & Key Features

- **Framework**: Next.js 14+ (App Router) with TypeScript & Server-Side pre-rendering.
- **Styling & Design System**: Tailwind CSS with custom Artisan Burgundy (`#8B1E2D`), Warm Linen (`#FAF8F5`), and Playfair Display serif typography.
- **State & Fluid Motion**: High-performance multi-step state machine with tactile button feedback and dynamic progress indicator.
- **Florida-Specific Intelligence**:
  - Validates Florida 5-digit zip codes (`32004`–`34997`) and resolves local cities across all 67 counties.
  - Interactive Florida street address autocomplete.
  - Florida DBPR Certified (CCC License) and 130+ MPH hurricane wind code trust triggers.
- **Data Protection & Anti-Spam**:
  - Live phone auto-masking `(XXX) XXX-XXXX` and test/bogus number filtering.
  - Email domain typo detection (`@gmai.com` $\to$ instant correction suggestion).
  - Server-side Zod schema validation & IP rate limiting.
  - Florida Mini-TCPA (FSS 501.059) and Federal TCPA compliant consent audit logging.
- **CRM Integration**:
  - Automatic real-time webhook dispatch to **GoHighLevel (GHL)**.
- **Database & Deployment**:
  - Prisma ORM with PostgreSQL schema.
  - Pre-configured for **Railway** deployment.

---

## 🚀 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Connecting to GoHighLevel (GHL)

1. Open your **GoHighLevel** account.
2. Navigate to **Automation** $\to$ **Workflows** $\to$ **Create Workflow**.
3. Add a new trigger and select **"Inbound Webhook"**.
4. Copy the unique Webhook URL provided by GHL (e.g., `https://services.leadconnectorhq.com/hooks/...`).
5. Paste it into your `.env` file (or into Railway environment variables):
   ```env
   GHL_WEBHOOK_URL="https://services.leadconnectorhq.com/hooks/your_inbound_webhook_id"
   ```

When a lead submits, Hammer House sends a clean, structured JSON payload with:
- `firstName`, `lastName`, `fullName`, `phone`, `email`
- `address1`, `city`, `state`, `postalCode`
- `service_type` (*"Replacement"*, *"Repair"*, *"Inspection"*)
- `leadCode` (*e.g. "HH-FL-89210"*)
- `tcpa_consent_granted`, `ip_address`, `submitted_at`
- Tags: `["Hammer House", "Florida Lead", "Service: Replacement", "Appointment Request"]`

---

## 🚆 1-Click Railway Deployment Guide

### Step 1: Create a GitHub Repository
1. Push this local directory to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hammer House Florida Roofing Appointment Funnel"
   git remote add origin https://github.com/your-username/hammer-house-florida.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Railway
1. Log in to [Railway.app](https://railway.app).
2. Click **New Project** $\to$ **Deploy from GitHub repo** $\to$ Select `hammer-house-florida`.
3. In the Railway project dashboard, click **New** $\to$ **Database** $\to$ **Add PostgreSQL**.
4. Railway will automatically inject the `DATABASE_URL` into your service.
5. Under **Variables** in your Railway app, add:
   - `GHL_WEBHOOK_URL`: *(Your GoHighLevel Webhook URL)*
   - `NODE_ENV`: `production`
6. Railway will automatically build the Next.js app, run Prisma database migrations, and provide a live public URL (e.g. `https://hammer-house-production.up.railway.app`).

---

## 📄 License & Compliance

© 2026 Hammer House. All Rights Reserved. Compliant with Florida Telemarketing Statute (FSS 501.059) and Federal TCPA regulations.
