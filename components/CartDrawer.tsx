'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { FaShoppingCart, FaTimes, FaTrash, FaMinus, FaPlus, FaWhatsapp } from 'react-icons/fa';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [whatsappNumber, setWhatsappNumber] = useState('5492215082423');
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();

  const totalItems = getTotalItems();

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      })
      .catch(() => {});
  }, []);

  const handleCheckout = () => {
    // Validar datos del cliente
    if (!customerData.name || !customerData.phone) {
      alert('Por favor completá tu nombre y teléfono');
      return;
    }

    // Construir mensaje para WhatsApp
    let message = `🛍️ *NUEVO PEDIDO* 🛍️\n\n`;
    message += `👤 *Cliente:*\n`;
    message += `Nombre: ${customerData.name}\n`;
    message += `Teléfono: ${customerData.phone}\n`;
    if (customerData.email) message += `Email: ${customerData.email}\n`;
    if (customerData.address) message += `Dirección: ${customerData.address}\n`;
    message += `\n📦 *Productos:*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Talle: ${item.size}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: $${item.price}\n\n`;
    });

    message += `💰 *Total: $${getTotalPrice().toLocaleString()}*`;

    // Abrir WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Cerrar drawer y limpiar carrito
    setTimeout(() => {
      setIsOpen(false);
      clearCart();
      setCustomerData({ name: '', phone: '', email: '', address: '' });
    }, 500);
  };

  return (
    <>
      {/* Botón del carrito */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Carrito de compras"
      >
        <FaShoppingCart className="text-xl text-gray-900" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Tu Carrito ({totalItems})
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FaShoppingCart className="text-6xl text-gray-300 mb-4" />
                <p className="text-gray-600 mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500">¡Agregá productos para comenzar!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex gap-3 bg-gray-50 rounded-lg p-3"
                  >
                    {/* Imagen */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded overflow-hidden">
                      {item.images?.[0] ? (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-2xl">👙</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">Talle: {item.size}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ${item.price}
                      </p>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="p-1 bg-white hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                        >
                          <FaMinus className="text-xs text-gray-600" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="p-1 bg-white hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                        >
                          <FaPlus className="text-xs text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="p-2 hover:bg-red-50 rounded transition-colors self-start"
                      aria-label="Eliminar producto"
                    >
                      <FaTrash className="text-sm text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y checkout */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Formulario de datos del cliente */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Tus datos</h3>
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono *"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Email (opcional)"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Dirección de envío (opcional)"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-medium text-gray-900">Total:</span>
                <span className="text-2xl font-light text-gray-900">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="block w-full bg-[#25D366] text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-[#22c55e] transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                Enviar Pedido por WhatsApp
              </button>

              <p className="text-xs text-gray-500 text-center">
                Te responderemos a la brevedad para coordinar tu pedido
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="block w-full text-gray-600 py-2 text-center text-sm hover:text-gray-900 transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
