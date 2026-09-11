// import mysql from "mysql2/promise";
// import "dotenv/config";

// const {
//   DB_HOST = "localhost",
//   DB_PORT = "3306",
//   DB_USER = "root",
//   DB_PASSWORD = "",
//   DB_NAME = "labnova",
//   DB_SSL = "false",
// } = process.env;

// export const pool = mysql.createPool({
//   host: DB_HOST,
//   port: Number(DB_PORT),
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
// });

// /**
//  * Adds a column to an existing table if it's missing. Safe to call every
//  * startup — lets us evolve the schema (like adding quotes.type below)
//  * without breaking databases that were already seeded before the change.
//  */
// async function ensureColumn(conn, table, column, definitionSql) {
//   const [rows] = await conn.query(
//     `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
//      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
//     [table, column],
//   );
//   if (rows[0].cnt === 0) {
//     await conn.query(`ALTER TABLE ${table} ADD COLUMN ${definitionSql}`);
//   }
// }

// /**
//  * Creates every table the app needs if it doesn't already exist, and
//  * retrofits any columns added in later updates onto databases that were
//  * already seeded before those columns existed.
//  */
// export async function ensureSchema() {
//   const conn = await pool.getConnection();
//   try {
//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS categories (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(120) NOT NULL,
//         slug VARCHAR(140) NOT NULL UNIQUE,
//         sort_order INT NOT NULL DEFAULT 0,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
//     `);

//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS products (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         category_id INT NOT NULL,
//         name VARCHAR(200) NOT NULL,
//         slug VARCHAR(220) NOT NULL UNIQUE,
//         sku VARCHAR(60) NOT NULL UNIQUE,
//         description VARCHAR(500) NOT NULL,
//         full_description TEXT NOT NULL,
//         price DECIMAL(10,2) NOT NULL DEFAULT 0,
//         image VARCHAR(300) NOT NULL,
//         sizes JSON NOT NULL,
//         specifications JSON NOT NULL,
//         features JSON NOT NULL,
//         applications JSON NOT NULL,
//         is_active TINYINT(1) NOT NULL DEFAULT 1,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         CONSTRAINT fk_products_category FOREIGN KEY (category_id)
//           REFERENCES categories(id) ON DELETE CASCADE
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
//     `);

//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS quotes (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         full_name VARCHAR(150) NOT NULL,
//         email VARCHAR(180) NOT NULL,
//         phone VARCHAR(40) NULL,
//         message TEXT NULL,
//         type ENUM('quote','question') NOT NULL DEFAULT 'quote',
//         status ENUM('new','contacted','closed') NOT NULL DEFAULT 'new',
//         email_sent TINYINT(1) NOT NULL DEFAULT 0,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
//     `);
//     // Retrofit for databases that were seeded before "type" existed.
//     await ensureColumn(
//       conn,
//       "quotes",
//       "type",
//       "type ENUM('quote','question') NOT NULL DEFAULT 'quote' AFTER message",
//     );

//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS quote_items (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         quote_id INT NOT NULL,
//         product_id INT NULL,
//         product_name VARCHAR(200) NOT NULL,
//         sku VARCHAR(60) NULL,
//         size VARCHAR(60) NULL,
//         unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
//         quantity INT NOT NULL DEFAULT 1,
//         line_total DECIMAL(10,2) NOT NULL DEFAULT 0,
//         CONSTRAINT fk_quote_items_quote FOREIGN KEY (quote_id)
//           REFERENCES quotes(id) ON DELETE CASCADE,
//         CONSTRAINT fk_quote_items_product FOREIGN KEY (product_id)
//           REFERENCES products(id) ON DELETE SET NULL
//       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
//     `);
//   } finally {
//     conn.release();
//   }
// }

import mysql from "mysql2/promise";
import "dotenv/config";

const {
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "labnova",
  DB_SSL = "false",
} = process.env;

export const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

/**
 * Adds a column to an existing table if it's missing. Safe to call every
 * startup — lets us evolve the schema (like adding quotes.type below)
 * without breaking databases that were already seeded before the change.
 */
async function ensureColumn(conn, table, column, definitionSql) {
  const [rows] = await conn.query(
    `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  if (rows[0].cnt === 0) {
    await conn.query(`ALTER TABLE ${table} ADD COLUMN ${definitionSql}`);
  }
}

/**
 * Creates every table the app needs if it doesn't already exist, and
 * retrofits any columns added in later updates onto databases that were
 * already seeded before those columns existed.
 */
export async function ensureSchema() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        slug VARCHAR(140) NOT NULL UNIQUE,
        sort_order INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(220) NOT NULL UNIQUE,
        sku VARCHAR(60) NOT NULL UNIQUE,
        description VARCHAR(500) NOT NULL,
        full_description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        image VARCHAR(300) NOT NULL,
        sizes JSON NOT NULL,
        specifications JSON NOT NULL,
        features JSON NOT NULL,
        applications JSON NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        in_stock TINYINT(1) NOT NULL DEFAULT 1,
        hide_price TINYINT(1) NOT NULL DEFAULT 0,
        is_featured TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_products_category FOREIGN KEY (category_id)
          REFERENCES categories(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    // Retrofit for databases that were seeded before these columns existed.
    await ensureColumn(
      conn,
      "products",
      "in_stock",
      "in_stock TINYINT(1) NOT NULL DEFAULT 1 AFTER is_active",
    );
    await ensureColumn(
      conn,
      "products",
      "hide_price",
      "hide_price TINYINT(1) NOT NULL DEFAULT 0 AFTER in_stock",
    );
    await ensureColumn(
      conn,
      "products",
      "is_featured",
      "is_featured TINYINT(1) NOT NULL DEFAULT 0 AFTER hide_price",
    );

    await conn.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(180) NOT NULL,
        phone VARCHAR(40) NULL,
        message TEXT NULL,
        type ENUM('quote','question') NOT NULL DEFAULT 'quote',
        status ENUM('new','contacted','closed') NOT NULL DEFAULT 'new',
        email_sent TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    // Retrofit for databases that were seeded before "type" existed.
    await ensureColumn(
      conn,
      "quotes",
      "type",
      "type ENUM('quote','question') NOT NULL DEFAULT 'quote' AFTER message",
    );

    await conn.query(`
      CREATE TABLE IF NOT EXISTS quote_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quote_id INT NOT NULL,
        product_id INT NULL,
        product_name VARCHAR(200) NOT NULL,
        sku VARCHAR(60) NULL,
        size VARCHAR(60) NULL,
        unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
        quantity INT NOT NULL DEFAULT 1,
        line_total DECIMAL(10,2) NOT NULL DEFAULT 0,
        CONSTRAINT fk_quote_items_quote FOREIGN KEY (quote_id)
          REFERENCES quotes(id) ON DELETE CASCADE,
        CONSTRAINT fk_quote_items_product FOREIGN KEY (product_id)
          REFERENCES products(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } finally {
    conn.release();
  }
}
