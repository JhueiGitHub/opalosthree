import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "OrionOS",
  description: "The Age Of Architects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Analytics />
        <body className="w-screen h-screen bg-black">{children}</body>
      </html>
    </ClerkProvider>
  );
}
