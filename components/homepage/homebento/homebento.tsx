import React from 'react';
import MagicBento from '@/components/shared/MagicBento';

const Homebento = () => {
  return (
    <div>
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
    </div>
  );
}

export default Homebento;
