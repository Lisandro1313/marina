'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaShoppingBag, FaCheckCircle } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
  });

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      router.push('/productos');
    }
  }, [cart, orderComplete, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = cart.map((item) => ({
        product: item._id,
        productName: item.name,
        productImage: item.images?.[0] || '',
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode,
          },
          totalAmount: getTotalPrice(),
          notes: formData.notes,
        }),
      });

      if (!response.ok) throw new Error('Error al crear orden');

      const order = await response.json();
      setOrderNumber(order.orderNumber);
      setOrderComplete(true);
      clearCart();

      // Scroll al tope
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu pedido. Por favor intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>

            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-4">
              ¡Pedido Confirmado!
            </h1>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Número de pedido</p>
              <p className="text-2xl font-medium text-gray-900">{orderNumber}</p>
            </div>

            <div className="text-left space-y-3 mb-8">
              <p className="text-gray-700">
                📧 Te enviamos un email de confirmación con los detalles de tu pedido.
              </p>
              <p className="text-gray-700">
                💬 En breve nos contactaremos por WhatsApp para coordinar el pago y envío.
              </p>
              <p className="text-gray-700">
                📦 Preparamos tu pedido con mucho cariño y lo enviamos a la brevedad.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Volver al inicio
              </a>
              <a
                href="/productos"
                className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Seguir comprando
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-block mb-4">
            <h1 className="text-2xl font-light tracking-wider text-gray-900">
              MARINA BIKINIS
            </h1>
          </a>
          <h2 className="text-3xl font-light tracking-wide text-gray-900">
            Finalizar Compra
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              Datos de envío
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Calle y número"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ej: Preferencia de horario de entrega, indicaciones especiales..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                <FaShoppingBag />
                Resumen del pedido
              </h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      {item.images?.[0] ? (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl">👙</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        Talle: {item.size} • Cant: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-sm text-gray-600">A coordinar</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">
                    ${getTotalPrice()}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💬 Nos contactaremos por WhatsApp para coordinar el pago (transferencia o efectivo) y el envío.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
