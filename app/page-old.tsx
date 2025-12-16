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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [whatsappNumber, setWhatsappNumber] = useState('5491123456789');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch WhatsApp number from settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      })
      .catch(() => {});

    // Animación de entrada escalonada
    setTimeout(() => setIsVisible(true), index * 100);
  }, [index]);
  
  const handleWhatsAppClick = async () => {
    // Track click
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });
    } catch (e) {}

    const message = encodeURIComponent(
      `Hola! Me interesa este producto:\n\n` +
      `📦 ${product.name}\n` +
      `💰 $${product.price}\n\n` +
      `¿Está disponible?`
    );
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge de estilo */}
        {product.style && (
          <div className="absolute top-3 right-3 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {product.style}
          </div>
        )}
        
        {/* Botón rápido en hover */}
        <button
          onClick={handleWhatsAppClick}
          className="absolute inset-x-4 bottom-4 bg-white hover:bg-gray-50 text-gray-900 py-3 rounded-lg font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-green-600 text-xl" />
          Consultar
        </button>
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-900">${product.price}</span>
            <span className="text-xs text-gray-500">Precio consultar</span>
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            <FaWhatsapp className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    trackVisit();
    setupPageTitleChange();
  }, []);

  const setupPageTitleChange = () => {
    const originalTitle = 'Marina Bikinis Autora - Diseños Únicos';
    const funnyTitles = [
      '¡Volvé! 👙',
      'No te vayas 💔',
      'Aprovechá ahora 🔥',
      '¡Esperá! Tenemos ofertas 🌟',
      'Volvé por tu bikini 🌊',
      '¡Te esperamos! 💝',
      'No te lo pierdas 👀',
      'Volvé, tenemos lo que buscás ✨'
    ];

    let titleIndex = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Usuario salió de la pestaña - mostrar título gracioso
        document.title = funnyTitles[titleIndex];
        titleIndex = (titleIndex + 1) % funnyTitles.length;
      } else {
        // Usuario volvió - restaurar título original
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50">
      {/* Header con estética playera */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-teal-400">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="text-5xl animate-wave">⭐</div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                  Marina Bikinis Autora
                </h1>
                <p className="text-xs text-teal-600 font-bold tracking-wide">DISEÑOS ARTESANALES DEL MAR</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/admin/dashboard"
                className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-all duration-300 font-semibold text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Admin
              </a>
              <a
                href="https://www.instagram.com/marinabikinisautora/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-110"
              >
                <FaInstagram className="text-xl" />
                <span className="hidden sm:inline">Seguinos</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Profesional */}
      <section className="relative bg-gradient-to-br from-white via-cyan-50 to-teal-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                ✨ Nueva Colección 2025
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                Marina Bikinis<br/>
                <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                  Autora
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Diseños artesanales únicos, bordados a mano. Cada pieza cuenta una historia del mar.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#productos" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  Ver Colección
                </a>
                <a href="https://wa.me/5492215082423" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg border-2 border-gray-200 hover:border-teal-500 transform hover:-translate-y-1 transition-all duration-300">
                  Consultar WhatsApp
                </a>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl mb-2">🧵</div>
                  <p className="text-sm font-semibold text-gray-700">Bordados<br/>a mano</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✨</div>
                  <p className="text-sm font-semibold text-gray-700">Diseños<br/>únicos</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📦</div>
                  <p className="text-sm font-semibold text-gray-700">Envíos<br/>a todo el país</p>
                </div>
              </div>
            </div>
            
            {/* Imagen placeholder */}
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="aspect-[3/4] bg-gradient-to-br from-cyan-200 via-teal-200 to-orange-200 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4 animate-wave">⭐</div>
                    <p className="text-2xl font-bold">Imagen principal aquí</p>
                    <p className="text-sm mt-2">Subi fotos desde Cloudinary</p>
                  </div>
                </div>
              </div>
              {/* Decoración */}
              <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-cyan-300 rounded-full blur-3xl opacity-30 animate-blob" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Profesional */}
      <main id="productos" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header de sección */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Nuestra Colección
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada bikini es diseñado y bordado a mano. Piezas únicas que reflejan la belleza del mar.
            </p>
          </div>

          {/* Badges de confianza */}
          <div className="bg-white py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-12 border-y border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👙</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">6 Talles</h3>
                <p className="text-sm text-gray-600">Del XS al XXL</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Calce Perfecto</h3>
                <p className="text-sm text-gray-600">Diseños exclusivos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌟</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Calidad Premium</h3>
                <p className="text-sm text-gray-600">Materiales de primera</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-teal-100 to-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💝</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Envíos</h3>
                <p className="text-sm text-gray-600">A todo el país</p>
              </div>
            </div>
          </div>

          {/* Selector de talles destacado */}
          <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-12 rounded-2xl">
            <h2 className="text-3xl font-black text-white mb-4 text-center">¡ELEGÍ TU TALLE!</h2>
            <p className="text-white/90 mb-8 text-center text-lg">Filtrá para encontrar tu bikini perfecta</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((talle) => (
                <button
                  key={talle}
                  className="w-20 h-20 bg-white hover:bg-cyan-50 text-gray-900 rounded-xl font-black text-2xl shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300"
                >
                  {talle}
                </button>
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black mb-2">
              <span className="text-orange-500">🍒</span>
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 bg-clip-text text-transparent"> Best Sellers </span>
              <span className="text-orange-500">🍒</span>
            </h2>
            <p className="text-gray-600 text-lg">Los más elegidos del verano</p>
          </div>

          {/* Filtros rápidos */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up animation-delay-200">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Todos
            </button>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-300">
              Triángulo
            </button>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-300">
              Deportivo
            </button>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-300">
              Con Aro
            </button>
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-300">
              Vedetina
            </button>
          </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block relative mb-6">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-cyan-200"></div>
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-teal-500 border-t-transparent absolute inset-0"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl animate-wave">⭐</div>
            </div>
            <p className="text-xl font-black bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent animate-pulse">
              Trayendo diseños únicos...
            </p>
            <p className="text-gray-600 font-medium mt-2">Cada pieza es una obra de arte</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-4 border-dashed border-teal-300">
            <div className="text-7xl mb-6 animate-float">⭐</div>
            <p className="text-2xl font-black bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-2">
              Nuevos diseños en camino
            </p>
            <p className="text-gray-600 font-medium">Estamos bordando nuevas piezas únicas para vos</p>
          </div>
        )}
        </div>
      </main>

      {/* Shop The Look - Carrusel de lifestyle */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Shop The Look
            </h2>
            <p className="text-lg text-gray-600">
              Inspirate con nuestras combinaciones favoritas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Look 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[3/4] bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <span className="text-6xl opacity-30">📸</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300">
                    COMPRA AHORA
                  </button>
                </div>
              </div>
            </div>

            {/* Look 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-cyan-100 flex items-center justify-center">
                <span className="text-6xl opacity-30">📸</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300">
                    COMPRA AHORA
                  </button>
                </div>
              </div>
            </div>

            {/* Look 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[3/4] bg-gradient-to-br from-teal-100 to-orange-100 flex items-center justify-center">
                <span className="text-6xl opacity-30">📸</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300">
                    COMPRA AHORA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="bg-gradient-to-br from-cyan-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Más de 1000 Clientas Nos Eligen
            </h2>
            <p className="text-lg text-gray-600">
              Testimonios reales de quienes confían en Marina Bikinis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex mb-4">
                <span className="text-orange-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Marina Bikinis ofrece diseños exclusivos que combinan diferentes texturas y bordados únicos. La atención al cliente es impecable, personalizada y cercana. ¡Es un camino de ida!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <p className="font-bold text-gray-900">Sofía Laurenzana</p>
                  <p className="text-sm text-gray-500">Buenos Aires</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex mb-4">
                <span className="text-orange-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Fan desde y para siempre! Compro todos los años porque la calidad es increíble. Los colores son vibrantes y los materiales no se deterioran. Se nota el esfuerzo en cada pieza✨"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  F
                </div>
                <div>
                  <p className="font-bold text-gray-900">Florencia Montero</p>
                  <p className="text-sm text-gray-500">La Plata</p>
                </div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex mb-4">
                <span className="text-orange-400 text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Siempre me costó elegir bikinis, pero la variedad de modelos y los seis talles me hicieron elegir esta marca. La atención por WhatsApp e Instagram es súper cálida. Sin dudas vuelvo a elegirlas!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  N
                </div>
                <div>
                  <p className="font-bold text-gray-900">Noelia Torres</p>
                  <p className="text-sm text-gray-500">Mar del Plata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer con estética tropical */}
      <footer className="relative bg-gradient-to-br from-cyan-500 via-teal-600 to-orange-500 text-white py-16 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-20 text-white/20 text-6xl animate-float">⭐</div>
        <div className="absolute bottom-10 right-20 text-white/20 text-5xl animate-wave">🌊</div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-wave">⭐</div>
            <h4 className="text-4xl font-black mb-3 drop-shadow-lg">Marina Bikinis Autora</h4>
            <p className="text-white text-lg font-semibold">Diseños artesanales del mar · Piezas únicas</p>
            <p className="text-white/90 text-sm mt-2">Bordados a mano con amor</p>
          </div>
          <div className="flex justify-center gap-8 mb-8">
            <a 
              href="https://www.instagram.com/marinabikinisautora/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center"
            >
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transform group-hover:scale-125 transition-all duration-300 group-hover:bg-white/30 shadow-xl">
                <FaInstagram className="text-4xl text-white" />
              </div>
              <span className="text-white/90 text-sm mt-2 font-semibold">@marinabikinisautora</span>
            </a>
          </div>
          
          <div className="border-t border-white/30 pt-6">
            <p className="text-white/80 text-sm font-medium">&copy; 2025 Marina Bikinis Autora · Todos los derechos reservados</p>
            <p className="text-white/60 text-xs mt-2">Diseños artesanales únicos · Hecho con 💙 en Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
