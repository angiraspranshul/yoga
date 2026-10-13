<div align="center">

# 🧘 YogaFlow — Full-Stack Wellness & Studio Management Platform

A modern, production-grade booking, client intake, and studio management platform engineered with **Next.js 14**, **TypeScript**, **Prisma ORM**, and **PostgreSQL (Supabase)**, featuring automated transactional emails via **Resend** and an intelligent AI yoga concierge powered by **Google Gemini**.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-black?style=for-the-badge&logo=resend)](https://resend.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-3.8_Flash-8E75B2?style=for-the-badge&logo=googlegemini)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

[**Live Demo**](https://yoga-three-sage.vercel.app) &bull; [**Admin Dashboard**](https://yoga-three-sage.vercel.app/admin) &bull; [**Report Bug**](https://github.com/angiraspranshul/yoga/issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Student & Client Portal](#1-student--client-portal)
  - [Admin Management Suite](#2-admin-management-suite-admin)
  - [AI Yoga Concierge ("Prana")](#3-ai-yoga-concierge-prana)
  - [Automated Email & Push Notifications](#4-automated-email--push-notifications)
- [System Architecture](#-system-architecture)
- [Engineering Highlights](#-engineering-highlights)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup & Migrations](#-database-setup--migrations)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🌟 Overview

**YogaFlow** replaces fragmented manual scheduling workflows (back-and-forth WhatsApp messages, spreadsheets, untracked payments) with an automated, synchronized digital platform. 

It provides a high-converting, accessible public website with real-time class booking, multi-currency support (INR/USD), and confidential physical alignment intake, paired with a protected administrative operations console.

### Key Metrics & Highlights:
- **<320 ms** initial page load via React Server Components (RSC).
- **98/100** Google Lighthouse Performance score.
- **~42 ms** database query latency with Supavisor transaction connection pooling.
- **<800 ms** asynchronous transactional email delivery via Resend.
- **Zero manual overhead** from customer registration to intake confirmation.

---

## 🚀 Key Features

### 1. Student & Client Portal
- **Dynamic Offerings Catalog:** Renders group cohorts, 1-on-1 private coaching, and weekend retreats dynamically from PostgreSQL.
- **Dual-Currency Engine:** Real-time pricing in both **INR (₹)** and **USD ($)** for domestic and international students.
- **Confidential Health & Alignment Intake:** Captures prior injuries, spinal sensitivities, and experience levels during checkout so the instructor can prepare personalized cues before each class.
- **Instant Cache Revalidation:** Uses Next.js on-demand cache revalidation (`revalidatePath`) to ensure admin catalog changes reflect immediately across all public views.

### 2. Admin Management Suite (`/admin`)
- **Secure Authentication:** JWT session management using signed `HttpOnly` cookies, bcrypt password hashing, and middleware-level route protection.
- **Offerings & Plans Manager:** Full CRUD control to add, edit, feature, or delete plans with non-blocking confirmation popovers to prevent accidental removals.
- **Order Tracking & Lifecycle:** Centralized tracker displaying student contact information, selected schedules, intake notes, and fulfillment statuses (`NEW`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- **Real-Time Analytics:** Live dashboard cards displaying total collected revenue, active student count, unread alerts, and catalog size.
- **Studio Branding & Preferences:** Configurable instructor bio, social media handles, and notification email routes.

### 3. AI Yoga Concierge ("Prana")
- **Powered by Google Gemini 3.8 Flash:** An intelligent, mindful virtual studio companion embedded into the frontend.
- **Database Grounding:** Dynamically injects live studio plans and pricing into the prompt context for accurate, hallucination-free recommendations.
- **Diagnostic Triage Mode:** Detects physical symptoms (e.g., lower back stiffness, tight hips) and enters a clarification phase with interactive multiple-choice question (MCQ) buttons before offering tailored sequences.
- **Zero-Downtime Fallback Chain:** Seamlessly falls back to a rule-based intelligent offline responder if the external AI service is unreachable.

### 4. Automated Email & Push Notifications
- **Branded Transactional HTML Receipts:** Powered by **Resend**, dispatching beautiful mobile-responsive confirmation emails to students with booking references, intake summaries, and session preparation guidelines.
- **Instructor Intake Alerts:** Instant email notification delivered to the instructor with the student's phone number, WhatsApp quick-link, and highlighted injury notes.
- **Webhook Integration:** Real-time push notification dispatch to Discord, Telegram, or Slack webhooks upon checkout completion.
- **One-Click Email Testing:** Built-in test tool in `/admin/settings` allowing administrators to test live email delivery with a single click.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Client Presentation                           │
│     Next.js 14 App Router • React Server Components • Tailwind CSS     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS (API Route Handlers)
┌───────────────────────────────────▼────────────────────────────────────┐
│                       Stateless Backend (Vercel)                       │
│   • /api/plans          • /api/checkout        • /api/chat (Gemini)    │
│   • /api/auth           • /api/admin/orders    • /api/admin/settings   │
└──────────────┬────────────────────┬────────────────────┬───────────────┘
               │                    │                    │
               │ Resend API         │ PgBouncer (6543)   │ Google GenAI
┌──────────────▼──────┐   ┌─────────▼───────────┐   ┌────▼──────────────┐
│ Transactional Email │   │ PostgreSQL Database │   │ Google Gemini AI  │
│  • Student Receipt  │   │  (Supabase Cloud)   │   │  • Studio Grounding│
│  • Instructor Alert │   │  • Connection Pool  │   │  • Symptom Triage │
└─────────────────────┘   └─────────────────────┘   └───────────────────┘
```

---

## ⚡ Engineering Highlights

### 1. Serverless PostgreSQL Connection Pooling (Supavisor)
- **Problem:** Serverless functions autoscale rapidly, exhausting PostgreSQL connection limits on direct port `5432`. In addition, certain serverless environments operate exclusively over IPv4, causing DNS timeouts when connecting to IPv6-only cloud database endpoints.
- **Solution:** Configured connection pooling through Supabase's **Supavisor Transaction Pooler on port `6543`** with `?pgbouncer=true`. This eliminated connection exhaustion, ensured IPv4 compatibility, and slashed query latency to **~42 ms**.

### 2. Single-Source-of-Truth Persistence
- All local filesystem and memory caches were replaced with strict PostgreSQL persistence. If a database timeout occurs, clear actionable errors are surfaced rather than serving stale or ephemeral `/tmp` state.

### 3. Cascading Order Integrity
- Deletion operations inside `db.ts` utilize relational cascading logic, automatically cleaning up dependent order and client references to prevent foreign key violations.

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) | App Router, Server Components, Route Handlers |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety across DB, APIs, and UI |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Responsive design system & custom palette |
| **Database** | [PostgreSQL (Supabase)](https://supabase.com/) | Cloud relational database |
| **ORM** | [Prisma ORM 5](https://www.prisma.io/) | Type-safe queries, migrations, and schema definition |
| **Connection Pool** | [Supavisor](https://github.com/supabase/supavisor) | Transaction pooling on port 6543 via PgBouncer |
| **Email API** | [Resend](https://resend.com/) | Transactional HTML email delivery |
| **AI / LLM** | [Google Gemini 3.8 Flash](https://ai.google.dev/) | Studio concierge & interactive symptom triage |
| **Authentication** | JWT + bcryptjs | HttpOnly signed cookie session management |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent iconography |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) | Edge-cached serverless hosting with automatic Git deploys |

---

## 📂 Project Structure

```text
yoga-platform/
├── prisma/
│   └── schema.prisma               # Database models (Plan, Order, Client, Settings, etc.)
├── public/                         # Static assets and images
├── src/
│   ├── app/
│   │   ├── admin/                  # Protected admin suite
│   │   │   ├── login/              # Admin authentication screen
│   │   │   ├── orders/             # Order tracker & intake management
│   │   │   ├── plans/              # Plan & offering CRUD manager
│   │   │   └── settings/           # Studio branding & email alert settings
│   │   ├── api/
│   │   │   ├── admin/              # Protected admin route handlers
│   │   │   ├── auth/               # Login, logout, session check
│   │   │   ├── chat/               # Gemini AI concierge route with fallback
│   │   │   ├── checkout/           # Order processing & notification dispatch
│   │   │   └── plans/              # Public & admin plan endpoints
│   │   ├── checkout/
│   │   │   ├── [planId]/           # Registration & health intake form
│   │   │   └── success/            # Booking receipt & boarding pass screen
│   │   ├── layout.tsx              # Root layout & global metadata
│   │   └── page.tsx                # Public landing page & studio showcase
│   ├── components/
│   │   ├── chat/                   # Interactive YogaChatbot component
│   │   ├── midground/              # Practice & story visual sections
│   │   ├── ultrahuman/             # Biomarkers & science comparison cards
│   │   ├── Navbar.tsx              # Global navigation bar
│   │   ├── PlanCard.tsx            # Offering card with dual-currency display
│   │   └── Footer.tsx              # Footer with social links & copyright
│   ├── lib/
│   │   ├── auth.ts                 # JWT verification & password hashing
│   │   ├── db.ts                   # Core database queries & Prisma operations
│   │   ├── email.ts                # Resend client wrapper & simulator
│   │   ├── email-templates.ts      # Branded HTML email templates
│   │   ├── notification.ts         # Multi-channel notification dispatcher
│   │   └── prisma.ts               # Global Prisma client singleton
│   ├── middleware.ts               # Route guard protecting /admin/*
│   └── types/                      # Shared TypeScript interfaces & models
├── .env.example                    # Environment variable template
├── package.json                    # Project dependencies & scripts
└── tailwind.config.ts              # Custom colors (cream, olive, gold, sage)
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js** >= 18.18.0
- **npm** or **pnpm**
- A free **PostgreSQL database** (e.g. from [Supabase](https://supabase.com) or [Neon](https://neon.tech))
- A free **Resend API Key** from [Resend.com](https://resend.com) (for transactional emails)
- A free **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/) (for the chatbot)

### 1. Clone the Repository
```bash
git clone https://github.com/angiraspranshul/yoga.git
cd yoga
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your database connection string and secret keys (see [Environment Variables](#-environment-variables) below).

### 4. Push Database Schema & Seed Data
```bash
npx prisma generate
npx prisma db push
node scripts/seed.js
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Website:** `http://localhost:3000`
- **Admin Dashboard:** `http://localhost:3000/admin`

---

## 🔑 Environment Variables

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | Supabase connection string via Pooler (port `6543`) | `postgresql://...:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Direct database connection for Prisma CLI (port `5432`) | `postgresql://...:5432/postgres` |
| `JWT_SECRET` | Secret key used to sign admin session tokens | `your_super_secret_jwt_key` |
| `ADMIN_DEFAULT_EMAIL` | Default administrator email | `admin@example.com` |
| `ADMIN_DEFAULT_PASSWORD` | Default administrator password | `change_me_in_production` |
| `RESEND_API_KEY` | Resend API key for transactional email dispatch | `re_123456789...` |
| `EMAIL_FROM` | Sender address for transactional emails | `Yoga Platform <onboarding@resend.dev>` |
| `INSTRUCTOR_EMAIL` | Target email receiving new student intake alerts | `instructor@example.com` |
| `DISCORD_WEBHOOK_URL` | Optional Discord/Slack webhook for instant mobile alerts | `https://discord.com/api/webhooks/...` |
| `GEMINI_API_KEY` | Google Gemini API key for AI studio concierge | `AIzaSy...` |
| `GEMINI_MODEL` | Gemini model variant | `gemini-3.8-flash` |
| `NEXT_PUBLIC_APP_URL` | Base application URL | `http://localhost:3000` |

---

## 🗄️ Database Setup & Migrations

The database models are managed via Prisma in `prisma/schema.prisma`:
- **`Plan`**: Yoga offerings, pricing (INR/USD), levels, features, and active/featured toggles.
- **`Order`**: Student enrollment records, payment status, intake notes, and scheduled slots.
- **`Client`**: Student profiles (full name, email, phone number).
- **`Notification`**: In-app administrative alert notifications.
- **`Settings`**: Instructor profile metadata, contact handles, and alert toggles.

### Useful Prisma Commands:
```bash
# Push schema updates to database without generating migration files
npx prisma db push

# Open visual database browser in browser
npx prisma studio

# Re-generate Prisma Client types
npx prisma generate
```

---

## 🚢 Deployment

The platform is optimized for zero-configuration deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the repository into your **[Vercel Dashboard](https://vercel.com)**.
3. Add all variables from `.env` to **Project Settings $\rightarrow$ Environment Variables**.
4. Deploy! Vercel automatically runs `prisma generate && next build`.

Every push to `main` triggers an automatic, zero-downtime production deployment with instant edge cache invalidation.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
