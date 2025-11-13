'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceCategories = [
  { id: 'all', name: 'All Services', count: 32 },
  { id: 'repair', name: 'Device Repair', count: 12 },
  { id: 'installation', name: 'Installation', count: 8 },
  { id: 'consulting', name: 'Consulting', count: 6 },
  { id: 'maintenance', name: 'Maintenance', count: 4 },
  { id: 'training', name: 'Training', count: 2 }
];

const featuredServices = [
  {
    id: 1,
    name: 'iPhone Screen Repair',
    category: 'repair',
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 856,
    image: '/images/products/iphone1.jpg',
    badge: 'Popular',
    available: true,
    features: ['Genuine Parts', '30-Day Warranty', 'Same Day Service', 'Expert Technicians']
  },
  {
    id: 2,
    name: 'MacBook Data Recovery',
    category: 'repair',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 423,
    image: '/images/products/imac1.jpg',
    badge: 'Specialized',
    available: true,
    features: ['Hardware Diagnostics', 'Data Backup', 'Clean Room', 'Secure Process']
  },
  {
    id: 3,
    name: 'Smart Home Installation',
    category: 'installation',
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviews: 312,
    image: '/images/products/airpods1.jpg',
    badge: 'Complete',
    available: true,
    features: ['Full Setup', 'Device Configuration', 'Testing', 'User Training']
  },
  {
    id: 4,
    name: 'IT Consulting Services',
    category: 'consulting',
    price: 99,
    originalPrice: 129,
    rating: 4.9,
    reviews: 678,
    image: '/images/products/asusRog1.jpg',
    badge: 'Expert',
    available: true,
    features: ['System Analysis', 'Performance Optimization', 'Security Audit', 'Recommendations']
  },
  {
    id: 5,
    name: 'Annual Device Maintenance',
    category: 'maintenance',
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    reviews: 234,
    image: '/images/products/appleWatch1.jpg',
    badge: 'Preventive',
    available: true,
    features: ['Deep Cleaning', 'Software Updates', 'Hardware Check', 'Performance Boost']
  },
  {
    id: 6,
    name: 'Tech Training Workshop',
    category: 'training',
    price: 149,
    originalPrice: 179,
    rating: 4.8,
    reviews: 189,
    image: '/images/products/ipadPro1.jpg',
    badge: 'Educational',
    available: false,
    features: ['Hands-on Learning', 'Certified Instructors', 'Course Materials', 'Certificate']
  },
  {
    id: 7,
    name: 'Gaming PC Optimization',
    category: 'consulting',
    price: 89,
    originalPrice: 119,
    rating: 4.7,
    reviews: 567,
    image: '/images/products/PS5.jpg',
    badge: 'Gaming',
    available: true,
    features: ['FPS Optimization', 'Temperature Control', 'Driver Updates', 'Benchmark Testing']
  },
  {
    id: 8,
    name: 'Camera Lens Cleaning',
    category: 'maintenance',
    price: 49,
    originalPrice: 69,
    rating: 4.5,
    reviews: 145,
    image: '/images/products/canon1.jpg',
    badge: 'Precision',
    available: true,
    features: ['Dust Removal', 'Sensor Cleaning', 'Calibration', 'Quality Check']
  }
];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const filteredServices = featuredServices.filter(service =>
    activeCategory === 'all' || service.category === activeCategory
  );

  const sortedServices = [...filteredServices].sort((a, b) => {
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

  // Animate services when category changes
  useEffect(() => {
    if (typeof window === 'undefined' || !servicesRef.current) return;

    const services = servicesRef.current.querySelectorAll('.service-card');

    gsap.fromTo(
      services,
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
      case 'Popular':
        return 'bg-purple-600 text-white';
      case 'Specialized':
        return 'bg-blue-600 text-white';
      case 'Complete':
        return 'bg-orange-500 text-white';
      case 'Expert':
        return 'bg-red-500 text-white';
      case 'Preventive':
        return 'bg-pink-500 text-white';
      case 'Educational':
        return 'bg-green-500 text-white';
      case 'Gaming':
        return 'bg-teal-500 text-white';
      case 'Precision':
        return 'bg-indigo-500 text-white';
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
            Professional Tech Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Expert repair, installation, and consulting services for all your technology needs. Trusted by thousands of customers.
          </p>
        </div>

        {/* Filters & Controls */}
        <div ref={filtersRef} className="mb-12">
          {/* Category Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Service Categories</h3>
            <div className="flex flex-wrap gap-3">
              {serviceCategories.map((category) => (
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
                Showing {sortedServices.length} of {featuredServices.length} services
              </span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedServices.map((service) => (
            <Link
              key={service.id}
              href={`/store/services/${service.id}`}
              className="service-card group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(service.badge)}`}>
                    {service.badge}
                  </span>
                </div>

                {/* Availability Status */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.available
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {service.available ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-6">
                {/* Service Name */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {service.name}
                </h3>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-400">${service.price}</span>
                    {service.originalPrice > service.price && (
                      <span className="text-sm text-gray-500 line-through">${service.originalPrice}</span>
                    )}
                  </div>
                  {service.originalPrice > service.price && (
                    <span className="text-sm text-green-400">
                      Save ${service.originalPrice - service.price}
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
                      <span className="text-sm font-medium text-white ml-1">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({service.reviews})</span>
                  </div>

                  {/* Book Service Button */}
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      service.available
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!service.available}
                  >
                    {service.available ? 'Book Now' : 'Fully Booked'}
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
            Load More Services
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;