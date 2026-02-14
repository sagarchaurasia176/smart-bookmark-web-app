# 🚀 Smart Bookmark Web

Smart Bookmark Web is a modern bookmark management application built with Next.js that allows users to securely save, manage, and access their bookmarks from anywhere.

It uses Supabase for authentication and PostgreSQL database hosting, Prisma as ORM for schema management, and is deployed on Vercel.

---

## 🎥 Project Demo

[![Smart Bookmark Web Demo](https://img.youtube.com/vi/8Q1S3jmiIl8/maxresdefault.jpg)](https://www.youtube.com/watch?v=8Q1S3jmiIl8)

> Click the image above to watch the full demo video.

---

## 📌 Problem It Solves

Managing bookmarks in browsers can become messy and unorganized over time. Users often:

- Lose important links  
- Struggle to categorize references  
- Cannot access bookmarks across devices  
- Want secure authentication  

Smart Bookmark Web provides:

- 🔐 Secure Google authentication  
- ☁️ Cloud-based bookmark storage  
- ⚡ Fast and responsive UI  
- 🔄 Real-time tab communication  
- 🧩 Chrome Extension support  

---

## 🛠️ Tech Stack

- **Framework:** Next.js  
- **Database:** PostgreSQL (via Supabase)  
- **Authentication:** Google Authentication using Supabase  
- **ORM:** Prisma  
- **Deployment:** Vercel  

---

## 🏗️ Architecture Overview

- Supabase handles authentication and PostgreSQL hosting.
- Prisma manages schema definition and migrations.
- Next.js API routes handle backend logic.
- Browser storage is used for real-time communication between tabs.
- Application deployed on Vercel.

---

## 🚧 Challenges Faced During Development

### 1️⃣ Learning Supabase

Previously, I worked with Neon for PostgreSQL but had never used Supabase.  
Understanding the authentication flow, environment setup, and database connection required additional learning and experimentation.

---

### 2️⃣ Prisma Setup with Supabase

- Schema migration issues  
- Connection string configuration problems  
- Synchronization challenges between development and production  

After debugging and proper environment setup, migrations worked successfully.

---

### 3️⃣ Deployment Issues on Vercel

- Prisma generate errors during build  
- Environment variable misconfigurations  
- Production database connection issues  

Resolved by properly configuring build commands and managing environment variables correctly.

---

### 4️⃣ Real-Time Communication Between Tabs

Handling communication between two browser tabs was challenging.  
Solved using browser storage-based communication to sync state in real time.

---

## ✨ Features

- ✅ Google Login using Supabase  
- ✅ Secure Bookmark Storage  
- ✅ Add / Delete / Manage Bookmarks  
- ✅ Real-Time Sync Between Tabs  
- ✅ Cloud-Based Storage  
- ✅ Chrome Extension Integration  

---

## 🧩 Chrome Extension Version

I also built a Chrome Extension version of Smart Bookmark and published it on the Chrome Web Store.

The extension allows users to:

- Instantly save bookmarks from any webpage  
- Sync with the main web application  
- Access bookmarks without opening the full app  

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into project directory
cd smart-bookmark-web

# Install dependencies
npm install

# Create a .env file and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=your_database_url

# Run development server
npm run dev
