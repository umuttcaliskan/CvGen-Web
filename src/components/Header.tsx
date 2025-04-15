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
    <header className="border-b fixed top-0 left-0 right-0 z-10" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--card-border)' }}>
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

        {/* Ana Menü - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/cv-olustur" 
            className="transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            CV Oluştur
          </Link>
          <Link 
            href="/ozgecmislerim"
            className="transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            Özgeçmişlerim
          </Link>
          <Link 
            href="/blog" 
            className="transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            Blog
          </Link>
          <Link 
            href="/iletisim" 
            className="transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            İletişim
          </Link>
        </nav>

        {/* Giriş/Kayıt veya Hesabım Butonu - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/hesabim"
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--primary)', 
                color: 'var(--button-text)'
              }}
            >
              <FaUser className="text-sm" />
              <span>Hesabım</span>
            </Link>
          ) : (
            <>
              <Link
                href="/giris-yap"
                className="transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit-ol"
                className="px-4 py-2 rounded-md transition-colors"
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'var(--button-text)'
                }}
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>

        {/* Mobil Menü Butonu */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          style={{ color: 'var(--text-primary)' }}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobil Menü */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b md:hidden" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--card-border)' }}>
            <nav className="flex flex-col p-4">
              <Link 
                href="/cv-olustur" 
                className="py-3 transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CV Oluştur
              </Link>
              <Link 
                href="/ozgecmislerim"
                className="py-3 transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Özgeçmişlerim
              </Link>
              <Link 
                href="/blog" 
                className="py-3 transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/iletisim" 
                className="py-3 transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>
              
              {/* Giriş/Kayıt veya Hesabım Butonu - Mobil */}
              <div className="mt-3 pt-3" style={{ borderTopColor: 'var(--card-border)', borderTopWidth: '1px' }}>
                {user ? (
                  <Link
                    href="/hesabim"
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                    style={{ 
                      backgroundColor: 'var(--primary)', 
                      color: 'var(--button-text)'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUser className="text-sm" />
                    <span>Hesabım</span>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/giris-yap"
                      className="text-center py-2 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      href="/kayit-ol"
                      className="text-center py-2 rounded-md transition-colors"
                      style={{ 
                        backgroundColor: 'var(--primary)', 
                        color: 'var(--button-text)'
                      }}
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