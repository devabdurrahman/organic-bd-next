import { ShieldCheck, Truck, Users, Award, Leaf, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "১০০% খাঁটি পণ্য",
    desc: "প্রতিটি পণ্য পরীক্ষিত ও সার্টিফাইড। কোনো ভেজাল বা মিশ্রণ নেই।",
    color: "#2D5016",
    bg: "#E8F5D0",
  },
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
    desc: "ঢাকায় ২৪ ঘণ্টায় এবং সারাদেশে ৩-৫ দিনের মধ্যে ডেলিভারি।",
    color: "#C87820",
    bg: "#FFF4DC",
  },
  {
    icon: Users,
    title: "কৃষকের সাথে সরাসরি",
    desc: "মধ্যস্বত্বভোগী ছাড়াই সরাসরি কৃষকের কাছ থেকে পণ্য সংগ্রহ করি।",
    color: "#1A6B8A",
    bg: "#E0F4FF",
  },
  {
    icon: Award,
    title: "গুণমানের নিশ্চয়তা",
    desc: "সন্তুষ্ট না হলে ৭ দিনের মধ্যে পণ্য ফেরত নেওয়ার গ্যারান্টি।",
    color: "#8B2FC9",
    bg: "#F4E8FF",
  },
  {
    icon: Leaf,
    title: "পরিবেশবান্ধব",
    desc: "জৈব চাষ পদ্ধতি ব্যবহার করে মাটির স্বাস্থ্য রক্ষা করা হয়।",
    color: "#3D7A3A",
    bg: "#E8F5E8",
  },
  {
    icon: HeartHandshake,
    title: "কৃষক সমর্থন",
    desc: "প্রতিটি ক্রয়ের মাধ্যমে বাংলাদেশের কৃষক পরিবারকে সরাসরি সহায়তা।",
    color: "#D4651A",
    bg: "#FFF0E8",
  },
];

export default function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-widest mb-2">কেন আমরা আলাদা</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A1E] mb-4">
          সবুজ মাটি কেন বেছে নেবেন?
        </h2>
        <p className="text-[#6B7C52] max-w-xl mx-auto">
          আমরা শুধু পণ্য বিক্রি করি না — আমরা একটি সুস্থ ও টেকসই খাদ্যব্যবস্থার স্বপ্ন দেখি।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc, color, bg }) => (
          <div
            key={title}
            className="flex gap-4 p-5 rounded-2xl bg-white border border-[#E8E2CC] hover:shadow-md transition-shadow"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: bg }}
            >
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <h3 className="font-semibold text-[#2D3A1E] mb-1">{title}</h3>
              <p className="text-sm text-[#6B7C52] leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
