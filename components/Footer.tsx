import Link from "next/link";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E3A0A] text-[#C8DCA8]">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-[#A8D86A] rounded-full flex items-center justify-center">
              <Leaf size={18} className="text-[#1E3A0A]" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">সবুজ মাটি</div>
              <div className="text-[#7A9C52] text-xs">Organic Bangladesh</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#A8B896]">
            We work directly with farmers in Bangladesh to deliver 100% organic and natural products to you.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 bg-[#2D5016] rounded-full flex items-center justify-center hover:bg-[#3D6B1E] transition-colors">
              f
            </a>
            <a href="#" className="w-9 h-9 bg-[#2D5016] rounded-full flex items-center justify-center hover:bg-[#3D6B1E] transition-colors">
              ig
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/products", label: "All products" },
              { href: "/categories", label: "Departments" },
              { href: "/about", label: "About us" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#A8D86A] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-sm">
            {["Cereals and rice", "Oil and ghee", "Honey and sweets", "Spice", "Vegetables", "Pulses and nuts"].map((cat) => (
              <li key={cat}>
                <Link href={`/categories`} className="hover:text-[#A8D86A] transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 text-[#A8D86A] shrink-0" />
              <span>123 Green Road, Dhanmondi, Dhaka-1205</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-[#A8D86A] shrink-0" />
              <span>01700-000000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-[#A8D86A] shrink-0" />
              <span>info@sabujmati.com</span>
            </li>
          </ul>
          <div className="mt-5">
            <p className="text-xs text-[#7A9C52] mb-2">Subscribe to the newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="flex-1 bg-[#2D5016] text-white placeholder:text-[#6B8050] text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[#A8D86A]"
              />
              <button className="bg-[#A8D86A] text-[#1E3A0A] text-sm font-semibold px-3 py-2 rounded-lg hover:bg-[#BEE87A] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2D5016] py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A9C52]">
          <p>© 2026 সবুজ মাটি. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#A8D86A] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#A8D86A] transition-colors">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
