import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://growth-tech.com.ua"),
  title: "Growth-Tech | Веб-студія в Україні",
  description:
    "Створюємо швидкі, сучасні та конверсійні веб-рішення для малого та середнього бізнесу в Україні. Лендінги, корпоративні сайти, інтернет-магазини.",
  keywords: [
    "веб-студія",
    "розробка сайтів",
    "веб-розробка",
    "Україна",
    "лендінг",
    "інтернет-магазин",
    "корпоративний сайт",
  ],
  authors: [{ name: "Growth-Tech" }],
  icons: {
    icon: "/logo-brow.png",
    apple: "/logo-brow.png",
  },
  openGraph: {
    title: "Growth-Tech | Веб-студія в Україні",
    description:
      "Створюємо швидкі, сучасні та конверсійні веб-рішення для малого та середнього бізнесу в Україні.",
    url: "https://growth-tech.com.ua",
    siteName: "Growth-Tech",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 800,
        alt: "Growth-Tech - Веб-студія в Україні",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth-Tech | Веб-студія в Україні",
    description:
      "Створюємо швидкі, сучасні та конверсійні веб-рішення для малого та середнього бізнесу в Україні.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
