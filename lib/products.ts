'use server'
import WooCommerceRestApi from 'woocommerce-rest-ts-api'

const WooCommerce = new WooCommerceRestApi({
  url: 'https://eurspec.com/',
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: 'wc/v3',
})

export const getProducts = async (params?: {
  per_page?: number;
  page?: number;
  category?: number;
  on_sale?: boolean;
  search?: string;
  status?: string;
}) => {
  const query: Record<string, unknown> = {
    per_page: params?.per_page ?? 20,
    page: params?.page ?? 1,
    status: params?.status ?? "publish",
  };

  if (params?.search) query.search = params.search;
  if (params?.category) query.category = params.category;
  if (params?.on_sale === true) query.on_sale = true;

  const response = await WooCommerce.getProducts(query);

  return {
    products: response.data,
    totalPages: Number(response.headers["x-wp-totalpages"]),
    totalProducts: Number(response.headers["x-wp-total"]),
  };
};

export const getProduct = async (id: string) => {
  try {
    const product = await WooCommerce.getProduct(id)
    return product.data
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export const getCategories = async () => {
  const response = await WooCommerce.get("products/categories", {
    hide_empty: true,
  })
  return response.data
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

export const createOrder = async (orderData: object) => {
  const response = await WooCommerce.post("orders", orderData)
  return response.data
}