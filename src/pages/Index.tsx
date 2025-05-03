
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DiningHallCard from '../components/DiningHallCard';
import UniversitySelector from '../components/UniversitySelector';
import { getDiningHallsByUniversity } from '../services/mockDataService';
import { University, DiningHall } from '../types';
import { universities } from '../services/universityService';
import { toast } from '../hooks/use-toast';

const Index: React.FC = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [diningHalls, setDiningHalls] = useState<DiningHall[]>([]);

  // Try to load previously selected university from localStorage
  useEffect(() => {
    const savedUniversityId = localStorage.getItem('selectedUniversityId');
    if (savedUniversityId) {
      const university = universities.find(u => u.id === savedUniversityId);
      if (university) {
        setSelectedUniversity(university);
        // Load dining halls for this university
        setDiningHalls(getDiningHallsByUniversity(savedUniversityId));
      }
    }
  }, []);

  const handleUniversityChange = (university: University) => {
    setSelectedUniversity(university);
    localStorage.setItem('selectedUniversityId', university.id);
    // Update dining halls based on the selected university
    setDiningHalls(getDiningHallsByUniversity(university.id));
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

        {selectedUniversity ? (
          <>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-campus-secondary">
                {selectedUniversity.name}
              </h2>
              <p className="text-gray-600">
                {selectedUniversity.city}, {selectedUniversity.state}
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-campus-secondary mb-4">
                {selectedUniversity.name} Dining Halls
              </h2>
              {diningHalls.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {diningHalls.map((hall) => (
                    <DiningHallCard key={hall.id} diningHall={hall} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No dining halls available for this university. Please select another university.</p>
              )}
            </section>
          </>
        ) : (
          <div className="mt-10 text-center">
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-campus-secondary mb-4">
                Select Your University to Begin
              </h2>
              <p className="text-gray-600 mb-6">
                Please select a university from the dropdown above to view available dining halls and their menus.
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
        )}
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
