import React from "react";
import { Gift, Home } from "lucide-react";
import { Link } from "react-router-dom";

// header component
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Gift className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">UGiftMe</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
