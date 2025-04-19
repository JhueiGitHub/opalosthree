import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="w-screen h-screen bg-black">{children}</body>
    </html>
  );
}
