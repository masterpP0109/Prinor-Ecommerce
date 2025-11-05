import React from 'react';

const DownloadsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">My Downloads</h1>
        <p className="text-gray-600">View and download your purchased digital products here.</p>

        <div className="mt-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600">Your digital product downloads will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;