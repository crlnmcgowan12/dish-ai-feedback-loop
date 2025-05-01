
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DiningHallCard from '../components/DiningHallCard';
import UniversitySelector from '../components/UniversitySelector';
import { diningHalls } from '../services/mockDataService';
import { University } from '../types';
import { universities } from '../services/universityService';
import { toast } from '../hooks/use-toast';

const Index: React.FC = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  // Try to load previously selected university from localStorage
  useEffect(() => {
    const savedUniversityId = localStorage.getItem('selectedUniversityId');
    if (savedUniversityId) {
      const university = universities.find(u => u.id === savedUniversityId);
      if (university) {
        setSelectedUniversity(university);
      }
    }
  }, []);

  const handleUniversityChange = (university: University) => {
    setSelectedUniversity(university);
    localStorage.setItem('selectedUniversityId', university.id);
    toast({
      title: "University Selected",
      description: `You've selected ${university.name}`,
    });
  };

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

        <UniversitySelector 
          selectedUniversity={selectedUniversity} 
          onUniversityChange={handleUniversityChange} 
        />

        {selectedUniversity && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-campus-secondary">
              {selectedUniversity.name}
            </h2>
            <p className="text-gray-600">
              {selectedUniversity.city}, {selectedUniversity.state}
            </p>
          </div>
        )}

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
