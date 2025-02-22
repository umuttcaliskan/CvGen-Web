"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo/cvgen.png"
import { FaUser } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user } = useAuth();

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

        {/* Ana Menü */}
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

        {/* Giriş/Kayıt veya Hesabım Butonu */}
        <div className="flex items-center gap-4">
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
                className="bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 