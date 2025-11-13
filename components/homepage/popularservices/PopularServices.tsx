'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ecosystemCategories = [
  {
    id: 'premium-electronics',
    name: 'Premium Electronics',
    services: [
      {
        id: 1,
        title: 'MacBook Pro M3 Max',
        seller: 'Apple Store',
        rating: 4.9,
        reviews: 1247,
        image: '/images/products/imac1.jpg',
        badge: 'Flagship',
        price: '$3,199'
      },
      {
        id: 2,
        title: 'iPhone 15 Pro Max',
        seller: 'Apple Store',
        rating: 4.8,
        reviews: 2189,
        image: '/images/products/iphone1.jpg',
        badge: 'Latest',
        price: '$1,199'
      },
      {
        id: 3,
        title: 'Samsung Galaxy S24 Ultra',
        seller: 'Samsung',
        rating: 4.7,
        reviews: 1856,
        image: '/images/products/samsungS23_1.jpg',
        badge: 'Pro',
        price: '$1,299'
      },
      {
        id: 4,
        title: 'PlayStation 5 Console',
        seller: 'Sony Interactive',
        rating: 4.9,
        reviews: 3456,
        image: '/images/products/PS5.jpg',
        badge: 'Gaming',
        price: '$499'
      }
    ]
  },
  {
    id: 'creative-services',
    name: 'Creative Services',
    services: [
      {
        id: 5,
        title: 'Brand Identity Design',
        seller: 'DesignMasters',
        rating: 4.9,
        reviews: 298,
        image: '/images/images/image1.jpg',
        badge: 'Pro',
        price: 'From $299'
      },
      {
        id: 6,
        title: 'Web Development',
        seller: 'TechCrafters',
        rating: 4.8,
        reviews: 456,
        image: '/images/products/imac2.jpg',
        badge: 'Expert',
        price: 'From $899'
      },
      {
        id: 7,
        title: 'Mobile App Design',
        seller: 'AppStudio',
        rating: 4.9,
        reviews: 234,
        image: '/images/products/iphone2.jpg',
        badge: 'Specialist',
        price: 'From $1,299'
      },
      {
        id: 8,
        title: 'Digital Marketing',
        seller: 'GrowthHackers',
        rating: 4.7,
        reviews: 567,
        image: '/images/images/chart1.jpg',
        badge: 'Growth',
        price: 'From $499'
      }
    ]
  },
  {
    id: 'digital-software',
    name: 'Digital Software',
    services: [
      {
        id: 9,
        title: 'Adobe Creative Suite',
        seller: 'Adobe Systems',
        rating: 4.8,
        reviews: 5234,
        image: '/images/images/digitals.jpg',
        badge: 'Industry Standard',
        price: '$52.99/mo'
      },
      {
        id: 10,
        title: 'Microsoft Office 365',
        seller: 'Microsoft',
        rating: 4.6,
        reviews: 8765,
        image: '/images/images/chart5.jpg',
        badge: 'Business',
        price: '$12.50/mo'
      },
      {
        id: 11,
        title: 'Final Cut Pro',
        seller: 'Apple',
        rating: 4.7,
        reviews: 1234,
        image: '/images/products/imac3.jpg',
        badge: 'Video Editing',
        price: '$299.99'
      },
      {
        id: 12,
        title: 'Sketch App',
        seller: 'Sketch B.V.',
        rating: 4.5,
        reviews: 987,
        image: '/images/images/anavid.jpg',
        badge: 'Design',
        price: '$9/mo'
      }
    ]
  },
  {
    id: 'tech-support',
    name: 'Tech Support & Setup',
    services: [
      {
        id: 13,
        title: 'Device Setup & Migration',
        seller: 'TechExperts',
        rating: 4.9,
        reviews: 1456,
        image: '/images/products/imac4.jpg',
        badge: 'Setup Pro',
        price: 'From $99'
      },
      {
        id: 14,
        title: 'Network Configuration',
        seller: 'NetSolutions',
        rating: 4.8,
        reviews: 789,
        image: '/images/images/chart4.jpg',
        badge: 'Network',
        price: 'From $149'
      },
      {
        id: 15,
        title: 'Software Installation',
        seller: 'InstallPros',
        rating: 4.7,
        reviews: 654,
        image: '/images/images/rogAd.jpg',
        badge: 'Software',
        price: 'From $79'
      },
      {
        id: 16,
        title: 'Data Recovery Service',
        seller: 'DataRescue',
        rating: 4.9,
        reviews: 432,
        image: '/images/products/PS5_2.jpg',
        badge: 'Recovery',
        price: 'From $199'
      }
    ]
  }
];

const DigitalEcosystem = () => {
  const [activeCategory, setActiveCategory] = useState(ecosystemCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const activeServices = ecosystemCategories.find(cat => cat.id === activeCategory)?.services || [];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Tabs animation
      gsap.fromTo(
        tabsRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    if (typeof window === 'undefined' || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.service-card');
    
    gsap.fromTo(
      cards,
      {
        y: 40,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1
      }
    );
  }, [activeCategory]);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Pro':
        return 'bg-purple-600 text-white';
      case 'Top Rated':
        return 'bg-orange-500 text-white';
      case 'Rising Talent':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Digital Ecosystem Hub
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Where premium electronics meet expert services and cutting-edge software
          </p>
        </div>

        {/* Category Tabs */}
        <div ref={tabsRef} className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {ecosystemCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {activeServices.map((service) => (
            <Link
              key={service.id}
              href={activeCategory === 'premium-electronics' || activeCategory === 'digital-software' ? `/store/products/${service.id}` : `/store/services/${service.id}`}
              className="service-card group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Service Info */}
              <div className="p-6">
                {/* Seller Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {service.seller.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{service.seller}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(service.badge)}`}>
                    {service.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-xl font-bold text-purple-400">{service.price}</span>
                </div>

                {/* Rating */}
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

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            Explore {ecosystemCategories.find(cat => cat.id === activeCategory)?.name || 'Digital Ecosystem'}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DigitalEcosystem;