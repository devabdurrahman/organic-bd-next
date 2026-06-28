import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "সবুজ মাটি — জৈব পণ্যের অনলাইন দোকান",
  description:
    "বাংলাদেশের সেরা জৈব ও প্রাকৃতিক খাদ্যপণ্যের অনলাইন শপ। সরাসরি কৃষকের কাছ থেকে আপনার দরজায়।",
  keywords: ["জৈব", "organic", "bangladesh", "natural food", "কৃষি"],
  openGraph: {
    title: "সবুজ মাটি — জৈব পণ্যের অনলাইন দোকান",
    description: "১০০% প্রাকৃতিক জৈব পণ্য — সারাদেশে ডেলিভারি",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summery_larg_image",
    title: "সবুজ মাটি — জৈব পণ্যের অনলাইন দোকান",
    description: "১০০% প্রাকৃতিক জৈব পণ্য — সারাদেশে ডেলিভারি",
    creator: "@devabdurrahman",
  },
  robots:{
    index: true,
    follow: true,
    nocache: false,
    googlBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FAFAF7] text-[#2D3A1E] antialiased" style={{ fontFamily: "'Noto Sans Bengali', system-ui, sans-serif" }}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
