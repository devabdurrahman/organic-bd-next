import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "রহিমা বেগম",
    location: "ঢাকা, মিরপুর",
    text: "সবুজ মাটির কালিজিরা চাল সত্যিই অসাধারণ। গন্ধ আর স্বাদে একদম আসল। আমি এখন আর বাজার থেকে চাল কিনি না।",
    rating: 5,
    avatar: "র",
  },
  {
    name: "করিম সাহেব",
    location: "চট্টগ্রাম",
    text: "সুন্দরবনের মধু পেয়ে মনে হলো আসলেই খাঁটি মধু। আগে বাজারে যা কিনতাম সেটা আর কিনতে পারছি না।",
    rating: 5,
    avatar: "ক",
  },
  {
    name: "সুমাইয়া খানম",
    location: "সিলেট",
    text: "সরিষার তেল ও হলুদ গুঁড়া দুটোই দারুণ। ডেলিভারি সময়মতো হয়েছে এবং প্যাকেজিং খুবই সুন্দর।",
    rating: 5,
    avatar: "স",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F2EFE4] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-widest mb-2">গ্রাহকদের মতামত</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A1E]">তারা যা বলেন</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, text, rating, avatar }) => (
            <div key={name} className="bg-white rounded-2xl p-6 border border-[#E0D9C0] relative">
              <Quote size={32} className="text-[#D4C9A8] absolute top-5 right-5" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <p className="text-[#4A5E30] text-sm leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D5016] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#2D3A1E] text-sm">{name}</p>
                  <p className="text-xs text-[#7A8C5E]">{location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
