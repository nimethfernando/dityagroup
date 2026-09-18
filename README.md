# DITYA GROUP — Official Web Platform & Executive CMS

> **Ancient Wisdom. Modern Solutions. Limitless Possibilities.**  
> Official Website Clone & Enterprise Portal for [https://dityagroup.com/](https://dityagroup.com/)

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.10.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![MariaDB](https://img.shields.io/badge/MariaDB-Remote_Cluster-003545?style=flat&logo=mariadb)](https://mariadb.org/)

---

## 🌟 Overview

The **DITYA GROUP** web application is a pixel-perfect, high-performance web platform built on **Next.js 16 (App Router)** and **React 19**. It unifies ancient Vedic principles with cutting-edge technology across six specialized corporate Houses, offering a dynamic public website, a fully customizable content management system (CMS), automated lead generation pipelines, and Gmail-enforced administrative security.

---

## 🏗️ Technical Architecture & Stack

### 🎨 1. Front-End (Client-Side)
| Library / Technology | Version | Purpose & Usage |
| :--- | :--- | :--- |
| **Next.js (App Router)** | `16.3.4` | Modern React framework with React Server Components (RSC) and Client Components. |
| **React & React DOM** | `19.2.8` | Component-based UI library. |
| **TypeScript** | `5.x` | Strict type safety, clean data contracts, and maintainability. |
| **Tailwind CSS** | `v4` | Utility-first styling with `@tailwindcss/postcss` and brand color palette. |
| **Framer Motion** | `13.2.0` | Fluid animations, scroll triggers, and transitions. |
| **Lucide React & React Icons** | `1.42.0 / 5.7.0` | Modern iconography across public pages and admin dashboards. |
| **Clsx & Tailwind-Merge** | `2.1.1 / 3.6.0` | Dynamic class combination and conflict resolution. |

### ⚙️ 2. Back-End (Server-Side)
| Technology / Library | Purpose & Usage |
| :--- | :--- |
| **Next.js Route Handlers** | Serverless REST API endpoints (`src/app/api/*`) on the Node.js runtime. |
| **Prisma ORM & Driver Adapter** | `7.10.0` with `@prisma/adapter-mariadb` connected to MariaDB. |
| **MariaDB** | Remote database cluster storing inquiries, page content, blogs, and admin security settings. |
| **jose JWT** | Edge-compatible stateless JWT session management (`ditya_admin_session` cookie). |
| **Node.js Crypto** | Scrypt hashing (`crypto.scryptSync`) with 16-byte random salts and constant-time comparison (`crypto.timingSafeEqual`). |
| **Nodemailer** | `10.0.1` SMTP mailer dispatching lead alerts and 6-digit OTP security codes via Gmail. |

---

## 🏛️ The 6 Specialized Houses

The ecosystem is structured around six core divisions:

1. **Global Business Network (`/global-business-network`)**: Curated executive networking forums, high-trust peer circles, and B2B referral exchanges.
2. **Ditya Astro Verse (`/ditya-astroverse`)**: Vedic astrology, numerology, birth chart analysis, and sacred timing guidance.
3. **Ditya Math House (`/ditya-math-house`)**: Conceptual clarity, competitive exam preparation, and Vedic mathematical shortcuts.
4. **Ditya Business House (`/ditya-business-house`)**: Strategic growth advisory, financial modeling, operational efficiency, and scaling consultancy.
5. **Ditya Trading House (`/ditya-trading-house`)**: Practical stock market education, technical analysis, risk management, and live trading rooms.
6. **Ditya Tech House (`/ditya-tech-house`)**: Bespoke software engineering, modern web applications, AI integrations, and cloud infrastructure.

---

### Key Administrative Features
- **Gmail Restriction**: Administrative access is strictly restricted to verified `@gmail.com` accounts.
- **6-Digit Gmail OTP Recovery**:
  - Clicking **"Forgot Password?"** sends a 6-digit one-time passcode to `groupditya@gmail.com` (valid for 10 minutes).
  - Verifying the OTP allows updating the admin password directly.
- **In-Dashboard Security Settings (`ChangePasswordModal`)**:
  - Accessible from the admin navigation bar across all admin routes.
  - Update password via **Current Password** or **Gmail OTP**.
  - Update authorized **Administrator Gmail Address** with password verification.
- **Full Dynamic CMS (`/admin/pages` & `/admin/pages/[slug]`)**:
  - Field-by-field live editing of hero banners, headings, paragraph copy, core value checklists, 4-stat metrics, progress indicators, testimonials, and CTAs.
  - Instant **"Reset to Defaults"** capability to restore original baseline text.
- **Inquiries & Lead Management (`/admin/inquiries`)**:
  - Real-time visibility of consultation requests and contact form submissions.
  - Search by client name, email, or phone number.
  - Filter by inquiry status (*New*, *Contacted*, *Resolved*, *Archived*).
  - Export leads to CSV.
- **Articles & Blog Management (`/admin/blogs`)**:
  - Publish new articles with custom title, auto-slug generator, category selector, reading time, author name, and cover image.
  - Real-time article deletion.
  - Dynamic public rendering on `/blog` and `/blog/[slug]`.

---

## 📁 Project Directory Structure

```text
dityagroup/
├── prisma/
│   └── schema.prisma                 # Database schema (Inquiry, PageContent, Blog, AdminSetting)
├── public/
│   └── images/                       # High-resolution logos, hero banners, and house assets
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── about-us/                 # Dynamic About Us page
│   │   ├── admin/                    # Executive Portal
│   │   │   ├── blogs/                # Blog publishing & management
│   │   │   ├── inquiries/            # Inquiries & lead pipeline
│   │   │   ├── login/                # Gmail admin authentication & OTP recovery
│   │   │   └── pages/                # Dynamic CMS overview & [slug] editor
│   │   ├── api/                      # REST API Endpoints
│   │   │   ├── admin/                # Auth, blogs, CMS, profile & password routes
│   │   │   ├── inquiries/            # Public consultation submissions
│   │   │   └── newsletter/           # Newsletter subscription
│   │   ├── blog/                     # Dynamic Blog reader & listing
│   │   ├── contact-us/               # Dynamic Contact Us page
│   │   ├── ditya-astroverse/         # House: Astro Verse
│   │   ├── ditya-business-house/     # House: Business House
│   │   ├── ditya-math-house/         # House: Math House
│   │   ├── ditya-tech-house/         # House: Tech House
│   │   ├── ditya-trading-house/      # House: Trading House
│   │   ├── global-business-network/  # House: Global Business Network
│   │   ├── privacy-policy/           # Privacy policy
│   │   ├── services/                 # Services directory
│   │   ├── terms-and-conditions/     # Terms of service
│   │   ├── HomeClient.tsx            # Dynamic Home page client hydration
│   │   ├── layout.tsx                # Root layout (TopBar, Navbar, Footer, ConsultationModal)
│   │   └── page.tsx                  # Home page Server Component
│   ├── components/                   # Shared UI Components
│   │   ├── admin/                    # AdminHeader & ChangePasswordModal
│   │   ├── ConsultationModal.tsx     # Popup consultation modal
│   │   ├── Footer.tsx                # Corporate footer
│   │   ├── HousePageTemplate.tsx     # Unified dynamic template for all 6 houses
│   │   ├── HouseSidebar.tsx          # House navigation sidebar
│   │   ├── Navbar.tsx                # Navigation header
│   │   └── TopBar.tsx                # Header contact bar
│   ├── contexts/                     # React Context providers (ConsultationContext)
│   ├── lib/                          # Backend utilities & helpers
│   │   ├── adminSecurity.ts          # Scrypt hashing, OTP generation & verification
│   │   ├── auth.ts                   # jose JWT session cookies
│   │   ├── defaultPageContent.ts     # Baseline content contracts for all 9 pages
│   │   ├── email.ts                  # Nodemailer Gmail SMTP notifications
│   │   ├── getPageContent.ts         # MariaDB content query & deep-merge helper
│   │   └── prisma.ts                 # Prisma Client with MariaDB driver adapter
│   └── proxy.ts                      # Next.js 16 proxy middleware (admin protection)
├── .env.example                      # Template for environment variables
├── .gitignore                        # Git exclusion rules
├── package.json                      # Scripts & dependencies
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or later
- **MariaDB / MySQL**: Accessible database instance

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/nimethfernando/dityagroup.git
cd dityagroup
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Configure your environment variables in `.env`:
```env
# Stateless Session Authentication
ADMIN_JWT_SECRET="your-32-character-random-secret-key"

# Database Connection (MariaDB / MySQL)
DATABASE_URL="mariadb://username:password@hostname:3306/database_name"

# Automated Lead & Security Email Notifications (Gmail SMTP)
EMAIL_USER="your-notification-sender@gmail.com"
EMAIL_PASS="your-16-character-gmail-app-password"
```

### 4. Database Setup
Generate the Prisma Client:
```bash
npx prisma generate
```

### 5. Running the Application

**Development Mode (with Turbopack & Fast Refresh):**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production Build & Start:**
```bash
npm run build
npm start
```

---

## 🌐 Production Deployment

### Option A: Vercel (Recommended)
1. Import the repository `nimethfernando/dityagroup` on [Vercel](https://vercel.com).
2. Set the Framework Preset to **Next.js**.
3. Under **Environment Variables**, add:
   - `ADMIN_JWT_SECRET`
   - `DATABASE_URL`
   - `EMAIL_USER`
   - `EMAIL_PASS`
4. Click **Deploy**.

### Option B: VPS / Cloud Linux (Ubuntu / Debian with PM2)
```bash
# Clone and build
git clone https://github.com/nimethfernando/dityagroup.git
cd dityagroup
npm install
npm run build

# Start with PM2 process manager
npm install -g pm2
pm2 start npm --name "dityagroup" -- start
pm2 save
pm2 startup
```

---

## 📄 License & Ownership
Copyright © 2018–2026 **DITYA GROUP**. All rights reserved.  
Unauthorized duplication or distribution is strictly prohibited.
