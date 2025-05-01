
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { University } from '../types';
import { getUniversityById } from '../services/universityService';

const Navbar: React.FC = () => {
  const [university, setUniversity] = useState<University | undefined>(undefined);

  useEffect(() => {
    const savedUniversityId = localStorage.getItem('selectedUniversityId');
    if (savedUniversityId) {
      const foundUniversity = getUniversityById(savedUniversityId);
      if (foundUniversity) {
        setUniversity(foundUniversity);
      }
    }
  }, []);

  return (
    <nav className="bg-campus-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">CampusDish Insights</span>
          {university && (
            <span className="text-sm bg-blue-700 px-2 py-1 rounded-md">
              {university.name}
            </span>
          )}
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
