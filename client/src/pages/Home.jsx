import React, { useState, useEffect, useRef } from "react";
import Signup from "../pages/Signup";
import {
  FaSearch,
  FaArrowRight,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaUtensils,
  FaHeart,
  FaPizzaSlice,
  FaHamburger,
  FaGlobeAmericas,
} from "react-icons/fa";
import { GiNoodles, GiTacos, GiChopsticks } from "react-icons/gi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [location, setLocation] = useState("");

  // Food type categories
  const popularCategories = [
    {
      id: 1,
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&h=350",
    },
    {
      id: 2,
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&h=350",
    },
    {
      id: 3,
      name: "Sushi",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&h=350",
    },
    {
      id: 4,
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&h=350",
    },
  ];

  // Cuisine categories
  const cuisineCategories = [
    {
      id: 1,
      name: "Indian",
      icon: <GiNoodles className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&h=350",
      color: "bg-red-500",
    },
    {
      id: 2,
      name: "Italian",
      icon: <FaPizzaSlice className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1534649644687-3e1818fc7d4a?auto=format&fit=crop&w=600&h=350",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      name: "American",
      icon: <FaHamburger className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&h=350",
      color: "bg-orange-500",
    },
    {
      id: 4,
      name: "Mexican",
      icon: <GiTacos className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1564767612954-6d587cf82f2f?auto=format&fit=crop&w=600&h=350",
      color: "bg-red-600",
    },
    {
      id: 5,
      name: "Chinese",
      icon: <GiChopsticks className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&h=350",
      color: "bg-yellow-600",
    },
    {
      id: 6,
      name: "Thai",
      icon: <FaGlobeAmericas className="text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&h=350",
      color: "bg-orange-600",
    },
  ];

  const popularMenuItems = [
    {
      id: 1,
      name: "Classic Margherita Pizza",
      image:
        "https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&w=600&h=350",
      price: "$12.99",
      rating: 4.8,
      category: "Pizza",
      prepTime: "15-20 min",
      description:
        "Fresh mozzarella, tomato sauce, and basil on our signature crust",
    },
    {
      id: 2,
      name: "Gourmet Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&h=350",
      price: "$14.99",
      rating: 4.9,
      category: "Main Course",
      prepTime: "20-25 min",
      description:
        "Angus beef patty with caramelized onions, arugula and special sauce",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      image:
        "https://images.unsplash.com/photo-1617191519102-471e06f6c1be?auto=format&fit=crop&w=600&h=350",
      price: "$7.99",
      rating: 4.7,
      category: "Dessert",
      prepTime: "15 min",
      description:
        "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
    },
  ];

  const chefSpecials = [
    {
      id: 1,
      name: "Grilled Salmon",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&h=350",
      price: "$22.99",
      description:
        "Fresh Atlantic salmon with lemon herb butter and seasonal vegetables",
    },
    {
      id: 2,
      name: "Truffle Risotto",
      image:
        "https://images.unsplash.com/photo-1626196340064-0df136c9d1b0?auto=format&fit=crop&w=600&h=350",
      price: "$18.99",
      description: "Creamy Arborio rice with wild mushrooms and truffle oil",
    },
  ];

  const specialOffers = [
    {
      id: 1,
      title: "50% OFF",
      description: "Get half price on your first order",
      code: "WELCOME50",
      backgroundColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      id: 2,
      title: "FREE DELIVERY",
      description: "On orders above $25",
      code: "FREEDEL",
      backgroundColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      id: 3,
      title: "20% OFF",
      description: "On weekend orders",
      code: "WEEKEND20",
      backgroundColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[80vh] md:min-h-[100vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1920&h=1080&q=80')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <motion.div
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col justify-center items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block bg-amber-500 text-black px-6 py-2 rounded-full text-sm font-bold mb-8 mx-auto"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
          >
            Free delivery on orders over $25!
          </motion.span>

          <motion.div className="mb-10 max-w-5xl" variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="text-amber-400">Delicious meals</span>
              <span className="text-white"> delivered</span>
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              to your doorstep
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-white mb-12 max-w-2xl mx-auto opacity-90"
            variants={fadeInUp}
          >
            Order from your favorite restaurants with just a few taps and enjoy
            fresh, hot food in minutes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 flex items-center justify-center shadow-lg text-lg"
              >
                View Menu <FaArrowRight className="ml-3" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/order-online"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-10 rounded-full transition duration-300 flex items-center justify-center shadow-lg text-lg"
              >
                Order Online <FaUtensils className="ml-3" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How to Order
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                <FaUtensils className="text-yellow-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Our Menu</h3>
              <p className="text-gray-600">
                Explore our wide variety of delicious dishes crafted by our
                expert chefs
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                <svg
                  className="text-orange-500 w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
              <p className="text-gray-600">
                Select your favorite dishes and customize them to your liking
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300">
                <FaClock className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We'll prepare your order fresh and deliver it to your doorstep
                promptly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-yellow-300">
        <div className="px-4 sm:px-6 mb-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Popular Categories
            </h2>
            <Link
              to="/categories"
              className="text-orange-500 hover:text-orange-600 flex items-center font-medium"
            >
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="w-full">
          <AutoScrollCategories categories={popularCategories} />
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Menu Categories
            </h2>
            <Link
              to="/menu"
              className="text-orange-500 hover:text-orange-600 flex items-center font-medium"
            >
              Full Menu <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {/* Menu Category Icons */}
          <div className="flex flex-wrap justify-center mb-10 gap-8">
            <Link
              to="/menu/appetizers"
              className="group flex flex-col items-center"
            >
              <div className="bg-yellow-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 transform group-hover:scale-110">
                <FaUtensils className="text-2xl" />
              </div>
              <span className="mt-2 font-medium text-gray-800">Appetizers</span>
            </Link>

            <Link
              to="/menu/main-course"
              className="group flex flex-col items-center"
            >
              <div className="bg-red-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 transform group-hover:scale-110">
                <FaPizzaSlice className="text-2xl" />
              </div>
              <span className="mt-2 font-medium text-gray-800">
                Main Course
              </span>
            </Link>

            <Link to="/menu/sides" className="group flex flex-col items-center">
              <div className="bg-orange-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 transform group-hover:scale-110">
                <FaHamburger className="text-2xl" />
              </div>
              <span className="mt-2 font-medium text-gray-800">Sides</span>
            </Link>

            <Link
              to="/menu/desserts"
              className="group flex flex-col items-center"
            >
              <div className="bg-yellow-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 transform group-hover:scale-110">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6c0 1.887.959 3.53 2.41 4.51.909.608 1.59 1.535 1.59 2.64V16h4v-0.85c0-1.105.682-2.032 1.59-2.64A5.978 5.978 0 0016 8a6 6 0 00-6-6zm0 2a4 4 0 110 8 4 4 0 010-8z" />
                </svg>
              </div>
              <span className="mt-2 font-medium text-gray-800">Desserts</span>
            </Link>

            <Link
              to="/menu/drinks"
              className="group flex flex-col items-center"
            >
              <div className="bg-red-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 transform group-hover:scale-110">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm16 8v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8h14z" />
                </svg>
              </div>
              <span className="mt-2 font-medium text-gray-800">Drinks</span>
            </Link>
          </div>

          {/* Featured Menu Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/menu/appetizers"
              className="group relative rounded-xl overflow-hidden shadow-md h-60"
            >
              <img
                src="https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=600&h=350"
                alt="Appetizers"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">Appetizers</h3>
                <p className="text-white text-sm mt-2 opacity-90">
                  Start your meal with our delicious starters
                </p>
              </div>
            </Link>

            <Link
              to="/menu/main-course"
              className="group relative rounded-xl overflow-hidden shadow-md h-60"
            >
              <img
                src="https://images.unsplash.com/photo-1604908177453-7462950a6a3b?auto=format&fit=crop&w=600&h=350"
                alt="Main Course"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">Main Course</h3>
                <p className="text-white text-sm mt-2 opacity-90">
                  Signature dishes crafted by our expert chefs
                </p>
              </div>
            </Link>

            <Link
              to="/menu/desserts"
              className="group relative rounded-xl overflow-hidden shadow-md h-60"
            >
              <img
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&h=350"
                alt="Desserts"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">Desserts</h3>
                <p className="text-white text-sm mt-2 opacity-90">
                  Sweet treats to complete your dining experience
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <div
                key={offer.id}
                className={`rounded-xl ${offer.backgroundColor} p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1`}
              >
                <h3 className={`text-2xl font-bold ${offer.textColor} mb-2`}>
                  {offer.title}
                </h3>
                <p className="text-gray-700 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono bg-white px-3 py-1 rounded-md border border-gray-200 text-gray-700 font-medium">
                    {offer.code}
                  </span>
                  <button
                    className={`${offer.textColor} font-medium flex items-center`}
                  >
                    Apply Code <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Menu Items */}
      <section className="py-16 bg-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Popular Menu Items
            </h2>
            <Link
              to="/menu"
              className="text-orange-500 hover:text-orange-600 flex items-center font-medium"
            >
              Full Menu <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularMenuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded-lg">
                    {item.category}
                  </span>
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100">
                    <FaHeart className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="font-semibold text-gray-700">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      <FaClock className="inline mr-1" /> {item.prepTime}
                    </span>
                    <span className="text-orange-600 font-bold text-lg">
                      {item.price}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition duration-300">
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Specials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Chef's Specials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chefSpecials.map((special) => (
              <div
                key={special.id}
                className="flex flex-col md:flex-row bg-yellow-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="md:w-2/5">
                  <img
                    src={special.image}
                    alt={special.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {special.name}
                      </h3>
                      <span className="text-red-600 font-bold text-xl">
                        {special.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{special.description}</p>
                  </div>
                  <button className="self-start bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300 flex items-center">
                    Order Now <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "The food at Hunger Hub is consistently amazing! Their delivery
                is always on time and the food arrives hot. The Gourmet Burger
                is my absolute favorite!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-orange-600">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Miller</h4>
                  <p className="text-sm text-gray-500">Loyal Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "I ordered for a family dinner and everyone loved it! The
                variety on the menu is excellent, and their Chocolate Lava Cake
                is out of this world. Will definitely order again!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-red-600">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">James Davis</h4>
                  <p className="text-sm text-gray-500">Family Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "As someone with dietary restrictions, I appreciate how
                accommodating Hunger Hub is. They always get my special requests
                right, and their customer service is excellent!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-yellow-600">AL</span>
                </div>
                <div>
                  <h4 className="font-semibold">Amy Lee</h4>
                  <p className="text-sm text-gray-500">Regular Customer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Read More Reviews <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Reserve a Table
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Enjoy our delicious cuisine in our warm and inviting restaurant.
                Make a reservation for a special occasion or a casual dining
                experience.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Party Size
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300">
                      <option>1 person</option>
                      <option>2 people</option>
                      <option>3 people</option>
                      <option>4 people</option>
                      <option>5 people</option>
                      <option>6+ people</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300">
                  Reserve Now
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&h=700"
                alt="Restaurant Interior"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="py-16 bg-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Hunger Hub Restaurant
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <FaClock className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We use only locally-sourced, fresh ingredients in all our dishes
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <FaUtensils className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-600">
                Our culinary team brings years of experience and passion to
                every plate
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <FaShieldAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Hot, fresh food delivered to your door in 30 minutes or less
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Auto Scroll Categories Component
const AutoScrollCategories = ({ categories }) => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // We need to create a truly seamless loop by using multiple copies
  // The first copy will be for display, the second will provide the illusion of infinite scrolling
  const containerStyle = {
    display: "flex",
    overflow: "hidden",
    position: "relative",
    width: "100vw",
    maxWidth: "100%",
    margin: 0,
    padding: 0,
  };

  // Create multiple copies for truly seamless scrolling
  // We need at least 2 complete sets to ensure there's no visual break
  const multipliedCategories = [
    ...categories,
    ...categories,
    ...categories,
    ...categories,
  ];

  useEffect(() => {
    // This ensures the animation is smooth by calculating the proper width
    // and optimizing the animation timing based on actual content
    if (scrollContainerRef.current) {
      const scrollerElement =
        scrollContainerRef.current.querySelector(".scroller");

      // Check if the element exists before proceeding
      if (scrollerElement) {
        // Set a new CSS variable with the actual width
        const scrollerWidth = scrollerElement.offsetWidth / 2;
        scrollContainerRef.current.style.setProperty(
          "--scroller-width",
          `${scrollerWidth}px`
        );
      }
    }
  }, [categories]);

  return (
    <div
      className="overflow-hidden relative"
      style={containerStyle}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={scrollContainerRef}
    >
      <style jsx="true">{`
        .scroller {
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }

        .paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className={`scroller flex gap-6 px-3 ${isPaused ? "paused" : ""}`}>
        {multipliedCategories.map((category, index) => (
          <Link
            to={`/category/${category.id}`}
            key={`${category.id}-${index}`}
            className="group min-w-[250px] sm:min-w-[280px] flex-shrink-0"
          >
            <div className="relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 transform group-hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white font-semibold text-xl p-4 w-full">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
