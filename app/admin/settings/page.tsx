'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiSettings, FiBarChart2, FiPackage, FiSave } from 'react-icons/fi';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    instagramUrl: '',
    storeName: 'Bikimar',
    storeDescription: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setFormData({
        whatsappNumber: data.whatsappNumber || '',
        instagramUrl: data.instagramUrl || '',
        storeName: data.storeName || 'Bikimar',
        storeDescription: data.storeDescription || '',
      });
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('✅ Configuración guardada exitosamente');
      } else {
        alert('❌ Error al guardar configuración');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al guardar configuración');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiPackage />
              Productos
            </Link>
            <Link
              href="/admin/analytics"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiBarChart2 />
              Analytics
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <FiSettings className="text-3xl text-pink-500" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Configuración de la Tienda</h2>
              <p className="text-gray-600">Gestiona los datos de contacto y configuración</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de WhatsApp *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="5491123456789"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                Formato: código de país + número (sin + ni espacios). Ej: 5491123456789
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de Instagram
              </label>
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                placeholder="https://www.instagram.com/marinabikinisautora/"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                value={formData.storeDescription}
                onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                placeholder="Descripción de tu tienda..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <FiSave />
                {loading ? 'Guardando...' : 'Guardar Configuración'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
