import { verifyToken } from "../utils/jwt.js";

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing or invalid authorization header." });
  }

  try {
    const payload = verifyToken(token);
    if (payload.role !== "admin") throw new Error("Not an admin token");
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Session expired or invalid. Please log in again." });
  }
}
