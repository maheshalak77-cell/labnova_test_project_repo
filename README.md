# LabNova Scientific

A laboratory supplies marketing site (Home, Products with category filtering,
Product Detail, About, Contact, Quote Cart) plus a password-protected Admin
panel for managing categories, products, and incoming quotation requests.

- **Frontend:** React 18 + TypeScript + Vite (hash-based routing, no extra router library)
- **Backend:** Node.js + Express + MySQL (`mysql2`), JWT-protected admin API
- **Email:** Nodemailer sends every quote request to your inbox via Gmail SMTP
- **Database:** MySQL — works with a local MySQL/MariaDB install now, and with
  [Railway](https://railway.app) MySQL when you're ready to deploy (same env vars either way)

---

## 1. Project layout

```
/                     — frontend (Vite + React), run from the repo root
  src/
    components/       — shared UI: Header, Footer, Logo, ProductCard, modals, Icon/Button/etc.
    pages/             — public site pages (Home, Products, ProductDetail, About, Contact, Cart)
    admin/              — admin pages (Login, Dashboard, Quotes, Categories, Products) + charts
    lib/                — api client, types, catalog + admin-session hooks
  public/assets/
    products/           — the 14 real product photos (cropped from your category image pack)
    brand/               — the real LabNova logo (transparent PNG)
  public/favicon.png, favicon-32.png

server/                — backend (Express + MySQL), run separately from /server
  src/
    index.js            — app entry point
    db.js                 — MySQL pool + automatic schema creation
    seedData.js            — the real 4 categories / 14 products (from your docs)
    seed.js                  — populates the database (safe to re-run)
    routes/public.js          — GET categories/products, POST quote requests
    routes/admin.js            — login + category/product CRUD + quotes + dashboard stats
    middleware/auth.js          — JWT check for admin routes
    middleware/upload.js         — image upload handling (multer)
    utils/mailer.js               — sends the quote notification email
  uploads/                — admin-uploaded product images land here (gitignored)
```

---

## 2. Local setup (run this before anything else)

You need **Node.js 18+** and a **MySQL-compatible server** (MySQL 8, or MariaDB — both work)
installed and running locally.

### 2.1 Create the database

```sql
CREATE DATABASE labnova CHARACTER SET utf8mb4;
```

If your local MySQL root user has a password (or you use a different user), update
`server/.env` → `DB_USER` / `DB_PASSWORD` to match. The defaults assume `root` with
no password, which is how most local MySQL/MariaDB/XAMPP installs are set up out of the box.

### 2.2 Install dependencies (two separate installs — frontend and backend are separate apps)

```bash
# from the project root
npm install

# backend
cd server
npm install
```

### 2.3 Configure environment variables

Both `.env` files are already filled in with working defaults for local development
(`server/.env` even has your Gmail SMTP app password pre-filled). Open `server/.env`
and double check:

- `DB_USER` / `DB_PASSWORD` match your local MySQL
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — **change these before you deploy anywhere public**
- `JWT_SECRET` — **change this to a long random string before you deploy**

### 2.4 Seed the database

This creates every table automatically and loads your 4 categories + 14 real products.
Safe to re-run any time (it updates existing rows instead of duplicating them).

```bash
cd server
npm run seed
```

### 2.5 Run everything

Open two terminals:

```bash
# Terminal 1 — backend API (http://localhost:4000)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
npm run dev
```

Visit **http://localhost:5173** for the marketing site, and
**http://localhost:5173/#/admin** for the admin panel.

> **Note:** if port 5173 is already busy on your machine, Vite will automatically pick
> 5174, 5175, etc. instead — that's fine, just use whatever URL it prints in the terminal.
> The backend accepts requests from any `http://localhost:<port>` in development, so this
> won't break anything.

**Admin login (from `server/.env`):**
- Username: `admin`
- Password: `LabNova@2026`

*(This is a hardcoded username/password check on the server — there is no signup/registration
flow, exactly as requested. Change these two values in `server/.env` any time.)*

---

## 3. How the quote flow works

1. Customer browses **Products**, filters by one of the 4 categories, opens a product card
   or the full **Product Detail** page.
2. **Add to cart** opens a modal to choose quantity per size (or a single quantity if the
   product has no sizes).
3. The **Quote cart** (nav bar) lists everything added, with quantity editing and removal.
4. **Request Quote** goes to **Contact Us**, which shows the attached products and a form.
5. Submitting **POST**s to `/api/quotes`, which:
   - Recalculates every line price server-side from the current database price (never trusts
     the browser's price, so it can't be tampered with)
   - Saves the request + line items to MySQL
   - Emails the full request to your inbox via Gmail SMTP (`QUOTE_NOTIFICATION_EMAIL` in
     `server/.env`, currently your Gmail address)
6. The request immediately appears in **Admin → Quotations**, with a status you can move
   through New → Contacted → Closed, and rolls into the **Dashboard** charts.

---

## 4. Known placeholders you should review

Nothing here was invented without a reason, but a few things need your input before this goes live:

- **Product prices** — none were supplied in your source documents, so every product has an
  indicative placeholder price. Edit them any time in **Admin → Products**.
- **Nitrile glove sizes** (S/M/L/XL) — your image pack only pictured a Medium box; standard
  glove sizing was added so the size-selection feature has a second real example besides the
  lab coat. Delete the sizes in Admin if you'd rather sell gloves as one size.
- **Footer logo** — the real logo file has a dark navy wordmark with no reversed/white version,
  so it won't read well pasted directly onto the dark navy footer. The footer currently uses a
  plain white text mark instead. If you get a white/reversed logo file from your designer, it's
  a one-line swap in `src/components/Logo.tsx`.
- Removed a fabricated **"ISO 9001 Certified"** claim that the previous AI-generated version had
  invented — it wasn't in your company information document, so it's been replaced with
  generic "quality assured" language. Let me know if this certification is real and you'd
  like it reinstated.

---

## 5. Deploying later (Vercel + Railway)

Not needed yet — you said to finalize locally first — but for when you're ready:

- **Frontend → Vercel:** deploy the repo root as-is (`npm run build`, output `dist/`). Set
  `VITE_API_URL` in Vercel's environment variables to your deployed backend's URL + `/api`.
- **Backend → Railway:** deploy the `server/` folder as its own service. Add a Railway MySQL
  plugin, then copy its connection details into `DB_HOST` / `DB_PORT` / `DB_USER` /
  `DB_PASSWORD` / `DB_NAME` (Railway also usually requires `DB_SSL=true`). Set
  `CLIENT_ORIGIN` to your Vercel domain so CORS allows it.
- Run `npm run seed` once against the Railway database (e.g. `railway run npm run seed`) to
  populate it.
- Change `ADMIN_PASSWORD` and `JWT_SECRET` to real, private values before going live.
