import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A0A] via-[#2D5016] to-[#3D6B1E] min-h-[88vh] flex items-center">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A8D86A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circle */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#A8D86A]/10 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute right-24 bottom-0 w-64 h-64 bg-[#A8D86A]/5 rounded-full translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#A8D86A]/20 text-[#A8D86A] text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-[#A8D86A]/30">
            <Leaf size={14} />
            #1 Organic Product Store in Bangladesh
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Pure taste{" "}
            <span className="text-[#A8D86A]">of nature</span>
            <br />
            At your doorstep
          </h1>

          <p className="text-[#B8CCA0] text-lg leading-relaxed mb-8 max-w-lg">
            No adulteration, no chemicals just pure organic food from the soil of Bangladesh. Directly from the farmer to your kitchen.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/products"
              className="flex items-center gap-2 bg-[#A8D86A] text-[#1E3A0A] font-bold px-6 py-3 rounded-xl hover:bg-[#BEE87A] transition-colors text-base"
            >
              View the products <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 border border-[#A8D86A]/50 text-[#A8D86A] font-semibold px-6 py-3 rounded-xl hover:bg-[#A8D86A]/10 transition-colors text-base"
            >
              About us
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, label: "100% authentic" },
              { icon: Truck, label: "Nationwide delivery" },
              { icon: Leaf, label: "Chemical free" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                <Icon size={20} className="text-[#A8D86A]" />
                <span className="text-[#C8DCA8] text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats card */}
        <div className="hidden lg:flex flex-col gap-4 items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 w-full max-w-sm">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {[
                { number: "500+", label: "Farmer family" },
                { number: "200+", label: "Organic products" },
                { number: "50,000+", label: "Satisfied customer" },
                { number: "64", label: "Delivery to district" },
              ].map(({ number, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-[#A8D86A]">{number}</div>
                  <div className="text-[#B8CCA0] text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-5">
              <p className="text-[#C8DCA8] text-sm text-center italic">
                &ldquo;সবুজ মাটি is protecting our family’s health. Really happy to get pure products.&rdquo;
              </p>
              <p className="text-[#A8D86A] text-xs text-center mt-2 font-medium">— Rahima Begum, Dhaka</p>
            </div>
          </div>

          {/* Floating badge */}
          <div className="flex items-center gap-3 bg-[#A8D86A] rounded-2xl px-5 py-3 shadow-lg">
            <div className="w-10 h-10 bg-[#1E3A0A] rounded-full flex items-center justify-center">
              <Leaf size={18} className="text-[#A8D86A]" />
            </div>
            <div>
              <p className="text-[#1E3A0A] font-bold text-sm">Certified Organic</p>
              <p className="text-[#2D5016] text-xs">BSTI approved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
