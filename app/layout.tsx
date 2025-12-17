import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Weather App Tide - Real-time Weather for Your Cities",
  description:
    "A modern weather application to track weather in your favorite cities. Built with Next.js 16, TypeScript, and OpenWeather API.",
  keywords: ["weather", "forecast", "cities", "nextjs", "typescript"],
  authors: [{ name: "Piotr Rzadkowolski" }],
  openGraph: {
    title: "Weather App Tide",
    description: "Track weather in your favorite cities",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8`}
      >
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
