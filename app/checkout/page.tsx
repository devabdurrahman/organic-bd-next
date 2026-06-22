"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/woocommerce";
import { createOrder } from "@/lib/products";

const BD_DISTRICTS = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ",
  "কুমিল্লা", "নারায়ণগঞ্জ", "গাজীপুর", "টাঙ্গাইল", "ফরিদপুর", "যশোর", "বগুড়া",
];

const PAYMENT_METHODS = [
  // { id: "bkash", label: "বিকাশ", img: "💚" },
  // { id: "nagad", label: "নগদ", img: "🟠" },
  // { id: "rocket", label: "রকেট", img: "💜" },
  { id: "cod", label: "ক্যাশ অন ডেলিভারি", img: "💵" },
  // { id: "bank", label: "ব্যাংক ট্রান্সফার", img: "🏦" },
];

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const shippingFee = totalPrice >= 999 ? 0 : 80;
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address: "", district: "ঢাকা", postcode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const orderPayload = {
      payment_method: paymentMethod,
      payment_method_title: PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label,
      status: paymentMethod === "cod" ? "processing" : "pending",
      billing: {
        first_name: form.firstName,
        last_name: form.lastName,
        address_1: form.address,
        city: form.district,
        state: form.district,
        postcode: form.postcode || "1000",
        country: "BD",
        email: form.email || "no-email@provided.com",
        phone: form.phone,
      },
      shipping: {
        first_name: form.firstName,
        last_name: form.lastName,
        address_1: form.address,
        city: form.district,
        state: form.district,
        postcode: form.postcode || "1000",
        country: "BD",
      },
      line_items: state.items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: String(shippingFee),
        },
      ],
    };

    const order = await createOrder(orderPayload);

      if (order.id) {
        clearCart();
        setOrderId(order.id);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Order failed:", error);
      setError("অর্ডার সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle size={72} className="mx-auto text-[#2D5016] mb-6" />
        <h2 className="text-3xl font-bold text-[#2D3A1E] mb-3">অর্ডার সফল হয়েছে!</h2>
        <p className="text-[#6B7C52] mb-2">অর্ডার নম্বর: <strong>#{orderId}</strong></p>
        <p className="text-[#6B7C52] mb-8">শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-[#2D5016] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#3D6B1E] transition-colors">
          হোমে ফিরুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link href="/cart" className="inline-flex items-center gap-2 text-[#6B7C52] hover:text-[#2D5016] mb-8 transition-colors">
        <ArrowLeft size={16} /> কার্টে ফিরুন
      </Link>
      <h1 className="text-3xl font-bold text-[#2D3A1E] mb-8">চেকআউট</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing */}
            <div className="bg-white rounded-2xl border border-[#E8E2CC] p-6">
              <h2 className="font-bold text-[#2D3A1E] text-lg mb-5">ডেলিভারি তথ্য</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "firstName", label: "নামের প্রথম অংশ", required: true },
                  { name: "lastName", label: "নামের শেষ অংশ", required: true },
                  { name: "phone", label: "মোবাইল নম্বর", required: true, type: "tel" },
                  { name: "email", label: "ইমেইল (ঐচ্ছিক)", type: "email" },
                ].map(({ name, label, required, type = "text" }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">{label}</label>
                    <input
                      type={type}
                      name={name}
                      required={required}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full border border-[#D4C9A8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">পূর্ণ ঠিকানা</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="বাড়ি নং, রোড, এলাকা"
                    className="w-full border border-[#D4C9A8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">জেলা</label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    className="w-full border border-[#D4C9A8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2D5016]"
                  >
                    {BD_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">পোস্ট কোড</label>
                  <input
                    type="text"
                    name="postcode"
                    value={form.postcode}
                    onChange={handleChange}
                    className="w-full border border-[#D4C9A8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2D5016]"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-[#E8E2CC] p-6">
              <h2 className="font-bold text-[#2D3A1E] text-lg mb-5">পেমেন্ট পদ্ধতি</h2>
              <div className="grid sm:grid-cols-1 gap-3">
                {PAYMENT_METHODS.map(({ id, label, img }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${paymentMethod === id ? "border-[#2D5016] bg-[#E8F5D0]" : "border-[#D4C9A8] hover:border-[#A8B896]"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id)}
                      className="accent-[#2D5016]"
                    />
                    <span className="text-xl">{img}</span>
                    <span className="font-medium text-sm text-[#2D3A1E]">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#E8E2CC] p-6 sticky top-24">
              <h2 className="font-bold text-[#2D3A1E] text-lg mb-5">আপনার অর্ডার</h2>
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto">
                {state.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-[#4A5E30] line-clamp-1 flex-1">{product.name} × {quantity}</span>
                    <span className="font-medium text-[#2D3A1E] ml-2">{formatBDT(parseFloat(product.price) * quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E8E2CC] pt-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm text-[#6B7C52]">
                  <span>সাবটোটাল</span><span>{formatBDT(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6B7C52]">
                  <span>ডেলিভারি</span>
                  <span className={shippingFee === 0 ? "text-green-600" : ""}>{shippingFee === 0 ? "বিনামূল্যে" : formatBDT(shippingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#2D3A1E] text-lg pt-1">
                  <span>মোট</span>
                  <span className="text-[#2D5016]">{formatBDT(totalPrice + shippingFee)}</span>
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || state.items.length === 0}
                className="w-full bg-[#2D5016] text-white font-bold py-3.5 rounded-xl hover:bg-[#3D6B1E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "প্রক্রিয়াকরণ হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
