"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/ui/navbar";
import { usePathname } from "next/navigation";
import Provider from '@/context/Provider'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/signup" && pathname !== "/login";

  return (
    <html lang="en">
      <Provider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-black text-white">
          {showNavbar && <Navbar />}
          {children}
        </div>
      </body>
      </Provider>
    </html>
  );
}