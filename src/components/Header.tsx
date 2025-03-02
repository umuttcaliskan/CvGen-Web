"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/cvgen.png"
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useState } from "react";

export default function Header() {
  const { user } = useAuth();
  // Mobil menü durumu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b fixed top-0 left-0 right-0 z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="CVGen Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Mobil Menü Butonu */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Ana Menü - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/cv-olustur" 
            className="text-foreground hover:text-foreground/80 transition-colors"
          >
            CV Oluştur
          </Link>
          <Link 
            href="/ozgecmislerim"
            className="text-foreground hover:text-foreground/80 transition-colors"
          >
            Özgeçmişlerim
          </Link>
          <Link 
            href="/blog" 
            className="text-foreground hover:text-foreground/80 transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/iletisim" 
            className="text-foreground hover:text-foreground/80 transition-colors"
          >
            İletişim
          </Link>
        </nav>

        {/* Giriş/Kayıt veya Hesabım Butonu - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/hesabim"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaUser className="text-sm" />
              <span>Hesabım</span>
            </Link>
          ) : (
            <>
              <Link
                href="/giris-yap"
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit-ol"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>

        {/* Mobil Menü */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b md:hidden">
            <nav className="flex flex-col p-4">
              <Link 
                href="/cv-olustur" 
                className="py-3 text-foreground hover:text-foreground/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CV Oluştur
              </Link>
              <Link 
                href="/ozgecmislerim"
                className="py-3 text-foreground hover:text-foreground/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Özgeçmişlerim
              </Link>
              <Link 
                href="/blog" 
                className="py-3 text-foreground hover:text-foreground/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/iletisim" 
                className="py-3 text-foreground hover:text-foreground/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>
              
              {/* Giriş/Kayıt veya Hesabım Butonu - Mobil */}
              <div className="border-t mt-3 pt-3">
                {user ? (
                  <Link
                    href="/hesabim"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUser className="text-sm" />
                    <span>Hesabım</span>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/giris-yap"
                      className="text-center py-2 text-foreground hover:text-foreground/80 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      href="/kayit-ol"
                      className="text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kayıt Ol
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 