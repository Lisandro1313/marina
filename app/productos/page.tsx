'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaInstagram, FaSortAmountDown, FaHeart, FaRegHeart, FaTh, FaList, FaFilter, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa';
import CartDrawer from '@/components/CartDrawer';
import AddToCartModal from '@/components/AddToCartModal';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  style?: string;
  pattern?: string;
  stitching?: string;
}

interface PriceRange {
  min: number;
  max: number;
}

function ProductCard({ product, viewMode, favorites, toggleFavorite }: { 
  product: Product; 
  viewMode: 'grid' | 'list';
  favorites: string[];
  toggleFavorite: (id: string) => void;
}) {
  const [whatsappNumber, setWhatsappNumber] = useState('5491123456789');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isFavorite = favorites.includes(product._id);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      })
      .catch(() => {});
  }, []);

  const handleWhatsAppClick = async () => {
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, productName: product.name })
      });
    } catch (e) {}
    
    const message = `Hola! Me interesa: ${product.name} - $${product.price}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-4">
        {/* Imagen */}
        <div 
          className="relative w-full md:w-64 aspect-[4/5] md:aspect-square overflow-hidden bg-gray-100 cursor-pointer flex-shrink-0"
          onMouseEnter={() => product.images?.[1] && setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          {product.images?.[currentImageIndex] ? (
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-4xl opacity-20">ðŸ‘™</span>
            </div>
          )}
          
          {/* BotÃ³n favorito */}
          <button
            onClick={() => toggleFavorite(product._id)}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-700 text-lg" />
            )}
          </button>

          {product.images && product.images.length > 1 && (
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {product.images.length} fotos
            </div>
          )}
        </div>

        {/* InformaciÃ³n */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-sm text-gray-600">
                {product.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2">
              {product.style && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
                  {product.style}
                </span>
              )}
              {product.category && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
                  {product.category}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-3xl font-light text-gray-900">
              ${product.price}
            </span>
            
            <button
              onClick={handleWhatsAppClick}
              className="bg-gray-900 text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
            >
              <FaWhatsapp className="text-base" />
              Ordenar Ahora
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group relative">
      {/* BotÃ³n favorito */}
      <button
        onClick={() => toggleFavorite(product._id)}
        className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 text-base" />
        ) : (
          <FaRegHeart className="text-gray-700 text-base" />
        )}
      </button>

      {/* Imagen del producto con hover para ver mÃ¡s imÃ¡genes */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer"
        onMouseEnter={() => product.images?.[1] && setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        {product.images?.[currentImageIndex] ? (
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-4xl opacity-20">ðŸ‘™</span>
          </div>
        )}
        
        {/* Badge de mÃºltiples imÃ¡genes */}
        {product.images && product.images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {product.images.length} fotos
          </div>
        )}
      </div>

      {/* InformaciÃ³n del producto */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-medium text-gray-900 min-h-[3rem]">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        )}
        
        <div className="space-y-2 text-xs text-gray-700">
          {product.style && (
            <p><span className="font-medium">Estilo:</span> {product.style}</p>
          )}
          <p><span className="font-medium">Talles:</span> S, M, L</p>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-light text-gray-900">
            ${product.price}
          </span>
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-gray-900 text-white px-4 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-base" />
          Ordenar Ahora
        </button>
      </div>
    </div>
  );
}

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'newest'>('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  
  // Filtros avanzados
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 100000 });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Obtener estilos y categorías Ãºnicos
  const uniqueStyles = Array.from(new Set(products.map(p => p.style).filter((s): s is string => Boolean(s))));
  const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter((c): c is string => Boolean(c))));
  const minPrice = Math.min(...products.map(p => p.price), 0);
  const maxPrice = Math.max(...products.map(p => p.price), 100000);

  useEffect(() => {
    fetchProducts();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortBy, searchTerm, selectedStyles, selectedCategories, priceRange, showOnlyFavorites]);

  const loadFavorites = () => {
    const saved = localStorage.getItem('bikimar-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('bikimar-favorites', JSON.stringify(newFavorites));
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?activeOnly=true');
      const data = await res.json();
      setProducts(data);
      if (data.length > 0) {
        const prices = data.map((p: Product) => p.price);
        setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.style?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estilos
    if (selectedStyles.length > 0) {
      filtered = filtered.filter(p => p.style && selectedStyles.includes(p.style));
    }

    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => p.category && selectedCategories.includes(p.category));
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filtrar por favoritos
    if (showOnlyFavorites) {
      filtered = filtered.filter(p => favorites.includes(p._id));
    }

    // Ordenar
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Ya vienen ordenados por orden de creaciÃ³n
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStyles([]);
    setSelectedCategories([]);
    setPriceRange({ min: minPrice, max: maxPrice });
    setShowOnlyFavorites(false);
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const activeFiltersCount = 
    selectedStyles.length + 
    selectedCategories.length + 
    (showOnlyFavorites ? 1 : 0) +
    (priceRange.min !== minPrice || priceRange.max !== maxPrice ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="block">
                <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900">
                  MARINA BIKINIS
                </h1>
                <p className="text-xs tracking-widest text-gray-500 uppercase">Autora</p>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/productos"
                className="text-sm text-gray-900 font-medium transition-colors uppercase tracking-wide"
              >
                Productos
              </a>
              <a
                href="/sobre-nosotros"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
              >
                Sobre Nosotros
              </a>
              <a
                href="/admin/dashboard"
                className="hidden md:block text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
              >
                Admin
              </a>
              <a
                href="https://www.instagram.com/marinabikinisautora/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* TÃ­tulo y controles */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-2">
            TODOS LOS PRODUCTOS
          </h1>
          <p className="text-gray-600 mb-8">Explorá nuestra colecciÃ³n completa</p>

          {/* Barra de búsqueda principal */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, descripción, estilo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Controles superiores */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
            {/* Botones de vista y filtros */}
            <div className="flex items-center gap-3">
              {/* BotÃ³n de filtros */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaFilter />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* BotÃ³n favoritos */}
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showOnlyFavorites
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaHeart />
                <span className="hidden sm:inline">Favoritos</span>
                {favorites.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    showOnlyFavorites ? 'bg-white text-red-500' : 'bg-gray-900 text-white'
                  }`}>
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Toggle vista */}
              <div className="flex bg-white rounded-lg p-1 border border-gray-300">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                >
                  <FaList />
                </button>
              </div>
            </div>

            {/* Ordenar */}
            <div className="flex items-center gap-2">
              <FaSortAmountDown className="text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              >
                <option value="newest">MÃ¡s recientes</option>
                <option value="name">Nombre (A-Z)</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Panel de filtros expandible */}
          {showFilters && (
            <div className="mt-4 bg-white border-2 border-gray-200 rounded-lg p-6 space-y-6 animate-in slide-in-from-top">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Filtros Avanzados</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Limpiar todo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filtro por estilo */}
                {uniqueStyles.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Estilo</h4>
                    <div className="space-y-2">
                      {uniqueStyles.map((style) => (
                        <label key={style} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedStyles.includes(style)}
                            onChange={() => toggleStyle(style)}
                            className="w-4 h-4 text-gray-900 rounded focus:ring-gray-900"
                          />
                          <span className="text-sm text-gray-700">{style}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filtro por categoría */}
                {uniqueCategories.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">categoría</h4>
                    <div className="space-y-2">
                      {uniqueCategories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-gray-900 rounded focus:ring-gray-900"
                          />
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filtro por precio */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Rango de Precio</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div className="text-xs text-gray-600">
                      Rango: ${minPrice} - ${maxPrice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contador y filtros activos */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
            </div>
            
            {/* Chips de filtros activos */}
            {selectedStyles.map(style => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors"
              >
                {style}
                <FaTimes />
              </button>
            ))}
            {selectedCategories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors"
              >
                {category}
                <FaTimes />
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                viewMode={viewMode}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">No se encontraron productos</p>
            {(searchTerm || activeFiltersCount > 0) && (
              <button
                onClick={clearFilters}
                className="text-gray-900 underline hover:no-underline font-medium"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-2">
                MARINA BIKINIS AUTORA
              </h3>
              <p className="text-sm text-gray-600 tracking-wide">DiseÃ±os artesanales â€¢ Bordados a mano</p>
            </div>
            
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/marinabikinisautora/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://wa.me/5492215082423"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
            
            <p className="text-xs text-gray-500 tracking-wide">
              Â© 2025 Marina Bikinis Autora. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}







