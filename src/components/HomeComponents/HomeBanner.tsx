"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroImage from '@/assets/images/cvtemplate.webp';

export default function HomeBanner() {
  return (
    <section className="bg-gradient-to-r from-primary-dark via-primary to-[#7ec2e9] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Profesyonel CV'nizi<br />
              <span className="text-accent">3 Dakikada</span> Oluşturun
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Modern şablonlar ve kolay kullanım ile hayalinizdeki işe bir adım daha yaklaşın.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="/cv-olustur"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                CV Oluştur
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/sablonlar"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Şablonları İncele
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full">
              <Image
                src={HeroImage}
                alt="CV Önizleme"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dalga Efekti */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
} 