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
  title: "CvGen | Profesyonel CV Oluşturucu | Ücretsiz CV Hazırlama",
  description: "Dakikalar içinde profesyonel ve etkileyici CV'ler oluşturun. İş başvurularınızda öne çıkın. Ücretsiz CV şablonları ve kolay kullanım.",
  keywords: ["cv oluşturucu", "özgeçmiş hazırlama", "ücretsiz cv şablonları", "profesyonel cv", "iş başvurusu", "kariyer"],
  authors: [{ name: "PickSoSo" }],
  creator: "PickSoSo",
  openGraph: {
    title: "CvGen | Profesyonel CV Oluşturucu",
    description: "Dakikalar içinde profesyonel ve etkileyici CV'ler oluşturun",
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
        <meta name="google-adsense-account" content="ca-pub-8769506745005038"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8769506745005038"
     crossOrigin="anonymous"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TQH1TGE2SD"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQH1TGE2SD');
          `
        }} />
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
