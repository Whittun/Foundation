import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Categories from "@/components/Categories/Categories";
import clsx from "clsx";

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
      <body className={clsx(interFont.className, "min-h-screen")}>
        <div className="flex justify-normal sm:justify-between items-stretch min-h-screen">
          <Categories />
          {children}
        </div>
      </body>
    </html>
  );
}
