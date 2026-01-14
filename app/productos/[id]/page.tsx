'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaArrowLeft } from 'react-icons/fa';

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

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [whatsappNumber, setWhatsappNumber] = useState('5491123456789');

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
      trackProductView(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      })
      .catch(() => {});
  }, []);

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        router.push('/productos');
      }
    } catch (error) {
      console.error('Error al cargar producto:', error);
      router.push('/productos');
    } finally {
      setLoading(false);
    }
  };

  const trackProductView = async (productId: string) => {
    try {
      await fetch('/api/analytics/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const handleWhatsAppClick = async () => {
    if (!product) return;
    
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
    if (product && product.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="inline-block h-12 w-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="block">
                <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900">
                  MARINA BIKINIS
                </h1>
                <p className="text-xs tracking-widest text-gray-500 uppercase">Autora</p>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/productos"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
              >
                Productos
              </Link>
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Botón volver */}
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <FaArrowLeft />
          <span>Volver a productos</span>
        </Link>

        {/* Contenido del producto */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg group">
              {product.images?.[currentImageIndex] ? (
                <>
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        aria-label="Imagen anterior"
                      >
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        aria-label="Imagen siguiente"
                      >
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <span className="text-4xl opacity-20">👙</span>
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-gray-900' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wide mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </p>
            </div>

            <div className="text-4xl font-light text-gray-900">
              ${product.price}
            </div>

            {product.description && (
              <div className="border-t border-b border-gray-200 py-6">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                Detalles del Producto
              </h3>
              
              {product.style && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-900 min-w-[100px]">Estilo:</span>
                  <span className="text-sm text-gray-700">{product.style}</span>
                </div>
              )}
              
              {product.pattern && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-900 min-w-[100px]">Patrón:</span>
                  <span className="text-sm text-gray-700">{product.pattern}</span>
                </div>
              )}
              
              {product.stitching && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-900 min-w-[100px]">Bordado:</span>
                  <span className="text-sm text-gray-700">{product.stitching}</span>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-900 min-w-[100px]">Colores:</span>
                <span className="text-sm text-gray-700">Negro, Blanco, Rojo, Azul</span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-900 min-w-[100px]">Talles:</span>
                <span className="text-sm text-gray-700">S, M, L</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-3"
              >
                <FaWhatsapp className="text-xl" />
                Ordenar por WhatsApp
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                Te responderemos a la brevedad para coordinar tu pedido
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <h4 className="font-medium text-gray-900">Información de envío</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Envíos a todo el país</li>
                <li>✓ 3 cuotas sin interés</li>
                <li>✓ Diseños únicos y exclusivos</li>
                <li>✓ Bordados artesanales</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-light tracking-wider text-gray-900">
            MARINA BIKINIS
          </h3>
          <p className="text-sm text-gray-600">Bikinis de autor - Diseños únicos</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/marinabikinisautora/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2025 Marina Bikinis Autora. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
