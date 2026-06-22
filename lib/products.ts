'use server'
import WooCommerceRestApi from 'woocommerce-rest-ts-api'

const WooCommerce = new WooCommerceRestApi({
  url: 'https://eurspec.com/',
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: 'wc/v3',
})

export const getProducts = async () => {
  const products = await WooCommerce.getProducts({ per_page: 20, status: 'publish' })
  return products.data
}

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

export const createOrder = async (orderData: object) => {
  const response = await WooCommerce.post("orders", orderData)
  return response.data
}