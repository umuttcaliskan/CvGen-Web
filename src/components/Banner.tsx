import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface BannerProps {
  title: string;
  description: string;
  imageSrc: StaticImageData;
}

const Banner: React.FC<BannerProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="relative">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-4 sm:px-6 lg:px-8">
        {/* Dekoratif arka plan deseni */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform -rotate-45 translate-x-1/2 translate-y-1/2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-48 w-48 border-2 border-white/20 rounded-full -ml-16 -mt-16"
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {description}
              </p>
            </div>
            

          </div>
        </div>
      </div>
      
      {/* Dalga SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg 
          className="relative block w-full h-[60px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Banner; 