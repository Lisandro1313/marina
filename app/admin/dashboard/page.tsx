'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlus, FiEdit2, FiTrash2, FiMenu, FiBarChart2, FiSettings } from 'react-icons/fi';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  order: number;
  active: boolean;
}

function SortableProduct({ product, onEdit, onDelete }: { product: Product; onEdit: (id: string) => void; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
    >
      <div {...attributes} {...listeners} className="cursor-move">
        <FiMenu className="text-gray-400 text-xl" />
      </div>

      <div className="w-20 h-20 relative flex-shrink-0">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">${product.price}</p>
        <span className={`text-xs px-2 py-1 rounded ${product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {product.active ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product._id)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p._id === active.id);
      const newIndex = products.findIndex((p) => p._id === over.id);

      const newProducts = arrayMove(products, oldIndex, newIndex);
      setProducts(newProducts);

      // Guardar nuevo orden
      try {
        await fetch('/api/products/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds: newProducts.map((p) => p._id) }),
        });
      } catch (error) {
        console.error('Error al reordenar:', error);
        fetchProducts(); // Recargar si falla
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Â¿EstÃ¡s seguro de eliminar este producto?')) return;

    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <div className="flex gap-3">
            <Link
              href="/"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              target="_blank"
            >
              🏠 Ver Sitio
            </Link>
            <Link
              href="/admin/analytics"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiBarChart2 />
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiSettings />
              Configuración
            </Link>
            <Link
              href="/admin/products/new"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiPlus />
              Nuevo Producto
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Productos ({products.length})
          </h2>
          <p className="text-sm text-gray-600">
            Arrastra para reordenar cÃ³mo aparecen en la tienda
          </p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={products.map((p) => p._id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {products.map((product) => (
                <SortableProduct
                  key={product._id}
                  product={product}
                  onEdit={(id) => router.push(`/admin/products/edit/${id}`)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">No hay productos todavÃ­a</p>
            <Link
              href="/admin/products/new"
              className="text-pink-500 hover:text-pink-600 font-semibold"
            >
              Crear tu primer producto â†’
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}


