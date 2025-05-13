import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import ClientLayout from "./client"

export const metadata: Metadata = {
  title: "DevMarket - Digital Marketplace for Developers",
  description: "Buy and sell digital products for developers and designers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'