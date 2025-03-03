"use client";

import { motion } from 'framer-motion';
import { FiSmartphone, FiDownloadCloud } from 'react-icons/fi';
import { FaGooglePlay } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import mobilAppImage from "@/assets/images/AppImage.svg";

export default function MobileApp() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative h-[400px] md:h-[600px] w-full">
              <Image
                src={mobilAppImage}
                alt="CV Generator Mobil Uygulama"
                fill
                className="object-contain"
              />
              <div className="absolute -right-8 top-1/4 bg-accent/10 rounded-full h-32 w-32 animate-pulse" />
              <div className="absolute -left-8 bottom-1/4 bg-primary/10 rounded-full h-24 w-24 animate-pulse delay-300" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-1 md:order-2"
          >
            <span className="text-primary font-semibold">MOBİL UYGULAMA</span>
            <h2 className="text-4xl font-bold">CV'niz Artık Cebinizde</h2>
            <p className="text-gray-600 text-lg">
              CvGen mobil uygulaması ile istediğiniz her yerden özgeçmişinizi düzenleyin, 
              yeni CV'ler oluşturun ve kariyer fırsatlarını takip edin.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FiSmartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Kolay Kullanım</h3>
                  <p className="text-gray-600">Kullanıcı dostu arayüz ile saniyeler içinde CV oluşturun</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FiDownloadCloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Çevrimdışı Erişim</h3>
                  <p className="text-gray-600">İnternet olmadan da CV'lerinize erişin ve düzenleyin</p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <Link 
                href="#" 
                className="bg-black text-white px-6 py-3 rounded-lg inline-flex items-center space-x-3 hover:bg-black/80 transition-colors"
              >
                <FaGooglePlay className="w-6 h-6 text-white" />
                <div>
                  <div className="text-xs opacity-90">GOOGLE</div>
                  <div className="font-semibold">Play Store</div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 