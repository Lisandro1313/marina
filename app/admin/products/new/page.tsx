'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'bikini',
    style: '',
    pattern: '',
    stitching: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: '',
    stock: '',
    active: true,
    images: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        colors: formData.colors.split(',').map((c) => c.trim()).filter(Boolean),
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        alert('Error al crear producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear producto');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (result: any) => {
    if (result.info && result.info.secure_url) {
      setFormData({
        ...formData,
        images: [...formData.images, result.info.secure_url],
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Nuevo Producto</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="bikini">Bikini</option>
                <option value="enteriza">Enteriza</option>
                <option value="tankini">Tankini</option>
                <option value="pareo">Pareo</option>
                <option value="accesorio">Accesorio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estilo
              </label>
              <input
                type="text"
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                placeholder="Ej: Triangular, Brasilera, Deportivo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estampado
              </label>
              <input
                type="text"
                value={formData.pattern}
                onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                placeholder="Ej: Flores, Rayas, Liso"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Costuras
              </label>
              <input
                type="text"
                value={formData.stitching}
                onChange={(e) => setFormData({ ...formData, stitching: e.target.value })}
                placeholder="Ej: Doble costura, Reforzadas"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colores (separados por coma)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="Ej: Rojo, Azul, Negro"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FiTrash2 />
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
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-gray-500 hover:border-pink-500 hover:text-pink-500 transition-colors"
                >
                  + Subir Imagen
                </button>
              )}
            </CldUploadWidget>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-pink-500 focus:ring-pink-500 rounded"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-700">
              Producto activo (visible en la tienda)
            </label>
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
              disabled={loading || formData.images.length === 0}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
