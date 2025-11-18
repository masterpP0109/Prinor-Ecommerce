'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

const productCategories = [
  { id: 'all', name: 'All Products', count: 0 },
  { id: 'electronics', name: 'Electronics', count: 0 },
  { id: 'computers', name: 'Computers', count: 0 },
  { id: 'phones', name: 'Phones', count: 0 },
  { id: 'gaming', name: 'Gaming', count: 0 },
  { id: 'accessories', name: 'Accessories', count: 0 }
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      params.append('sortBy', sortBy === 'featured' ? 'createdAt' : sortBy === 'newest' ? 'createdAt' : sortBy);
      params.append('sortOrder', sortBy === 'price-low' ? 'asc' : 'desc');

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, sortBy]);

  const filteredProducts = products.filter(product =>
    activeCategory === 'all' || product.category === activeCategory
  );

  const sortedProducts = [...filteredProducts];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Filters animation
      gsap.fromTo(
        filtersRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate products when category changes
  useEffect(() => {
    if (typeof window === 'undefined' || !productsRef.current) return;

    const products = productsRef.current.querySelectorAll('.product-card');
    
    gsap.fromTo(
      products,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1
      }
    );
  }, [activeCategory, sortBy]);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Flagship':
        return 'bg-purple-600 text-white';
      case 'Latest':
        return 'bg-blue-600 text-white';
      case 'Pro':
        return 'bg-orange-500 text-white';
      case 'Gaming':
        return 'bg-red-500 text-white';
      case 'Creative':
        return 'bg-pink-500 text-white';
      case 'Audio':
        return 'bg-green-500 text-white';
      case 'Health':
        return 'bg-teal-500 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-left mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Premium Electronics Store
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Discover cutting-edge technology from the world's leading brands. From powerful computers to innovative accessories.
          </p>
        </div>

        {/* Filters & Controls */}
        <div ref={filtersRef} className="mb-12">
          {/* Category Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Sort & View Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400">
                Showing {sortedProducts.length} products
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="text-gray-400 text-xl">Loading products...</div>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-gray-400 text-xl">No products found</div>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/store/products/${product.id}`}
                className="product-card group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || '/images/default-product.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Stock Status */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.available
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {product.available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  {product.description && (
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-purple-400">${product.price}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (product.available) {
                        addToCart(product.id);
                      }
                    }}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      product.available
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!product.available}
                  >
                    {product.available ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            ))
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
            Load More Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;