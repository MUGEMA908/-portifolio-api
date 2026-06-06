# NIYONSABA Eugene · Portfolio

A modern single-page portfolio with a **Node.js + MongoDB backend** that collects
contact form submissions, tracks which projects recruiters explore, and records
GitHub button clicks — all stored in a real database you own.

---

## 📁 Folder Structure

```
niyonsaba-portfolio/
├── index.html          ← Your portfolio (open this in a browser)
├── dashboard.html      ← YOUR private inbox — read messages & see analytics
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Scroll animations, modals, form submit, tracking
├── assets/
│   └── profile.jpg     ← Your profile photo
├── server/
│   ├── index.js        ← Express API server (all routes)
│   ├── models.js       ← MongoDB schemas (Contact, ProjectView, GithubClick)
│   ├── package.json    ← Node.js dependencies
│   └── .env.example    ← Copy this to .env and add your MongoDB URI
└── README.md           ← This file
```

---

## 🧠 What MongoDB Does in Your Portfolio

Every time something happens on your portfolio, data is saved to MongoDB:

| User action                             | Saved to MongoDB collection |
|-----------------------------------------|-----------------------------|
| Recruiter fills and submits contact form | `contacts`                 |
| Recruiter clicks "Explore Case Study"    | `projectviews`             |
| Recruiter clicks "View on GitHub"        | `githubclicks`             |

You can then open **dashboard.html** to read every message and see which
projects got the most attention — all from your own database.

---

## 🚀 Step 1 — Set Up MongoDB (Free, 5 minutes)

1. Go to **https://cloud.mongodb.com** and create a free account
2. Click **"Build a Database"** → choose **M0 Free** → pick any region → Create
3. Create a database user:
   - Username: `eugene` (or anything you like)
   - Password: make a strong one — write it down
4. Under **"Where would you like to connect from?"** → choose **"My Local Environment"**
   → click **"Add My Current IP Address"** → Finish
5. Click **"Connect"** on your cluster → **"Drivers"** → copy the connection string.
   It looks like:
   ```
   mongodb+srv://eugene:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## 🔑 Step 2 — Create Your .env File

Inside the `server/` folder, copy `.env.example` to a new file called `.env`:

```
# server/.env
MONGO_URI=mongodb+srv://eugene:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=3001
OWNER_EMAIL=niyonsabaeugene44@gmail.com
```

Replace `YOUR_PASSWORD` and the cluster URL with your real values.

⚠️  **Never share or upload the `.env` file.** It contains your database password.

---

## 💻 Step 3 — Run the Backend Server

You need **Node.js** installed. Download it free at https://nodejs.org (choose LTS).

Open a terminal (in VSCode: Terminal → New Terminal):

```bash
# 1. Go into the server folder
cd server

# 2. Install dependencies (only needed once)
npm install

# 3. Start the server
npm run dev
```

You should see:
```
✅  MongoDB connected successfully
🚀  Server running at http://localhost:3001
```

Test it by opening http://localhost:3001/api/health in your browser.
You should see a JSON response with `"status": "ok"`.

---

## 🌐 Step 4 — Open Your Portfolio

Open a second terminal (keep the server running in the first):

- In VSCode: right-click `index.html` → **Open with Live Server**
- Or just double-click `index.html` to open in your browser

The contact form will now save messages to MongoDB. ✅

---

## 📊 Step 5 — Read Your Messages (Dashboard)

Open **`dashboard.html`** in your browser while the server is running.

You will see:
- **Total messages** received
- **Unread count** (new messages highlighted with a green border)
- **Project views** — bar chart showing which case study got the most clicks
- **GitHub clicks** — how many recruiters checked your code

For each message you can:
- Read the full message
- Click **Reply via Email** to respond directly
- Click **Mark as read** once handled

---

## 🌍 Step 6 — Host Everything Online (Free)

### Frontend (index.html) → Netlify

1. Go to https://netlify.com → Sign up free
2. Drag the **entire `niyonsaba-portfolio` folder** (except the `server` folder) onto the Netlify dashboard
3. Your portfolio is live instantly at a URL like `https://niyonsaba-eugene.netlify.app`

### Backend (server/) → Render

1. Push the `server/` folder to a GitHub repo (can be the same repo)
2. Go to https://render.com → Sign up free → New Web Service
3. Connect your GitHub repo → set root directory to `server`
4. Add environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `PORT` = 3001
5. Deploy — Render gives you a free URL like `https://niyonsaba-api.onrender.com`

### Connect frontend to deployed backend

Open `js/main.js` and change line 1:
```js
// Change this:
const API_BASE = 'http://localhost:3001';
// To your Render URL:
const API_BASE = 'https://niyonsaba-api.onrender.com';
```

Also update CORS in `server/index.js` — add your Netlify URL:
```js
origin: [
  'http://localhost:5500',
  'https://niyonsaba-eugene.netlify.app'   // ← add this
]
```

Redeploy both — everything is now fully live. 🎉

---

## 📝 How to Update Content

| What to change                | Where                                      |
|-------------------------------|--------------------------------------------|
| Your bio / hero text          | `index.html` — Hero section               |
| Project descriptions          | `index.html` — each `.proj-card` block    |
| Case study content (modals)   | `js/main.js` — the `caseStudies` object   |
| Contact links / social        | `index.html` — Contact section            |
| Profile photo                 | Replace `assets/profile.jpg`              |
| API server URL                | `js/main.js` line 1 — `API_BASE`          |

---

## 🔌 All API Endpoints

| Method | Route                        | What it does                              |
|--------|------------------------------|-------------------------------------------|
| GET    | `/api/health`                | Check server is running                   |
| POST   | `/api/contact`               | Save a contact form submission            |
| GET    | `/api/contact`               | List all messages (your inbox)            |
| PATCH  | `/api/contact/:id/read`      | Mark a message as read                    |
| POST   | `/api/track/project-view`    | Record a case study open                 |
| POST   | `/api/track/github-click`    | Record a GitHub button click             |
| GET    | `/api/stats`                 | Summary counts for dashboard             |

---

Built with ❤️ · NIYONSABA Eugene · Kigali, Rwanda · 2026
