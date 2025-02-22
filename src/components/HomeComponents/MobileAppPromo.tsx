import Image from "next/image";
import mobil from "@/assets/images/mobil.png";
import { FaGooglePlay } from "react-icons/fa";

export default function MobileAppPromo() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg my-10">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">CV&apos;nizi Her An Her Yerde Yönetin</h2>
        <div className="w-48 h-1 mb-4 rounded-full" style={{ backgroundColor: '#5dade2' }} />
        <p className="text-lg text-gray-600 mt-4">
          Mobil uygulamamız ile CV&apos;nizi kolayca yönetin ve her an erişin.
        </p>
        <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
          <FaGooglePlay className="text-xl" />
          Uygulamayı İndir
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <Image
          src={mobil}
          alt="Mobil Uygulama"
          width={400}
          height={300}
          className="object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  );
} 