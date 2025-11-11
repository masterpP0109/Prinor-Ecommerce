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

const productCategories = [
  { id: 'all', name: 'All Products', count: 48 },
  { id: 'electronics', name: 'Electronics', count: 24 },
  { id: 'computers', name: 'Computers', count: 12 },
  { id: 'phones', name: 'Phones', count: 8 },
  { id: 'gaming', name: 'Gaming', count: 6 },
  { id: 'accessories', name: 'Accessories', count: 18 }
];

const featuredProducts = [
  {
    id: 1,
    name: 'MacBook Pro M3 Max',
    category: 'computers',
    price: 3199,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 1247,
    image: '/images/products/imac1.jpg',
    badge: 'Flagship',
    inStock: true,
    features: ['M3 Max Chip', '32GB RAM', '1TB SSD', '16" Liquid Retina XDR']
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    category: 'phones',
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2189,
    image: '/images/products/iphone1.jpg',
    badge: 'Latest',
    inStock: true,
    features: ['A17 Pro Chip', '256GB Storage', 'Pro Camera System', 'Titanium Design']
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'phones',
    price: 1299,
    originalPrice: 1399,
    rating: 4.7,
    reviews: 1856,
    image: '/images/products/samsungS23_1.jpg',
    badge: 'Pro',
    inStock: true,
    features: ['Snapdragon 8 Gen 3', '12GB RAM', 'S Pen Included', '200MP Camera']
  },
  {
    id: 4,
    name: 'PlayStation 5 Console',
    category: 'gaming',
    price: 499,
    originalPrice: 599,
    rating: 4.9,
    reviews: 3456,
    image: '/images/products/PS5.jpg',
    badge: 'Gaming',
    inStock: false,
    features: ['Custom AMD Zen 2', '16GB GDDR6', '825GB SSD', '4K Gaming']
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    category: 'electronics',
    price: 1099,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 987,
    image: '/images/products/ipadPro1.jpg',
    badge: 'Creative',
    inStock: true,
    features: ['M2 Chip', '128GB Storage', 'Liquid Retina XDR', 'Apple Pencil Ready']
  },
  {
    id: 6,
    name: 'AirPods Pro (3rd Gen)',
    category: 'accessories',
    price: 249,
    originalPrice: 279,
    rating: 4.6,
    reviews: 2341,
    image: '/images/products/airpods1.jpg',
    badge: 'Audio',
    inStock: true,
    features: ['Active Noise Cancellation', 'Spatial Audio', '30hr Battery', 'MagSafe Case']
  },
  {
    id: 7,
    name: 'ASUS ROG Strix Gaming Laptop',
    category: 'computers',
    price: 1899,
    originalPrice: 2199,
    rating: 4.7,
    reviews: 654,
    image: '/images/products/asusRog1.jpg',
    badge: 'Gaming',
    inStock: true,
    features: ['RTX 4070', '32GB DDR5', '1TB NVMe SSD', '15.6" 165Hz Display']
  },
  {
    id: 8,
    name: 'Apple Watch Series 9',
    category: 'accessories',
    price: 399,
    originalPrice: 429,
    rating: 4.5,
    reviews: 1432,
    image: '/images/products/appleWatch1.jpg',
    badge: 'Health',
    inStock: true,
    features: ['S9 Chip', 'Always-On Display', 'ECG App', 'Blood Oxygen']
  }
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const filteredProducts = featuredProducts.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

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
                Showing {sortedProducts.length} of {featuredProducts.length} products
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/store/products/${product.id}`}
              className="product-card group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Stock Status */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-400">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-green-400">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-sm font-medium text-white ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      if (product.inStock) {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        });
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      product.inStock
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                  </button>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
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