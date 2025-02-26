// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import localFont from 'next/font/local'
import { AuthProvider } from "@/components/providers/AuthProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClientLayout from "@/components/layouts/ClientLayout";

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const euclidCircularB = localFont({
  src: [
    {
      path: './fonts/EuclidCircularB-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/EuclidCircularB-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/EuclidCircularB-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-euclid'
})

export const metadata: Metadata = {
  title: "Bookly",
  description: "A simple library application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${euclidCircularB.variable} antialiased`}>
        <AuthProvider>
          <TooltipProvider>
            <ClientLayout>{children}</ClientLayout>
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}