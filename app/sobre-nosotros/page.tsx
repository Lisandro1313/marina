'use client';

import Image from 'next/image';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="block">
                <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900">
                  MARINA BIKINIS
                </h1>
                <p className="text-xs tracking-widest text-gray-500 uppercase">Autora</p>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/productos"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
              >
                Productos
              </a>
              <a
                href="/sobre-nosotros"
                className="text-sm text-gray-900 font-medium transition-colors uppercase tracking-wide"
              >
                Sobre Nosotros
              </a>
              <a
                href="/admin/dashboard"
                className="hidden md:block text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
              >
                Admin
              </a>
              <a
                href="https://www.instagram.com/marinabikinisautora/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/marina/WhatsApp Image 2025-12-13 at 12.00.49 AM (7).jpeg"
            alt="Marina Bikinis Taller"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] mb-4">
              SOBRE NOSOTROS
            </h1>
            <div className="w-32 h-0.5 bg-white mx-auto"></div>
            <p className="text-xl md:text-2xl font-light tracking-wide">
              Pasión por el diseño artesanal
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-4">
              NUESTRA HISTORIA
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-8"></div>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
            <p className="animate-fade-in animation-delay-200">
              Marina Bikinis Autora nace de la pasión por crear piezas únicas y especiales. 
              Cada bikini es diseñado y confeccionado a mano con dedicación, 
              buscando combinar estética, comodidad y calidad en cada detalle.
            </p>
            
            <p className="animate-fade-in animation-delay-400">
              Nos especializamos en bikinis con bordados artesanales, 
              donde cada puntada cuenta una historia de creatividad y amor por el oficio. 
              Trabajamos con telas de primera calidad y nos tomamos el tiempo necesario 
              para que cada pieza sea perfecta.
            </p>

            <p className="animate-fade-in animation-delay-600">
              Creemos que cada mujer merece sentirse única y especial, 
              por eso nuestros diseños son limitados y exclusivos. 
              No encontrarás dos bikinis exactamente iguales, 
              cada uno tiene su propia personalidad y carácter.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso Artesanal */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-4">
              PROCESO ARTESANAL
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada bikini pasa por un proceso cuidadoso de diseño y confección
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-light mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 text-center tracking-wide">
                DISEÑO
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Cada diseño nace de la inspiración, buscando formas, 
                colores y texturas que se complementen perfectamente.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-light mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 text-center tracking-wide">
                CONFECCIÓN
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Seleccionamos las mejores telas y realizamos cada costura 
                con precisión para garantizar durabilidad y confort.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-light mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 text-center tracking-wide">
                BORDADO
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                El toque final: cada bordado es único, 
                hecho a mano con dedicación y atención al detalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.25em] text-gray-900 mb-4">
              NUESTROS VALORES
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-wide">
                CALIDAD
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos materiales premium y técnicas artesanales 
                para garantizar productos duraderos y de excelente terminación.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-wide">
                EXCLUSIVIDAD
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cada diseño es único y limitado. 
                Valoramos la originalidad y la singularidad en cada pieza.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-wide">
                PASIÓN
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Amamos lo que hacemos. Cada bikini lleva nuestra dedicación 
                y el deseo de crear algo hermoso y especial.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-wide">
                ATENCIÓN PERSONALIZADA
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nos importa cada clienta. Estamos disponibles para asesorar 
                y ayudarte a encontrar el diseño perfecto para vos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.25em] mb-6">
            CREÁ TU LOOK ÚNICO
          </h2>
          <p className="text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Descubrí nuestra colección o contactanos para un diseño personalizado
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/productos"
              className="bg-white text-gray-900 px-12 py-4 text-sm tracking-[0.25em] uppercase hover:bg-gray-100 transition-all font-medium"
            >
              Ver Productos
            </a>
            <a
              href="https://wa.me/5492215082423"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-12 py-4 text-sm tracking-[0.25em] uppercase hover:bg-white hover:text-gray-900 transition-all font-medium flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-lg" />
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-2">
                MARINA BIKINIS AUTORA
              </h3>
              <p className="text-sm text-gray-600 tracking-wide">Diseños artesanales • Bordados a mano</p>
            </div>
            
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/marinabikinisautora/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://wa.me/5492215082423"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
            
            <p className="text-xs text-gray-500 tracking-wide">
              © 2025 Marina Bikinis Autora. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
