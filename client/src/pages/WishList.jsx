import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../components/FloatingImages.css";

const sampleMenuItems =  [
      {
        id: 1,
        name: "Avocado Toast",
        description:
          "Fresh avocado on artisanal toast with sea salt and red pepper flakes",
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1588137378633-dea1336ce1e9?auto=format&fit=crop&w=300&h=200",
        category: "breakfast",
        rating: 4.8,
        isVegetarian: true,
        preparationTime: "15 min",
      },
      {
        id: 2,
        name: "Classic Burger",
        description:
          "Angus beef patty with lettuce, tomato, cheese and special sauce",
        price: 15.99,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&h=200",
        category: "lunch",
        rating: 4.5,
        isVegetarian: false,
        preparationTime: "20 min",
      },
      {
        id: 3,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomatoes, and basil on thin crust",
        price: 18.99,
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&h=200",
        category: "dinner",
        rating: 4.7,
        isVegetarian: true,
        preparationTime: "25 min",
      },
      {
        id: 4,
        name: "Caesar Salad",
        description:
          "Crisp romaine, parmesan, croutons with house-made Caesar dressing",
        price: 13.99,
        image:
          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=300&h=200",
        category: "lunch",
        rating: 4.3,
        isVegetarian: false,
        preparationTime: "10 min",
      },
      {
        id: 5,
        name: "Chocolate Lava Cake",
        description:
          "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 9.99,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=300&h=200",
        category: "desserts",
        rating: 4.9,
        isVegetarian: true,
        preparationTime: "15 min",
      },
      {
        id: 6,
        name: "Mango Smoothie",
        description: "Fresh mango blended with yogurt and honey",
        price: 7.99,
        image:
          "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=300&h=200",
        category: "drinks",
        rating: 4.6,
        isVegetarian: true,
        preparationTime: "5 min",
      },
      {
        id: 7,
        name: "Vegetable Curry",
        description:
          "Mixed vegetables in a rich curry sauce, served with basmati rice",
        price: 16.99,
        image:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&h=200",
        category: "dinner",
        rating: 4.4,
        isVegetarian: true,
        preparationTime: "30 min",
      },
      {
        id: 8,
        name: "Eggs Benedict",
        description:
          "Poached eggs and Canadian bacon on English muffin with hollandaise",
        price: 14.99,
        image:
          "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=300&h=200",
        category: "breakfast",
        rating: 4.7,
        isVegetarian: false,
        preparationTime: "20 min",
      },
    ];

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount and on updates
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const favoriteItems = sampleMenuItems.filter(item => favorites.includes(item.id));
        setWishlistItems(favoriteItems);
      } catch (err) {
        setWishlistItems([]);
      }
    };
    loadWishlist();
    const handleFavoritesUpdate = (e) => {
      const favorites = e.detail ? e.detail.favorites : JSON.parse(localStorage.getItem("favorites") || "[]");
      const favoriteItems = sampleMenuItems.filter(item => favorites.includes(item.id));
      setWishlistItems(favoriteItems);
    };
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    window.addEventListener("storage", loadWishlist);
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    try {
      const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const newFavorites = currentFavorites.filter(id => id !== itemId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      const event = new CustomEvent('favoritesUpdated', { detail: { favorites: newFavorites } });
      window.dispatchEvent(event);
    } catch (error) {}
  };

  // Add to cart
  const addToCart = (item) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      let newCart;
      if (existingItem) {
        newCart = currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newCart = [...currentCart, { ...item, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {}
  };
 



  return (
          

     <div className="min-h-screen flex flex-col px-4">
      {/* Background with overlay */}
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

      <div className="container mx-auto py-8 relative z-10">
        <div className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-lg">
        <h2 className="text-3xl font-bold">My Wishlist</h2>
        <Link
          to="/menu"
          className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-200"
        >
          View Menu
        </Link>
      </div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl text-gray-600">Your wishlist is empty</h3>
          <p className="text-gray-500 mt-2">
            Add items to your wishlist by clicking the heart icon on the menu page
          </p>
          <Link
            to="/menu"
            className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-200"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
                >
                  <FaHeart size={20} color="#ef4444" />
                </button>
                {item.isVegetarian && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Vegetarian
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <FaStar className="text-yellow-500 mr-1" size={14} />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2 text-sm h-12 overflow-hidden">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-2">⏱️ {item.preparationTime}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                    <Link
                      to="/cart"
                      className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-200"
                    >
                      <FaShoppingCart />
                      <span>View Cart</span>
                    </Link>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-200"
                  >
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default WishList;