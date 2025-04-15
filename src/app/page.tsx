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
        title="Anasayfa"
        description="CvGen ile profesyonel CV'nizi dakikalar içinde oluşturun. Türkiye'nin en iyi CV oluşturma aracı ile iş arama sürecinizi kolaylaştırın."
        keywords="cv oluşturma, özgeçmiş hazırlama, online cv, profesyonel cv, ücretsiz cv şablonları"
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
