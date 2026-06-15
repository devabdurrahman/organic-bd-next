import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="relative bg-gradient-to-br from-[#2D5016] to-[#1E3A0A] rounded-3xl overflow-hidden px-8 py-14 text-center md:text-left md:flex md:items-center md:justify-between gap-8">
        {/* BG decoration */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-[#A8D86A]/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-48 h-48 bg-[#A8D86A]/5 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
            <Leaf size={16} className="text-[#A8D86A]" />
            <span className="text-[#A8D86A] text-sm font-medium uppercase tracking-wide">বিশেষ অফার</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            প্রথম অর্ডারে <span className="text-[#A8D86A]">১০% ছাড়</span>
          </h2>
          <p className="text-[#B8CCA0] max-w-md">
            কোড ব্যবহার করুন: <strong className="text-white font-bold">SABUJMATI10</strong> — আজই আপনার প্রথম অর্ডার করুন।
          </p>
        </div>

        <div className="relative mt-8 md:mt-0 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 bg-[#A8D86A] text-[#1E3A0A] font-bold px-8 py-3.5 rounded-xl hover:bg-[#BEE87A] transition-colors whitespace-nowrap"
          >
            এখনই কিনুন <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 border-2 border-[#A8D86A]/50 text-[#A8D86A] font-semibold px-6 py-3.5 rounded-xl hover:bg-[#A8D86A]/10 transition-colors whitespace-nowrap"
          >
            আরও জানুন
          </Link>
        </div>
      </div>
    </section>
  );
}
