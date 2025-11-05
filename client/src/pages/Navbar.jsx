import { Link } from "react-router-dom";
import AdminDashboard from "./AdminPage";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-orange-500 px-6 py-4 text-white">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold">Hunger Hub</h1>
        <div className="space-x-4">
          <Link to="/category/breakfast" className="hover:underline">🍳 Breakfast</Link>
          <Link to="/category/lunch" className="hover:underline">🍝 Lunch</Link>
          <Link to="/category/dinner" className="hover:underline">🍖 Dinner</Link>
        </div>
      </div>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/menu" className="hover:underline">Full Menu</Link>
        <Link to="/signup" className="hover:underline">Signup</Link>
      </div>
    </nav>
  );
}