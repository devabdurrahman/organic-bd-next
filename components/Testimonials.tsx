import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahima Begum",
    location: "Dhaka, Mirpur",
    text: "Rice is truly amazing. The smell and taste are so authentic. I don't buy rice from the market anymore.",
    rating: 5,
    avatar: "R",
  },
  {
    name: "Mr. Karim",
    location: "Chittagong",
    text: "After getting Sundarbans honey, I felt like it was truly pure honey. I can no longer buy what I used to buy in the market.",
    rating: 5,
    avatar: "K",
  },
  {
    name: "Sumaiya Khanam",
    location: "Sylhet",
    text: "Both the mustard oil and turmeric powder are great. Delivery was on time and the packaging is very nice.",
    rating: 5,
    avatar: "S",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F2EFE4] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#7A8C5E] text-sm font-medium uppercase tracking-widest mb-2">Customer feedback</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3A1E]">what they say</h2>
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
