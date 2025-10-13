import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lachlan McCreanney's Portfolio",
  description: "A Vercel Web Application featuring my creative works and developments",
  metadataBase: new URL("https://LachlanMcCreanneyPortfolio.com"),
  openGraph: { title: "Lachlan McCreanney's Creative Portfolio", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
