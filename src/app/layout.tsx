import { Analytics } from "@vercel/analytics/react";
import { metadata } from '@/lib/metadata';
import { geistSans, geistMono } from './components/Fonts';
import MetaTags from './components/MetaTags';
import StructuredData from './components/StructuredData';
import AppLayout from "./components/AppLayout";
import Footer from "./components/Footer";
import AuthProvider from "@/providers";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html 
        lang="en" 
        className="h-full"
        suppressHydrationWarning
      >
        <head>
          <MetaTags />
          <StructuredData />
        </head>
        <body 
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}
        >
          <AppLayout>{children}</AppLayout>
          <Analytics />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}