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
    id: "ord98765",
    restaurant: "HungerHub",
    date: "September 5, 2024",
    total: 32.75,
    items: "1x Cheesy Garlic Bread",
    status: "Completed",
    category: "All Type of Food",
    paymentMethod: "Online",
    image: "https://i.postimg.cc/x1vJ4gts/Screenshot-2025-09-15-083706.png"
  },
  {
    id: "ord54321",
    restaurant: "HungerHub",
    date: "August 12, 2024",
    total: 18.75,
    items: "1x Biryani",
    status: "Delivered",
    category: "All Type of Food",
    paymentMethod: "Online",
    image: "https://i.postimg.cc/Gh96K5hC/Screenshot-2025-09-15-084745.png"
  },
  {
    id: "ord34567",
    restaurant: "HungerHub",
    date: "August 1, 2024",
    total: 12.00,
    items: "1x Burger",
    status: "Delivered",
    category: "All Type of Food",
    paymentMethod: "Offline",
    image: "https://i.postimg.cc/8CnZ71Mf/Screenshot-2025-09-15-085041.png"
  },
  {
    id: "ord11223",
    restaurant: "HungerHub",
    date: "July 24, 2024",
    total: 25.00,
    items: "1x The 'Ultimate Burger'",
    status: "Delivered",
    category: "All Type of Food",
    paymentMethod: "Online",
    image: "https://i.postimg.cc/KvRvTf6K/Screenshot-2025-09-15-085657.png"
  },
  {
    id: "ord88990",
    restaurant: "HungerHub",
    date: "June 30, 2024",
    total: 45.50,
    items: "1x Chicken Tikka Masala",
    status: "Delivered",
    category: "All Type of Food",
    paymentMethod: "Offline",
    image: "https://i.postimg.cc/wMzLvPfs/Screenshot-2025-09-15-085358.png"
  },
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

const App = () => {
  const [activeSection, setActiveSection] = useState("Activity");
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAddingData, setIsAddingData] = useState(false);
  
  // State for profile settings form
  const [profile, setProfile] = useState({
    name: "Sandipon Halder",
    email: "sandipon.h@example.com",
    phone: "+91 98765 43210",
    photo: "https://placehold.co/150x150/eab308/ffffff?text=User",
    password: ""
  });

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

    // Clean up listeners on component unmount
    return () => {
      unsubscribeReviews();
      unsubscribeOrders();
      unsubscribeAddresses();
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

    try {
      await Promise.all([...reviewPromises, ...orderPromises, ...addressPromises]);
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
        setActiveSection("Logout"); // Set to a new "Logout" section
        console.log("User logged out successfully.");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const renderContent = () => {
    const sortedOrders = orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

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
            {sortedOrders.length > 0 ? (
              <div className="space-y-4">
                {sortedOrders.map((order) => (
                  <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-start">
                    <img 
                      src={order.image} 
                      alt={order.items} 
                      className="w-20 h-20 rounded-lg mr-4 object-cover"
                    />
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
      case "Order Details":
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold mb-2 text-gray-900">Order Details</h3>
            <p className="text-gray-600 mb-6 text-base">
              View a complete history of all your orders, including both online and offline payments.
            </p>
      
            {sortedOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Restaurant</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Image</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Payment Method</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Items</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {sortedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-indigo-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.restaurant}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={order.image}
                            alt={`${order.restaurant} logo`}
                            className="h-10 w-10 rounded-full object-cover shadow-sm"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/E5E7EB/A1A1A1?text=img" }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.paymentMethod}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">{order.items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 px-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Orders Found</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet. Start shopping to see your history here!</p>
              </div>
            )}
          </div>
        );
      case "Profile Settings":
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Profile Settings</h3>
            <p className="text-gray-600 mb-6">
              Manage and update your personal information.
            </p>
            <div className="flex flex-col items-center space-y-4 mb-8">
              <img src={profile.photo} alt="Profile" className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              />
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border"
                  placeholder="********"
                />
                <p className="mt-2 text-sm text-gray-500">
                  You can change your password here. Leave blank to keep current password.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      case "Logout":
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c-1.928 0-3.714.48-5.32 1.312M6 6v.01M18 6v.01M6 18v.01M18 18v.01" />
            </svg>
            <h3 className="mt-4 text-2xl font-bold text-gray-800">Logged Out Successfully</h3>
            <p className="mt-2 text-gray-600">
              You have been securely logged out of your HungerHub account. We hope to see you again soon!
            </p>
            <button 
              onClick={() => setActiveSection("Activity")} 
              className="mt-6 px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
            >
              Sign In Again
            </button>
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
    // Only one category now, so we can use a single color or a variation.
    return "#ea580c"; // A single color for "All Type of Food"
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
            <li
                onClick={() => setActiveSection("Order Details")}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === "Order Details"
                    ? "bg-yellow-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Order Details
              </li>
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