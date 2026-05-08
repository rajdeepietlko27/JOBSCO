# 💼 JOBSCO – Full Stack Job Board Platform

JOBSCO is a full-stack job board web application where recruiters can post jobs and manage applicants, while candidates can browse opportunities, apply, and track their application status — all in one place.

---

## ✨ Features

- 🧭 **Dual Role Onboarding** – Sign up as a Candidate or Recruiter with a tailored onboarding flow
- 📋 **Job Listings** – Recruiters can post, manage, and monitor all their job openings
- 🔍 **Smart Filters** – Candidates can filter jobs by location and type with URL-synced filters
- 🚀 **One-Click Apply** – Candidates apply instantly and never see the same job twice as "applied"
- 📊 **Activity Tracker** – Candidates track application status (Applied / Selected / Rejected) in one place
- 👥 **Applicant Management** – Recruiters view all applicants per job and select or reject candidates
- 📄 **Resume Viewer** – Recruiters can preview or download candidate resumes directly
- 🔒 **Authentication** – Secure login and session management via Clerk
- 📁 **File Uploads** – Resume PDF upload and storage via Supabase Storage
- 📱 **Responsive Design** – Fully responsive across mobile and desktop

---

## 🛠 Tech Stack

### Frontend

| Tool | Purpose |
|------|---------|
| Next.js 14 | Full-stack React framework (App Router + Server Actions) |
| React | UI components and client-side interactivity |
| Tailwind CSS | Utility-first styling |
| Shadcn UI | Accessible component library |
| Clerk | Authentication and user session management |

### Backend

| Tool | Purpose |
|------|---------|
| MongoDB | Primary database for profiles, jobs, and applications |
| Mongoose | ODM for MongoDB schema and queries |
| Next.js Server Actions | Serverless backend logic (no separate Express server) |

### Storage & External

| Service | Purpose |
|---------|---------|
| Supabase Storage | Resume PDF uploads and public URL generation |

> **Collections:** `Profile` , `Job` , `Application`

---

## 🚀 Run Locally

### Prerequisites

- Node.js 18+
- npm or yarn
- A MongoDB connection string (MongoDB Atlas works out of the box)

### 1. Clone the Repository

```bash
git clone https://github.com/rajdeepietlko27/jobsco.git
cd jobsco
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboard

MONGODB_URL=your_mongodb_connection_string

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 How It Works

```
User signs up via Clerk
        ↓
Redirected to Onboarding → selects Candidate or Recruiter role
        ↓
Profile saved to MongoDB with role attached

── Candidate Flow ──────────────────────────
Browses jobs with location & type filters (URL-synced)
        ↓
Opens job drawer → clicks Apply
        ↓
Application saved to MongoDB (status: ['Applied'])
        ↓
Tracks application status on Activity page

── Recruiter Flow ──────────────────────────
Posts a new job → saved to MongoDB
        ↓
Views all applicants per job in a side drawer
        ↓
Opens candidate detail → previews resume from Supabase
        ↓
Selects or Rejects candidate → status updated in MongoDB
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Publishable key from [Clerk Dashboard](https://clerk.com) |
| `CLERK_SECRET_KEY` | Secret key from Clerk Dashboard |
| `MONGODB_URL` | MongoDB connection string from [MongoDB Atlas](https://cloud.mongodb.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL from [Supabase Dashboard](https://supabase.com) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key from Supabase Dashboard |

---

## 👩‍💻 Author

Rajdeep Singh

- GitHub: [@rajdeepietlko27](https://github.com/rajdeepietlko27)
