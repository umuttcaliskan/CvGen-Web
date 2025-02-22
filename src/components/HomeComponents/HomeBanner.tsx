import Link from "next/link";
import Image from "next/image";
import cvTemplates from "@/assets/images/cvtemplate.webp";

export default function HomeBanner() {
  return (
    <div className="hero-gradient min-h-[600px] relative">
      <div className="max-w-7xl mx-auto px-4 py-20 text-white">
        <div className="flex items-center justify-between">
          {/* Sol taraftaki yazılar */}
          <div className="max-w-2xl text-center">
            <h1 className="text-5xl font-bold mb-6">
              3 Adımda Ücretsiz CV&apos;ni Oluştur
            </h1>
            <p className="text-xl mb-8">
              Profesyonel şablonlarla CV&apos;ni hazırla, PDF olarak indir.
            </p>
            <Link
              href="/cv-olustur"
              className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
            >
              HEMEN CV OLUŞTUR
            </Link>
          </div>

          {/* Sağ taraftaki resim */}
          <div className="hidden md:block">
            <Image
              src={cvTemplates}
              alt="CV Şablonları"
              width={500}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="wave-bottom" />
    </div>
  );
} 