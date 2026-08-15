# PARAKH AI 2.0 — Frontend

> **AI-Powered Digital Content Verification Platform**
> Sovereign Forensic Triangulation • Deepfake Detection • Misinformation Analysis

---

## 🔍 What is PARAKH AI?

PARAKH AI is a professional-grade, dark-themed investigative web platform that analyzes suspicious **links**, **images**, and **videos** to detect **fake**, **manipulated**, or **misleading content** using AI-driven forensic techniques.

---

## 📁 Project Structure

```
parakh-ai/
├── index.html      ← Main app shell (all 4 pages, single SPA)
├── style.css       ← Full design system (Obsidian/Gold theme, glassmorphism)
├── app.js          ← Page routing, interactivity, state management
└── README.md
```

---

## 🖥️ Pages

| Page | Route | Description |
|------|-------|-------------|
| **Page 1 — Auth (War Room)** | `#page-auth` | Login/Signup with live geopolitical news backdrop, radar, and intel cards |
| **Page 2 — Dashboard** | `#page-home` | Submit links/images/videos for analysis; preset case studies |
| **Page 3 — Analysis** | `#page-analysis` | 5 expandable forensic panels: Identity Scan, Forensic Check, Origin Tracker, Claim Investigator, Comment Intelligence |
| **Page 4 — Verdict** | `#page-verdict` | Final verdict card with AI summary, confidence score, source citations, PDF export |

---

## 🚀 Running Locally (Frontend Only)

```bash
# Clone the repo
git clone https://github.com/Kartikkumar251/PARAKH_Ai_2.0.git
cd PARAKH_Ai_2.0

# Serve with Python (no install needed)
python -m http.server 3000

# Open in browser
http://localhost:3000
```

Or use any static server (VS Code Live Server, `npx serve`, etc.)

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-core` | `#060709` | Deepest obsidian background |
| `--accent-gold` | `#e5a93c` | Primary CTA, borders, highlights |
| `--accent-green` | `#10b981` | Verified / Authentic indicators |
| `--accent-red` | `#f43f5e` | Fake / Manipulated alerts |
| `--text-primary` | `#f8fafc` | Titanium-white headings |
| Font Display | `Outfit` | Headings & brand |
| Font Body | `Inter` | Body copy |
| Font Code | `JetBrains Mono` | Telemetry, hashes, metadata |

---

## 🔗 Backend Integration Points

The frontend is built as a **static SPA** ready for backend API integration. Key hooks for teammates:

- **Auth form** (`#auth-email`, `#auth-submit-btn`) → Connect to `/api/auth/login` & `/api/auth/signup`
- **Submission form** (`#link-input`, drag-drop zones) → POST to `/api/analyze` with `{ type, content }`
- **Analysis panels** (`.investigation-panels-stack`) → Populate dynamically from `/api/results/:id`
- **Verdict page** (`#page-verdict`) → Fetch from `/api/verdict/:id`
- **PDF Export** (`exportReportPDF()` in `app.js`) → Can call a backend render endpoint

---

## 👥 Team

| Role | Contact |
|------|---------|
| Frontend | [@Kartikkumar251](https://github.com/Kartikkumar251) |
| Backend | *(your teammates)* |

---

## 📄 License

MIT — Built for PARAKH AI Hackathon 2026
