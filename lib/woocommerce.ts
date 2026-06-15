/**
 * WooCommerce Headless API Client
 * Connect your WooCommerce store by setting these env variables:
 *   NEXT_PUBLIC_WC_URL=https://yourstore.com
 *   WC_CONSUMER_KEY=ck_xxxx
 *   WC_CONSUMER_SECRET=cs_xxxx
 */

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || "https://yourstore.com";
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";

async function wcFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
  const res = await fetch(`${WC_URL}/wp-json/wc/v3${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  images: Array<{ id: number; src: string; alt: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  average_rating: string;
  rating_count: number;
  meta_data: Array<{ id: number; key: string; value: string }>;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: { src: string; alt: string } | null;
}

export interface WCOrder {
  id: number;
  status: string;
  total: string;
  line_items: Array<{
    product_id: number;
    quantity: number;
    total: string;
  }>;
}

export interface WCOrderPayload {
  payment_method: string;
  payment_method_title: string;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: number;
  tag?: number;
  on_sale?: boolean;
  featured?: boolean;
  search?: string;
  orderby?: string;
  order?: "asc" | "desc";
}): Promise<WCProduct[]> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) query.set(k, String(v));
    });
  }
  return wcFetch<WCProduct[]>(`/products?${query}`);
}

export async function getProduct(idOrSlug: number | string): Promise<WCProduct> {
  if (typeof idOrSlug === "number") {
    return wcFetch<WCProduct>(`/products/${idOrSlug}`);
  }
  const results = await wcFetch<WCProduct[]>(`/products?slug=${idOrSlug}`);
  if (!results.length) throw new Error("Product not found");
  return results[0];
}

export async function getFeaturedProducts(limit = 8): Promise<WCProduct[]> {
  return getProducts({ featured: true, per_page: limit });
}

export async function getOnSaleProducts(limit = 8): Promise<WCProduct[]> {
  return getProducts({ on_sale: true, per_page: limit });
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(params?: {
  per_page?: number;
  hide_empty?: boolean;
}): Promise<WCCategory[]> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) query.set(k, String(v));
    });
  }
  return wcFetch<WCCategory[]>(`/products/categories?${query}`);
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function createOrder(payload: WCOrderPayload): Promise<WCOrder> {
  return wcFetch<WCOrder>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatBDT(amount: string | number): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `৳${num.toLocaleString("bn-BD")}`;
}
