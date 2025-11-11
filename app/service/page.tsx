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
  { id: 'web-development', name: 'Web Development', count: 12 },
  { id: 'mobile-apps', name: 'Mobile Apps', count: 8 },
  { id: 'digital-marketing', name: 'Digital Marketing', count: 6 },
  { id: 'design', name: 'Design & Branding', count: 10 },
  { id: 'tech-support', name: 'Tech Support', count: 8 }
];

const featuredServices = [
  {
    id: 1,
    title: 'Custom E-commerce Website',
    category: 'web-development',
    provider: 'TechCraft Studios',
    rating: 4.9,
    reviews: 247,
    price: 2499,
    deliveryTime: '14 days',
    image: '/images/products/imac1.jpg',
    badge: 'Pro',
    featured: true,
    skills: ['React', 'Next.js', 'Stripe', 'MongoDB'],
    description: 'Complete e-commerce solution with payment integration, admin panel, and mobile optimization.'
  },
  {
    id: 2,
    title: 'iOS & Android App Development',
    category: 'mobile-apps',
    provider: 'AppMasters',
    rating: 4.8,
    reviews: 189,
    price: 4999,
    deliveryTime: '30 days',
    image: '/images/products/iphone1.jpg',
    badge: 'Expert',
    featured: true,
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    description: 'Cross-platform mobile app with native performance and seamless user experience.'
  },
  {
    id: 3,
    title: 'Brand Identity & Logo Design',
    category: 'design',
    provider: 'CreativeMinds',
    rating: 4.9,
    reviews: 456,
    price: 899,
    deliveryTime: '7 days',
    image: '/images/images/image1.jpg',
    badge: 'Top Rated',
    featured: true,
    skills: ['Adobe Creative Suite', 'Figma', 'Brand Strategy', 'Typography'],
    description: 'Complete brand identity package including logo, color palette, and brand guidelines.'
  },
  {
    id: 4,
    title: 'SEO & Digital Marketing Campaign',
    category: 'digital-marketing',
    provider: 'GrowthHackers',
    rating: 4.7,
    reviews: 324,
    price: 1299,
    deliveryTime: '21 days',
    image: '/images/images/chart1.jpg',
    badge: 'Growth',
    featured: true,
    skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
    description: 'Comprehensive digital marketing strategy to boost your online presence and sales.'
  },
  {
    id: 5,
    title: 'Device Setup & Data Migration',
    category: 'tech-support',
    provider: 'TechSupport Pro',
    rating: 4.8,
    reviews: 567,
    price: 199,
    deliveryTime: '2 days',
    image: '/images/products/imac2.jpg',
    badge: 'Quick',
    featured: false,
    skills: ['Hardware Setup', 'Data Transfer', 'Software Installation', 'Training'],
    description: 'Professional device setup and seamless data migration from your old devices.'
  },
  {
    id: 6,
    title: 'UI/UX Design for Web & Mobile',
    category: 'design',
    provider: 'DesignStudio',
    rating: 4.9,
    reviews: 298,
    price: 1799,
    deliveryTime: '10 days',
    image: '/images/products/ipadPro1.jpg',
    badge: 'Creative',
    featured: true,
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    description: 'Modern, user-centered design that converts visitors into customers.'
  },
  {
    id: 7,
    title: 'WordPress Website Development',
    category: 'web-development',
    provider: 'WebCrafters',
    rating: 4.6,
    reviews: 178,
    price: 1299,
    deliveryTime: '10 days',
    image: '/images/products/imac3.jpg',
    badge: 'Popular',
    featured: false,
    skills: ['WordPress', 'PHP', 'MySQL', 'WooCommerce'],
    description: 'Custom WordPress website with responsive design and content management system.'
  },
  {
    id: 8,
    title: 'Social Media Management',
    category: 'digital-marketing',
    provider: 'SocialGurus',
    rating: 4.5,
    reviews: 234,
    price: 799,
    deliveryTime: '30 days',
    image: '/images/images/chart5.jpg',
    badge: 'Monthly',
    featured: false,
    skills: ['Content Creation', 'Instagram', 'Facebook', 'LinkedIn'],
    description: 'Complete social media management with content creation and engagement strategies.'
  }
];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
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
      case 'delivery':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'featured':
        return b.featured ? 1 : -1;
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
      case 'Pro':
        return 'bg-purple-600 text-white';
      case 'Expert':
        return 'bg-blue-600 text-white';
      case 'Top Rated':
        return 'bg-orange-500 text-white';
      case 'Growth':
        return 'bg-green-500 text-white';
      case 'Quick':
        return 'bg-red-500 text-white';
      case 'Creative':
        return 'bg-pink-500 text-white';
      case 'Popular':
        return 'bg-indigo-500 text-white';
      case 'Monthly':
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
            Professional Digital Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Connect with expert freelancers and agencies. From web development to digital marketing, find the perfect talent for your project.
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
                <option value="delivery">Fastest Delivery</option>
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
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="service-card group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(service.badge)}`}>
                    {service.badge}
                  </span>
                </div>

                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="p-6">
                {/* Provider Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {service.provider.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{service.provider}</span>
                  </div>
                  <span className="text-sm text-purple-400 font-medium">{service.deliveryTime}</span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded border border-purple-500/20">
                        {skill}
                      </span>
                    ))}
                    {service.skills.length > 3 && (
                      <span className="text-xs text-gray-400">+{service.skills.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Price & Rating */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-purple-400">
                      ${service.price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-sm font-medium text-white ml-1">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({service.reviews})</span>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="mt-4">
                  <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300">
                    Contact Provider
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
            Browse All Services
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-12 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Post your project and get custom proposals from our expert community.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Post Your Project
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;