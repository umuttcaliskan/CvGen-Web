"use client";

import React from 'react';
import HomeBanner from '@/components/HomeComponents/HomeBanner';
import Features from '@/components/HomeComponents/Features';
import Stats from '@/components/HomeComponents/Stats';
import MobileApp from '@/components/HomeComponents/MobileApp';
import Testimonials from '@/components/HomeComponents/Testimonials';
import CTA from '@/components/HomeComponents/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeBanner />
      <MobileApp />
      <Stats />
      <Features />
      <CTA />
      <Testimonials />
    </div>
  );
}
