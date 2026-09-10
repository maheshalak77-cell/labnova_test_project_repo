// // import { Router } from "express";
// // import { pool } from "../db.js";
// // import { sendQuoteEmail } from "../utils/mailer.js";

// // export const publicRouter = Router();

// // function parseProductRow(row) {
// //   return {
// //     id: row.slug,
// //     dbId: row.id,
// //     name: row.name,
// //     category: row.category_name,
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
// //   };
// // }

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

// // // GET /api/categories
// // publicRouter.get("/categories", async (_req, res) => {
// //   const [rows] = await pool.query("SELECT id, name, slug FROM categories ORDER BY sort_order ASC, name ASC");
// //   res.json(rows);
// // });

// // // GET /api/products?category=slug
// // publicRouter.get("/products", async (req, res) => {
// //   const { category } = req.query;
// //   const params = [];
// //   let where = "WHERE p.is_active = 1";
// //   if (category && category !== "all") {
// //     where += " AND c.slug = ?";
// //     params.push(category);
// //   }
// //   const [rows] = await pool.query(
// //     `SELECT p.*, c.name AS category_name, c.slug AS category_slug
// //      FROM products p JOIN categories c ON c.id = p.category_id
// //      ${where} ORDER BY p.created_at DESC`,
// //     params
// //   );
// //   res.json(rows.map(parseProductRow));
// // });

// // // GET /api/products/:slug
// // publicRouter.get("/products/:slug", async (req, res) => {
// //   const [rows] = await pool.query(
// //     `SELECT p.*, c.name AS category_name, c.slug AS category_slug
// //      FROM products p JOIN categories c ON c.id = p.category_id
// //      WHERE p.slug = ? AND p.is_active = 1 LIMIT 1`,
// //     [req.params.slug]
// //   );
// //   if (!rows.length) return res.status(404).json({ error: "Product not found." });
// //   res.json(parseProductRow(rows[0]));
// // });

// // // POST /api/quotes  — submitted from the Contact Us page
// // publicRouter.post("/quotes", async (req, res) => {
// //   const { fullName, email, phone, message, items } = req.body || {};

// //   if (!fullName || !String(fullName).trim()) return res.status(400).json({ error: "Full name is required." });
// //   if (!email || !String(email).trim()) return res.status(400).json({ error: "Email is required." });
// //   if (!Array.isArray(items)) return res.status(400).json({ error: "Items must be an array." });

// //   const conn = await pool.getConnection();
// //   try {
// //     await conn.beginTransaction();

// //     const [quoteResult] = await conn.query(
// //       "INSERT INTO quotes (full_name, email, phone, message) VALUES (?, ?, ?, ?)",
// //       [String(fullName).trim(), String(email).trim(), phone ? String(phone).trim() : null, message ? String(message).trim() : null]
// //     );
// //     const quoteId = quoteResult.insertId;

// //     const resolvedItems = [];
// //     for (const item of items) {
// //       const quantity = Math.max(1, Number(item.quantity) || 1);
// //       let productRow = null;

// //       if (item.productSlug) {
// //         const [rows] = await conn.query("SELECT id, name, sku, price FROM products WHERE slug = ? LIMIT 1", [item.productSlug]);
// //         productRow = rows[0] || null;
// //       }

// //       const unitPrice = productRow ? Number(productRow.price) : Number(item.unitPrice) || 0;
// //       const productName = productRow ? productRow.name : item.productName || "Unknown product";
// //       const sku = productRow ? productRow.sku : item.sku || null;
// //       const lineTotal = Number((unitPrice * quantity).toFixed(2));

// //       await conn.query(
// //         `INSERT INTO quote_items (quote_id, product_id, product_name, sku, size, unit_price, quantity, line_total)
// //          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
// //         [quoteId, productRow ? productRow.id : null, productName, sku, item.size || null, unitPrice, quantity, lineTotal]
// //       );

// //       resolvedItems.push({ product_name: productName, size: item.size || null, unit_price: unitPrice, quantity, line_total: lineTotal });
// //     }

// //     await conn.commit();

// //     const total = resolvedItems.reduce((sum, i) => sum + i.line_total, 0);
// //     const emailSent = await sendQuoteEmail({
// //       fullName: String(fullName).trim(),
// //       email: String(email).trim(),
// //       phone,
// //       message,
// //       items: resolvedItems,
// //       total,
// //     });

// //     if (emailSent) {
// //       await pool.query("UPDATE quotes SET email_sent = 1 WHERE id = ?", [quoteId]);
// //     }

// //     res.status(201).json({ id: quoteId, emailSent });
// //   } catch (err) {
// //     await conn.rollback();
// //     console.error("Failed to create quote:", err);
// //     res.status(500).json({ error: "Could not submit your quotation request. Please try again." });
// //   } finally {
// //     conn.release();
// //   }
// // });

// import { Router } from "express";
// import { pool } from "../db.js";
// import { sendQuoteEmail } from "../utils/mailer.js";

// export const publicRouter = Router();

// function parseProductRow(row) {
//   return {
//     id: row.slug,
//     dbId: row.id,
//     name: row.name,
//     category: row.category_name,
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
//   };
// }

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

// // GET /api/categories
// publicRouter.get("/categories", async (_req, res) => {
//   const [rows] = await pool.query(
//     "SELECT id, name, slug FROM categories ORDER BY sort_order ASC, name ASC",
//   );
//   res.json(rows);
// });

// // GET /api/products?category=slug
// publicRouter.get("/products", async (req, res) => {
//   const { category } = req.query;
//   const params = [];
//   let where = "WHERE p.is_active = 1";
//   if (category && category !== "all") {
//     where += " AND c.slug = ?";
//     params.push(category);
//   }
//   const [rows] = await pool.query(
//     `SELECT p.*, c.name AS category_name, c.slug AS category_slug
//      FROM products p JOIN categories c ON c.id = p.category_id
//      ${where} ORDER BY p.created_at DESC`,
//     params,
//   );
//   res.json(rows.map(parseProductRow));
// });

// // GET /api/products/:slug
// publicRouter.get("/products/:slug", async (req, res) => {
//   const [rows] = await pool.query(
//     `SELECT p.*, c.name AS category_name, c.slug AS category_slug
//      FROM products p JOIN categories c ON c.id = p.category_id
//      WHERE p.slug = ? AND p.is_active = 1 LIMIT 1`,
//     [req.params.slug],
//   );
//   if (!rows.length)
//     return res.status(404).json({ error: "Product not found." });
//   res.json(parseProductRow(rows[0]));
// });

// // POST /api/quotes  — submitted from the Contact Us page
// publicRouter.post("/quotes", async (req, res) => {
//   const { fullName, email, phone, message, items, type } = req.body || {};
//   const enquiryType = type === "question" ? "question" : "quote";

//   if (!fullName || !String(fullName).trim())
//     return res.status(400).json({ error: "Full name is required." });
//   if (!email || !String(email).trim())
//     return res.status(400).json({ error: "Email is required." });
//   if (!Array.isArray(items))
//     return res.status(400).json({ error: "Items must be an array." });
//   if (enquiryType === "quote" && items.length === 0) {
//     return res
//       .status(400)
//       .json({
//         error: "Add at least one product, or switch to General Enquiry.",
//       });
//   }

//   const conn = await pool.getConnection();
//   try {
//     await conn.beginTransaction();

//     const [quoteResult] = await conn.query(
//       "INSERT INTO quotes (full_name, email, phone, message, type) VALUES (?, ?, ?, ?, ?)",
//       [
//         String(fullName).trim(),
//         String(email).trim(),
//         phone ? String(phone).trim() : null,
//         message ? String(message).trim() : null,
//         enquiryType,
//       ],
//     );
//     const quoteId = quoteResult.insertId;

//     const resolvedItems = [];
//     // A "question" never attaches products, even if the browser sent some.
//     const itemsToProcess = enquiryType === "quote" ? items : [];
//     for (const item of itemsToProcess) {
//       const quantity = Math.max(1, Number(item.quantity) || 1);
//       let productRow = null;

//       if (item.productSlug) {
//         const [rows] = await conn.query(
//           "SELECT id, name, sku, price FROM products WHERE slug = ? LIMIT 1",
//           [item.productSlug],
//         );
//         productRow = rows[0] || null;
//       }

//       const unitPrice = productRow
//         ? Number(productRow.price)
//         : Number(item.unitPrice) || 0;
//       const productName = productRow
//         ? productRow.name
//         : item.productName || "Unknown product";
//       const sku = productRow ? productRow.sku : item.sku || null;
//       const lineTotal = Number((unitPrice * quantity).toFixed(2));

//       await conn.query(
//         `INSERT INTO quote_items (quote_id, product_id, product_name, sku, size, unit_price, quantity, line_total)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           quoteId,
//           productRow ? productRow.id : null,
//           productName,
//           sku,
//           item.size || null,
//           unitPrice,
//           quantity,
//           lineTotal,
//         ],
//       );

//       resolvedItems.push({
//         product_name: productName,
//         size: item.size || null,
//         unit_price: unitPrice,
//         quantity,
//         line_total: lineTotal,
//       });
//     }

//     await conn.commit();

//     const total = resolvedItems.reduce((sum, i) => sum + i.line_total, 0);
//     const emailSent = await sendQuoteEmail({
//       fullName: String(fullName).trim(),
//       email: String(email).trim(),
//       phone,
//       message,
//       items: resolvedItems,
//       total,
//       type: enquiryType,
//     });

//     if (emailSent) {
//       await pool.query("UPDATE quotes SET email_sent = 1 WHERE id = ?", [
//         quoteId,
//       ]);
//     }

//     res.status(201).json({ id: quoteId, emailSent, type: enquiryType });
//   } catch (err) {
//     await conn.rollback();
//     console.error("Failed to create quote:", err);
//     res
//       .status(500)
//       .json({
//         error: "Could not submit your quotation request. Please try again.",
//       });
//   } finally {
//     conn.release();
//   }
// });

import { Router } from "express";
import { pool } from "../db.js";
import { sendQuoteEmail } from "../utils/mailer.js";

export const publicRouter = Router();

function parseProductRow(row) {
  return {
    id: row.slug,
    dbId: row.id,
    name: row.name,
    category: row.category_name,
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
  };
}

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

// GET /api/categories
publicRouter.get("/categories", async (_req, res) => {
  const [rows] = await pool.query(
    "SELECT id, name, slug FROM categories ORDER BY sort_order ASC, name ASC",
  );
  res.json(rows);
});

// GET /api/products?category=slug
publicRouter.get("/products", async (req, res) => {
  const { category } = req.query;
  const params = [];
  let where = "WHERE p.is_active = 1";
  if (category && category !== "all") {
    where += " AND c.slug = ?";
    params.push(category);
  }
  const [rows] = await pool.query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug
     FROM products p JOIN categories c ON c.id = p.category_id
     ${where} ORDER BY p.created_at DESC`,
    params,
  );
  res.json(rows.map(parseProductRow));
});

// GET /api/products/:slug
publicRouter.get("/products/:slug", async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug
     FROM products p JOIN categories c ON c.id = p.category_id
     WHERE p.slug = ? AND p.is_active = 1 LIMIT 1`,
    [req.params.slug],
  );
  if (!rows.length)
    return res.status(404).json({ error: "Product not found." });
  res.json(parseProductRow(rows[0]));
});

// POST /api/quotes  — submitted from the Contact Us page
publicRouter.post("/quotes", async (req, res) => {
  const { fullName, email, phone, message, items, type } = req.body || {};
  const enquiryType = type === "question" ? "question" : "quote";

  if (!fullName || !String(fullName).trim())
    return res.status(400).json({ error: "Full name is required." });
  if (!email || !String(email).trim())
    return res.status(400).json({ error: "Email is required." });
  if (!Array.isArray(items))
    return res.status(400).json({ error: "Items must be an array." });
  if (enquiryType === "quote" && items.length === 0) {
    return res
      .status(400)
      .json({
        error: "Add at least one product, or switch to General Enquiry.",
      });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [quoteResult] = await conn.query(
      "INSERT INTO quotes (full_name, email, phone, message, type) VALUES (?, ?, ?, ?, ?)",
      [
        String(fullName).trim(),
        String(email).trim(),
        phone ? String(phone).trim() : null,
        message ? String(message).trim() : null,
        enquiryType,
      ],
    );
    const quoteId = quoteResult.insertId;

    const resolvedItems = [];
    // A "question" never attaches products, even if the browser sent some.
    const itemsToProcess = enquiryType === "quote" ? items : [];
    for (const item of itemsToProcess) {
      const quantity = Math.max(1, Number(item.quantity) || 1);
      let productRow = null;

      if (item.productSlug) {
        const [rows] = await conn.query(
          "SELECT id, name, sku, price FROM products WHERE slug = ? LIMIT 1",
          [item.productSlug],
        );
        productRow = rows[0] || null;
      }

      const unitPrice = productRow
        ? Number(productRow.price)
        : Number(item.unitPrice) || 0;
      const productName = productRow
        ? productRow.name
        : item.productName || "Unknown product";
      const sku = productRow ? productRow.sku : item.sku || null;
      const lineTotal = Number((unitPrice * quantity).toFixed(2));

      await conn.query(
        `INSERT INTO quote_items (quote_id, product_id, product_name, sku, size, unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          quoteId,
          productRow ? productRow.id : null,
          productName,
          sku,
          item.size || null,
          unitPrice,
          quantity,
          lineTotal,
        ],
      );

      resolvedItems.push({
        product_name: productName,
        size: item.size || null,
        unit_price: unitPrice,
        quantity,
        line_total: lineTotal,
      });
    }

    await conn.commit();

    // Respond to the customer immediately — the quote is safely saved.
    // Email delivery can be slow (or occasionally fail) and must never
    // hold up the confirmation the customer sees.
    res.status(201).json({ id: quoteId, type: enquiryType });

    const total = resolvedItems.reduce((sum, i) => sum + i.line_total, 0);
    sendQuoteEmail({
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone,
      message,
      items: resolvedItems,
      total,
      type: enquiryType,
    })
      .then(
        (sent) =>
          sent &&
          pool.query("UPDATE quotes SET email_sent = 1 WHERE id = ?", [
            quoteId,
          ]),
      )
      .catch((err) =>
        console.error("[quotes] background email update failed:", err),
      );
  } catch (err) {
    await conn.rollback();
    console.error("Failed to create quote:", err);
    res
      .status(500)
      .json({
        error: "Could not submit your quotation request. Please try again.",
      });
  } finally {
    conn.release();
  }
});
