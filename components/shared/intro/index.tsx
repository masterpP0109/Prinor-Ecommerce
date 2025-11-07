'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import CurvedLoop from '../CurvedLoop';

const HomeIntro = () => {
  useEffect(() => {
    gsap.from(".intro-p", { y: 30, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(".intro-btn", { y: 30, opacity: 0, duration: 1, delay: 0.8 });
  }, []);

  return (
    <div className="w-[400px] h-[240px] sm:h-[500px] bg-black/80 backdrop-blur-lg rounded-full flex items-center justify-center p-6">
      <div className="text-left">
        <h1 className="text-white text-4xl font-bold mb-4">
Hardware. Software. Talent. All in One Digital Universe.
        </h1>
        <p className="intro-p text-lg md:text-[17px] w-full text-gray-300 mb-8">
          Discover a universe of cutting-edge electronics, powerful 
          software, and skilled creators all in one seamless ecosystem.
        </p>
        <Link
          href="/store/services"
          className="intro-btn rounded-full inline-block bg-black/50 hover:bg-black/70 text-white font-semibold py-2 px-3 transition-colors duration-200 text-sm shadow-lg shadow-purple-500/50 border border-purple-500/30"
        >
          Explore Our Services
        </Link>
      </div>
    </div>
  );
};

export default HomeIntro;