import type { Metadata } from "next";
import { Quicksand, Lobster_Two } from "next/font/google";

import "./globals.css";
import RQProvider from "@/lib/react-query/RQProvider";
import { Toaster } from "@/components/ui/sonner";

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
  title: "LiteeFin. | Finance Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${lobster.variable} antialiased`}>
        <RQProvider>{children}</RQProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "!bg-white",
              success: "!text-caribbean",
              error: "!text-crimson",
              title: "!mx-auto !px-auto",
            },
          }}
        />
      </body>
    </html>
  );
}
