import React from 'react';
import CardSwap, { Card} from '@/components/shared/CardSwap';

const HomeCardSwap = () => {
  return (
    <div className="flex justify-center items-center py-8  ">
      <div className="w-[600px] flex items-center justify-center">
              <CardSwap width={650} height={450} cardDistance={60} verticalDistance={91} delay={6000} pauseOnHover={true} skewAmount={6} easing="smooth" onCardClick={() => {}}>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/anavid.jpg" alt="Web Development Services" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">Web Development Services</h3>
                  </div>
                </Card>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/image1.jpg" alt="Professional Graphic Design" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">Professional Graphic Design</h3>
                  </div>
                </Card>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/digitals.jpg" alt="Digital Software Solutions" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">Digital Software Solutions</h3>
                  </div>
                </Card>
                <Card customClass="rounded-xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img src="/images/images/rogAd.jpg" alt="IT Support & Consulting" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <h3 className="text-white text-2xl font-bold text-center">IT Support & Consulting</h3>
                  </div>
                </Card>
              </CardSwap>
            </div>
    </div>
  );
}

export default HomeCardSwap;

