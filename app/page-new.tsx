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
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-6xl opacity-20">⭐</span>
          </div>
        )}
        
        {/* Overlay al hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleWhatsAppClick}
            className="bg-white text-gray-900 px-6 py-3 text-sm font-medium tracking-wide uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Consultar
          </button>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide">{product.style || 'Consultar precio'}</p>
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

      {/* Hero minimalista - Imagen grande */}
      <section className="relative h-[75vh] md:h-[90vh] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl opacity-10 text-white">⭐</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
            Nueva Colección 2025
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 max-w-md opacity-90">
            Diseños artesanales bordados a mano
          </p>
          <div className="flex gap-4">
            <a
              href="#productos"
              className="bg-white text-gray-900 px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors font-medium"
            >
              Ver Colección
            </a>
            <a
              href="https://wa.me/5492215082423"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-gray-900 transition-colors font-medium"
            >
              Consultar
            </a>
          </div>
        </div>
      </section>

      {/* Banner envíos */}
      <div className="bg-gray-900 text-white py-3">
        <p className="text-center text-sm tracking-wide uppercase">
          Envíos a todo el país • 3 cuotas sin interés
        </p>
      </div>

      {/* Productos */}
      <main className="max-w-7xl mx-auto px-4 py-16" id="productos">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Próximamente nuevos diseños</p>
          </div>
        )}
      </main>

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
