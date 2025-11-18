'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from "next/link";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

const CheckoutPage = () => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = React.useState("card");
  const [payment, setPayment] = React.useState({
    name: "",
    card: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (status === 'authenticated') {
      fetchCart();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping: number = 0;
  const total = subtotal + shipping;

  const updateQuantity = async (itemId: string, qty: number) => {
    if (qty < 1) return;

    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity: qty }),
      });

      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handlePayment = async () => {
    if (status !== 'authenticated') {
      alert('Please sign in to complete your order');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    try {
      // Create payment intent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { paymentIntentId } = await response.json();

      // Simulate payment success (in real implementation, this would be handled by Stripe)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Trigger webhook to create order
      await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: paymentIntentId,
              metadata: { userId: (session.user as any).id }
            }
          }
        }),
      });

      setOrderPlaced(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading checkout...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-gray-400 mb-8">You need to be signed in to checkout.</p>
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add some items to your cart before checking out.</p>
          <Link
            href="/store/products"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

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
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      Loading cart...
                    </td>
                  </tr>
                ) : cartItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      Your cart is empty
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3 flex items-center gap-3 min-w-[180px]">
                        <img
                          src={item.product.image || '/images/default-product.jpg'}
                          alt={item.product.name}
                          className="w-12 h-12 rounded object-cover border"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{item.product.name}</div>
                          <div className="text-xs text-gray-400">${item.product.price}</div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-600">-</span>
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
                        ${(item.product.price * item.quantity).toFixed(2)}
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
                  ))
                )}
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