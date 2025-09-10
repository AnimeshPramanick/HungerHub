import React, { useState } from "react";
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
      textColor: "text-red-700",
    },
  ];

  return (
    <div>
      <div>dskjfhkdshf dsfdsngkjds</div>
    </div>
  );
};

export default Home;
