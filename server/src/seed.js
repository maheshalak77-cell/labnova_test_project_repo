import "dotenv/config";
import { pool, ensureSchema } from "./db.js";
import { categories, products } from "./seedData.js";

async function seed() {
  await ensureSchema();
  console.log("Schema ready. Seeding categories and products...");

  const categoryIdBySlug = {};

  for (const category of categories) {
    const [existing] = await pool.query("SELECT id FROM categories WHERE slug = ?", [category.slug]);
    if (existing.length) {
      categoryIdBySlug[category.slug] = existing[0].id;
      continue;
    }
    const [result] = await pool.query(
      "INSERT INTO categories (name, slug, sort_order) VALUES (?, ?, ?)",
      [category.name, category.slug, category.sort_order]
    );
    categoryIdBySlug[category.slug] = result.insertId;
    console.log(`  + category: ${category.name}`);
  }

  for (const product of products) {
    const categoryId = categoryIdBySlug[product.categorySlug];
    const [existing] = await pool.query("SELECT id FROM products WHERE slug = ?", [product.slug]);
    const payload = [
      categoryId,
      product.name,
      product.slug,
      product.sku,
      product.description,
      product.fullDescription,
      product.price,
      product.image,
      JSON.stringify(product.sizes),
      JSON.stringify(product.specifications),
      JSON.stringify(product.features),
      JSON.stringify(product.applications),
    ];

    if (existing.length) {
      await pool.query(
        `UPDATE products SET category_id=?, name=?, slug=?, sku=?, description=?, full_description=?,
         price=?, image=?, sizes=?, specifications=?, features=?, applications=? WHERE slug = ?`,
        [...payload, product.slug]
      );
      console.log(`  ~ updated product: ${product.name}`);
    } else {
      await pool.query(
        `INSERT INTO products
         (category_id, name, slug, sku, description, full_description, price, image, sizes, specifications, features, applications)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        payload
      );
      console.log(`  + product: ${product.name}`);
    }
  }

  console.log("Seed complete.");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
