'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaBox, FaCheck, FaTruck, FaTimesCircle, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface OrderItem {
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode?: string;
  };
  totalAmount: number;
  status: 'pendiente' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [session, selectedStatus]);

  const fetchOrders = async () => {
    try {
      const url = selectedStatus === 'todas'
        ? '/api/orders'
        : `/api/orders?status=${selectedStatus}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error al actualizar orden:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparando':
        return 'bg-blue-100 text-blue-800';
      case 'enviado':
        return 'bg-purple-100 text-purple-800';
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <FaClock />;
      case 'preparando':
        return <FaBox />;
      case 'enviado':
        return <FaTruck />;
      case 'entregado':
        return <FaCheck />;
      case 'cancelado':
        return <FaTimesCircle />;
      default:
        return <FaClock />;
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-wider text-gray-900">
                Gestión de Pedidos
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {orders.length} pedido{orders.length !== 1 ? 's' : ''} en total
              </p>
            </div>
            <a
              href="/admin/dashboard"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver al Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['todas', 'pendiente', 'preparando', 'enviado', 'entregado', 'cancelado'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Lista de órdenes */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay pedidos {selectedStatus !== 'todas' ? `con estado "${selectedStatus}"` : ''}</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header de la orden */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          Pedido #{order.orderNumber}
                        </h3>
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>👤 {order.customer.name}</span>
                        <span>📱 {order.customer.phone}</span>
                        <span>💰 ${order.totalAmount}</span>
                        <span>📅 {new Date(order.createdAt).toLocaleDateString('es-AR')}</span>
                      </div>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      {expandedOrder === order._id ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Detalles expandidos */}
                {expandedOrder === order._id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Productos */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Productos</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-3 bg-white p-3 rounded-lg">
                              <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                {item.productImage ? (
                                  <Image
                                    src={item.productImage}
                                    alt={item.productName}
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
                                <h5 className="font-medium text-gray-900">{item.productName}</h5>
                                <p className="text-sm text-gray-600">
                                  Talle: {item.size} • Cantidad: {item.quantity}
                                </p>
                                <p className="text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Información del cliente y acciones */}
                      <div className="space-y-6">
                        {/* Datos del cliente */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Información de envío</h4>
                          <div className="bg-white p-4 rounded-lg space-y-2 text-sm">
                            <p><strong>Nombre:</strong> {order.customer.name}</p>
                            <p><strong>Email:</strong> {order.customer.email}</p>
                            <p><strong>Teléfono:</strong> {order.customer.phone}</p>
                            <p><strong>Dirección:</strong> {order.customer.address}</p>
                            <p><strong>Ciudad:</strong> {order.customer.city}, {order.customer.province}</p>
                            {order.customer.postalCode && (
                              <p><strong>CP:</strong> {order.customer.postalCode}</p>
                            )}
                          </div>
                        </div>

                        {order.notes && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Notas del cliente</h4>
                            <div className="bg-white p-4 rounded-lg">
                              <p className="text-sm text-gray-700">{order.notes}</p>
                            </div>
                          </div>
                        )}

                        {/* Cambiar estado */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Cambiar estado</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {['pendiente', 'preparando', 'enviado', 'entregado'].map((status) => (
                              <button
                                key={status}
                                onClick={() => updateOrderStatus(order._id, status)}
                                disabled={order.status === status}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  order.status === status
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Botón de WhatsApp */}
                        <a
                          href={`https://wa.me/${order.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hola ${order.customer.name}! Te contacto por tu pedido #${order.orderNumber}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-green-600 text-white py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                        >
                          💬 Contactar por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
