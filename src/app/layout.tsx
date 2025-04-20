import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import QueryClientProvider from "@/react-query";
import { ThemeProvider } from "@/components/theme";

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
        <body className="w-screen h-screen bg-gray-500">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <QueryClientProvider>{children}</QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
