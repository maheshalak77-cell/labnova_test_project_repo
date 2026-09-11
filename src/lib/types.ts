export type Product = {
  id: string; // slug — used in URLs and as the cart/product key
  dbId?: number;
  name: string;
  category: string;
  categorySlug: string;
  categoryId?: number;
  description: string;
  fullDescription: string;
  price: number;
  sizes: string[];
  image: string;
  sku: string;
  specifications: string[];
  features: string[];
  applications: string[];
  isActive?: boolean;
  inStock: boolean;
  hidePrice: boolean;
  isFeatured: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  product_count?: number;
  sort_order?: number;
};

export type QuoteItemInput = {
  productSlug: string;
  productName: string;
  sku: string;
  size?: string;
  unitPrice: number;
  quantity: number;
};

export type AdminQuoteItem = {
  productName: string;
  sku: string | null;
  size: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type AdminQuote = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  message: string | null;
  type: "quote" | "question";
  status: "new" | "contacted" | "closed";
  emailSent: boolean;
  createdAt: string;
  items: AdminQuoteItem[];
  total: number;
};

export type AdminStats = {
  totalQuotes: number;
  totalProducts: number;
  totalCategories: number;
  newQuotes: number;
  quotesByDay: { day: string; count: number }[];
  quotesByStatus: { status: string; count: number }[];
  topProducts: { name: string; units: number }[];
  productsByCategory: { name: string; count: number }[];
};
