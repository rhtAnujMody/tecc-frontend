import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reveal Academy",
  description: "Platform for Revealers to learn and grow",
  icons: {
    icon: "https://revealhealthtech.com/wp-content/themes/Reveal-Health/assets/images/fav_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-1 flex-col min-h-screen`}>
        <>
          {children}
          <Toaster />
        </>
      </body>
    </html>
  );
}
