import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CvGen | Tamamen Ücretsiz CV Oluşturucu | Dakikalar İçinde Profesyonel CV",
  description: "Tamamen ücretsiz ve dakikalar içinde profesyonel CV'ler oluşturun. Hiçbir gizli ücret olmadan, kolay kullanımlı arayüzümüzle iş başvurularınızda öne çıkın. Hemen deneyin!",
  keywords: ["ücretsiz cv oluştur", "hızlı cv hazırlama", "cv oluşturucu", "özgeçmiş hazırlama", "profesyonel cv", "iş başvurusu", "kariyer", "bedava cv", "ücretsiz özgeçmiş", "ücretsiz cv maker"],
  authors: [{ name: "PickSoSo" }],
  creator: "PickSoSo",
  openGraph: {
    title: "CvGen | Tamamen Ücretsiz CV Oluşturucu",
    description: "Tamamen ücretsiz ve dakikalar içinde profesyonel CV'ler oluşturun. Hiçbir gizli ücret olmadan, kolay kullanımlı arayüzümüzle iş başvurularınızda öne çıkın.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <meta name="google-adsense-account" content="ca-pub-8769506745005038" />
      </head>
      <body className={inter.variable}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TQH1TGE2SD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQH1TGE2SD');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8769506745005038"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
