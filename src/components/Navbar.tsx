
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-campus-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">CampusDish Insights</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-campus-accent transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-campus-accent transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
