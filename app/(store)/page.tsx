'use client';

import React from 'react';
import HomeIntro from '../../components/shared/intro';
import CardSwap, { Card } from '../../components/shared/CardSwap';
import MagicBento from '../../components/shared/MagicBento';

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 mt-40">
        {/* Slogan and CTA */}


        {/* Hero Section with Intro Sidebar and Slider */}
        <section className="hero-section h-[85vh]">
          <div className="relative flex justify-center items-center gap-2">
            <HomeIntro />
            <div className="w-[600px] ml-16 -mt-16 flex items-center justify-center">
              <CardSwap width={650} height={450} cardDistance={60} verticalDistance={70} delay={6000} pauseOnHover={true} skewAmount={6} easing="elastic" onCardClick={() => {}}>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/PS5.webp" alt="Web Development Services" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">Web Development Services</h3>
                  </div>
                </Card>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/appleAirpods.jpg" alt="Professional Graphic Design" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">Professional Graphic Design</h3>
                  </div>
                </Card>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/appleWatch.jpg" alt="Digital Software Solutions" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">Digital Software Solutions</h3>
                  </div>
                </Card>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/lensAd.jpg" alt="IT Support & Consulting" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">IT Support & Consulting</h3>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </section>

        {/* Magic Bento Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Our Features</h2>
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={false}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
            />
          </div>
        </section>

        {/* Placeholder sections - to be implemented */}
       
      </div>
    </div>
  );
};

export default HomePage;