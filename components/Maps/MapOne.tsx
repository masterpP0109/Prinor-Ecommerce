"use client";

import React, { useEffect, useState } from "react";

const MapOne = () => {
  const [VectorMapComp, setVectorMapComp] = useState<any>(null);
  const [mapData, setMapData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      import('@react-jvectormap/core'),
      import('@react-jvectormap/unitedstates'),
    ])
      .then(([core, us]) => {
        if (!mounted) return;
        setVectorMapComp(() => core.VectorMap);
        // @react-jvectormap/unitedstates exports named maps; try usAea
        setMapData((us as any).usAea || (us as any).default || null);
      })
      .catch((err) => {
        console.error('Failed to load react-jvectormap:', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!VectorMapComp || !mapData) {
    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
        <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">Regional Data Visualization</h4>
        <div className="h-90 flex items-center justify-center">Loading map…</div>
      </div>
    );
  }

  const VectorMap = VectorMapComp;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">Regional Data Visualization</h4>
      <div id="mapOne" className="mapOne map-btn h-90">
        <VectorMap
          map={mapData}
          backgroundColor="white"
          regionStyle={{
            initial: { fill: "#E5E7EB" },
            hover: { fillOpacity: 1, fill: "#1D4ED8" },
            selected: { fill: "#FBBF24" },
          }}
          onRegionTipShow={function reginalTip(event: any, label: any, code: any) {
            return (label as any).html(`
                  <div style="background-color: #F9FAFB; color: black; padding: 2px 8px"; >
                    ${(label as any).html()}
                  </div>`);
          }}
        />
      </div>
    </div>
  );
};

export default MapOne;