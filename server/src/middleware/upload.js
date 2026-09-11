// import fs from "node:fs";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import multer from "multer";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// export const uploadsDir = path.join(__dirname, "..", "..", "uploads");

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => cb(null, uploadsDir),
//   filename: (_req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
//     const base = path
//       .basename(file.originalname, ext)
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)/g, "")
//       .slice(0, 60);
//     cb(null, `${Date.now()}-${base || "product"}${ext}`);
//   },
// });

// function fileFilter(_req, file, cb) {
//   const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
//   if (!allowed.includes(file.mimetype)) {
//     return cb(new Error("Only JPG, PNG, WEBP or GIF images are allowed."));
//   }
//   cb(null, true);
// }

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

import multer from "multer";

// Product images now go to Cloudinary instead of local disk — Railway's
// filesystem resets on every deploy, so anything saved to disk (like the
// old /uploads folder) doesn't survive a redeploy. Cloudinary storage is
// permanent and works identically in local dev and in production.
//
// multer.memoryStorage() just holds the uploaded file in RAM as a Buffer
// (available as req.file.buffer) instead of writing it to disk — the route
// handler is then responsible for forwarding that buffer to Cloudinary
// (see server/src/utils/cloudinary.js).
const storage = multer.memoryStorage();

function fileFilter(_req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only JPG, PNG, WEBP or GIF images are allowed."));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
