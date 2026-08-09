import { ShieldCheck, Truck, Users, Award, Leaf, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% genuine product",
    desc: "Every product is tested and certified. No adulteration or mixing.",
    color: "#2D5016",
    bg: "#E8F5D0",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    desc: "Delivery within 24 hours in Dhaka and within 3-5 days nationwide.",
    color: "#C87820",
    bg: "#FFF4DC",
  },
  {
    icon: Users,
    title: "Directly with the farmer",
    desc: "We procure products directly from farmers without intermediaries.",
    color: "#1A6B8A",
    bg: "#E0F4FF",
  },
  {
    icon: Award,
    title: "Quality assurance",
    desc: "7-day return guarantee if not satisfied.",
    color: "#8B2FC9",
    bg: "#F4E8FF",
  },
  {
    icon: Leaf,
    title: "Environmentally friendly",
    desc: "Soil health is maintained by using organic farming methods.",
    color: "#3D7A3A",
    bg: "#E8F5E8",
  },
  {
    icon: HeartHandshake,
    title: "Farmer support",
    desc: "Direct support to Bangladeshi farming families with every purchase.",
    color: "#D4651A",
    bg: "#FFF0E8",
  },
];

export default function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-widest mb-2">Why are we different?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A1E] mb-4">
          Why choose সবুজ মাটি?
        </h2>
        <p className="text-[#6B7C52] max-w-xl mx-auto">
          We don't just sell products — we dream of a healthy and sustainable food system.
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
