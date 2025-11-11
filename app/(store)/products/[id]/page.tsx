'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '../../../../context/CartContext';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock product data - in real app, this would come from API/database
const productData = {
  1: {
    id: 1,
    name: 'MacBook Pro M3 Max',
    category: 'computers',
    price: 3199,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 1247,
    inStock: true,
    stockCount: 15,
    badge: 'Flagship',
    shortDescription: 'The most powerful MacBook Pro ever, featuring the revolutionary M3 Max chip.',
    fullDescription: 'Experience unprecedented performance with the MacBook Pro featuring the M3 Max chip. Built for professionals who demand the ultimate in power and efficiency, this laptop delivers exceptional performance for video editing, 3D rendering, software development, and more.',
    images: [
      '/images/products/imac1.jpg',
      '/images/products/imac2.jpg',
      '/images/products/imac3.jpg',
      '/images/products/imac4.jpg'
    ],
    specifications: {
      'Processor': 'Apple M3 Max chip with 12-core CPU',
      'Memory': '32GB unified memory',
      'Storage': '1TB SSD storage',
      'Display': '16-inch Liquid Retina XDR display',
      'Graphics': '38-core GPU',
      'Battery': 'Up to 22 hours video playback',
      'Weight': '4.7 pounds (2.1 kg)',
      'Dimensions': '14.01 x 9.77 x 0.66 inches'
    },
    features: [
      'M3 Max Chip with 12-core CPU',
      '32GB Unified Memory',
      '1TB SSD Storage',
      '16" Liquid Retina XDR Display',
      '38-core GPU',
      'Up to 22 hours battery life',
      'Three Thunderbolt 4 ports',
      'MagSafe 3 charging'
    ],
    whatsInBox: [
      'MacBook Pro',
      'USB-C to MagSafe 3 Cable (2m)',
      '140W USB-C Power Adapter',
      'Documentation'
    ]
  },
  2: {
    id: 2,
    name: 'iPhone 15 Pro Max',
    category: 'phones',
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2189,
    inStock: true,
    stockCount: 8,
    badge: 'Latest',
    shortDescription: 'The ultimate iPhone experience with titanium design and A17 Pro chip.',
    fullDescription: 'iPhone 15 Pro Max pushes the boundaries of what\'s possible in a smartphone. With its titanium design, A17 Pro chip, and advanced camera system, it\'s built for those who demand the very best.',
    images: [
      '/images/products/iphone1.jpg',
      '/images/products/iphone2.jpg',
      '/images/products/iphone3.jpg',
      '/images/products/samsungS23_1.jpg'
    ],
    specifications: {
      'Processor': 'A17 Pro chip with 6-core CPU',
      'Storage': '256GB',
      'Display': '6.7-inch Super Retina XDR display',
      'Camera': 'Pro camera system with 48MP Main',
      'Video': '4K Dolby Vision recording',
      'Battery': 'Up to 29 hours video playback',
      'Weight': '7.81 ounces (221 grams)',
      'Materials': 'Titanium with textured matte glass back'
    },
    features: [
      'A17 Pro Chip',
      '256GB Storage',
      'Pro Camera System',
      'Titanium Design',
      'Action Button',
      'USB-C Connector',
      'Face ID',
      '5G Capable'
    ],
    whatsInBox: [
      'iPhone 15 Pro Max',
      'USB-C to USB-C Cable',
      'Documentation'
    ]
  }
};

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const product = productData[productId as unknown as keyof typeof productData];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  
  const sectionRef = useRef<HTMLElement>(null);
  const imageGalleryRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Image gallery animation
      gsap.fromTo(
        imageGalleryRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageGalleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Product info animation
      gsap.fromTo(
        productInfoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productInfoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!product) {
    return (
      <div className="py-20 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            href="/store/products"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Flagship':
        return 'bg-purple-600 text-white';
      case 'Latest':
        return 'bg-blue-600 text-white';
      case 'Pro':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/store" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/store/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div ref={imageGalleryRef} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-purple-500 ring-2 ring-purple-500/20' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div ref={productInfoRef} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-xl text-gray-400 mb-6">{product.shortDescription}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'} fill-current`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                  <span className="text-white ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-purple-400">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <span className="text-green-400 font-medium">
                    Save ${product.originalPrice - product.price} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 font-medium">In Stock ({product.stockCount} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-400 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-700 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-white border-x border-gray-700">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                      disabled={quantity >= product.stockCount}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-400">
                    Total: <span className="text-purple-400 font-bold">${(product.price * quantity).toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    if (product.inStock) {
                      for (let i = 0; i < quantity; i++) {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0]
                        });
                      }
                    }
                  }}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    product.inStock
                      ? 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-[1.02]'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                </button>
                
                <button className="w-full py-4 border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-semibold transition-all duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-800 mb-8">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews', 'whats-included'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-900/50 rounded-2xl p-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Product Description</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{product.fullDescription}</p>
                
                <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-800 pb-4">
                      <dt className="text-gray-400 font-medium mb-1">{key}</dt>
                      <dd className="text-white">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Customer Reviews</h3>
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">Reviews feature coming soon!</p>
                  <p className="text-gray-500 mt-2">Be the first to review this product.</p>
                </div>
              </div>
            )}

            {activeTab === 'whats-included' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What's in the Box</h3>
                <div className="space-y-4">
                  {product.whatsInBox.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8">You Might Also Like</h3>
          <div className="text-center py-12 bg-gray-900/30 rounded-2xl">
            <p className="text-gray-400 text-lg">Related products coming soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;