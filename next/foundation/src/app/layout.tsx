import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Categories from "@/components/Categories/Categories";

const interFont = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foundation",
  description: "Managing your progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.className} `}>
        <Categories />
        {children}
      </body>
    </html>
  );
}
