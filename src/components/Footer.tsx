"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "@/assets/logo/cvgen.png";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
}

export default function Footer() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [fallbackPosts, setFallbackPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          slug: doc.data().slug,
        }));
        
        setRecentPosts(posts);
      } catch (error) {
        console.error("Blog yazıları yüklenirken hata oluştu:", error);
        setRecentPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [fallbackPosts]);

  // Blog bölümü için yedek veriler
  useEffect(() => {
    setFallbackPosts([
      {
        id: '1',
        title: 'Yeni Mezunlar İçin CV Hazırlama Rehberi',
        slug: 'yeni-mezunlar-icin-cv-hazirlama-rehberi'
      },
      {
        id: '2',
        title: 'ATS Uyumlu CV Nasıl Hazırlanır?',
        slug: 'ats-uyumlu-cv-nasil-hazirlanir'
      },
      {
        id: '3',
        title: 'İş Görüşmesinde Başarılı Olmanın 10 Yolu',
        slug: 'is-gorusmesinde-basarili-olmanin-10-yolu'
      }
    ]);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-white">
      {/* Dalga SVG */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg 
          className="relative block w-full h-[60px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-gray-50"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Üst Kısım */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Image 
              src={logo} 
              alt="CVGen Logo" 
              width={180} 
              height={63} 
              className="mb-4 sm:w-[200px] w-[180px] self-start" 
            />
            <p className="text-white/90 text-sm max-w-xs">
              CVGen ile profesyonel özgeçmişinizi dakikalar içinde oluşturun. ATS uyumlu şablonlar ve kolay kullanım.
            </p>
            {/* Sosyal Medya */}
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-white/90 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-white/90 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-white/90 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-white/90 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          {/* CV Örnekleri */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CV Örnekleri</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sablonlar" className="text-white/90 hover:text-white transition-colors text-sm">
                  Yazılım Geliştirici CV Örneği
                </Link>
              </li>
              <li>
                <Link href="/sablonlar" className="text-white/90 hover:text-white transition-colors text-sm">
                  Öğretmen CV Örneği
                </Link>
              </li>
              <li>
                <Link href="/sablonlar" className="text-white/90 hover:text-white transition-colors text-sm">
                  Grafik Tasarımcı CV Örneği
                </Link>
              </li>
              <li>
                <Link href="/sablonlar" className="text-white/90 hover:text-white transition-colors text-sm">
                  Tüm CV Örnekleri →
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Son Yazılar</h3>
            <ul className="space-y-2">
              {loading ? (
                <li>
                  <span className="text-white/60 text-sm">Yazılar yükleniyor...</span>
                </li>
              ) : recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="text-white/90 hover:text-white transition-colors text-sm"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))
              ) : (
                fallbackPosts.map((post) => (
                  <li key={post.id}>
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="text-white/90 hover:text-white transition-colors text-sm"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))
              )}
              <li>
                <Link href="/blog" className="text-white/90 hover:text-white transition-colors text-sm">
                  Tüm Yazılar →
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/90">
                <FaEnvelope className="text-white/90" />
                <a href="mailto:destek@cvgen.com" className="text-sm hover:text-white transition-colors">
                  destek@cvgen.com.tr
                </a>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <FaPhone className="text-white/90" />
                <a href="tel:+901234567890" className="text-sm hover:text-white transition-colors">
                  +90 506 593 70 34
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-white/90">
              &copy; {new Date().getFullYear()} PickSoSo. Tüm hakları saklıdır.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link href="/gizlilik-politikasi" className="text-xs sm:text-sm text-white/90 hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-xs sm:text-sm text-white/90 hover:text-white transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/sitemap" className="text-xs sm:text-sm text-white/90 hover:text-white transition-colors">
                Site Haritası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 