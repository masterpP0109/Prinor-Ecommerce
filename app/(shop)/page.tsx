import React from 'react';
import HomeCategoryList from '../../components/categories';
import HomeSlider from '../../components/slider';

const HomePage = () => {
  return (
    <div className="bg-mint-500 min-h-screen">
      <div className="container mx-auto px-4 mt-40">
        {/* Hero Section with Category Sidebar and Slider */}
        <div className="relative flex">
          <HomeCategoryList />
          <HomeSlider />
        </div>

        {/* Placeholder sections - to be implemented */}
        <div className="mt-8 space-y-8">
          {/* WideCardRow (threeSaleCards) */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Sale Cards Section</h2>
            <p className="text-gray-600">Three sale cards will be displayed here</p>
          </div>

          {/* TodayDealCards */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
            <p className="text-gray-600">Today's deal cards will be displayed here</p>
          </div>

          {/* WideCardRow (twoSaleCards) */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">More Sale Cards</h2>
            <p className="text-gray-600">Two more sale cards will be displayed here</p>
          </div>

          {/* CollectionCards */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Collections</h2>
            <p className="text-gray-600">Collection cards will be displayed here</p>
          </div>

          {/* TopSellingProductsList */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
            <p className="text-gray-600">Top selling products list will be displayed here</p>
          </div>

          {/* LatestBlogPosts */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600">Latest blog posts will be displayed here</p>
          </div>

          {/* CompanyLogoList */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Our Partners</h2>
            <p className="text-gray-600">Company logos will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;