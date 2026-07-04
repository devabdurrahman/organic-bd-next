'use server'
import WooCommerceRestApi from 'woocommerce-rest-ts-api';
import type { Products } from "woocommerce-rest-ts-api";
import type { WCCategory } from "./woocommerce";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: 'wc/v3',
  axiosConfig: {
    headers: {
      'Cache-Control': 'max-age=60',
    }
  },
});

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
}): Promise<{ products: Products[]; totalPages: number; totalProducts: number }> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) query.set(k, String(v));
    });
  }

  const response = await WooCommerce.getProducts(Object.fromEntries(query));

  return {
    products: response.data as Products[],
    totalPages: Number(response.headers["x-wp-totalpages"]),
    totalProducts: Number(response.headers["x-wp-total"]),
  };
}

export const getProduct = async (id: string) => {
  try {
    const product = await WooCommerce.getProduct(Number(id))
    return product.data
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export const getCategories = async (): Promise<WCCategory[]> => {
  const response = await WooCommerce.get("products/categories", {
    per_page: 100,
    hide_empty: true,
  } as Record<string, unknown>)
  return response.data as WCCategory[]
}

export const getCategory = async (id: string) => {
  try {
    const response = await WooCommerce.get(`products/categories/${id}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return null
  }
}

export async function getProductBySlug(slug: string) {
  const response = await WooCommerce.getProducts({
    slug,
    status: "publish",
  });

  return response.data[0] ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  const { products } = await getProducts({ featured: true, per_page: limit });
  return products;
}

export async function getOnSaleProducts(limit = 8) {
  const { products } = await getProducts({ on_sale: true, per_page: limit });
  return products;
}

export const createOrder = async (orderData: Record<string, unknown>) => {
  const response = await WooCommerce.post("orders", orderData)
  return response.data
}