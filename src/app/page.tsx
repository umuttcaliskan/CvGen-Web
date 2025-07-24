"use client";

import React, { useState } from 'react';
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
  const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mr-2 mb-2 border border-primary/20">{children}</span>
  );
  const [showTags, setShowTags] = useState(false);
  const allTags = [
    "cv oluştur",
    "europass cv oluştur",
    "canva cv oluştur",
    "kariyer net cv oluştur",
    "ingilizce cv oluştur",
    "ucretsiz cv oluştur",
    "cv oluştur pdf",
    "cv oluştur ücretsiz word",
    "cv oluşturma yapay zeka",
    "cv oluşturucu ücretsiz",
    "online cv oluştur",
    "hazır cv oluştur",
    "basit cv oluştur",
    "işkur cv oluştur",
    "cv oluşturma",
    "cv oluştur ücretsiz",
    "cv oluşturmak",
    "cv oluştur free",
    "cv oluşturma şablonu",
    "cv oluşturma nasıl yapılır",
    "cv oluşturma programları",
    "cv oluştur europass",
    "cv oluşturma örnek",
    "almanca cv oluştur",
    "ats uyumlu cv oluştur",
    "cv oluştur apk",
    "gemi adamı cv oluştur",
    "cv oluştur online",
    "akademik cv oluşturma",
    "cv oluştur giriş",
    "cv oluşturur",
    "cv oluştur bedava",
    "cv oluştur basit",
    "cv benim oluştur",
    "cv oluştur iş başvurusu",
    "boş cv oluştur",
    "basit cv oluştur ücretsiz",
    "bim cv oluştur",
    "cv oluşturma boş",
    "cv oluşturma programi",
    "cv oluştur profesyonel",
    "bedava cv oluştur",
    "boş cv oluştur ingilizce cv örnekleri",
    "cv benim cv oluştur",
    "b cv",
    "bedava cv oluşturucu",
    "cv oluştur canva",
    "cv oluştur chatgpt",
    "cv oluştur.com",
    "cv oluşturma kolay",
    "cv maker cv oluştur",
    "kariyer com cv oluştur",
    "cv oluşturma programı ücretsiz",
    "cv oluşturma online",
    "çcv",
    "cç cv",
    "cv oluşturma örneği",
    "cv oluştur diş hekimliği",
    "cv oluştur e devlet",
    "cv oluştururken dikkat edilmesi gerekenler",
    "e devlet cv oluştur",
    "d oluşturma",
    "cv oluşturma formu",
    "cv oluşturma ingilizce",
    "cv oluşturma siteleri",
    "cv oluştur excel",
    "cv oluştur ücretsiz ekşi",
    "engelli cv oluştur",
    "cv oluştur ekşi",
    "cv oluşturma eğitimhane",
    "cv oluşturma excel",
    "eleman net cv oluştur",
    "eleman online cv oluştur",
    "e devlet cv oluşturma",
    "e cv hazırlama",
    "e cv",
    "cv oluştur fotoğraflı",
    "cv fotoğrafı oluşturma",
    "fotoğraflı cv oluştur ücretsiz",
    "cv oluşturma formatı",
    "cv oluşturma formu indir",
    "free cv oluştur",
    "fotoğraflı cv oluştur",
    "free cv oluşturma",
    "google cv oluştur",
    "cv oluşturma programı",
    "g cv",
    "güvenlik cv oluşturma",
    "güvenlik cv oluştur",
    "g cv n",
    "cv oluştur hızlı",
    "cv hazırlama oluştur",
    "hazır cv oluştur ücretsiz",
    "hızlı cv oluştur ücretsiz",
    "cv oluştururken hobiler",
    "cv h",
    "hazır cv oluşturma",
    "iş cv oluştur",
    "iş cv oluşturma",
    "cv oluştur ingilizce",
    "indeed cv oluştur",
    "ing cv oluştur",
    "infografik cv oluştur",
    "cv oluştur indir ücretsiz",
    "cv oluşturmak istiyorum",
    "cv oluştur ücretsiz indir",
    "cv oluştur pdf olarak indir",
    "cv oluştur jobseeker",
    "jobseeker cv oluştur",
    "cv oluştur kariyer",
    "cv oluştur kolay",
    "kolay cv oluştur ücretsiz",
    "klasik cv oluştur",
    "cv oluştur kariyer.net",
    "kolay cv oluştur",
    "kendi cv ni oluştur",
    "k cv",
    "kısa cv oluştur",
    "cv oluşturmak ücretsiz",
    "cv oluştur linkedin",
    "cv oluşturma şablonları",
    "cv oluşturma şablon",
    "cv oluşturun",
    "linkedin cv oluştur",
    "cv l",
    "cv oluşma",
    "cv maker oluştur",
    "cv oluşturma microsoft word",
    "mycv",
    "cv. m",
    "microsoft cv maker",
    "cv'ni oluştur",
    "cv nasıl oluştur",
    "cv oluştur kariyer net",
    "cv oluştururken nelere dikkat edilmeli",
    "nasıl cv oluşturabilirim",
    "nasıl cv oluşturulur",
    "n cv",
    "otomatik cv oluştur",
    "online cv oluştur ücretsiz",
    "o cv",
    "cv oluştur örnek",
    "cv oluştur özgeçmiş",
    "cv oluştur öğrenci",
    "cv örneği oluştur",
    "öğretmen cv oluştur ücretsiz",
    "öğretmenlik cv oluştur",
    "cv oluştur öğretmen",
    "özgeçmiş cv oluştur",
    "öğrenci cv oluştur",
    "özgeçmiş oluştur ücretsiz",
    "cv oluştur ücretsiz pdf canva",
    "cv oluştur pdf indir",
    "cv oluştur pdf ücretsiz",
    "pdf cv oluştur",
    "profesyonel cv oluştur",
    "pdf cv oluştur ücretsiz",
    "pdf cv oluşturma",
    "resimli cv oluştur ücretsiz",
    "resimli cv oluştur",
    "r ölçüsü",
    "r vektör oluşturma",
    "cv oluşturmaa",
    "cv.r",
    "sade cv oluştur ücretsiz",
    "staj cv oluştur",
    "s cv",
    "sivi oluşturma formu",
    "sivi oluşturma",
    "cv şablon oluşturma",
    "cv oluştur ücretsiz şablon",
    "cv oluştur türkçe",
    "ücretsiz cv oluştur türkçe",
    "europass cv oluştur türkçe",
    "cv oluştur telefondan",
    "cv oluşturma taslağı",
    "türkçe cv oluştur",
    "t cv",
    "t.c oluştur",
    "cv oluşturma uygulamaları",
    "cv oluşturma uygulaması",
    "cv oluştur ücretsiz pdf",
    "cv oluştur ücretsiz canva",
    "cv oluştur ücretsiz ingilizce",
    "cv oluştur ücretsiz türkçe",
    "europass cv oluştur ücretsiz",
    "ücretsiz cv oluştur",
    "ücretsiz cv oluştur pdf",
    "ücretsiz online cv oluştur",
    "ücretsiz cv oluştur canva",
    "ücretsiz ingilizce cv oluştur",
    "ücretsiz cv oluştur ve indir",
    "vakıfbank cv oluştur",
    "cv oluşturma ve indirme",
    "cv oluşturma videosu",
    "cv oluştur word",
    "c v oluştur",
    "v cv",
    "vcv oluştur",
    "cv oluştur yapay zeka",
    "yeni cv oluştur",
    "cv oluşturma youtube",
    "0cv",
    "1 cv",
    "2 sayfa cv olur mu",
    "2 sayfalık cv örnekleri",
    "2.sınıf cümle oluşturma wordwall",
    "cv 2",
    "3 cv",
    "3d cv",
    "3d oluşturucu",
    "4 cv",
    "a4 cv örnekleri",
    "4.sınıf cümle oluşturma testi",
    "a4 cv hazırlama",
    "5 cv",
    "cv oluşturma örnekleri",
    "6 cv",
    "cv oluştur7",
    "cv 7 layout",
    "cv-7",
    "8 cv",
    "9 cv",
    "9.sınıf cv örnekleri"
  ];
  const tagsPerRow = 6;
  const visibleRows = 4;
  const previewCount = tagsPerRow * visibleRows; // 24 etiket
  const previewTags = allTags.slice(0, previewCount);
  const restTags = allTags.slice(previewCount);
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
      {/* Anahtar kelime etiketleri açılır kapanır alan (footer üstü) */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="flex flex-wrap gap-2 justify-center w-full relative">
          {previewTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {showTags && restTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {!showTags && restTags.length > 0 && (
            <div
              className="absolute left-0 top-0 w-full h-full flex items-end justify-center cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              onClick={() => setShowTags(true)}
            >
              <div className="w-full h-24 bg-gradient-to-t from-white/90 to-white/0 backdrop-blur-sm flex items-center justify-center absolute bottom-0 left-0 z-10">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded font-bold border border-primary/20 hover:bg-primary/20 transition cursor-pointer z-20">
                  Devamını Göster (+{restTags.length})
                </span>
              </div>
            </div>
          )}
        </div>
        {showTags && restTags.length > 0 && (
          <button
            className="px-4 py-2 bg-primary/10 text-primary rounded font-bold border border-primary/20 hover:bg-primary/20 transition mt-2"
            onClick={() => setShowTags(false)}
            aria-expanded={showTags}
          >
            Anahtar Kelimeleri Gizle
          </button>
        )}
      </div>
    </div>
  );
}
