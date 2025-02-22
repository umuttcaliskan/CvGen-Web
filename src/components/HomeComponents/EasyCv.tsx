import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import step1Image from "@/assets/images/cvtemplate.webp"; // 1. adım resmi
import step2Image from "@/assets/images/cvtemplate.webp"; // 2. adım resmi
import step3Image from "@/assets/images/cvtemplate.webp"; // 3. adım resmi

export default function EasyCV() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg my-10">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Dakikalar İçinde Kolayca CV Hazırlayın</h2>
        <div className="w-48 h-1 mb-4 rounded-full" style={{ backgroundColor: '#5dade2' }} />
        <p className="text-lg text-gray-600 mt-4">
          Sadece üç adımda profesyonel bir CV oluşturun ve hemen indirin.
        </p>
        <div className="mt-6 space-y-4">
          <div className="flex items-center mb-2">
            <Image src={step1Image} alt="Bilgileri Doldur" width={48} height={48} className="mr-2" />
            <span className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              1. Bilgileri Doldur
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Image src={step2Image} alt="Şablon Seç" width={48} height={48} className="mr-2" />
            <span className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              2. Şablon Seç
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Image src={step3Image} alt="İndir" width={48} height={48} className="mr-2" />
            <span className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              3. İndir
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 