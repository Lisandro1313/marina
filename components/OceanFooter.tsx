'use client';

import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function OceanFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#87CEEB] via-[#4DB8E8] to-[#1E90FF] pt-32 pb-12">
      {/* Olas animadas con efecto hover zoom */}
      <div className="absolute bottom-0 left-0 right-0 transition-transform duration-700 ease-in-out hover:scale-110 origin-bottom">
        {/* Ola 1 - Más clara */}
        <svg
          className="absolute bottom-0 w-full h-64 opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 400,0 600,60 C800,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="#ffffff"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,60 C300,120 400,0 600,60 C800,120 900,0 1200,60 L1200,120 L0,120 Z;
                M0,60 C300,0 400,120 600,60 C800,0 900,120 1200,60 L1200,120 L0,120 Z;
                M0,60 C300,120 400,0 600,60 C800,120 900,0 1200,60 L1200,120 L0,120 Z
              "
            />
          </path>
        </svg>

        {/* Ola 2 - Media */}
        <svg
          className="absolute bottom-0 w-full h-48 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C200,20 400,100 600,50 C800,10 1000,90 1200,40 L1200,120 L0,120 Z"
            fill="#ffffff"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,80 C200,20 400,100 600,50 C800,10 1000,90 1200,40 L1200,120 L0,120 Z;
                M0,50 C200,100 400,20 600,80 C800,100 1000,10 1200,70 L1200,120 L0,120 Z;
                M0,80 C200,20 400,100 600,50 C800,10 1000,90 1200,40 L1200,120 L0,120 Z
              "
            />
          </path>
        </svg>

        {/* Ola 3 - Arena/Playa */}
        <svg
          className="absolute bottom-0 w-full h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,90 C300,60 600,100 900,80 C1050,70 1150,85 1200,80 L1200,120 L0,120 Z"
            fill="#F4E4C1"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,90 C300,60 600,100 900,80 C1050,70 1150,85 1200,80 L1200,120 L0,120 Z;
                M0,85 C300,100 600,60 900,85 C1050,95 1150,75 1200,85 L1200,120 L0,120 Z;
                M0,90 C300,60 600,100 900,80 C1050,70 1150,85 1200,80 L1200,120 L0,120 Z
              "
            />
          </path>
        </svg>

        {/* Palmeras siluetas - distribuidas en la playa */}
        <div className="absolute bottom-16 left-0 right-0 pointer-events-none">
          {/* Palmera 1 - Izquierda */}
          <div className="absolute left-[5%] bottom-0 transition-transform duration-700 hover:scale-125">
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
              {/* Tronco */}
              <rect x="35" y="40" width="10" height="80" fill="#2D2D2D" rx="5" />
              {/* Hojas */}
              <ellipse cx="40" cy="35" rx="35" ry="15" fill="#1a5f3f" transform="rotate(-30 40 35)" />
              <ellipse cx="40" cy="35" rx="35" ry="15" fill="#1a5f3f" transform="rotate(30 40 35)" />
              <ellipse cx="40" cy="30" rx="30" ry="12" fill="#237a52" transform="rotate(-50 40 30)" />
              <ellipse cx="40" cy="30" rx="30" ry="12" fill="#237a52" transform="rotate(50 40 30)" />
              <ellipse cx="40" cy="28" rx="25" ry="10" fill="#2a9d66" />
            </svg>
          </div>

          {/* Palmera 2 - Centro-Izquierda */}
          <div className="absolute left-[25%] bottom-0 transition-transform duration-700 hover:scale-125">
            <svg width="100" height="150" viewBox="0 0 100 150" fill="none">
              <rect x="45" y="50" width="12" height="100" fill="#2D2D2D" rx="6" />
              <ellipse cx="51" cy="45" rx="40" ry="18" fill="#1a5f3f" transform="rotate(-35 51 45)" />
              <ellipse cx="51" cy="45" rx="40" ry="18" fill="#1a5f3f" transform="rotate(35 51 45)" />
              <ellipse cx="51" cy="40" rx="35" ry="15" fill="#237a52" transform="rotate(-55 51 40)" />
              <ellipse cx="51" cy="40" rx="35" ry="15" fill="#237a52" transform="rotate(55 51 40)" />
              <ellipse cx="51" cy="35" rx="30" ry="12" fill="#2a9d66" />
            </svg>
          </div>

          {/* Palmera 3 - Centro */}
          <div className="absolute left-[50%] -translate-x-1/2 bottom-0 transition-transform duration-700 hover:scale-125">
            <svg width="90" height="140" viewBox="0 0 90 140" fill="none">
              <rect x="40" y="45" width="11" height="95" fill="#2D2D2D" rx="5.5" />
              <ellipse cx="45.5" cy="40" rx="38" ry="16" fill="#1a5f3f" transform="rotate(-32 45.5 40)" />
              <ellipse cx="45.5" cy="40" rx="38" ry="16" fill="#1a5f3f" transform="rotate(32 45.5 40)" />
              <ellipse cx="45.5" cy="35" rx="33" ry="14" fill="#237a52" transform="rotate(-52 45.5 35)" />
              <ellipse cx="45.5" cy="35" rx="33" ry="14" fill="#237a52" transform="rotate(52 45.5 35)" />
              <ellipse cx="45.5" cy="32" rx="28" ry="11" fill="#2a9d66" />
            </svg>
          </div>

          {/* Palmera 4 - Centro-Derecha */}
          <div className="absolute left-[70%] bottom-0 transition-transform duration-700 hover:scale-125">
            <svg width="95" height="145" viewBox="0 0 95 145" fill="none">
              <rect x="42" y="48" width="11" height="97" fill="#2D2D2D" rx="5.5" />
              <ellipse cx="47.5" cy="43" rx="39" ry="17" fill="#1a5f3f" transform="rotate(-33 47.5 43)" />
              <ellipse cx="47.5" cy="43" rx="39" ry="17" fill="#1a5f3f" transform="rotate(33 47.5 43)" />
              <ellipse cx="47.5" cy="38" rx="34" ry="14" fill="#237a52" transform="rotate(-53 47.5 38)" />
              <ellipse cx="47.5" cy="38" rx="34" ry="14" fill="#237a52" transform="rotate(53 47.5 38)" />
              <ellipse cx="47.5" cy="35" rx="29" ry="11" fill="#2a9d66" />
            </svg>
          </div>

          {/* Palmera 5 - Derecha */}
          <div className="absolute right-[8%] bottom-0 transition-transform duration-700 hover:scale-125">
            <svg width="85" height="130" viewBox="0 0 85 130" fill="none">
              <rect x="37" y="42" width="10" height="88" fill="#2D2D2D" rx="5" />
              <ellipse cx="42" cy="37" rx="36" ry="16" fill="#1a5f3f" transform="rotate(-31 42 37)" />
              <ellipse cx="42" cy="37" rx="36" ry="16" fill="#1a5f3f" transform="rotate(31 42 37)" />
              <ellipse cx="42" cy="32" rx="31" ry="13" fill="#237a52" transform="rotate(-51 42 32)" />
              <ellipse cx="42" cy="32" rx="31" ry="13" fill="#237a52" transform="rotate(51 42 32)" />
              <ellipse cx="42" cy="30" rx="26" ry="10" fill="#2a9d66" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contenido del footer sobre las olas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-6 mb-20">
          <div className="transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-white drop-shadow-lg mb-3">
              MARINA BIKINIS
            </h3>
            <p className="text-lg text-white/90 tracking-wide drop-shadow">
              Diseños artesanales • Bordados a mano
            </p>
          </div>

          <div className="flex justify-center gap-8 mt-8">
            <a
              href="https://www.instagram.com/marinabikinisautora/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-125 hover:-translate-y-2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30"
            >
              <FaInstagram className="text-3xl text-white drop-shadow-lg" />
            </a>
            <a
              href="https://wa.me/5492215082423"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-125 hover:-translate-y-2 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30"
            >
              <FaWhatsapp className="text-3xl text-white drop-shadow-lg" />
            </a>
          </div>

          <p className="text-sm text-white/80 tracking-wide drop-shadow pt-8">
            © 2025 Marina Bikinis Autora. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
