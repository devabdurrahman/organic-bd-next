import Link from "next/link";
import { Wheat, Droplets, Flower2, Cookie, Salad, Bean } from "lucide-react";
import type { WCCategory } from "@/lib/woocommerce";

const iconMap: Record<string, React.ElementType> = {
  "grains-rice": Wheat,
  "oils-ghee": Droplets,
  "spices": Flower2,
  "honey-sweets": Cookie,
  "vegetables": Salad,
  "pulses-nuts": Bean,
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  "grains-rice": { bg: "#FFF8E8", icon: "#C8941A", border: "#F0D896" },
  "oils-ghee": { bg: "#FFF1E8", icon: "#D4651A", border: "#F0C4A0" },
  "spices": { bg: "#F8EEFF", icon: "#8B2FC9", border: "#D4A8F0" },
  "honey-sweets": { bg: "#FFF8EC", icon: "#C87820", border: "#F0D09C" },
  "vegetables": { bg: "#EDFFF0", icon: "#2D7A40", border: "#A0E0B0" },
  "pulses-nuts": { bg: "#FFF4F0", icon: "#C04020", border: "#F0B8A0" },
};

interface Props {
  categories: WCCategory[];
}

export default function CategoryGrid({ categories }: Props) {
  return (
    <section className="bg-[#F2EFE4] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-widest mb-2">বিভাগ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A1E]">পণ্যের ধরন অনুযায়ী বেছে নিন</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] ?? Wheat;
            const colors = colorMap[cat.slug] ?? { bg: "#F0F0F0", icon: "#555", border: "#DDD" };
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                style={{ borderColor: colors.border }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: colors.bg }}
                >
                  <Icon size={26} style={{ color: colors.icon }} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#2D3A1E] text-sm group-hover:text-[#2D5016] transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-[#9A9A82] mt-0.5">{cat.count} পণ্য</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
