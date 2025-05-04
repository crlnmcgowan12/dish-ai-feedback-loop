
import React from 'react';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-campus-primary mb-2">Welcome to CampusDish Insights</h1>
          <p className="text-gray-600 mb-6">
            Explore dining options, view menus, and rate dishes at your university's dining halls.
          </p>
        </section>

        <div className="mt-10 text-center">
          <div className="bg-blue-50 p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-campus-secondary mb-4">
              Discover Your Campus Dining Experience
            </h2>
            <p className="text-gray-600 mb-6">
              Navigate to the Universities page to select your school and explore available dining halls and their menus.
            </p>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&h=400" 
                alt="Campus Food" 
                className="rounded-lg shadow-md w-full max-w-md"
              />
            </div>
            <div className="mt-6 text-sm text-gray-500 italic">
              Rate dishes, explore menus, and find your favorite campus dining options.
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-campus-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 CampusDish Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
