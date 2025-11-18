'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image?: string;
  };
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentIntent?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

const statusColors = {
  PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  PAID: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PROCESSING: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  SHIPPED: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  DELIVERED: 'bg-green-500/20 text-green-400 border-green-500/30',
  CANCELLED: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusDescriptions = {
  PENDING: 'Order received, awaiting payment',
  PAID: 'Payment confirmed, preparing order',
  PROCESSING: 'Order is being prepared',
  SHIPPED: 'Order has been shipped',
  DELIVERED: 'Order has been delivered',
  CANCELLED: 'Order has been cancelled',
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading orders...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-gray-400 mb-8">You need to be signed in to view your orders.</p>
          <Link
            href="/auth/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">No orders found</div>
            <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
            <Link
              href="/store/products"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Order #{order.id.slice(-8)}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order.status as keyof typeof statusColors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                      {order.status}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">
                      {statusDescriptions[order.status as keyof typeof statusDescriptions] || 'Status unknown'}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 bg-gray-800/30 rounded-lg p-4"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || '/images/default-product.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.product.name}</h3>
                        <p className="text-gray-400 text-sm">
                          Quantity: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <div className="text-white font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-700">
                  <div className="text-gray-400 text-sm mb-4 md:mb-0">
                    {order.paymentIntent && (
                      <p>Payment ID: {order.paymentIntent.slice(-8)}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Total Amount</p>
                    <p className="text-2xl font-bold text-purple-400">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Order Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-white text-sm">Order Placed</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {order.status !== 'PENDING' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-white text-sm">Payment Confirmed</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(order.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                    {(order.status === 'SHIPPED' || order.status === 'DELIVERED') && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div>
                          <p className="text-white text-sm">Order Shipped</p>
                          <p className="text-gray-400 text-xs">In transit</p>
                        </div>
                      </div>
                    )}
                    {order.status === 'DELIVERED' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-white text-sm">Order Delivered</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(order.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}