import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { getProducts, getCategories } from "@/lib/products";
import type { WCCategory } from "@/lib/woocommerce";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "সকল পণ্য | জৈব পণ্যের অনলাইন দোকান",
  description:
    "সব ধরনের জৈব ও প্রাকৃতিক পণ্য একসাথে দেখুন।",
  keywords: ["organic food", "organic ecommerce", "জৈব", "organic", "bangladesh", "natural food", "কৃষি"],
  openGraph: {
    title: "সকল পণ্য | জৈব পণ্যের অনলাইন দোকান",
    description:
    "সব ধরনের জৈব ও প্রাকৃতিক পণ্য একসাথে দেখুন।",
    siteName: "Organic Ecommerce Store",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "সকল পণ্য | জৈব পণ্যের অনলাইন দোকান",
    description:
    "সব ধরনের জৈব ও প্রাকৃতিক পণ্য একসাথে দেখুন।",
    creator: "@devabdurrahman",
  },
  robots:{
    index: true,
    follow: true,
    nocache: false,
    googlBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default async function ProductsPage({ searchParams,}: {
  searchParams: Promise<{ category?: string; on_sale?: string; search?: string; page?: string; }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1; 

  let { products, totalPages, totalProducts } = await getProducts({
    page: currentPage,
    per_page: 20,
    search: params.search,
    on_sale: params.on_sale === "true" ? true : undefined,
    category: params.category ? Number(params.category) : undefined,
  });

  const baseUrl = `/products?${new URLSearchParams({
    ...(params.category && { category: params.category }),
    ...(params.on_sale && { on_sale: params.on_sale }),
    ...(params.search && { search: params.search }),
  }).toString()}`;

// if (params.on_sale === "true") products = products.filter((p) => p.on_sale);
// if (params.category) products = products.filter(
//   (p) => p.categories.some((c) => c.slug === params.category)
// );
// if (params.search) {
// const q = params.search.toLowerCase();
// products = products.filter(
//   (p) => p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q)
// );
// }

  //const categories = mockCategories;
  const categories: WCCategory[] = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2D3A1E] mb-2">সকল পণ্য</h1>
        <p className="text-[#6B7C52]">আমাদের সম্পূর্ণ জৈব পণ্যের সংগ্রহ</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-[#E8E2CC] p-5">
            <h3 className="font-semibold text-[#2D3A1E] mb-3">বিভাগ</h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/products"
                  className={`block text-sm px-3 py-2 rounded-lg transition-colors ${!params.category ? "bg-[#E8F5D0] text-[#2D5016] font-semibold" : "text-[#4A5E30] hover:bg-[#F5F0E0]"}`}
                >
                  সব পণ্য ({products.length})
                </a>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/products?category=${cat.id}`}
                    className={`block text-sm px-3 py-2 rounded-lg transition-colors ${params.category === String(cat.id) ? "bg-[#E8F5D0] text-[#2D5016] font-semibold" : "text-[#4A5E30] hover:bg-[#F5F0E0]"}`}
                  >
                    {cat.name} ({cat.count})
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-[#E8E2CC]">
              <h3 className="font-semibold text-[#2D3A1E] mb-3">ফিল্টার</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#2D5016] w-4 h-4"
                  checked={params.on_sale === "true"}
                  readOnly
                />
                <a href="/products?on_sale=true" className="text-sm text-[#4A5E30] hover:text-[#2D5016]">
                  ছাড়ের পণ্য
                </a>
              </label>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 text-[#6B7C52]">
              <p className="text-xl mb-2">কোনো পণ্য পাওয়া যায়নি</p>
              <a href="/products" className="text-[#2D5016] underline">সব পণ্য দেখুন</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
    </div>
  );
}
