'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock service data - in real app, this would come from API/database
const serviceData = {
  1: {
    id: 1,
    title: 'Custom E-commerce Website',
    category: 'web-development',
    provider: 'TechCraft Studios',
    rating: 4.9,
    reviews: 247,
    price: 2499,
    deliveryTime: '14 days',
    shortDescription: 'Complete e-commerce solution with payment integration and admin panel.',
    fullDescription: 'Get a fully functional e-commerce website built with modern technologies. Includes responsive design, payment gateway integration, admin dashboard, inventory management, and SEO optimization. Perfect for startups and growing businesses.',
    images: [
      '/images/products/imac1.jpg',
      '/images/products/imac2.jpg',
      '/images/products/imac3.jpg'
    ],
    skills: ['React', 'Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    packages: [
      {
        name: 'Basic',
        price: 1499,
        features: ['Responsive Design', 'Basic Payment Integration', 'Contact Form', 'Mobile Optimization'],
        deliveryTime: '10 days'
      },
      {
        name: 'Standard',
        price: 2499,
        features: ['Everything in Basic', 'Admin Dashboard', 'Product Management', 'SEO Optimization', 'Analytics Integration'],
        deliveryTime: '14 days',
        popular: true
      },
      {
        name: 'Premium',
        price: 3999,
        features: ['Everything in Standard', 'Custom Features', 'Advanced Analytics', 'Multi-language Support', 'Priority Support'],
        deliveryTime: '21 days'
      }
    ],
    whatsIncluded: [
      'Custom website design and development',
      'Responsive mobile optimization',
      'Payment gateway integration',
      'Admin dashboard for content management',
      'SEO optimization',
      'Performance optimization',
      'Cross-browser compatibility',
      '6 months free maintenance'
    ],
    requirements: [
      'Detailed project brief and requirements',
      'Brand guidelines and assets',
      'Content for website (text, images, etc.)',
      'Access to necessary accounts (domain, hosting, etc.)'
    ]
  },
  2: {
    id: 2,
    title: 'iOS & Android App Development',
    category: 'mobile-apps',
    provider: 'AppMasters',
    rating: 4.8,
    reviews: 189,
    price: 4999,
    deliveryTime: '30 days',
    shortDescription: 'Cross-platform mobile app with native performance and seamless UX.',
    fullDescription: 'Professional mobile app development for iOS and Android platforms. Using React Native for cross-platform compatibility with native performance. Includes UI/UX design, backend integration, and app store deployment.',
    images: [
      '/images/products/iphone1.jpg',
      '/images/products/iphone2.jpg',
      '/images/products/iphone3.jpg'
    ],
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Node.js'],
    packages: [
      {
        name: 'MVP',
        price: 2999,
        features: ['Basic App Structure', 'Core Features', 'Simple UI', 'Basic Backend'],
        deliveryTime: '21 days'
      },
      {
        name: 'Standard',
        price: 4999,
        features: ['Everything in MVP', 'Advanced UI/UX', 'Complex Features', 'Full Backend', 'App Store Deployment'],
        deliveryTime: '30 days',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 8999,
        features: ['Everything in Standard', 'Custom Integrations', 'Advanced Analytics', 'White-label Solution', 'Ongoing Support'],
        deliveryTime: '45 days'
      }
    ],
    whatsIncluded: [
      'iOS and Android app development',
      'UI/UX design and prototyping',
      'Backend API development',
      'Database design and setup',
      'App store submission assistance',
      '3 months free bug fixes',
      'User documentation'
    ],
    requirements: [
      'Detailed app requirements and features',
      'Design preferences and brand guidelines',
      'User flow and wireframes (if available)',
      'Access to necessary APIs or services'
    ]
  }
};

const ServiceDetailPage = () => {
  const params = useParams();
  const serviceId = params.id as string;
  const service = serviceData[serviceId as unknown as keyof typeof serviceData];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(1); // Index of selected package
  const [activeTab, setActiveTab] = useState('overview');

  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!service) {
    return (
      <div className="py-20 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            href="/store/services"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const selectedPackageData = service.packages[selectedPackage];

  return (
    <section ref={sectionRef} className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/store" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/store/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div ref={heroRef} className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
                <Image
                  src={service.images[selectedImage]}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-purple-500 ring-2 ring-purple-500/20'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${service.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">{service.title}</h1>
                <p className="text-xl text-gray-400 mb-6">{service.shortDescription}</p>

                {/* Provider Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {service.provider.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{service.provider}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-600'} fill-current`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                          <span className="text-white text-sm ml-1">{service.rating}</span>
                        </div>
                        <span className="text-gray-400 text-sm">({service.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center space-x-2 mb-6">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  <span className="text-gray-400">{service.deliveryTime} delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Choose Your Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.packages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => setSelectedPackage(index)}
                className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                  selectedPackage === index
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-1">${pkg.price}</div>
                  <div className="text-gray-400 text-sm">{pkg.deliveryTime}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedPackage === index
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {selectedPackage === index ? 'Selected' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details Tabs */}
        <div ref={contentRef} className="mb-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-800 mb-8">
            <nav className="flex space-x-8">
              {['overview', 'whats-included', 'requirements'].map((tab) => (
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
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Service Overview</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{service.fullDescription}</p>

                <h4 className="text-xl font-semibold text-white mb-4">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-500/20">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Selected Package: {selectedPackageData.name}</h4>
                  <p className="text-purple-300 mb-4">${selectedPackageData.price} • {selectedPackageData.deliveryTime}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPackageData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whats-included' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.whatsIncluded.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Requirements</h3>
                <div className="space-y-4">
                  {service.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">{requirement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-orange-900/20 border border-orange-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Need Help Getting Started?</h4>
                  <p className="text-gray-300 mb-4">
                    Not sure what you need? I can help you define your requirements and create a custom proposal.
                  </p>
                  <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-300">
                    Get Free Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-12 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Book this service now and get your project started with a professional expert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25">
              Book Now - ${selectedPackageData.price}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-full font-semibold transition-all duration-300">
              Contact Provider
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailPage;