import React from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa"; // İkonları ekliyoruz
import logo from "@/assets/logo/cvgen.png"; // Logo dosyasının yolu

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto text-center">
        <Image src={logo} alt="CVGen Logo" width={150} height={50} className="mx-auto mb-4" />
        <p>&copy; {new Date().getFullYear()} PickSoSo. Tüm hakları saklıdır.</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold">CV Örnekleri</h3>
            <ul className="text-center">
              <li><a href="/cv-ornek1" className="text-white hover:text-gray-300">Örnek CV 1</a></li>
              <li><a href="/cv-ornek2" className="text-white hover:text-gray-300">Örnek CV 2</a></li>
              <li><a href="/cv-ornek3" className="text-white hover:text-gray-300">Örnek CV 3</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="flex justify-center items-center space-x-2">
              <FaEnvelope className="text-white" />
              <span>info@cvgen.com</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <FaPhone className="text-white" />
              <span>+90 123 456 7890</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Son Yazılar</h3>
            <ul className="text-center">
              <li><a href="/blog/yazi1" className="text-white hover:text-gray-300">Yeni Mezunlar Nasıl CV Hazırlamalı?</a></li>
              <li><a href="/blog/yazi2" className="text-white hover:text-gray-300">Başarılı Öğretmen CV&apos;si Nasıl Olmalı?</a></li>
              <li><a href="/blog/yazi3" className="text-white hover:text-gray-300">CV Hazırlarken Asla Yapmamanız Gereken 10 Hata</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Hızlı Bağlantılar</h3>
          <div className="flex justify-center space-x-4">
            <a href="/sitemap" className="text-white hover:text-gray-300">Sitemap</a>
            <a href="/blog" className="text-white hover:text-gray-300">Blog</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 