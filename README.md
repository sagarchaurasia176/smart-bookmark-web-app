# 🚀 Smart Bookmark Web

Smart Bookmark Web is a modern bookmark management application built with **Next.js** that allows users to securely save, manage, and access their bookmarks from anywhere.

It uses **Supabase (PostgreSQL)** for database hosting, **Google Authentication via Supabase**, and **Prisma ORM** for schema management. The project is deployed on **Vercel**.

---

## 🎥 Project Demo

<p align="center">
  <a href="https://www.youtube.com/watch?v=8Q1S3jmiIl8">
    <img src="https://img.youtube.com/vi/8Q1S3jmiIl8/maxresdefault.jpg" width="700" />
  </a>
</p>

<p align="center">
  ▶️ Click the image above to watch the full demo video
</p>

---

# 🏗️ Web Application Architecture

<p align="center">
  <img src="https://res.cloudinary.com/dc3mdr2ol/image/upload/v1771081491/Screenshot_2026-02-14_203046_zbobvb.png" width="900" />
</p>

### 🔁 Flow Overview

1. **Client Layer (Next.js Frontend)**
   - User logs in via Google
   - Accesses dashboard
   - Adds bookmarks (title + URL)

2. **API Gateway / Routes**
   - Login handler
   - User details handler
   - Bookmark create/delete handler

3. **Prisma ORM**
   - Manages schema
   - Handles database queries

4. **Supabase PostgreSQL**
   - Stores users
   - Stores bookmarks
   - Handles authentication

---

# 🧩 Chrome Extension Architecture (Extra Work)

<p align="center">
  <img src="https://res.cloudinary.com/dc3mdr2ol/image/upload/v1771081488/Screenshot_2026-02-14_203058_qbgcbn.png" width="900" />
</p>

---

## 🎥 Chrome Extension Demo
<p align="center">
  <a href="https://chromewebstore.google.com/detail/smart-bookmark/fnkikbeildmlbfjchcnmmlgmhgpamdne?hl=en-US" target="_blank">
    Live Extension Url
  </a>
</p>
<p align="center">
  <a href="https://res.cloudinary.com/dc3mdr2ol/video/upload/v1771082465/Untitled_video_-_Made_with_Clipchamp_1_rrjzqy.mp4">
    <img src="https://img.shields.io/badge/▶️%20Watch%20Chrome%20Extension%20Demo-Click%20Here-success?style=for-the-badge" />
  </a>
</p>

---

# 📌 Problem It Solves

Managing bookmarks in browsers becomes messy over time.

Users often:

- Lose important links  
- Cannot organize references properly  
- Need cross-device access  
- Want secure authentication  

Smart Bookmark Web solves this with:

- 🔐 Google OAuth authentication  
- ☁️ Cloud-based storage  
- 🔄 Real-time tab synchronization  
- 🧩 Chrome Extension integration  

---

# 🛠️ Tech Stack

- **Frontend & Backend:** Next.js  
- **Database:** PostgreSQL (Supabase)  
- **Authentication:** Google OAuth via Supabase  
- **ORM:** Prisma  
- **Deployment:** Vercel  
- **Extension:** Chrome Extension (JavaScript)

---

# 🚧 Challenges Faced During Development

## 1️⃣ Learning Supabase

Previously, I worked with Neon PostgreSQL.  
Understanding Supabase authentication flow and environment setup required additional learning and experimentation.

---

## 2️⃣ Prisma + Supabase Integration

- Schema migration issues  
- Synchronization problems  
- Production database configuration challenges  

Resolved by properly configuring `DATABASE_URL` and Prisma migrations.

---

## 3️⃣ Vercel Deployment Issues

- Prisma generate errors during build  
- Environment variable misconfigurations  
- Production connection debugging  

Solved by correct build configuration and environment management.

---

## 4️⃣ Real-Time Communication Between Tabs

Handling communication between two browser tabs was challenging.

Solved using browser storage-based communication to synchronize state in real time.

---

# ✨ Features

- ✅ Google Login (Supabase)
- ✅ Secure Bookmark Storage
- ✅ Add / Delete Bookmarks
- ✅ Real-Time Sync Between Tabs
- ✅ Cloud Database
- ✅ Chrome Extension Support

---

# ⚙️ Installation & Setup

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
