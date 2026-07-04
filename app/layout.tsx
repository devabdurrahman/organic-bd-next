import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Noto_Sans_Bengali } from "next/font/google";
// import NextTopLoader from "nextjs-toploader";

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  display: "swap",
  preload: true,
});

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
    card: "summary_large_image",
    title: "সবুজ মাটি — জৈব পণ্যের অনলাইন দোকান",
    description: "১০০% প্রাকৃতিক জৈব পণ্য — সারাদেশে ডেলিভারি",
    creator: "@devabdurrahman",
  },
  robots:{
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
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
      </head>
      <body className={`${notoSansBengali.className} bg-[#FAFAF7] text-[#2D3A1E] antialiased`}>
      {/*<NextTopLoader
        color="#A8D86A"
        shadow="0 0 10px #A8D86A, 0 0 5px #ffffff"
        height={3}
        showSpinner={false}
      />*/}
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
