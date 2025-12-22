'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiSettings, FiBarChart2, FiPackage, FiSave, FiImage } from 'react-icons/fi';
import { CldUploadWidget } from 'next-cloudinary';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    instagramUrl: '',
    storeName: 'Bikimar',
    storeDescription: '',
    bannerText: '',
    heroImages: [] as string[],
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
        bannerText: data.bannerText || '✦ Envíos a todo el país ✦ 3 cuotas sin interés ✦ Temporada 2025 ✦ Diseños únicos ✦ Bordados a mano ✦ Envíos express',
        heroImages: data.heroImages || [],
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

  const handleImageUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setFormData(prev => ({
      ...prev,
      heroImages: [...prev.heroImages, imageUrl]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      heroImages: prev.heroImages.filter((_, i) => i !== index)
    }));
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

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiImage />
                Contenido de la Página Principal
              </h3>

              <div className="space-y-6">
                {/* Banner Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto del Banner (Marquesina)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bannerText}
                    onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
                    placeholder="✦ Envíos a todo el país ✦ 3 cuotas sin interés..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Este texto aparecerá en el banner animado debajo del hero
                  </p>
                </div>

                {/* Hero Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imágenes del Carrusel de Portada
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Estas imágenes aparecerán en el carrusel de la portada principal
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {formData.heroImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Hero ${index + 1}`} 
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <CldUploadWidget
                    uploadPreset="bikimar"
                    onSuccess={handleImageUpload}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <FiImage />
                        Agregar Imagen al Carrusel
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
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
