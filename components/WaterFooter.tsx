'use client';

import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

export default function WaterFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Banner infinito superior - igual al de arriba */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-sm tracking-[0.2em] uppercase mx-12 font-light">
            ✦ Diseños únicos y exclusivos ✦ Calidad artesanal ✦ Atención personalizada ✦ Colección 2025 ✦ Bordados exclusivos ✦ Made with love
          </span>
          <span className="text-sm tracking-[0.2em] uppercase mx-12 font-light">
            ✦ Diseños únicos y exclusivos ✦ Calidad artesanal ✦ Atención personalizada ✦ Colección 2025 ✦ Bordados exclusivos ✦ Made with love
          </span>
        </div>
      </div>

      {/* Footer con GIF de agua */}
      <div className="relative min-h-[500px] flex items-center justify-center">
        {/* GIF de agua de fondo con mejor brillo */}
        <div className="absolute inset-0">
          <Image
            src="/marina/Beautiful Water GIF.gif"
            alt="Water animation"
            fill
            className="object-cover transition-transform duration-700 ease-in-out hover:scale-105 brightness-110"
            unoptimized
            priority
            quality={100}
          />
          {/* Overlay más suave para mejor visibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
        </div>

        {/* Contenido del footer */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-4xl md:text-5xl font-light tracking-[0.35em] text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                MARINA BIKINIS
              </h3>
              <div className="space-y-2">
                <p className="text-xl text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Diseños artesanales únicos
                </p>
                <p className="text-lg text-white/95 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Bordados a mano con dedicación
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <a
                href="https://www.instagram.com/marinabikinisautora/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              >
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-full shadow-2xl group-hover:bg-white transition-all">
                  <FaInstagram className="text-4xl text-[#E4405F]" />
                </div>
              </a>
              <a
                href="https://wa.me/5492215082423"
                target="_blank"
                rel="noopener noreferrer"
                className="group transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              >
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-full shadow-2xl group-hover:bg-white transition-all">
                  <FaWhatsapp className="text-4xl text-[#25D366]" />
                </div>
              </a>
            </div>

            <div className="pt-8 border-t border-white/30 mt-12">
              <p className="text-sm text-white/90 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                © 2025 Marina Bikinis Autora. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
