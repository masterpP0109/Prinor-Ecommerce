import React from 'react';

const ServicesPage = () => {
  return (
    <div className="bg-mint-500 min-h-screen">
      <div className="container mx-auto px-4 mt-40">
        <div className="bg-white rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-4">Services</h1>
          <p className="text-gray-600">Find professional services including web design, marketing, repairs, and tutoring.</p>

          {/* Placeholder sections */}
          <div className="mt-8 space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Web Design & Development</h2>
              <p className="text-gray-600">Professional web design and development services will be displayed here</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Marketing & Advertising</h2>
              <p className="text-gray-600">Digital marketing and advertising services will be displayed here</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Repairs & Maintenance</h2>
              <p className="text-gray-600">Device repair and maintenance services will be displayed here</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Tutoring & Education</h2>
              <p className="text-gray-600">Educational and tutoring services will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;