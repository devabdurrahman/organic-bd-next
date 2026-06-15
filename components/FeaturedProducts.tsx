import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { WCProduct } from "@/lib/woocommerce";

interface Props {
  products: WCProduct[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
}

export default function FeaturedProducts({
  products,
  title = "জনপ্রিয় পণ্যসমূহ",
  subtitle = "আমাদের গ্রাহকদের সবচেয়ে পছন্দের পণ্য",
  viewAllHref = "/products",
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-widest mb-2">আমাদের পণ্য</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A1E]">{title}</h2>
          <p className="text-[#6B7C52] mt-2 max-w-md">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="hidden sm:flex items-center gap-2 text-[#2D5016] font-semibold hover:gap-3 transition-all"
        >
          সব দেখুন <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="sm:hidden mt-8 text-center">
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 border-2 border-[#2D5016] text-[#2D5016] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#2D5016] hover:text-white transition-colors"
        >
          সব পণ্য দেখুন <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
