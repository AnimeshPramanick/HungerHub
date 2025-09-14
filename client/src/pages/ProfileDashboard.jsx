import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot, collection, query, orderBy, where, addDoc, getDocs } from "firebase/firestore";

// Updated mock data to simulate fetching from a database with "HungerHub" as the primary brand
const mockReviews = [
  {
    id: "rev1",
    restaurant: "HungerHub",
    orderedDate: "July 24, 2024",
    review: "The 'Ultimate Burger' was cooked to perfection, juicy and flavorful. A truly satisfying meal that exceeded my expectations.",
    rating: 5,
  },
  {
    id: "rev3",
    restaurant: "HungerHub",
    orderedDate: "August 15, 2024",
    review: "Absolutely fantastic biriyani! The meat was tender, and the spices were perfectly balanced. A must-try for any biriyani enthusiast.",
    rating: 5,
  },
];

const mockOrders = [
  {
    id: "ord1",
    restaurant: "HungerHub",
    date: "September 5, 2024",
    total: 10.50,
    items: "1x Cheesy Garlic Bread",
    status: "Delivered",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1627889104118-a6d10c0e34f6?q=80&w=1780&auto=format&fit=crop",
  },
  {
    id: "ord2",
    restaurant: "HungerHub",
    date: "August 12, 2024",
    total: 18.75,
    items: "1x Biryani",
    status: "Delivered",
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1622312675971-87353f4d96c9?q=80&w=1780&auto=format&fit=crop",
  },
  {
    id: "ord4",
    restaurant: "HungerHub",
    date: "July 24, 2024",
    total: 25.00,
    items: "1x The 'Ultimate Burger'",
    status: "Delivered",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901007716-e41c46ae2869?q=80&w=1780&auto=format&fit=crop",
  }
];

const mockAddresses = [
  {
    id: "addr1",
    label: "Home",
    address: "123 Main Street, Salt Lake City, Kolkata",
  },
  {
    id: "addr2",
    label: "Work",
    address: "456 Corporate Lane, Sector V, Kolkata",
  },
];

const mockCards = [
  {
    id: "card1",
    type: "Visa",
    last4: "4242",
  },
  {
    id: "card2",
    type: "MasterCard",
    last4: "1234",
  },
];

const mockPaymentHistory = [
  {
    id: "pay1",
    orderId: "ORD-98765",
    restaurant: "HungerHub",
    amount: 32.75,
    date: "August 15, 2024",
    method: "Cash on Delivery",
    status: "Completed",
  },
  {
    id: "pay3",
    orderId: "ORD-54321",
    restaurant: "HungerHub",
    amount: 12.00,
    date: "August 1, 2024",
    method: "Cash on Delivery",
    status: "Completed",
  },
];


const App = () => {
  const [activeSection, setActiveSection] = useState("Activity");
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAddingData, setIsAddingData] = useState(false);

  const db = useRef(null);
  const auth = useRef(null);

  useEffect(() => {
    let firebaseConfig = {};
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    try {
      if (typeof __firebase_config !== 'undefined' && __firebase_config) {
        firebaseConfig = JSON.parse(__firebase_config);
      } else {
        // Fallback for when no config is provided
        firebaseConfig = {
          projectId: 'demo-project',
          apiKey: 'dummy-api-key',
          authDomain: 'dummy-auth-domain',
          // Other properties can be added if needed
        };
        console.warn("Using dummy Firebase config as none was provided.");
      }
    } catch (e) {
      console.error("Failed to parse firebase config:", e);
      // Use fallback config on parse error
      firebaseConfig = {
        projectId: 'demo-project',
        apiKey: 'dummy-api-key',
        authDomain: 'dummy-auth-domain',
      };
    }

    const app = initializeApp(firebaseConfig);
    db.current = getFirestore(app);
    auth.current = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth.current, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(auth.current, initialAuthToken);
          } else {
            await signInAnonymously(auth.current);
          }
        } catch (error) {
          console.error("Firebase Auth Error:", error);
          setUserId(crypto.randomUUID()); // Fallback to a random UUID if auth fails
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId || !db.current) return;

    // Attach real-time listeners for all collections
    const reviewsRef = collection(db.current, `artifacts/default-app-id/users/${userId}/reviews`);
    const ordersRef = collection(db.current, `artifacts/default-app-id/users/${userId}/orders`);
    const addressesRef = collection(db.current, `artifacts/default-app-id/users/${userId}/addresses`);
    const cardsRef = collection(db.current, `artifacts/default-app-id/users/${userId}/cards`);
    const paymentHistoryRef = collection(db.current, `artifacts/default-app-id/users/${userId}/paymentHistory`);

    const unsubscribeReviews = onSnapshot(reviewsRef, (snapshot) => {
      const reviewList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewList);
    });

    const unsubscribeOrders = onSnapshot(ordersRef, (snapshot) => {
      const orderList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    });

    const unsubscribeAddresses = onSnapshot(addressesRef, (snapshot) => {
      const addressList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAddresses(addressList);
    });

    const unsubscribeCards = onSnapshot(cardsRef, (snapshot) => {
      const cardList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCards(cardList);
    });

    const unsubscribePaymentHistory = onSnapshot(paymentHistoryRef, (snapshot) => {
      const paymentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPaymentHistory(paymentList);
    });

    // Clean up listeners on component unmount
    return () => {
      unsubscribeReviews();
      unsubscribeOrders();
      unsubscribeAddresses();
      unsubscribeCards();
      unsubscribePaymentHistory();
    };
  }, [userId]);


  // Placeholder function to add mock data
  const addMockDataToFirestore = async () => {
    if (!userId || !db.current) return;

    setIsAddingData(true);

    const reviewPromises = mockReviews.map(review =>
      setDoc(doc(db.current, `artifacts/default-app-id/users/${userId}/reviews`, review.id), review)
    );
    const orderPromises = mockOrders.map(order =>
      setDoc(doc(db.current, `artifacts/default-app-id/users/${userId}/orders`, order.id), order)
    );
    const addressPromises = mockAddresses.map(address =>
      setDoc(doc(db.current, `artifacts/default-app-id/users/${userId}/addresses`, address.id), address)
    );
    const cardPromises = mockCards.map(card =>
      setDoc(doc(db.current, `artifacts/default-app-id/users/${userId}/cards`, card.id), card)
    );
    const paymentPromises = mockPaymentHistory.map(payment =>
      setDoc(doc(db.current, `artifacts/default-app-id/users/${userId}/paymentHistory`, payment.id), payment)
    );

    try {
      await Promise.all([...reviewPromises, ...orderPromises, ...addressPromises, ...cardPromises, ...paymentPromises]);
      console.log("Mock data added to Firestore!");
    } catch (e) {
      console.error("Error adding mock data: ", e);
    } finally {
      setIsAddingData(false);
    }
  };
  
  const handleLogout = async () => {
    if (auth.current) {
      try {
        await signOut(auth.current);
        setUserId(null);
        setActiveSection("Activity"); // Reset to default view
        console.log("User logged out successfully.");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Activity":
        const combinedActivity = [
          ...orders.map(item => ({ ...item, type: 'order', displayDate: item.date })),
          ...reviews.map(item => ({ ...item, type: 'review', displayDate: item.orderedDate }))
        ];
        
        // Sort all activity in a single list by date
        const sortedActivity = combinedActivity
          .sort((a, b) => new Date(b.displayDate) - new Date(a.displayDate));

        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">HungerHub Activity</h3>
            <p className="text-gray-600 mb-6">
              A timeline of your recent food orders and reviews, all related to HungerHub.
            </p>

            {sortedActivity.length > 0 ? (
              <div className="space-y-4">
                {sortedActivity.map((item) => (
                  <div key={item.id} className="bg-yellow-50 p-4 rounded-lg shadow-sm border-2 border-yellow-200">
                    {item.type === 'order' ? (
                      <div className="flex items-start">
                        <img 
                          src={item.image} 
                          alt={item.items} 
                          className="w-20 h-20 rounded-lg mr-4 object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h5 className="font-semibold text-lg text-gray-900">Order Placed</h5>
                            <span className="text-sm font-bold text-green-600">${item.total.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">Order placed on {item.displayDate}</p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Items:</span> {item.items}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="font-semibold text-lg text-gray-900">Reviewed HungerHub</h5>
                          <div className="flex items-center text-yellow-500">
                            <span className="text-xl">{'★'.repeat(item.rating)}</span>
                            <span className="text-xl text-gray-300">{'★'.repeat(5 - item.rating)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Review posted on {item.displayDate}</p>
                        <p className="text-sm text-gray-700 font-medium">Your comment:</p>
                        <p className="text-sm text-gray-700 mt-1 italic">"{item.review}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You have no recent activity at HungerHub.</p>
            )}
          </div>
        );
      case "Reviews":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{review.restaurant}</h4>
                      <p className="text-sm text-gray-500">Ordered on: {review.orderedDate}</p>
                      <p className="text-sm mt-2 text-gray-700">{review.review}</p>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-xl">{'★'.repeat(review.rating)}</span>
                      <span className="text-xl text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-yellow-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2.586l-.293-.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 9.586V7z" clipRule="evenodd" />
                      </svg>
                      <span>Helpful</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.875 8.875 0 01-4.661-1.233l-3.322 1.583a.75.75 0 01-1.002-.852l1.583-3.322A8.995 8.995 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM10 8a1 1 0 100 2 1 1 0 000-2zm-3 1a1 1 0 102 0 1 1 0 00-2 0zm6 0a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                      </svg>
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 00-2 0v4a1 1 0 00.293.707l2.293 2.293a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You haven't posted any reviews yet.</p>
            )}
          </div>
        );
      case "Orders":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h3>
            <p className="text-gray-600 mb-6">
              A comprehensive list of all your past orders from HungerHub.
            </p>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-start">
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg mr-4 object-cover h-20 w-20"
                      style={{ backgroundColor: getCategoryColor(order.category) }}>
                      <span className="font-semibold text-white">{order.category}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{order.restaurant}</h4>
                          <p className="text-sm text-gray-500">Order placed on: {order.date}</p>
                        </div>
                        <span className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Items:</span> {order.items}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Status:</span> {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You have no past orders.</p>
            )}
          </div>
        );
      case "My Addresses":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">My Addresses</h3>
            <p className="text-gray-600 mb-4">
              Manage your delivery addresses. You can add, edit, or remove addresses for a faster checkout experience.
            </p>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-lg text-gray-900">{address.label}</h4>
                  <p className="text-gray-700">{address.address}</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="text-yellow-600 hover:underline text-sm font-medium">Edit</button>
                    <button className="text-red-600 hover:underline text-sm font-medium">Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You have no saved addresses.</p>
            )}
          </div>
        );
      case "Online Payments":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Online Payments</h3>
            <p className="text-gray-600 mb-4">
              Here you can manage your saved credit and debit cards for quick and secure payments.
            </p>
            {cards.length > 0 ? (
              cards.map((card) => (
                <div key={card.id} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-lg text-gray-900">{card.type} ending in {card.last4}</h4>
                  <p className="text-gray-700">Expires: **/**</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You have no saved cards.</p>
            )}
          </div>
        );
      case "Offline Payments":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Offline Payments</h3>
            <p className="text-gray-600 mb-4">
              View a complete history of all your cash on delivery payments.
            </p>
            {paymentHistory.length > 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Restaurant</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-2 text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-b-0">
                        <td className="py-2 text-sm text-gray-700">{payment.orderId}</td>
                        <td className="py-2 text-sm text-gray-700">{payment.restaurant}</td>
                        <td className="py-2 text-sm text-green-600 font-bold">${payment.amount.toFixed(2)}</td>
                        <td className="py-2 text-sm text-gray-700">{payment.date}</td>
                        <td className="py-2 text-sm text-green-600">{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">You have no payment history.</p>
            )}
          </div>
        );
      case "Profile Settings":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Profile Settings</h3>
            <p className="text-gray-600">
              Manage and update your personal information, including your name, email, and phone number.
            </p>
          </div>
        );
      case "Logout":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Logout</h3>
            <p className="text-gray-600">
              You have successfully logged out. You can sign back in at any time.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Account Settings</h3>
            <p className="text-gray-600">
              Please select an option from the menu on the left to manage your account settings.
            </p>
          </div>
        );
    }
  };
  
  const getCategoryColor = (category) => {
    switch (category) {
      case "Bread":
        return "#fcd34d"; // Yellow
      case "Biryani":
        return "#67e8f9"; // Cyan
      case "Burger":
        return "#ea580c"; // Orange
      default:
        return "#cbd5e1"; // Gray
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased">
      {/* Tailwind CSS CDN script */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      {/* Banner */}
      <div className="relative h-60 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
          alt="Food background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      {/* Profile Section with visual overlap */}
      <div className="container mx-auto px-4 -mt-16 sm:-mt-24">
        <div className="flex flex-col items-center sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Circular profile element */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-yellow-500 rounded-full border-4 border-white flex items-center justify-center -mt-12 sm:-mt-16 z-10">
            <span className="text-white text-xl sm:text-2xl font-semibold">User</span>
          </div>

          <div className="pt-2 sm:pt-10 text-center sm:text-left z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Sandipon Halder</h2>
            <p className="text-sm sm:text-base text-gray-300">Foodie | Explorer</p>
            {userId && (
              <p className="text-xs text-gray-300 mt-1">User ID: {userId}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto p-4 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">

        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6 h-fit">
          <ul className="space-y-3">
            <li className="text-sm uppercase font-bold text-gray-400 tracking-wider mb-2">My Profile</li>
            {["Activity", "Reviews"].map((section) => (
              <li
                key={section}
                onClick={() => setActiveSection(section)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === section
                    ? "bg-yellow-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {section}
              </li>
            ))}
            <li className="text-sm uppercase font-bold text-gray-400 tracking-wider pt-4 mb-2">Online Ordering</li>
            {["Orders", "My Addresses"].map((section) => (
              <li
                key={section}
                onClick={() => setActiveSection(section)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === section
                    ? "bg-yellow-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {section}
              </li>
            ))}
            <li className="text-sm uppercase font-bold text-gray-400 tracking-wider pt-4 mb-2">Payments</li>
            {["Offline Payments", "Online Payments"].map((section) => (
              <li
                key={section}
                onClick={() => setActiveSection(section)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === section
                    ? "bg-yellow-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {section}
              </li>
            ))}
            <li className="text-sm uppercase font-bold text-gray-400 tracking-wider pt-4 mb-2">Account Settings</li>
              <li
                onClick={() => setActiveSection("Profile Settings")}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === "Profile Settings"
                    ? "bg-yellow-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile Settings
              </li>
              <li
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-100"
              >
                Logout
              </li>
          </ul>
          <div className="mt-6 border-t pt-6">
            <button
              onClick={addMockDataToFirestore}
              disabled={isAddingData}
              className="w-full text-left px-4 py-2 rounded-lg text-green-700 hover:bg-green-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingData ? "Adding Data..." : "Add Mock Data"}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default App;