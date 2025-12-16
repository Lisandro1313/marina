'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  style?: string;
  pattern?: string;
  stitching?: string;
}

function ProductCard({ product }: { product: Product }) {
  const [whatsappNumber, setWhatsappNumber] = useState('5491123456789');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      })
      .catch(() => {});
  }, []);

  const handleWhatsAppClick = async () => {
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, productName: product.name })
      });
    } catch (e) {}
    
    const message = `Hola! Me interesa: ${product.name}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white">
      {/* Imagen del producto */}
      <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-4xl opacity-20">👙</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 px-4 md:px-0">
        <h3 className="text-2xl md:text-3xl font-light text-gray-900 tracking-wide">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        )}
        
        <div className="space-y-2">
          {product.style && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Estilo:</span> {product.style}
            </p>
          )}
          <p className="text-sm text-gray-700">
            <span className="font-medium">Colores disponibles:</span> Negro, Blanco, Rojo, Azul
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Talles disponibles:</span> S, M, L
          </p>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <span className="text-2xl font-light text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={handleWhatsAppClick}
            className="bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    '/marina/WhatsApp Image 2025-12-13 at 12.00.49 AM (3).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.49 AM (5).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.50 AM (10).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.50 AM (15).jpeg'
  ];

  const productsPerSlide = 2;
  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleProducts = products.slice(
    currentSlide * productsPerSlide,
    (currentSlide + 1) * productsPerSlide
  );

  useEffect(() => {
    fetchProducts();
    trackVisit();
    setupPageTitleChange();
    
    // Carrusel de imágenes hero
    const heroInterval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(heroInterval);
  }, []);

  const setupPageTitleChange = () => {
    const originalTitle = 'Marina Bikinis Autora';
    const funnyTitles = [
      '¡Volvé! 👙',
      'No te vayas 💔',
      'Aprovechá ahora 🔥',
      '¡Esperá! Tenemos ofertas 🌟',
      'Volvé por tu bikini 🌊',
      '¡Te esperamos! 💝'
    ];

    let titleIndex = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = funnyTitles[titleIndex];
        titleIndex = (titleIndex + 1) % funnyTitles.length;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  };

  const trackVisit = async () => {
    try {
      await fetch('/api/analytics/visit', { method: 'POST' });
    } catch (e) {}
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?activeOnly=true');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimalista */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900">
                MARINA BIKINIS
              </h1>
              <p className="text-xs tracking-widest text-gray-500 uppercase">Autora</p>
            </div>
            <div className="flex items-center gap-6">
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

      {/* Hero con imagen de fondo fija */}
      <section className="relative h-screen overflow-hidden">
        {/* Imagen de fondo en lugar de video */}
        <div className="absolute inset-0">
          <Image
            src="/marina/WhatsApp Image 2025-12-13 at 12.00.50 AM (15).jpeg"
            alt="Marina Bikinis"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Contenido centrado */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] mb-4">
              MARINA BIKINIS
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.2em] mb-8">
              AUTORA
            </p>
            <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
              Diseños artesanales • Bordados a mano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#productos"
                className="bg-white text-gray-900 px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-100 transition-all font-medium"
              >
                Ver Colección
              </a>
              <a
                href="https://wa.me/5492215082423"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-gray-900 transition-all font-medium"
              >
                Consultar
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Banner envíos - Marquesina */}
      <div className="bg-gray-900 text-white py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-sm tracking-wide uppercase mx-8">
            Envíos a todo el país • 3 cuotas sin interés • Aprovechá la temporada • Todos los medios de pago • Diseños únicos bordados a mano • Envíos express disponibles
          </span>
          <span className="text-sm tracking-wide uppercase mx-8">
            Envíos a todo el país • 3 cuotas sin interés • Aprovechá la temporada • Todos los medios de pago • Diseños únicos bordados a mano • Envíos express disponibles
          </span>
        </div>
      </div>

      {/* Productos */}
      <main className="max-w-7xl mx-auto px-4 py-20" id="productos">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-4">
            COLECCIÓN
          </h2>
          <p className="text-gray-600">Diseños únicos bordados a mano</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            {/* Flechas de navegación */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-colors"
                  aria-label="Anterior"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-colors"
                  aria-label="Siguiente"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Productos visibles */}
            <div className="space-y-16">
              {visibleProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Indicadores */}
            {totalSlides > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    aria-label={`Ir a página ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Video - siempre visible */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'none' }}
          >
            <source src="/marina/AQPW8MEivKWr9Nyuzotqtq0xsspsq8HgAyOFZ2qHCyb5pxFx6wgMebid15nvBw4-SQcUrBqht4TXb7fr6yRa26vVjsGwZsjQ.mp4" type="video/mp4" />
          </video>
          {!products.length && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <p className="text-2xl md:text-3xl font-light tracking-wide mb-4">Próximamente nuevos diseños</p>
                <a
                  href="https://wa.me/5492215082423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-gray-900 px-8 py-3 text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Galería lifestyle - Grid limpio */}
      <section className="py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            'WhatsApp Image 2025-12-13 at 12.00.49 AM (3).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.49 AM (5).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.50 AM (10).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.50 AM (15).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.49 AM (7).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.50 AM (18).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.50 AM (20).jpeg',
            'WhatsApp Image 2025-12-13 at 12.00.49 AM (8).jpeg'
          ].map((img, index) => (
            <div key={index} className="relative aspect-square overflow-hidden group">
              <Image
                src={`/marina/${img}`}
                alt={`Marina Bikinis ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer minimalista */}
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
