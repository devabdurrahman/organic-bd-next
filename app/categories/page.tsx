import Link from "next/link";
import { Wheat, Droplets, Flower2, Cookie, Salad, Bean, ArrowRight } from "lucide-react";
import { mockCategories, mockProducts } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  "grains-rice": Wheat, "oils-ghee": Droplets, "spices": Flower2,
  "honey-sweets": Cookie, "vegetables": Salad, "pulses-nuts": Bean,
};

export const metadata = { title: "বিভাগসমূহ — সবুজ মাটি" };

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2D3A1E] mb-2">পণ্যের বিভাগ</h1>
        <p className="text-[#6B7C52]">আপনার পছন্দের বিভাগ থেকে পণ্য বেছে নিন</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((cat) => {
          const Icon = iconMap[cat.slug] ?? Wheat;
          const catProducts = mockProducts.filter((p) => p.categories[0]?.slug === cat.slug).slice(0, 3);
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="bg-white rounded-2xl border border-[#E8E2CC] p-6 hover:border-[#A8D86A] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#E8F5D0] rounded-2xl flex items-center justify-center">
                  <Icon size={26} className="text-[#2D5016]" />
                </div>
                <div>
                  <h2 className="font-bold text-[#2D3A1E] text-lg group-hover:text-[#2D5016] transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-[#7A8C5E]">{cat.count} টি পণ্য</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7C52] mb-4">{cat.description}</p>
              {catProducts.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {catProducts.map((p) => (
                    <span key={p.id} className="text-xs bg-[#F5F0E0] text-[#4A5E30] px-2 py-1 rounded-md">
                      {p.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 text-[#2D5016] text-sm font-semibold group-hover:gap-2 transition-all">
                পণ্য দেখুন <ArrowRight size={15} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
