'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SlidesData = [
  {
    imgUrl: "/images/images/PS5.webp", // Keep or replace with service image
    url: "/store/services/web-development",
    alt: "web-development",
    msg: {
      title: "Web Development Services",
      buttonText: "Get Started!",
    },
  },
  {
    imgUrl: "/images/images/appleAirpods.jpg", // Keep or replace
    url: "/store/services/graphic-design",
    alt: "graphic-design",
    msg: {
      title: "Professional Graphic Design",
      buttonText: "Explore Services!",
    },
  },
  {
    imgUrl: "/images/images/appleWatch.jpg", // Keep or replace
    url: "/store/digital/software",
    alt: "software",
    msg: {
      title: "Digital Software Solutions",
      buttonText: "Download Now!",
    },
  },
  {
    imgUrl: "/images/images/lensAd.jpg", // Keep or replace
    url: "/store/services/it-support",
    alt: "it-support",
    msg: {
      title: "IT Support & Consulting",
      buttonText: "Contact Us!",
    },
  },
];

const HomeSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % SlidesData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleSliding = (index: number) => {
    setActiveSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // swipe left
      setActiveSlide((prev) => (prev + 1) % SlidesData.length);
    }
    if (touchStart - touchEnd < -50) {
      // swipe right
      setActiveSlide((prev) => (prev - 1 + SlidesData.length) % SlidesData.length);
    }
  };

  return (
    <div
      className="col-span-7 w-full h-[240px] sm:h-[500px] rounded-xl overflow-hidden relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute z-[2] left-7 top-0 bottom-0 flex items-center opacity-0 hover:opacity-100 transition-all duration-500">
        <button
          onClick={() => handleSliding((activeSlide - 1 + SlidesData.length) % SlidesData.length)}
          className="rounded-full size-[50px] border-none cursor-pointer bg-white/25"
        >
          ←
        </button>
      </div>
      <div className="absolute z-[2] right-7 top-0 bottom-0 flex items-center opacity-0 hover:opacity-100 transition-all duration-500">
        <button
          onClick={() => handleSliding((activeSlide + 1) % SlidesData.length)}
          className="rounded-full size-[50px] border-none cursor-pointer bg-white/25"
        >
          →
        </button>
      </div>
      <div className="h-full rounded-xl overflow-hidden relative">
        {SlidesData.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={slide.imgUrl} alt={slide.alt} fill className="object-cover" />
            {slide.msg && (
              <div className="flex flex-col w-full absolute pt-0 sm:pt-[10%] items-center top-10 bottom-0 lg:w-[50%] text-gray-100">
                <h1 className="sm:text-3xl text-lg font-light">{slide.msg.title}</h1>
                <p className="text-gray-200 text-sm mt-2"></p>
                <Link
                  href={slide.url}
                  className="mt-4 px-6 py-2 bg-black/80 hover:bg-gray-100 text-white rounded-md"
                >
                  {slide.msg.buttonText}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex gap-4 sm:gap-6 justify-center">
        {SlidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSliding(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSlide
                ? 'opacity-100 scale-110 bg-white'
                : 'opacity-35 hover:opacity-80 scale-100 bg-white'
            }`}
          />
        ))}
      </div>
      <div
        className="absolute top-0 w-0 h-2 bg-white/30"
        style={{
          animation: activeSlide === 0 ? 'autoSlide 5s linear infinite' : 'none',
        }}
      />
    </div>
  );
};

export default HomeSlider;