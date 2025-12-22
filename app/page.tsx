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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    
    const message = `Hola! Me interesa: ${product.name} - $${product.price}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % (product.images?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Carrusel de imágenes */}
      <div className="relative w-full md:w-1/2 aspect-[3/4] overflow-hidden bg-gray-100 group">
        {product.images?.[currentImageIndex] ? (
          <>
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            
            {/* Flechas del carrusel - solo si hay múltiples imágenes */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  aria-label="Imagen siguiente"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Indicadores de imagen */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-4xl opacity-20">👙</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-light text-gray-900 tracking-wide">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {product.description}
          </p>
        )}
        
        <div className="space-y-2.5 py-2">
          {product.style && (
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-gray-900 min-w-[80px]">Estilo:</span>
              <span className="text-sm text-gray-700">{product.style}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-gray-900 min-w-[80px]">Colores:</span>
            <span className="text-sm text-gray-700">Negro, Blanco, Rojo, Azul</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-gray-900 min-w-[80px]">Talles:</span>
            <span className="text-sm text-gray-700">S, M, L</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-light text-gray-900">
              ${product.price}
            </span>
          </div>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-lg" />
            Ordenar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGridCard({ product }: { product: Product }) {
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
    
    const message = `Hola! Me interesa: ${product.name} - $${product.price}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
      {/* Imagen del producto */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-4xl opacity-20">👙</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-medium text-gray-900">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-light text-gray-900">
            ${product.price}
          </span>
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-gray-900 text-white px-4 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-base" />
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const heroImages = [
    '/marina/WhatsApp Image 2025-12-13 at 12.00.50 AM (15).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.49 AM (3).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.49 AM (5).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.50 AM (10).jpeg',
    '/marina/WhatsApp Image 2025-12-13 at 12.00.50 AM (18).jpeg',
  ];

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => 
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

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
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
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

      {/* Hero con carrusel automático de imágenes - estilo premium */}
      <section className="relative h-screen overflow-hidden">
        {/* Carrusel de imágenes de fondo */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === heroImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Marina Bikinis ${index + 1}`}
              fill
              className="object-cover scale-110 animate-slow-zoom"
              priority={index === 0}
            />
          </div>
        ))}
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        
        {/* Contenido centrado con animaciones escalonadas */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            {/* Logo/Título con efecto especial */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-light tracking-[0.4em] mb-6 animate-fade-in animation-delay-200">
                MARINA
              </h1>
              <div className="w-32 h-0.5 bg-white mx-auto animate-fade-in animation-delay-400"></div>
              <p className="text-2xl md:text-3xl font-light tracking-[0.3em] animate-fade-in animation-delay-600">
                BIKINIS AUTORA
              </p>
            </div>
            
            <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-1000">
              Diseños artesanales únicos<br/>Bordados a mano con dedicación
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-1000">
              <a
                href="#productos"
                className="group relative bg-white text-gray-900 px-12 py-4 text-sm tracking-[0.25em] uppercase overflow-hidden transition-all hover:tracking-[0.3em]"
              >
                <span className="relative z-10">Descubrir Colección</span>
                <div className="absolute inset-0 bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 tracking-[0.3em]">
                  Descubrir Colección
                </span>
              </a>
              <a
                href="https://wa.me/5492215082423"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-white text-white px-12 py-4 text-sm tracking-[0.25em] uppercase backdrop-blur-sm hover:bg-white hover:text-gray-900 transition-all hover:tracking-[0.3em]"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
        
        {/* Indicadores del carrusel */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`h-1 rounded-full transition-all ${
                index === heroImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 w-1 hover:bg-white/75'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Scroll indicator mejorado */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white animate-bounce">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Banner envíos - Estilo premium */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-sm tracking-[0.2em] uppercase mx-12 font-light">
            ✦ Envíos a todo el país ✦ 3 cuotas sin interés ✦ Temporada 2025 ✦ Diseños únicos ✦ Bordados a mano ✦ Envíos express
          </span>
          <span className="text-sm tracking-[0.2em] uppercase mx-12 font-light">
            ✦ Envíos a todo el país ✦ 3 cuotas sin interés ✦ Temporada 2025 ✦ Diseños únicos ✦ Bordados a mano ✦ Envíos express
          </span>
        </div>
      </div>

      {/* Productos */}
      <main className="max-w-7xl mx-auto px-4 py-20" id="productos">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-gray-900 mb-3">
              COLECCIÓN 2025
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-4"></div>
          </div>
          <p className="text-gray-600 tracking-wide">Diseños únicos bordados a mano</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            {/* Flechas de navegación */}
            {products.length > 1 && (
              <>
                <button
                  onClick={prevProduct}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 bg-white shadow-xl p-4 rounded-full hover:bg-gray-50 transition-all hover:scale-110"
                  aria-label="Producto anterior"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextProduct}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 bg-white shadow-xl p-4 rounded-full hover:bg-gray-50 transition-all hover:scale-110"
                  aria-label="Producto siguiente"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Producto actual */}
            <div className="transition-opacity duration-300">
              <ProductCard product={products[currentProductIndex]} />
            </div>

            {/* Indicadores de producto */}
            {products.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProductIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentProductIndex 
                        ? 'bg-gray-900 w-8' 
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Ver producto ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Video con logo - más rectangular */}
      <section className="w-full bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative h-[40vh] md:h-[50vh] overflow-hidden rounded-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              style={{ filter: 'none' }}
            >
              <source src="/marina/AQPW8MEivKWr9Nyuzotqtq0xsspsq8HgAyOFZ2qHCyb5pxFx6wgMebid15nvBw4-SQcUrBqht4TXb7fr6yRa26vVjsGwZsjQ.mp4" type="video/mp4" />
            </video>
            
            {/* Logo en el centro superpuesto */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl animate-pulse-slow">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-6xl font-light tracking-[0.3em] text-gray-900">
                    MARINA
                  </h2>
                  <div className="w-32 h-1 bg-gray-900 mx-auto"></div>
                  <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-700">
                    BIKINIS AUTORA
                  </p>
                </div>
              </div>
            </div>

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
        </div>
      </section>

      {/* Todos los productos - Grid con info */}
      {products.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-2">
                TODOS LOS PRODUCTOS
              </h2>
              <p className="text-gray-600">Explorá toda nuestra colección</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductGridCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

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
