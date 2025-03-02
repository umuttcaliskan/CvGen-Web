"use client";

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Kariyerinize Yön Verin</h2>
        <p className="text-xl mb-8">Profesyonel CV'nizi hemen oluşturmaya başlayın</p>
        <Link
          href="/cv-olustur"
          className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
        >
          Ücretsiz CV Oluştur
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
} 