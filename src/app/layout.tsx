import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CvGen | CV Oluşturucu",
  description: "Generated by PickSoSo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="FKxABNn3I3zdKWJxWkVLTlYtuFin_2PxKFqdsNgwgQ0" />
        <meta name="google-adsense-account" content="ca-pub-8769506745005038"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8769506745005038"
     crossOrigin="anonymous"></script>
      </head>
      <body className={inter.variable}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
