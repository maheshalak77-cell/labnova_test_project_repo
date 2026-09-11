import { v2 as cloudinary } from "cloudinary";

// The Cloudinary SDK auto-configures itself from a CLOUDINARY_URL env var
// (cloudinary://<api_key>:<api_secret>@<cloud_name>) if one is present, so
// no explicit cloudinary.config() call is needed as long as that variable
// is set. This keeps local dev and Railway using the exact same setup.

// Every image this app uploads lives inside this folder in your Cloudinary
// account — keeps LabNova's product photos separate from any other project
// using the same Cloudinary account.
const FOLDER = process.env.CLOUDINARY_FOLDER || "labnova/products";

function isConfigured() {
  return Boolean(process.env.CLOUDINARY_URL);
}

/**
 * Uploads an in-memory image buffer (from multer's memoryStorage) to
 * Cloudinary and returns the public HTTPS URL to store in the database.
 */
export function uploadProductImage(buffer, originalName = "product") {
  if (!isConfigured()) {
    return Promise.reject(
      new Error("Cloudinary is not configured (missing CLOUDINARY_URL)."),
    );
  }

  const publicId = String(originalName)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER,
        public_id: `${Date.now()}-${publicId || "product"}`,
        resource_type: "image",
        overwrite: false,
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    stream.end(buffer);
  });
}
