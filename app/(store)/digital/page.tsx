import React from 'react';

const DigitalPage = () => {
  return (
    <div className="bg-mint-500 min-h-screen">
      <div className="container mx-auto px-4 mt-40">
        <div className="bg-white rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-4">Digital Products</h1>
          <p className="text-gray-600">Browse our collection of digital products including software, games, and digital downloads.</p>

          {/* Placeholder sections */}
          <div className="mt-8 space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Software & Applications</h2>
              <p className="text-gray-600">Digital software and applications will be displayed here</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Games & Entertainment</h2>
              <p className="text-gray-600">Digital games and entertainment content will be displayed here</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">E-books & Courses</h2>
              <p className="text-gray-600">Digital books and online courses will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPage;