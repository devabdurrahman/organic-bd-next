import { getProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const {products} = await getProducts();
  
  const product = products.find((p) => p.slug === slug);
  const related = products
    .filter((p) => p.id !== product?.id && p.categories[0]?.slug === product?.categories[0]?.slug)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-[#6B7C52] mb-4">পণ্যটি পাওয়া যায়নি</p>
        <a href="/products" className="text-[#2D5016] underline">সব পণ্য দেখুন</a>
      </div>
    );
  }

  return <ProductDetailClient product={product} related={related} />;
}