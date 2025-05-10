'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaDownload } from 'react-icons/fa';
import { templateList } from '@/templates';
import SiteHelmet from '@/components/Helmet';

// Şablon görselleri
import isDunyasiImage from '@/assets/images/templates/corporate.png';
import dijitalGecisImage from '@/assets/images/templates/atsUyumlu.png';
import ozVeNetImage from '@/assets/images/templates/minimalist.png';
import novaImage from '@/assets/images/templates/whiteTwoColumn.png';
import geceMavisiImage from '@/assets/images/templates/darkmodern.png';
import baharEsintisiImage from '@/assets/images/templates/greenModern.png';
import toprakTonuImage from '@/assets/images/templates/elite.png';
import kariyerOdakliImage from '@/assets/images/templates/professional.png';
import maviUfuklarImage from '@/assets/images/templates/modern.png';
import inceDetayImage from '@/assets/images/templates/elegant.png';
import yalinZarafetImage from '@/assets/images/templates/feminine.png';
import kristalNetlikImage from '@/assets/images/templates/crystal.png';

const templates = [
  { id: 'is-dunyasi', name: 'İş Dünyası', image: isDunyasiImage },
  { id: 'dijital-gecis', name: 'Dijital Geçiş', image: dijitalGecisImage },
  { id: 'oz-ve-net', name: 'Öz ve Net', image: ozVeNetImage },
  { id: 'nova', name: 'Nova', image: novaImage },
  { id: 'gece-mavisi', name: 'Gece Mavisi', image: geceMavisiImage },
  { id: 'bahar-esintisi', name: 'Bahar Esintisi', image: baharEsintisiImage },
  { id: 'toprak-tonu', name: 'Toprak Tonu', image: toprakTonuImage },
  { id: 'kariyer-odakli', name: 'Kariyer Odaklı', image: kariyerOdakliImage },
  { id: 'mavi-ufuklar', name: 'Mavi Ufuklar', image: maviUfuklarImage },
  { id: 'ince-detay', name: 'İnce Detay', image: inceDetayImage },
  { id: 'yalin-zarafet', name: 'Yalın Zarafet', image: yalinZarafetImage },
  { id: 'kristal-netlik', name: 'Kristal Netlik', image: kristalNetlikImage },
];

function TemplateSections() {
  return (
    <>
      <SiteHelmet 
        title="CV Şablonları"
        description="İş başvurularınızda fark yaratacak profesyonel ve modern CV şablonlarımızı keşfedin. ATS uyumlu, minimalist ve profesyonel tasarımlarımız arasından size en uygun olanı seçin."
        keywords="cv şablonları, özgeçmiş şablonları, ats uyumlu cv, profesyonel cv, minimalist cv, cv maker, cv generator, cv hazırlama, ücretsiz cv şablonları, modern cv tasarımları, özgeçmiş, canva cv, cv oluştur, cv hazırla, cv maker, cv generator, özgeçmiş oluşturma, profesyonel cv, cv şablonları, online cv, ücretsiz cv, bedava cv"
        ogUrl="/sablonlar"
      />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4">CV Şablonlarımız</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Profesyonel kariyerinizi ön plana çıkaracak şık ve modern CV şablonlarımızı keşfedin. 
            Farklı sektörlere ve iş pozisyonlarına uygun çeşitli tasarımlarımız mevcuttur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full bg-gray-100 rounded-t overflow-hidden">
                <Image 
                  src={template.image}
                  alt={`${template.name} şablon önizlemesi`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex justify-center gap-3 mb-4">
                    <button className="flex items-center gap-1.5 bg-white/90 text-gray-800 px-3 py-2 rounded-md hover:bg-white transition-all font-medium text-sm">
                      <FaEye size={14} />
                      Önizle
                    </button>
                    <Link 
                      href={`/cv-olustur?template=${template.id}`}
                      className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-all font-medium text-sm"
                    >
                      <FaDownload size={14} />
                      Kullan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-500">
                    {template.id.includes('ats') ? (
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">ATS Uyumlu</span>
                    ) : template.id.includes('minimal') ? (
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Minimalist</span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">Profesyonel</span>
                    )}
                  </div>
                  <Link 
                    href={`/cv-olustur?template=${template.id}`}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    Hemen Başla
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Neden Şablonlarımızı Seçmelisiniz?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Profesyonel Tasarım</h3>
              <p className="text-gray-600">İş görüşmelerinde fark yaratacak modern ve profesyonel tasarımlar.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">ATS Uyumlu</h3>
              <p className="text-gray-600">İşveren tarama sistemlerinden (ATS) başarıyla geçecek şekilde tasarlanmış şablonlar.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Farklı Formatlarda İndirme</h3>
              <p className="text-gray-600">CV'nizi PDF veya Word formatında indirerek herhangi bir ortamda kolayca paylaşabilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TemplateSections;
