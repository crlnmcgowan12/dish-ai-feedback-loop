
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DiningHallCard from '../components/DiningHallCard';
import UniversitySelector from '../components/UniversitySelector';
import UniversityMenuLink from '../components/UniversityMenuLink';
import { getDiningHallsByUniversity } from '../services/mockDataService';
import { University, DiningHall } from '../types';
import { universities } from '../services/universityService';
import { toast } from '../hooks/use-toast';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, School } from 'lucide-react';

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

  const handleMenuLinkSaved = (updatedUniversity: University) => {
    setSelectedUniversity(updatedUniversity);
  };
  
  const handleMenuScraped = () => {
    // Refresh dining halls to trigger re-render of menu items
    if (selectedUniversity) {
      setDiningHalls(getDiningHallsByUniversity(selectedUniversity.id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-campus-background/60">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-12 animate-fade-in">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-campus-primary mb-3">Find Your University</h1>
            <p className="text-gray-600 text-lg">
              Select your university to explore dining options, view menus, and rate dishes.
            </p>
          </div>
        </section>

        <Card className="shadow-soft mb-10 overflow-hidden border-campus-primary/10">
          <CardContent className="p-6 md:p-8">
            <UniversitySelector 
              selectedUniversity={selectedUniversity} 
              onUniversityChange={handleUniversityChange} 
            />
          </CardContent>
        </Card>

        {selectedUniversity ? (
          <>
            <div className="mb-8 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-campus-primary/10 to-campus-accent/40 p-6 md:p-8 rounded-2xl shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <School className="h-5 w-5 text-campus-primary" />
                      <h2 className="text-2xl font-semibold text-campus-primary">
                        {selectedUniversity.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 mb-4">
                      <MapPin size={16} className="text-campus-secondary" />
                      <p>
                        {selectedUniversity.city}, {selectedUniversity.state}
                      </p>
                    </div>
                  </div>
                  <UniversityMenuLink 
                    university={selectedUniversity}
                    onMenuLinkSaved={handleMenuLinkSaved}
                    onMenuScraped={handleMenuScraped}
                  />
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-campus-secondary mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 bg-campus-primary rounded-full inline-block"></span>
                {selectedUniversity.name} Dining Halls
              </h2>
              {diningHalls.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {diningHalls.map((hall) => (
                    <DiningHallCard key={hall.id} diningHall={hall} />
                  ))}
                </div>
              ) : (
                <Card className="bg-white/60 shadow-sm border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-600">No dining halls available for this university. Please select another university.</p>
                </Card>
              )}
            </section>
          </>
        ) : (
          <div className="mt-10">
            <Card className="bg-white overflow-hidden shadow-card max-w-2xl mx-auto">
              <div className="h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1000" 
                  alt="Campus Food" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-campus-primary mb-4">
                  Select Your University to Begin
                </h2>
                <p className="text-gray-600 mb-6">
                  Please select a university from the dropdown above to view available dining halls and their menus.
                </p>
                <div className="text-sm text-gray-500 italic border-t border-gray-100 pt-4 mt-2">
                  Rate dishes, explore menus, and find your favorite campus dining options.
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <footer className="bg-campus-primary text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">CampusDish Insights</h3>
              <p className="text-white/70">Making campus dining deliciously simple</p>
            </div>
            <div>
              <p>&copy; 2025 CampusDish Insights. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
