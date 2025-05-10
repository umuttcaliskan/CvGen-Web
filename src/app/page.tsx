"use client";

import React from 'react';
import HomeBanner from '@/components/HomeComponents/HomeBanner';
import Features from '@/components/HomeComponents/Features';
import Stats from '@/components/HomeComponents/Stats';
import MobileApp from '@/components/HomeComponents/MobileApp';
import Testimonials from '@/components/HomeComponents/Testimonials';
import CTA from '@/components/HomeComponents/CTA';
import SiteHelmet from '@/components/Helmet';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHelmet 
        title="Ücretsiz ve Hızlı CV Oluştur | Dakikalar İçinde CV Hazırla"
        description="Ücretsiz ve kolay kullanımlı arayüzümüzle dakikalar içinde profesyonel CV oluşturun. Hemen deneyin, iş başvurularınızda öne çıkın!"
        keywords="ücretsiz cv oluştur, hızlı cv hazırlama, online cv, profesyonel cv, cv oluşturucu, dakikada cv, cv şablonları"
        ogUrl="/"
      />
      <HomeBanner />
      <MobileApp />
      <Stats />
      <Features />
      <CTA />
      <Testimonials />
    </div>
  );
}
