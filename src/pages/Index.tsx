
import React from 'react';
import Navbar from '../components/Navbar';
import DiningHallCard from '../components/DiningHallCard';
import { diningHalls } from '../services/mockDataService';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-campus-primary mb-2">Welcome to CampusDish Insights</h1>
          <p className="text-gray-600">
            Explore dining options, view menus, and rate dishes at your university's dining halls.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-campus-secondary mb-4">Campus Dining Halls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diningHalls.map((hall) => (
              <DiningHallCard key={hall.id} diningHall={hall} />
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-campus-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 CampusDish Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
