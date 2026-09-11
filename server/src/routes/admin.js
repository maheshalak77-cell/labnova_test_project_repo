// // import { Router } from "express";
// // import { pool } from "../db.js";
// // import { requireAdmin } from "../middleware/auth.js";
// // import { upload } from "../middleware/upload.js";
// // import { signAdminToken } from "../utils/jwt.js";
// // import { slugify } from "../utils/slugify.js";

// // export const adminRouter = Router();

// // function safeArray(value) {
// //   if (Array.isArray(value)) return value;
// //   if (!value) return [];
// //   try {
// //     const parsed = typeof value === "string" ? JSON.parse(value) : value;
// //     return Array.isArray(parsed) ? parsed : [];
// //   } catch {
// //     return [];
// //   }
// // }

// // function linesFromField(value) {
// //   // Accepts either a real array (JSON body) or newline-separated text (multipart form field)
// //   if (Array.isArray(value)) return value.filter(Boolean);
// //   if (!value) return [];
// //   return String(value)
// //     .split("\n")
// //     .map((line) => line.trim())
// //     .filter(Boolean);
// // }

// // function parseProductRow(row) {
// //   return {
// //     dbId: row.id,
// //     id: row.slug,
// //     name: row.name,
// //     category: row.category_name,
// //     categoryId: row.category_id,
// //     categorySlug: row.category_slug,
// //     description: row.description,
// //     fullDescription: row.full_description,
// //     price: Number(row.price),
// //     sizes: safeArray(row.sizes),
// //     image: row.image,
// //     sku: row.sku,
// //     specifications: safeArray(row.specifications),
// //     features: safeArray(row.features),
// //     applications: safeArray(row.applications),
// //     isActive: !!row.is_active,
// //     createdAt: row.created_at,
// //   };
// // }

// // // ---------------------------------------------------------------------------
// // // AUTH
// // // ---------------------------------------------------------------------------

// // // POST /api/admin/login  { username, password }
// // adminRouter.post("/login", (req, res) => {
// //   const { username, password } = req.body || {};
// //   const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

// //   if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
// //     return res.json({ token: signAdminToken() });
// //   }
// //   return res.status(401).json({ error: "Invalid username or password." });
// // });

// // // GET /api/admin/me — lets the frontend verify a stored token is still valid
// // adminRouter.get("/me", requireAdmin, (req, res) => {
// //   res.json({ role: req.admin.role });
// // });

// // // Everything below this line requires a valid admin session.
// // adminRouter.use(requireAdmin);

// // // ---------------------------------------------------------------------------
// // // CATEGORIES
// // // ---------------------------------------------------------------------------

// // adminRouter.get("/categories", async (_req, res) => {
// //   const [rows] = await pool.query(
// //     `SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count
// //      FROM categories c ORDER BY sort_order ASC, name ASC`,
// //   );
// //   res.json(rows);
// // });

// // adminRouter.post("/categories", async (req, res) => {
// //   const { name, sortOrder = 0 } = req.body || {};
// //   if (!name || !name.trim())
// //     return res.status(400).json({ error: "Category name is required." });
// //   const slug = slugify(name);
// //   try {
// //     const [result] = await pool.query(
// //       "INSERT INTO categories (name, slug, sort_order) VALUES (?, ?, ?)",
// //       [name.trim(), slug, Number(sortOrder) || 0],
// //     );
// //     res.status(201).json({ id: result.insertId, name: name.trim(), slug });
// //   } catch (err) {
// //     if (err.code === "ER_DUP_ENTRY")
// //       return res
// //         .status(409)
// //         .json({ error: "A category with this name already exists." });
// //     throw err;
// //   }
// // });

// // adminRouter.put("/categories/:id", async (req, res) => {
// //   const { name, sortOrder } = req.body || {};
// //   if (!name || !name.trim())
// //     return res.status(400).json({ error: "Category name is required." });
// //   const slug = slugify(name);
// //   await pool.query(
// //     "UPDATE categories SET name = ?, slug = ?, sort_order = ? WHERE id = ?",
// //     [name.trim(), slug, Number(sortOrder) || 0, req.params.id],
// //   );
// //   res.json({ id: Number(req.params.id), name: name.trim(), slug });
// // });

// // adminRouter.delete("/categories/:id", async (req, res) => {
// //   const [[{ count }]] = await pool.query(
// //     "SELECT COUNT(*) AS count FROM products WHERE category_id = ?",
// //     [req.params.id],
// //   );
// //   if (count > 0) {
// //     return res.status(409).json({
// //       error: `Cannot delete: ${count} product(s) still use this category. Move or delete them first.`,
// //     });
// //   }
// //   await pool.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
// //   res.status(204).end();
// // });

// // // ---------------------------------------------------------------------------
// // // PRODUCTS
// // // ---------------------------------------------------------------------------

// // adminRouter.get("/products", async (_req, res) => {
// //   const [rows] = await pool.query(
// //     `SELECT p.*, c.name AS category_name, c.slug AS category_slug
// //      FROM products p JOIN categories c ON c.id = p.category_id
// //      ORDER BY p.created_at DESC`,
// //   );
// //   res.json(rows.map(parseProductRow));
// // });

// // function readProductBody(req) {
// //   const body = req.body || {};
// //   return {
// //     name: (body.name || "").trim(),
// //     categoryId: Number(body.categoryId),
// //     description: (body.description || "").trim(),
// //     fullDescription: (body.fullDescription || "").trim(),
// //     price: Number(body.price) || 0,
// //     sku: (body.sku || "").trim(),
// //     sizes: linesFromField(body.sizes),
// //     specifications: linesFromField(body.specifications),
// //     features: linesFromField(body.features),
// //     applications: linesFromField(body.applications),
// //     isActive:
// //       body.isActive === undefined
// //         ? true
// //         : body.isActive === "false"
// //           ? false
// //           : !!body.isActive,
// //   };
// // }

// // adminRouter.post("/products", upload.single("image"), async (req, res) => {
// //   const data = readProductBody(req);
// //   if (!data.name)
// //     return res.status(400).json({ error: "Product name is required." });
// //   if (!data.categoryId)
// //     return res.status(400).json({ error: "Category is required." });
// //   if (!data.sku) return res.status(400).json({ error: "SKU is required." });

// //   const image = req.file
// //     ? `/uploads/${req.file.filename}`
// //     : req.body.imageUrl || "/assets/products/placeholder.png";
// //   const slug = slugify(data.name);

// //   try {
// //     const [result] = await pool.query(
// //       `INSERT INTO products
// //        (category_id, name, slug, sku, description, full_description, price, image, sizes, specifications, features, applications, is_active)
// //        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
// //       [
// //         data.categoryId,
// //         data.name,
// //         slug,
// //         data.sku,
// //         data.description,
// //         data.fullDescription,
// //         data.price,
// //         image,
// //         JSON.stringify(data.sizes),
// //         JSON.stringify(data.specifications),
// //         JSON.stringify(data.features),
// //         JSON.stringify(data.applications),
// //         data.isActive ? 1 : 0,
// //       ],
// //     );
// //     res.status(201).json({ id: result.insertId, slug });
// //   } catch (err) {
// //     if (err.code === "ER_DUP_ENTRY")
// //       return res
// //         .status(409)
// //         .json({ error: "A product with this name or SKU already exists." });
// //     throw err;
// //   }
// // });

// // adminRouter.put("/products/:id", upload.single("image"), async (req, res) => {
// //   const data = readProductBody(req);
// //   if (!data.name)
// //     return res.status(400).json({ error: "Product name is required." });
// //   if (!data.categoryId)
// //     return res.status(400).json({ error: "Category is required." });
// //   if (!data.sku) return res.status(400).json({ error: "SKU is required." });

// //   const slug = slugify(data.name);
// //   const setImage = req.file
// //     ? `/uploads/${req.file.filename}`
// //     : req.body.imageUrl;

// //   const fields = [
// //     data.categoryId,
// //     data.name,
// //     slug,
// //     data.sku,
// //     data.description,
// //     data.fullDescription,
// //     data.price,
// //     JSON.stringify(data.sizes),
// //     JSON.stringify(data.specifications),
// //     JSON.stringify(data.features),
// //     JSON.stringify(data.applications),
// //     data.isActive ? 1 : 0,
// //   ];

// //   try {
// //     if (setImage) {
// //       await pool.query(
// //         `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
// //          price=?, sizes=?, specifications=?, features=?, applications=?, is_active=?, image=? WHERE id = ?`,
// //         [...fields, setImage, req.params.id],
// //       );
// //     } else {
// //       await pool.query(
// //         `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
// //          price=?, sizes=?, specifications=?, features=?, applications=?, is_active=? WHERE id = ?`,
// //         [...fields, req.params.id],
// //       );
// //     }
// //     res.json({ id: Number(req.params.id), slug });
// //   } catch (err) {
// //     if (err.code === "ER_DUP_ENTRY")
// //       return res
// //         .status(409)
// //         .json({ error: "A product with this name or SKU already exists." });
// //     throw err;
// //   }
// // });

// // adminRouter.delete("/products/:id", async (req, res) => {
// //   await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);
// //   res.status(204).end();
// // });

// // // ---------------------------------------------------------------------------
// // // QUOTES
// // // ---------------------------------------------------------------------------

// // adminRouter.get("/quotes", async (_req, res) => {
// //   const [quotes] = await pool.query(
// //     "SELECT * FROM quotes ORDER BY created_at DESC",
// //   );
// //   const [items] = await pool.query("SELECT * FROM quote_items ORDER BY id ASC");

// //   const itemsByQuote = {};
// //   for (const item of items) {
// //     (itemsByQuote[item.quote_id] ||= []).push({
// //       productName: item.product_name,
// //       sku: item.sku,
// //       size: item.size,
// //       unitPrice: Number(item.unit_price),
// //       quantity: item.quantity,
// //       lineTotal: Number(item.line_total),
// //     });
// //   }

// //   res.json(
// //     quotes.map((q) => ({
// //       id: q.id,
// //       fullName: q.full_name,
// //       email: q.email,
// //       phone: q.phone,
// //       message: q.message,
// //       type: q.type,
// //       status: q.status,
// //       emailSent: !!q.email_sent,
// //       createdAt: q.created_at,
// //       items: itemsByQuote[q.id] || [],
// //       total: (itemsByQuote[q.id] || []).reduce(
// //         (sum, i) => sum + i.lineTotal,
// //         0,
// //       ),
// //     })),
// //   );
// // });

// // adminRouter.put("/quotes/:id/status", async (req, res) => {
// //   const { status } = req.body || {};
// //   if (!["new", "contacted", "closed"].includes(status)) {
// //     return res
// //       .status(400)
// //       .json({ error: "Status must be one of: new, contacted, closed." });
// //   }
// //   await pool.query("UPDATE quotes SET status = ? WHERE id = ?", [
// //     status,
// //     req.params.id,
// //   ]);
// //   res.json({ id: Number(req.params.id), status });
// // });

// // // ---------------------------------------------------------------------------
// // // DASHBOARD STATS
// // // ---------------------------------------------------------------------------

// // adminRouter.get("/stats", async (_req, res) => {
// //   const [[{ totalQuotes }]] = await pool.query(
// //     "SELECT COUNT(*) AS totalQuotes FROM quotes",
// //   );
// //   const [[{ totalProducts }]] = await pool.query(
// //     "SELECT COUNT(*) AS totalProducts FROM products",
// //   );
// //   const [[{ totalCategories }]] = await pool.query(
// //     "SELECT COUNT(*) AS totalCategories FROM categories",
// //   );
// //   const [[{ newQuotes }]] = await pool.query(
// //     "SELECT COUNT(*) AS newQuotes FROM quotes WHERE status = 'new'",
// //   );

// //   const [dailyRows] = await pool.query(
// //     `SELECT DATE(created_at) AS day, COUNT(*) AS count
// //      FROM quotes
// //      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
// //      GROUP BY DATE(created_at)
// //      ORDER BY day ASC`,
// //   );

// //   const [statusRows] = await pool.query(
// //     `SELECT status, COUNT(*) AS count FROM quotes GROUP BY status`,
// //   );

// //   const [topProductRows] = await pool.query(
// //     `SELECT product_name, SUM(quantity) AS units
// //      FROM quote_items GROUP BY product_name ORDER BY units DESC LIMIT 6`,
// //   );

// //   const [categoryRows] = await pool.query(
// //     `SELECT c.name, COUNT(p.id) AS count FROM categories c
// //      LEFT JOIN products p ON p.category_id = c.id
// //      GROUP BY c.id ORDER BY c.sort_order ASC`,
// //   );

// //   res.json({
// //     totalQuotes,
// //     totalProducts,
// //     totalCategories,
// //     newQuotes,
// //     quotesByDay: dailyRows.map((r) => ({ day: r.day, count: r.count })),
// //     quotesByStatus: statusRows.map((r) => ({
// //       status: r.status,
// //       count: r.count,
// //     })),
// //     topProducts: topProductRows.map((r) => ({
// //       name: r.product_name,
// //       units: Number(r.units),
// //     })),
// //     productsByCategory: categoryRows.map((r) => ({
// //       name: r.name,
// //       count: r.count,
// //     })),
// //   });
// // });

// import { Router } from "express";
// import { pool } from "../db.js";
// import { requireAdmin } from "../middleware/auth.js";
// import { upload } from "../middleware/upload.js";
// import { uploadProductImage } from "../utils/cloudinary.js";
// import { signAdminToken } from "../utils/jwt.js";
// import { slugify } from "../utils/slugify.js";

// export const adminRouter = Router();

// function safeArray(value) {
//   if (Array.isArray(value)) return value;
//   if (!value) return [];
//   try {
//     const parsed = typeof value === "string" ? JSON.parse(value) : value;
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// }

// function linesFromField(value) {
//   // Accepts either a real array (JSON body) or newline-separated text (multipart form field)
//   if (Array.isArray(value)) return value.filter(Boolean);
//   if (!value) return [];
//   return String(value)
//     .split("\n")
//     .map((line) => line.trim())
//     .filter(Boolean);
// }

// function parseProductRow(row) {
//   return {
//     dbId: row.id,
//     id: row.slug,
//     name: row.name,
//     category: row.category_name,
//     categoryId: row.category_id,
//     categorySlug: row.category_slug,
//     description: row.description,
//     fullDescription: row.full_description,
//     price: Number(row.price),
//     sizes: safeArray(row.sizes),
//     image: row.image,
//     sku: row.sku,
//     specifications: safeArray(row.specifications),
//     features: safeArray(row.features),
//     applications: safeArray(row.applications),
//     isActive: !!row.is_active,
//     createdAt: row.created_at,
//   };
// }

// // ---------------------------------------------------------------------------
// // AUTH
// // ---------------------------------------------------------------------------

// // POST /api/admin/login  { username, password }
// adminRouter.post("/login", (req, res) => {
//   const { username, password } = req.body || {};
//   const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

//   if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//     return res.json({ token: signAdminToken() });
//   }
//   return res.status(401).json({ error: "Invalid username or password." });
// });

// // GET /api/admin/me — lets the frontend verify a stored token is still valid
// adminRouter.get("/me", requireAdmin, (req, res) => {
//   res.json({ role: req.admin.role });
// });

// // Everything below this line requires a valid admin session.
// adminRouter.use(requireAdmin);

// // ---------------------------------------------------------------------------
// // CATEGORIES
// // ---------------------------------------------------------------------------

// adminRouter.get("/categories", async (_req, res) => {
//   const [rows] = await pool.query(
//     `SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count
//      FROM categories c ORDER BY sort_order ASC, name ASC`,
//   );
//   res.json(rows);
// });

// adminRouter.post("/categories", async (req, res) => {
//   const { name, sortOrder = 0 } = req.body || {};
//   if (!name || !name.trim())
//     return res.status(400).json({ error: "Category name is required." });
//   const slug = slugify(name);
//   try {
//     const [result] = await pool.query(
//       "INSERT INTO categories (name, slug, sort_order) VALUES (?, ?, ?)",
//       [name.trim(), slug, Number(sortOrder) || 0],
//     );
//     res.status(201).json({ id: result.insertId, name: name.trim(), slug });
//   } catch (err) {
//     if (err.code === "ER_DUP_ENTRY")
//       return res
//         .status(409)
//         .json({ error: "A category with this name already exists." });
//     throw err;
//   }
// });

// adminRouter.put("/categories/:id", async (req, res) => {
//   const { name, sortOrder } = req.body || {};
//   if (!name || !name.trim())
//     return res.status(400).json({ error: "Category name is required." });
//   const slug = slugify(name);
//   await pool.query(
//     "UPDATE categories SET name = ?, slug = ?, sort_order = ? WHERE id = ?",
//     [name.trim(), slug, Number(sortOrder) || 0, req.params.id],
//   );
//   res.json({ id: Number(req.params.id), name: name.trim(), slug });
// });

// adminRouter.delete("/categories/:id", async (req, res) => {
//   const [[{ count }]] = await pool.query(
//     "SELECT COUNT(*) AS count FROM products WHERE category_id = ?",
//     [req.params.id],
//   );
//   if (count > 0) {
//     return res
//       .status(409)
//       .json({
//         error: `Cannot delete: ${count} product(s) still use this category. Move or delete them first.`,
//       });
//   }
//   await pool.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
//   res.status(204).end();
// });

// // ---------------------------------------------------------------------------
// // PRODUCTS
// // ---------------------------------------------------------------------------

// adminRouter.get("/products", async (_req, res) => {
//   const [rows] = await pool.query(
//     `SELECT p.*, c.name AS category_name, c.slug AS category_slug
//      FROM products p JOIN categories c ON c.id = p.category_id
//      ORDER BY p.created_at DESC`,
//   );
//   res.json(rows.map(parseProductRow));
// });

// function readProductBody(req) {
//   const body = req.body || {};
//   return {
//     name: (body.name || "").trim(),
//     categoryId: Number(body.categoryId),
//     description: (body.description || "").trim(),
//     fullDescription: (body.fullDescription || "").trim(),
//     price: Number(body.price) || 0,
//     sku: (body.sku || "").trim(),
//     sizes: linesFromField(body.sizes),
//     specifications: linesFromField(body.specifications),
//     features: linesFromField(body.features),
//     applications: linesFromField(body.applications),
//     isActive:
//       body.isActive === undefined
//         ? true
//         : body.isActive === "false"
//           ? false
//           : !!body.isActive,
//   };
// }

// adminRouter.post("/products", upload.single("image"), async (req, res) => {
//   const data = readProductBody(req);
//   if (!data.name)
//     return res.status(400).json({ error: "Product name is required." });
//   if (!data.categoryId)
//     return res.status(400).json({ error: "Category is required." });
//   if (!data.sku) return res.status(400).json({ error: "SKU is required." });

//   let image = req.body.imageUrl || "/assets/products/placeholder.png";
//   if (req.file) {
//     try {
//       const uploaded = await uploadProductImage(req.file.buffer, data.name);
//       image = uploaded.secure_url;
//     } catch (err) {
//       console.error("[cloudinary] upload failed:", err.message);
//       return res
//         .status(502)
//         .json({ error: "Image upload failed. Please try again." });
//     }
//   }
//   const slug = slugify(data.name);

//   try {
//     const [result] = await pool.query(
//       `INSERT INTO products
//        (category_id, name, slug, sku, description, full_description, price, image, sizes, specifications, features, applications, is_active)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         data.categoryId,
//         data.name,
//         slug,
//         data.sku,
//         data.description,
//         data.fullDescription,
//         data.price,
//         image,
//         JSON.stringify(data.sizes),
//         JSON.stringify(data.specifications),
//         JSON.stringify(data.features),
//         JSON.stringify(data.applications),
//         data.isActive ? 1 : 0,
//       ],
//     );
//     res.status(201).json({ id: result.insertId, slug });
//   } catch (err) {
//     if (err.code === "ER_DUP_ENTRY")
//       return res
//         .status(409)
//         .json({ error: "A product with this name or SKU already exists." });
//     throw err;
//   }
// });

// adminRouter.put("/products/:id", upload.single("image"), async (req, res) => {
//   const data = readProductBody(req);
//   if (!data.name)
//     return res.status(400).json({ error: "Product name is required." });
//   if (!data.categoryId)
//     return res.status(400).json({ error: "Category is required." });
//   if (!data.sku) return res.status(400).json({ error: "SKU is required." });

//   const slug = slugify(data.name);
//   let setImage = req.body.imageUrl;
//   if (req.file) {
//     try {
//       const uploaded = await uploadProductImage(req.file.buffer, data.name);
//       setImage = uploaded.secure_url;
//     } catch (err) {
//       console.error("[cloudinary] upload failed:", err.message);
//       return res
//         .status(502)
//         .json({ error: "Image upload failed. Please try again." });
//     }
//   }

//   const fields = [
//     data.categoryId,
//     data.name,
//     slug,
//     data.sku,
//     data.description,
//     data.fullDescription,
//     data.price,
//     JSON.stringify(data.sizes),
//     JSON.stringify(data.specifications),
//     JSON.stringify(data.features),
//     JSON.stringify(data.applications),
//     data.isActive ? 1 : 0,
//   ];

//   try {
//     if (setImage) {
//       await pool.query(
//         `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
//          price=?, sizes=?, specifications=?, features=?, applications=?, is_active=?, image=? WHERE id = ?`,
//         [...fields, setImage, req.params.id],
//       );
//     } else {
//       await pool.query(
//         `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
//          price=?, sizes=?, specifications=?, features=?, applications=?, is_active=? WHERE id = ?`,
//         [...fields, req.params.id],
//       );
//     }
//     res.json({ id: Number(req.params.id), slug });
//   } catch (err) {
//     if (err.code === "ER_DUP_ENTRY")
//       return res
//         .status(409)
//         .json({ error: "A product with this name or SKU already exists." });
//     throw err;
//   }
// });

// adminRouter.delete("/products/:id", async (req, res) => {
//   await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);
//   res.status(204).end();
// });

// // ---------------------------------------------------------------------------
// // QUOTES
// // ---------------------------------------------------------------------------

// adminRouter.get("/quotes", async (_req, res) => {
//   const [quotes] = await pool.query(
//     "SELECT * FROM quotes ORDER BY created_at DESC",
//   );
//   const [items] = await pool.query("SELECT * FROM quote_items ORDER BY id ASC");

//   const itemsByQuote = {};
//   for (const item of items) {
//     (itemsByQuote[item.quote_id] ||= []).push({
//       productName: item.product_name,
//       sku: item.sku,
//       size: item.size,
//       unitPrice: Number(item.unit_price),
//       quantity: item.quantity,
//       lineTotal: Number(item.line_total),
//     });
//   }

//   res.json(
//     quotes.map((q) => ({
//       id: q.id,
//       fullName: q.full_name,
//       email: q.email,
//       phone: q.phone,
//       message: q.message,
//       type: q.type,
//       status: q.status,
//       emailSent: !!q.email_sent,
//       createdAt: q.created_at,
//       items: itemsByQuote[q.id] || [],
//       total: (itemsByQuote[q.id] || []).reduce(
//         (sum, i) => sum + i.lineTotal,
//         0,
//       ),
//     })),
//   );
// });

// adminRouter.put("/quotes/:id/status", async (req, res) => {
//   const { status } = req.body || {};
//   if (!["new", "contacted", "closed"].includes(status)) {
//     return res
//       .status(400)
//       .json({ error: "Status must be one of: new, contacted, closed." });
//   }
//   await pool.query("UPDATE quotes SET status = ? WHERE id = ?", [
//     status,
//     req.params.id,
//   ]);
//   res.json({ id: Number(req.params.id), status });
// });

// // ---------------------------------------------------------------------------
// // DASHBOARD STATS
// // ---------------------------------------------------------------------------

// adminRouter.get("/stats", async (_req, res) => {
//   const [[{ totalQuotes }]] = await pool.query(
//     "SELECT COUNT(*) AS totalQuotes FROM quotes",
//   );
//   const [[{ totalProducts }]] = await pool.query(
//     "SELECT COUNT(*) AS totalProducts FROM products",
//   );
//   const [[{ totalCategories }]] = await pool.query(
//     "SELECT COUNT(*) AS totalCategories FROM categories",
//   );
//   const [[{ newQuotes }]] = await pool.query(
//     "SELECT COUNT(*) AS newQuotes FROM quotes WHERE status = 'new'",
//   );

//   const [dailyRows] = await pool.query(
//     `SELECT DATE(created_at) AS day, COUNT(*) AS count
//      FROM quotes
//      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
//      GROUP BY DATE(created_at)
//      ORDER BY day ASC`,
//   );

//   const [statusRows] = await pool.query(
//     `SELECT status, COUNT(*) AS count FROM quotes GROUP BY status`,
//   );

//   const [topProductRows] = await pool.query(
//     `SELECT product_name, SUM(quantity) AS units
//      FROM quote_items GROUP BY product_name ORDER BY units DESC LIMIT 6`,
//   );

//   const [categoryRows] = await pool.query(
//     `SELECT c.name, COUNT(p.id) AS count FROM categories c
//      LEFT JOIN products p ON p.category_id = c.id
//      GROUP BY c.id ORDER BY c.sort_order ASC`,
//   );

//   res.json({
//     totalQuotes,
//     totalProducts,
//     totalCategories,
//     newQuotes,
//     quotesByDay: dailyRows.map((r) => ({ day: r.day, count: r.count })),
//     quotesByStatus: statusRows.map((r) => ({
//       status: r.status,
//       count: r.count,
//     })),
//     topProducts: topProductRows.map((r) => ({
//       name: r.product_name,
//       units: Number(r.units),
//     })),
//     productsByCategory: categoryRows.map((r) => ({
//       name: r.name,
//       count: r.count,
//     })),
//   });
// });

import { Router } from "express";
import { pool } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadProductImage } from "../utils/cloudinary.js";
import { signAdminToken } from "../utils/jwt.js";
import { slugify } from "../utils/slugify.js";

export const adminRouter = Router();

function safeArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function linesFromField(value) {
  // Accepts either a real array (JSON body) or newline-separated text (multipart form field)
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseProductRow(row) {
  return {
    dbId: row.id,
    id: row.slug,
    name: row.name,
    category: row.category_name,
    categoryId: row.category_id,
    categorySlug: row.category_slug,
    description: row.description,
    fullDescription: row.full_description,
    price: Number(row.price),
    sizes: safeArray(row.sizes),
    image: row.image,
    sku: row.sku,
    specifications: safeArray(row.specifications),
    features: safeArray(row.features),
    applications: safeArray(row.applications),
    isActive: !!row.is_active,
    inStock: !!row.in_stock,
    hidePrice: !!row.hide_price,
    isFeatured: !!row.is_featured,
    createdAt: row.created_at,
  };
}

// ---------------------------------------------------------------------------
// AUTH
// ---------------------------------------------------------------------------

// POST /api/admin/login  { username, password }
adminRouter.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: signAdminToken() });
  }
  return res.status(401).json({ error: "Invalid username or password." });
});

// GET /api/admin/me — lets the frontend verify a stored token is still valid
adminRouter.get("/me", requireAdmin, (req, res) => {
  res.json({ role: req.admin.role });
});

// Everything below this line requires a valid admin session.
adminRouter.use(requireAdmin);

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------

adminRouter.get("/categories", async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count
     FROM categories c ORDER BY sort_order ASC, name ASC`,
  );
  res.json(rows);
});

adminRouter.post("/categories", async (req, res) => {
  const { name, sortOrder = 0 } = req.body || {};
  if (!name || !name.trim())
    return res.status(400).json({ error: "Category name is required." });
  const slug = slugify(name);
  try {
    const [result] = await pool.query(
      "INSERT INTO categories (name, slug, sort_order) VALUES (?, ?, ?)",
      [name.trim(), slug, Number(sortOrder) || 0],
    );
    res.status(201).json({ id: result.insertId, name: name.trim(), slug });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res
        .status(409)
        .json({ error: "A category with this name already exists." });
    throw err;
  }
});

adminRouter.put("/categories/:id", async (req, res) => {
  const { name, sortOrder } = req.body || {};
  if (!name || !name.trim())
    return res.status(400).json({ error: "Category name is required." });
  const slug = slugify(name);
  await pool.query(
    "UPDATE categories SET name = ?, slug = ?, sort_order = ? WHERE id = ?",
    [name.trim(), slug, Number(sortOrder) || 0, req.params.id],
  );
  res.json({ id: Number(req.params.id), name: name.trim(), slug });
});

adminRouter.delete("/categories/:id", async (req, res) => {
  const [[{ count }]] = await pool.query(
    "SELECT COUNT(*) AS count FROM products WHERE category_id = ?",
    [req.params.id],
  );
  if (count > 0) {
    return res
      .status(409)
      .json({
        error: `Cannot delete: ${count} product(s) still use this category. Move or delete them first.`,
      });
  }
  await pool.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------

adminRouter.get("/products", async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug
     FROM products p JOIN categories c ON c.id = p.category_id
     ORDER BY p.created_at DESC`,
  );
  res.json(rows.map(parseProductRow));
});

function readProductBody(req) {
  const body = req.body || {};
  return {
    name: (body.name || "").trim(),
    categoryId: Number(body.categoryId),
    description: (body.description || "").trim(),
    fullDescription: (body.fullDescription || "").trim(),
    price: Number(body.price) || 0,
    sku: (body.sku || "").trim(),
    sizes: linesFromField(body.sizes),
    specifications: linesFromField(body.specifications),
    features: linesFromField(body.features),
    applications: linesFromField(body.applications),
    isActive: body.isActive === "true" || body.isActive === true,
    inStock: body.inStock === "true" || body.inStock === true,
    hidePrice: body.hidePrice === "true" || body.hidePrice === true,
    isFeatured: body.isFeatured === "true" || body.isFeatured === true,
  };
}

/**
 * At most 4 products may be featured at once (shown in the Home page
 * "Featured Products" section). Checked server-side so the limit can never
 * be exceeded no matter what the admin UI does or doesn't enforce.
 */
async function featuredLimitExceeded(excludeId) {
  const params = excludeId ? [excludeId] : [];
  const [[{ count }]] = await pool.query(
    `SELECT COUNT(*) AS count FROM products WHERE is_featured = 1 ${excludeId ? "AND id != ?" : ""}`,
    params,
  );
  return count >= 4;
}

adminRouter.post("/products", upload.single("image"), async (req, res) => {
  const data = readProductBody(req);
  if (!data.name)
    return res.status(400).json({ error: "Product name is required." });
  if (!data.categoryId)
    return res.status(400).json({ error: "Category is required." });
  if (!data.sku) return res.status(400).json({ error: "SKU is required." });
  if (data.isFeatured && (await featuredLimitExceeded())) {
    return res
      .status(409)
      .json({
        error:
          "Maximum of 4 featured products allowed. Un-feature another product first.",
      });
  }

  let image = req.body.imageUrl || "/assets/products/placeholder.png";
  if (req.file) {
    try {
      const uploaded = await uploadProductImage(req.file.buffer, data.name);
      image = uploaded.secure_url;
    } catch (err) {
      console.error("[cloudinary] upload failed:", err.message);
      return res
        .status(502)
        .json({ error: "Image upload failed. Please try again." });
    }
  }
  const slug = slugify(data.name);

  try {
    const [result] = await pool.query(
      `INSERT INTO products
       (category_id, name, slug, sku, description, full_description, price, image, sizes, specifications, features, applications, is_active, in_stock, hide_price, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.categoryId,
        data.name,
        slug,
        data.sku,
        data.description,
        data.fullDescription,
        data.price,
        image,
        JSON.stringify(data.sizes),
        JSON.stringify(data.specifications),
        JSON.stringify(data.features),
        JSON.stringify(data.applications),
        data.isActive ? 1 : 0,
        data.inStock ? 1 : 0,
        data.hidePrice ? 1 : 0,
        data.isFeatured ? 1 : 0,
      ],
    );
    res.status(201).json({ id: result.insertId, slug });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res
        .status(409)
        .json({ error: "A product with this name or SKU already exists." });
    throw err;
  }
});

adminRouter.put("/products/:id", upload.single("image"), async (req, res) => {
  const data = readProductBody(req);
  if (!data.name)
    return res.status(400).json({ error: "Product name is required." });
  if (!data.categoryId)
    return res.status(400).json({ error: "Category is required." });
  if (!data.sku) return res.status(400).json({ error: "SKU is required." });
  if (data.isFeatured && (await featuredLimitExceeded(req.params.id))) {
    return res
      .status(409)
      .json({
        error:
          "Maximum of 4 featured products allowed. Un-feature another product first.",
      });
  }

  const slug = slugify(data.name);
  let setImage = req.body.imageUrl;
  if (req.file) {
    try {
      const uploaded = await uploadProductImage(req.file.buffer, data.name);
      setImage = uploaded.secure_url;
    } catch (err) {
      console.error("[cloudinary] upload failed:", err.message);
      return res
        .status(502)
        .json({ error: "Image upload failed. Please try again." });
    }
  }

  const fields = [
    data.categoryId,
    data.name,
    slug,
    data.sku,
    data.description,
    data.fullDescription,
    data.price,
    JSON.stringify(data.sizes),
    JSON.stringify(data.specifications),
    JSON.stringify(data.features),
    JSON.stringify(data.applications),
    data.isActive ? 1 : 0,
    data.inStock ? 1 : 0,
    data.hidePrice ? 1 : 0,
    data.isFeatured ? 1 : 0,
  ];

  try {
    if (setImage) {
      await pool.query(
        `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
         price=?, sizes=?, specifications=?, features=?, applications=?, is_active=?, in_stock=?, hide_price=?, is_featured=?, image=? WHERE id = ?`,
        [...fields, setImage, req.params.id],
      );
    } else {
      await pool.query(
        `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
         price=?, sizes=?, specifications=?, features=?, applications=?, is_active=?, in_stock=?, hide_price=?, is_featured=? WHERE id = ?`,
        [...fields, req.params.id],
      );
    }
    res.json({ id: Number(req.params.id), slug });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res
        .status(409)
        .json({ error: "A product with this name or SKU already exists." });
    throw err;
  }
});

adminRouter.delete("/products/:id", async (req, res) => {
  await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// QUOTES
// ---------------------------------------------------------------------------

adminRouter.get("/quotes", async (_req, res) => {
  const [quotes] = await pool.query(
    "SELECT * FROM quotes ORDER BY created_at DESC",
  );
  const [items] = await pool.query("SELECT * FROM quote_items ORDER BY id ASC");

  const itemsByQuote = {};
  for (const item of items) {
    (itemsByQuote[item.quote_id] ||= []).push({
      productName: item.product_name,
      sku: item.sku,
      size: item.size,
      unitPrice: Number(item.unit_price),
      quantity: item.quantity,
      lineTotal: Number(item.line_total),
    });
  }

  res.json(
    quotes.map((q) => ({
      id: q.id,
      fullName: q.full_name,
      email: q.email,
      phone: q.phone,
      message: q.message,
      type: q.type,
      status: q.status,
      emailSent: !!q.email_sent,
      createdAt: q.created_at,
      items: itemsByQuote[q.id] || [],
      total: (itemsByQuote[q.id] || []).reduce(
        (sum, i) => sum + i.lineTotal,
        0,
      ),
    })),
  );
});

adminRouter.put("/quotes/:id/status", async (req, res) => {
  const { status } = req.body || {};
  if (!["new", "contacted", "closed"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Status must be one of: new, contacted, closed." });
  }
  await pool.query("UPDATE quotes SET status = ? WHERE id = ?", [
    status,
    req.params.id,
  ]);
  res.json({ id: Number(req.params.id), status });
});

// ---------------------------------------------------------------------------
// DASHBOARD STATS
// ---------------------------------------------------------------------------

adminRouter.get("/stats", async (_req, res) => {
  const [[{ totalQuotes }]] = await pool.query(
    "SELECT COUNT(*) AS totalQuotes FROM quotes",
  );
  const [[{ totalProducts }]] = await pool.query(
    "SELECT COUNT(*) AS totalProducts FROM products",
  );
  const [[{ totalCategories }]] = await pool.query(
    "SELECT COUNT(*) AS totalCategories FROM categories",
  );
  const [[{ newQuotes }]] = await pool.query(
    "SELECT COUNT(*) AS newQuotes FROM quotes WHERE status = 'new'",
  );

  const [dailyRows] = await pool.query(
    `SELECT DATE(created_at) AS day, COUNT(*) AS count
     FROM quotes
     WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 13 DAY)
     GROUP BY DATE(created_at)
     ORDER BY day ASC`,
  );

  const [statusRows] = await pool.query(
    `SELECT status, COUNT(*) AS count FROM quotes GROUP BY status`,
  );

  const [topProductRows] = await pool.query(
    `SELECT product_name, SUM(quantity) AS units
     FROM quote_items GROUP BY product_name ORDER BY units DESC LIMIT 6`,
  );

  const [categoryRows] = await pool.query(
    `SELECT c.name, COUNT(p.id) AS count FROM categories c
     LEFT JOIN products p ON p.category_id = c.id
     GROUP BY c.id ORDER BY c.sort_order ASC`,
  );

  res.json({
    totalQuotes,
    totalProducts,
    totalCategories,
    newQuotes,
    quotesByDay: dailyRows.map((r) => ({ day: r.day, count: r.count })),
    quotesByStatus: statusRows.map((r) => ({
      status: r.status,
      count: r.count,
    })),
    topProducts: topProductRows.map((r) => ({
      name: r.product_name,
      units: Number(r.units),
    })),
    productsByCategory: categoryRows.map((r) => ({
      name: r.name,
      count: r.count,
    })),
  });
});
