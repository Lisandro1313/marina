'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBarChart2, FiPackage, FiSettings, FiEye, FiMousePointer, FiUsers, FiGlobe } from 'react-icons/fi';

interface AnalyticsData {
  totalVisits: number;
  totalClicks: number;
  uniqueVisitors: number;
  visitsByCountry: Array<{ _id: string; count: number }>;
  recentVisits: Array<{
    ip: string;
    country: string;
    city: string;
    timestamp: string;
  }>;
  productViews: Array<{
    productId: string;
    productName: string;
    views: number;
  }>;
  productClicks: Array<{
    productId: string;
    productName: string;
    clicks: number;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAnalytics();
  }, [days, currentPage]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/analytics/stats?days=${days}&page=${currentPage}`);
      const analyticsData = await res.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Error al cargar analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
          <div className="flex gap-3">
            <Link
              href="/"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              target="_blank"
            >
              🏠 Ver Sitio
            </Link>
            <Link
              href="/admin/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiPackage />
              Productos
            </Link>
            <Link
              href="/admin/settings"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiSettings />
              Configuración
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtro de días */}
        <div className="mb-6 flex gap-3">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                days === d
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Últimos {d} días
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
          </div>
        ) : data ? (
          <>
            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <FiEye className="text-3xl text-blue-500" />
                  <span className="text-3xl font-bold text-gray-800">{data.totalVisits}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Total Visitas</h3>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <FiMousePointer className="text-3xl text-green-500" />
                  <span className="text-3xl font-bold text-gray-800">{data.totalClicks}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Clicks en Productos</h3>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <FiUsers className="text-3xl text-purple-500" />
                  <span className="text-3xl font-bold text-gray-800">{data.uniqueVisitors}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Visitantes Únicos</h3>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <FiGlobe className="text-3xl text-pink-500" />
                  <span className="text-3xl font-bold text-gray-800">
                    {data.visitsByCountry.length}
                  </span>
                </div>
                <h3 className="text-gray-600 font-medium">Países</h3>
              </div>
            </div>

            {/* Visitas por país */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiGlobe className="text-pink-500" />
                Visitas por País
              </h2>
              <div className="space-y-3">
                {data.visitsByCountry.slice(0, 10).map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      <span className="text-gray-700 font-medium">{country._id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{
                            width: `${(country.count / data.totalVisits) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-800 font-bold w-12 text-right">
                        {country.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Productos más vistos y clickeados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Productos más vistos */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FiEye className="text-blue-500" />
                  Productos Más Vistos
                </h2>
                <div className="space-y-3">
                  {data.productViews && data.productViews.length > 0 ? (
                    data.productViews.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-blue-500">#{index + 1}</span>
                          <div>
                            <span className="text-gray-800 font-medium block">{product.productName}</span>
                            <span className="text-xs text-gray-500">ID: {product.productId.substring(0, 8)}...</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiEye className="text-blue-500" />
                          <span className="text-gray-800 font-bold">{product.views}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No hay datos de vistas de productos</p>
                  )}
                </div>
              </div>

              {/* Productos más clickeados (WhatsApp) */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FiMousePointer className="text-green-500" />
                  Productos Más Clickeados
                </h2>
                <div className="space-y-3">
                  {data.productClicks && data.productClicks.length > 0 ? (
                    data.productClicks.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-green-500">#{index + 1}</span>
                          <div>
                            <span className="text-gray-800 font-medium block">{product.productName}</span>
                            <span className="text-xs text-gray-500">ID: {product.productId.substring(0, 8)}...</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMousePointer className="text-green-500" />
                          <span className="text-gray-800 font-bold">{product.clicks}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No hay datos de clicks en productos</p>
                  )}
                </div>
              </div>
            </div>

            {/* Visitas recientes con paginación */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiEye className="text-blue-500" />
                  Últimas 10 Visitas (IP + Ubicación)
                </h2>
                <div className="text-sm text-gray-600">
                  Página {data.pagination.currentPage} de {data.pagination.totalPages}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-bold text-gray-800">#</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">IP</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">País</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Ciudad</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Fecha y Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentVisits.map((visit, index) => (
                      <tr key={index} className="border-b hover:bg-teal-50 transition-colors">
                        <td className="py-4 px-4 text-gray-600 font-semibold">
                          {(data.pagination.currentPage - 1) * 10 + index + 1}
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-mono text-sm bg-gray-100 rounded">
                          {visit.ip}
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {visit.country || 'Desconocido'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {visit.city || 'Desconocido'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          {formatDate(visit.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="mt-6 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  ← Anterior
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          currentPage === page
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(data.pagination.totalPages, prev + 1))}
                  disabled={currentPage === data.pagination.totalPages}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Siguiente →
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Mostrando {data.recentVisits.length} de {data.pagination.totalItems} visitas totales
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No hay datos disponibles</p>
          </div>
        )}
      </main>
    </div>
  );
}
