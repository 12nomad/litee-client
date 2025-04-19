import type { Metadata } from "next";
import { Quicksand, Lobster_Two } from "next/font/google";

import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const lobster = Lobster_Two({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400"],
});

// TODO: SEO, Favicons
export const metadata: Metadata = {
  title: "Litee | Project Management Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${lobster.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
