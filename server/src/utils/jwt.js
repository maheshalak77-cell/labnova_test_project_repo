import jwt from "jsonwebtoken";

const { JWT_SECRET = "insecure-dev-secret", JWT_EXPIRES_IN = "8h" } = process.env;

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
