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

function ProductCard({ product, viewMode, favorites, toggleFavorite, onAddToCart }: {
  product: Product;
  viewMode: 'grid' | 'list';
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
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
