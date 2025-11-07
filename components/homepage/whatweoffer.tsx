import React from 'react';
import ChromaGrid from '../shared/ChromaGrid';

const items = [
  {
    image: "/images/images/collectionSmartphone.jpg",
    title: "Electronics",
    subtitle: "Power your world.\n\nFind laptops, phones, accessories, and devices that keep your world connected.",
    handle: "",
    borderColor: "#8B5CF6",
    gradient: "rgba(26, 26, 26, 0.5)",
    url: "/"
  },
  {
    image: "/images/images/digitals.jpg",
    title: "Digital Software",
    subtitle: "Tools that unlock creativity.\n\nSoftware, apps, and games — instantly downloadable, ready to use.",
    handle: "",
    borderColor: "#7C3AED",
    gradient: "rgba(26, 26, 26, 0.5)",
    url: "/"
  },
  {
    image: "/images/images/efficiency.jpg",
    title: "Professional Services",
    subtitle: "Human talent meets innovation.\n\nHire skilled experts in web design, marketing, tutoring, and repairs.",
    handle: "",
    borderColor: "#A855F7",
    gradient: "rgba(26, 26, 26, 0.5)",
    url: "/"
  }
];

const WhatWeOffer = () => {
  return (
    <section className="py-16 bg-black">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
        <p className="text-gray-400 text-lg">Discover our comprehensive range of products and services</p>
      </div>
      <div style={{ height: '600px', position: 'relative' }}>
        <ChromaGrid
          items={items}
          className="what-we-offer-grid"
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  );
};

export default WhatWeOffer;