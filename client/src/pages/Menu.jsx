import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaFilter, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import "../components/FloatingImages.css";

function Menu() {
  const [searchParams] = useSearchParams();
  
  // State for menu items, filters
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const categoryFromUrl = searchParams.get("category");
    return categoryFromUrl || "all";
  });

  // Mock data for menu items - in a real app, this would come from an API
  useEffect(() => {
    // Sample menu items
    const sampleMenuItems = [
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

    setMenuItems(sampleMenuItems);
  }, []);

  // Filter menu items based on selected filter, search term, and price range
  const filteredItems = menuItems.filter((item) => {
    const matchesFilter =
      selectedFilter === "all" || item.category === selectedFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesFilter && matchesSearch && matchesPrice;
  });

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // Default: recommended (no specific sort)
    return 0;
  });

  // Set up favorites listener
  useEffect(() => {
    const handleFavoritesUpdate = (event) => {
      setFavorites(event.detail.favorites);
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, []);

  // Toggle favorite status
  const toggleFavorite = (itemId) => {
    try {
      const isCurrentlyFavorite = favorites.includes(itemId);
      const newFavorites = isCurrentlyFavorite 
        ? favorites.filter(id => id !== itemId)
        : [...favorites, itemId];
      
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      
      // Dispatch custom event for other components to update
      const event = new CustomEvent('favoritesUpdated', { 
        detail: { favorites: newFavorites } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  // Add item to cart (uses localStorage)
  const addToCart = (item) => {
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];

      const existingIndex = cart.findIndex((ci) => ci.id === item.id);
      if (existingIndex !== -1) {
        // increment quantity
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      // notify other parts of the app (Header) that cart changed
      window.dispatchEvent(new Event("cartUpdated"));
      // simple user feedback
      // you can replace this with a toast later
      console.log(`${item.name} added to cart`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="min-h-screen relative">
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Explore Our Menu</h1>
        <p className="text-lg mb-6">
          Discover delicious dishes crafted with care
        </p>

        {/* Search bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search for dishes..."
            className="w-full p-4 pr-12 rounded-full bg-white text-gray-800 shadow-lg focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className="absolute right-4 top-4 text-gray-500"
            size={20}
          />
        </div>
      </div>

      {/* Predefined filters and sort options in one line */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        {/* Left side - Predefined filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedFilter === "all"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All Items
          </button>
          <Link to="/category/breakfast">
            <button
              onClick={() => setSelectedFilter("breakfast")}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === "breakfast"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Breakfast
          </button>
          </Link>
          <Link to="/category/lunch">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === "lunch"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Lunch
            </button>
          </Link>
          <Link to="/category/dinner">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === "dinner"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Dinner
          </button>
          </Link>
          <Link to="/category/drinks">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === "drinks"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Beverages
            </button>
          </Link>
          <button
            onClick={() => setSelectedFilter("desserts")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedFilter === "desserts"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Desserts
          </button>
        </div>

        {/* Right side - Filter button and sort dropdown */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>Filters</span>
          </button>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="flex items-center space-x-4 mb-2">
            <span>${priceRange[0]}</span>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-full"
            />
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>${priceRange[0]}</span>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
            <span>${priceRange[1]}</span>
          </div>
        </div>
      )}

      {/* Menu items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
              >
                <FaHeart
                  size={20}
                  color={favorites.includes(item.id) ? "#ef4444" : "#d1d5db"}
                />
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
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
            alt="Empty plate"
            className="w-24 h-24 mx-auto mb-4 opacity-30"
          />
          <h3 className="text-xl font-semibold text-gray-600">
            No items found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Menu;
