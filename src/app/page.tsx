"use client";

import React from 'react';
import HomeBanner from '@/components/HomeComponents/HomeBanner';
import Features from '@/components/HomeComponents/Features';
import Stats from '@/components/HomeComponents/Stats';
import MobileApp from '@/components/HomeComponents/MobileApp';
import Testimonials from '@/components/HomeComponents/Testimonials';
import BlogSlider from '@/components/HomeComponents/BlogSlider';
import CTA from '@/components/HomeComponents/CTA';
import SiteHelmet from '@/components/Helmet';
import SeoContent from '@/components/HomeComponents/SeoContent';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHelmet 
        title="Tamamen Ücretsiz CV Oluştur | Dakikalar İçinde Profesyonel CV Hazırla"
        description="Tamamen ücretsiz ve kolay kullanımlı arayüzümüzle dakikalar içinde profesyonel CV oluşturun. Hiçbir gizli ücret olmadan, iş başvurularınızda öne çıkın!"
        keywords="ücretsiz cv oluştur, hızlı cv hazırlama, online cv, profesyonel cv, cv oluşturucu, dakikada cv, cv şablonları, cv maker, cv generator, özgeçmiş oluşturma, cv hazırlama sitesi, bedava cv"
        ogUrl="/"
      />
      <h1 className="sr-only">Ücretsiz ve Hızlı CV Oluşturma Platformu - Dakikalar İçinde Profesyonel CV Hazırlayın</h1>
      <HomeBanner />
      <MobileApp />
      <Stats />
      <Features />
      <CTA />
      {/* SEO içerik alanı - daha mantıklı, uzun ve component olarak */}
      <SeoContent />
      <Testimonials />
      <BlogSlider />
    </div>
  );
}
