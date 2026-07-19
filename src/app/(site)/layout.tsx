import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "BTC Balajee | Bihar's Premium E-Commerce Destination",
  description:
    "BTC Balajee — Bihiya Chauraha's most trusted e-commerce platform. Fast delivery, genuine products, unbeatable prices, delivered across Bihar.",
  keywords: [
    "BTC Balajee",
    "Bihiya Chauraha ecommerce",
    "Bihar online shopping",
    "buy online Bihar",
  ],
  openGraph: {
    title: "BTC Balajee | Bihar's Premium E-Commerce Destination",
    description: "Shop genuine products with fast delivery across Bihar. Trusted by thousands.",
    type: "website",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-[#05060a] text-white antialiased selection:bg-amber-400 selection:text-black">
      {children}
    </div>
  );
};

export default Layout;
