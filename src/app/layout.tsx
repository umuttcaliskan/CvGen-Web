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
        <meta name="yandex-verification" content="cd6cec414a1a3e76" />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MWBJ9ZV8');`
        }} />
        {/* End Google Tag Manager */}
      </head>
      <body className={inter.variable}>
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MWBJ9ZV8"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        {/* End Google Tag Manager (noscript) */}
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
