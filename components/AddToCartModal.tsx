'use client';

import { useState } from 'react';
import { useCart, Product } from '@/context/CartContext';
import { FaTimes, FaCheck } from 'react-icons/fa';

interface AddToCartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToCartModal({ product, isOpen, onClose }: AddToCartModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaTimes className="text-gray-600" />
        </button>

        {showSuccess ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaCheck className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              ¡Agregado al carrito!
            </h3>
            <p className="text-gray-600">
              {product.name} - Talle {selectedSize}
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Seleccioná tu talle
            </h3>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">{product.name}</p>
              <p className="text-2xl font-light text-gray-900">${product.price}</p>
            </div>

            {/* Selector de talle */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border-2 rounded-lg font-medium transition-all ${
                    selectedSize === size
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 hover:border-gray-400 text-gray-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Guía de talles */}
            <div className="bg-gray-50 rounded-lg p-3 mb-6">
              <p className="text-xs font-medium text-gray-900 mb-2">Guía de talles:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>S: Busto 80-84cm</p>
                <p>M: Busto 85-89cm</p>
                <p>L: Busto 90-94cm</p>
                <p>XL: Busto 95-99cm</p>
              </div>
            </div>

            {/* Botón agregar */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
            >
              Agregar al carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}
