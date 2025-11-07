"use client";

import React from "react";
import HomeIntro from "../../components/shared/intro";
import HomeCardSwap from "@/components/homepage/cardswap/cardSwap";
import Homebento from "@/components/homepage/homebento/homebento";
import WhatWeOffer from "@/components/homepage/whatweoffer";

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 mt-40">
        <section className="hero-section h-[85vh]">
          <div className="relative flex justify-center items-center gap-2">
            <HomeIntro />
            <HomeCardSwap />
          </div>
        </section>

        <WhatWeOffer />

        <section className="py-16 bg-black">
          <Homebento />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
