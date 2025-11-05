import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTimes, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../components/FloatingImages.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const menuItems = [
    { name: "Browse Menu", path: "/menu" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(savedCart);
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCartItems([]);
      }
    };

    // Load initially
    loadCart();

    // Listen for cart updates from other components/tabs
    const handleStorageChange = (e) => {
      if (e.key === "cart" || e.type === "cartUpdated") {
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  // Save cart to localStorage and notify other components
  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase item quantity
  const increaseQuantity = (id) => {
    const newCart = cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(newCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    const newCart = cartItems.map(item => 
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(newCart);
  };

  // Remove item from cart
  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    updateCart(newCart);
  };

  // Clear entire cart
  const clearCart = () => {
    updateCart([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.08;
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee;

  return (
     
    




    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaShoppingCart className="mr-3 text-orange-500" /> My Cart
      </h2>
      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Cart Items ({cartItems.length})</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <span className="font-bold text-gray-800">
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center"
                          >
                            <FaTimes className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <Link to="/menu" className="text-orange-500 hover:text-orange-700 flex items-center">
                  <FaAngleLeft className="mr-1" /> Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTimes className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 sticky top-4">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Order Summary</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-4"
                />
                <button className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-lg p-8 text-center relative z-10">
          <div className="bg-green-50/90 p-4 inline-block rounded-full mb-4">
            <FaShoppingCart className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-500 mb-4">Add some delicious items to your cart and order now!</p>
          <Link to="/menu" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Browse Menu
          </Link>
        </div>
      )}
    </div>
    
  );
};

const CartWrapper = () => {
  return (
    <div className="min-h-screen">
      {/* Background with floating food emojis */}
      <div className="fixed inset-0 z-0 auth-background overflow-hidden">
        <div className="absolute inset-0">
          <span className="floating-element" style={{ top: '15%', left: '15%', fontSize: '7rem', animationDelay: '0s' }}>🍕</span>
          <span className="floating-element" style={{ top: '75%', left: '20%', fontSize: '6.5rem', animationDelay: '1.5s' }}>🍔</span>
          <span className="floating-element" style={{ top: '35%', right: '20%', fontSize: '7rem', animationDelay: '2.5s' }}>🍜</span>
          <span className="floating-element" style={{ top: '65%', right: '15%', fontSize: '6.5rem', animationDelay: '3.5s' }}>🍱</span>
          <span className="floating-element" style={{ top: '25%', left: '45%', fontSize: '7rem', animationDelay: '4s' }}>🥗</span>
          <span className="floating-element" style={{ bottom: '25%', right: '25%', fontSize: '7rem', animationDelay: '5s' }}>🍲</span>
          <span className="floating-element" style={{ top: '45%', left: '10%', fontSize: '6.5rem', animationDelay: '2s' }}>🌮</span>
          <span className="floating-element" style={{ top: '85%', right: '35%', fontSize: '7rem', animationDelay: '3s' }}>🥪</span>
          <span className="floating-element" style={{ top: '10%', right: '30%', fontSize: '6.5rem', animationDelay: '4.5s' }}>🍣</span>
          <span className="floating-element" style={{ top: '50%', right: '40%', fontSize: '7rem', animationDelay: '1s' }}>🥘</span>
          <span className="floating-element" style={{ top: '30%', left: '30%', fontSize: '6.5rem', animationDelay: '2.8s' }}>🍝</span>
          <span className="floating-element" style={{ bottom: '15%', left: '40%', fontSize: '7rem', animationDelay: '3.2s' }}>🥐</span>
          <span className="floating-element" style={{ top: '5%', left: '35%', fontSize: '6.5rem', animationDelay: '4.2s' }}>🍦</span>
          <span className="floating-element" style={{ bottom: '35%', right: '10%', fontSize: '6.5rem', animationDelay: '5.5s' }}>🍰</span>
        </div>
      </div>
      
      {/* Cart Component */}
      <div className="relative z-10">
        <Cart />
      </div>
    </div>
  );
};

export default CartWrapper;