'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const offerItems = [
  {
    image: "/images/images/rogAd.jpg",
    title: "Electronics",
    description: "Power your world with cutting-edge laptops, phones, accessories, and devices that keep you connected.",
    link: "/store/products"
  },
  {
    image: "/images/images/digitals.jpg",
    title: "Digital Software",
    description: "Tools that unlock creativity. Software, apps, and games — instantly downloadable, ready to use.",
    link: "/store/services"
  },
  {
    image: "/images/images/chart4.jpg",
    title: "Professional Services",
    description: "Human talent meets innovation. Hire skilled experts in web design, marketing, tutoring, and repairs.",
    link: "/store/services"
  },
  {
    image: "/images/products/PS5.jpg",
    title: "Gaming & Entertainment",
    description: "Immerse yourself in premium gaming experiences with the latest consoles, games, and entertainment systems.",
    link: "/store/products"
  }
];

const WhatWeOffer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards staggered animation
      const cards = cardsRef.current?.querySelectorAll('.offer-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Power your e-commerce experience with tools designed for growth, creativity, and seamless management.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {offerItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <div
                className="offer-card group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] cursor-pointer h-80"
              >
              {/* Full Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Strong gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300" />
              </div>

              {/* Content positioned at top-left with enhanced text contrast */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 group-hover:bg-black/20 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-100 drop-shadow-md group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Icon positioned at bottom-right */}
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-white drop-shadow-lg transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;