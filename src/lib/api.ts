import type { AdminQuote, AdminStats, Category, Product } from "./types";

export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

/** Product images are either bundled in the frontend's /public (seed data)
 *  or served by the backend from /uploads (admin-added images). Resolve
 *  whichever form was stored in the database into a browser-ready URL. */
export function resolveImageUrl(path: string | undefined | null): string {
  if (!path) return "/assets/products/placeholder.png";
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/uploads")) return `${API_ORIGIN}${path}`;
  return path;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore non-JSON error body */
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

// ---------------------------------------------------------------------------
// Public endpoints
// ---------------------------------------------------------------------------

export const api = {
  getCategories: () => request<Category[]>("/categories"),
  getProducts: (categorySlug?: string) =>
    request<Product[]>(
      `/products${categorySlug && categorySlug !== "all" ? `?category=${encodeURIComponent(categorySlug)}` : ""}`,
    ),
  getProduct: (slug: string) =>
    request<Product>(`/products/${encodeURIComponent(slug)}`),
  submitQuote: (payload: {
    fullName: string;
    email: string;
    phone?: string;
    message?: string;
    type: "quote" | "question";
    items: { productSlug: string; size?: string; quantity: number }[];
  }) =>
    request<{ id: number; type: "quote" | "question" }>("/quotes", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// ---------------------------------------------------------------------------
// Admin endpoints
// ---------------------------------------------------------------------------

export const adminApi = {
  login: (username: string, password: string) =>
    request<{ token: string }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  verify: (token: string) =>
    request<{ role: string }>("/admin/me", { headers: authHeaders(token) }),

  getStats: (token: string) =>
    request<AdminStats>("/admin/stats", { headers: authHeaders(token) }),

  getQuotes: (token: string) =>
    request<AdminQuote[]>("/admin/quotes", { headers: authHeaders(token) }),
  updateQuoteStatus: (token: string, id: number, status: string) =>
    request(`/admin/quotes/${id}/status`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ status }),
    }),

  getCategories: (token: string) =>
    request<Category[]>("/admin/categories", { headers: authHeaders(token) }),
  createCategory: (token: string, name: string) =>
    request<Category>("/admin/categories", {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ name }),
    }),
  updateCategory: (token: string, id: number, name: string) =>
    request<Category>(`/admin/categories/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ name }),
    }),
  deleteCategory: (token: string, id: number) =>
    request<void>(`/admin/categories/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),

  getProducts: (token: string) =>
    request<Product[]>("/admin/products", { headers: authHeaders(token) }),
  createProduct: (token: string, formData: FormData) =>
    request<{ id: number; slug: string }>("/admin/products", {
      method: "POST",
      headers: authHeaders(token),
      body: formData,
    }),
  updateProduct: (token: string, id: number, formData: FormData) =>
    request<{ id: number; slug: string }>(`/admin/products/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: formData,
    }),
  deleteProduct: (token: string, id: number) =>
    request<void>(`/admin/products/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),
};

export { ApiError };
