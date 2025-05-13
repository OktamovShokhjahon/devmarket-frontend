import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import ClientLayout from "./client";
import { CartProvider } from "@/context/cart-context";

export const metadata: Metadata = {
  title: "DevMarket - Digital Marketplace for Developers",
  description: "Buy and sell digital products for developers and designers",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <CartProvider>
        <ClientLayout>{children}</ClientLayout>
      </CartProvider>
    </Suspense>
  );
}

import "./globals.css";
import { Suspense } from "react";
