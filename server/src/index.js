import "dotenv/config";
import cors from "cors";
import express from "express";
import { ensureSchema } from "./db.js";
import { adminRouter } from "./routes/admin.js";
import { publicRouter } from "./routes/public.js";
import { uploadsDir } from "./middleware/upload.js";

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// CLIENT_ORIGIN can be a single URL or a comma-separated list, e.g.
// "https://labnova.vercel.app,https://www.labnova.com.au"
const explicitOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// In development, Vite happily picks 5174/5175/... if 5173 is already taken by
// another project — trust any localhost/127.0.0.1 port instead of hardcoding
// one, so the app doesn't silently break with a CORS "Failed to fetch" error
// just because some other process was already using the default port.
const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

function corsOriginCheck(origin, callback) {
  if (!origin) return callback(null, true); // same-origin / curl / server-to-server
  if (explicitOrigins.includes(origin)) return callback(null, true);
  if (NODE_ENV !== "production" && localhostPattern.test(origin)) return callback(null, true);
  const err = new Error(`Origin ${origin} is not allowed by CORS.`);
  err.status = 403;
  callback(err);
}

app.use(cors({ origin: corsOriginCheck }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", publicRouter);
app.use("/api/admin", adminRouter);

// Centralised error handler — makes sure multer/JSON errors return clean JSON
// instead of crashing the process or leaking a stack trace to the client.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong." });
});

async function start() {
  try {
    await ensureSchema();
    console.log("Database schema is ready.");
  } catch (err) {
    console.error("\n⚠️  Could not connect to MySQL / create schema.");
    console.error("   Check the DB_* values in server/.env — see server/.env.example.");
    console.error("   Error:", err.message, "\n");
    console.error("   The server will still start, but every API call that touches the database will fail until this is fixed.\n");
  }

  app.listen(PORT, () => {
    console.log(`LabNova API listening on http://localhost:${PORT}`);
    console.log(`Allowing requests from: ${explicitOrigins.join(", ")}${NODE_ENV !== "production" ? " (+ any http://localhost:<port> in dev)" : ""}`);
  });
}

start();
