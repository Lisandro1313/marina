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
    heroTitle: 'MARINA',
    heroSubtitle: 'BIKINIS AUTORA',
    heroDescription: 'Diseños artesanales únicos\nBordados a mano con dedicación',
    footerGif: '/marina/Beautiful Water GIF.gif',
    footerTitle: 'MARINA BIKINIS',
    footerSubtitle: 'Diseños artesanales únicos',
    footerDescription: 'Bordados a mano con dedicación',
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
        heroTitle: data.heroTitle || 'MARINA',
        heroSubtitle: data.heroSubtitle || 'BIKINIS AUTORA',
        heroDescription: data.heroDescription || 'Diseños artesanales únicos\nBordados a mano con dedicación',
        footerGif: data.footerGif || '/marina/Beautiful Water GIF.gif',
        footerTitle: data.footerTitle || 'MARINA BIKINIS',
        footerSubtitle: data.footerSubtitle || 'Diseños artesanales únicos',
        footerDescription: data.footerDescription || 'Bordados a mano con dedicación',
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

  const handleFooterGifUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setFormData(prev => ({
      ...prev,
      footerGif: imageUrl
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SECCIÓN: Información Básica */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📱 Información de Contacto</h3>
              
              <div className="space-y-4">
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
              </div>
            </div>

            {/* SECCIÓN: Banner */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📢 Banner Marquesina</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto del Banner
                </label>
                <textarea
                  rows={2}
                  value={formData.bannerText}
                  onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
                  placeholder="✦ Envíos a todo el país ✦ 3 cuotas sin interés..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Este texto aparecerá en el banner animado
                </p>
              </div>
            </div>

            {/* SECCIÓN: Hero (Pantalla Principal) */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🎨 Pantalla Principal (Hero)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    placeholder="MARINA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    El texto grande que aparece en la portada
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    placeholder="BIKINIS AUTORA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroDescription}
                    onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                    placeholder="Diseños artesanales únicos..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Texto descriptivo debajo del título
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imágenes del Carrusel
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

            {/* SECCIÓN: Footer */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🌊 Footer</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GIF de Fondo
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    El GIF/imagen que aparece de fondo en el footer
                  </p>

                  {formData.footerGif && (
                    <div className="mb-4">
                      <img 
                        src={formData.footerGif} 
                        alt="Footer GIF" 
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <CldUploadWidget
                    uploadPreset="bikimar"
                    onSuccess={handleFooterGifUpload}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <FiImage />
                        Cambiar GIF del Footer
                      </button>
                    )}
                  </CldUploadWidget>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Footer
                  </label>
                  <input
                    type="text"
                    value={formData.footerTitle}
                    onChange={(e) => setFormData({ ...formData, footerTitle: e.target.value })}
                    placeholder="MARINA BIKINIS"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo del Footer
                  </label>
                  <input
                    type="text"
                    value={formData.footerSubtitle}
                    onChange={(e) => setFormData({ ...formData, footerSubtitle: e.target.value })}
                    placeholder="Diseños artesanales únicos"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Footer
                  </label>
                  <input
                    type="text"
                    value={formData.footerDescription}
                    onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                    placeholder="Bordados a mano con dedicación"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
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
