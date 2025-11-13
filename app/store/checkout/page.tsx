'use client';

import React from 'react';


import Link from "next/link";

// Mock cart data
const mockCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/images/products/headphones.jpg",
    color: "Black",
    size: "M",
    price: 99.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/images/products/smartwatch.jpg",
    color: "Silver",
    size: "L",
    price: 149.99,
    quantity: 2,
  },
];

const CheckoutPage = () => {
  const [cart, setCart] = React.useState(mockCart);
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [payment, setPayment] = React.useState({
    name: "",
    card: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping: number = 0;
  const total = subtotal + shipping;

  const updateQuantity = (id: number, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
  <div className="min-h-screen flex items-center justify-center text-white py-8 px-2 bg-gradient-to-br from-[#0b0b0f] via-[#010103] to-[#18132a]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Cart */}
  <section className="rounded-2xl shadow-lg p-8 flex flex-col bg-gradient-to-br from-[#0b0b0f] via-[#18132a] to-black/95 border border-gray-900/70">
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-bold mb-1">Shopping Cart.</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="font-bold tracking-widest">#DAILY.</span>
              <input
                className="ml-2 flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none"
                placeholder="Search products..."
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-semibold">Product</th>
                  <th className="py-2 text-left font-semibold">Size</th>
                  <th className="py-2 text-center font-semibold">Qty</th>
                  <th className="py-2 text-right font-semibold">Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3 flex items-center gap-3 min-w-[180px]">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border" />
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.color}</div>
                      </div>
                    </td>
                    <td className="py-3">
                      <select
                        className="border border-gray-200 rounded px-2 py-1 text-xs"
                        value={item.size}
                        onChange={() => {}}
                        disabled
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="10.5">10.5</option>
                      </select>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="w-6 h-6 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="w-6 h-6 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Summary */}
          <div className="mt-auto pt-6 border-t">
            <div className="flex justify-between text-base mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base mb-2">
              <span>Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/store" className="text-blue-600 hover:underline text-sm flex items-center">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </section>
        {/* Right: Payment */}
        <section className="bg-gradient-to-br from-[#0b0b0f] via-[#18132a] to-[#10101a] rounded-2xl shadow-lg p-8 flex flex-col text-white">
          <h2 className="text-2xl font-serif font-bold mb-6">Payment Info.</h2>
          {/* Payment Method Selector */}
          <div className="flex gap-4 mb-6">
            <button
              className={`flex-1 py-2 rounded-lg border-2 transition-all font-medium ${
                paymentMethod === "card"
                  ? "border-blue-500 bg-blue-900/30"
                  : "border-gray-700 bg-transparent hover:bg-gray-900/30"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              Credit Card
            </button>
            <button
              className={`flex-1 py-2 rounded-lg border-2 transition-all font-medium ${
                paymentMethod === "paypal"
                  ? "border-blue-500 bg-blue-900/30"
                  : "border-gray-700 bg-transparent hover:bg-gray-900/30"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              PayPal
            </button>
          </div>
          {/* Payment Form */}
          <form className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name on Card</label>
                <input
                  className="w-full rounded border border-gray-700 bg-black/40 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                  value={payment.name}
                  onChange={e => setPayment({ ...payment, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  className="w-full rounded border border-gray-700 bg-black/40 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="•••• 3271"
                  value={payment.card}
                  onChange={e => setPayment({ ...payment, card: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Expiration</label>
                  <div className="flex gap-2">
                    <input
                      className="w-1/2 rounded border border-gray-700 bg-black/40 px-3 py-2 text-white focus:outline-none"
                      placeholder="MM"
                      value={payment.expMonth}
                      onChange={e => setPayment({ ...payment, expMonth: e.target.value })}
                      required
                    />
                    <input
                      className="w-1/2 rounded border border-gray-700 bg-black/40 px-3 py-2 text-white focus:outline-none"
                      placeholder="YY"
                      value={payment.expYear}
                      onChange={e => setPayment({ ...payment, expYear: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    className="w-full rounded border border-gray-700 bg-black/40 px-3 py-2 text-white focus:outline-none"
                    placeholder="123"
                    value={payment.cvv}
                    onChange={e => setPayment({ ...payment, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Summary & Action */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg shadow-lg transition-all"
              >
                Check Out
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;