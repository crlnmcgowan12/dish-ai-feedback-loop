
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemsByDiningHallAndMeal, diningHalls, updateAverageRatings } from '../services/mockDataService';
import { MenuItem, MealPeriod } from '../types';
import Navbar from '../components/Navbar';
import MenuItemCard from '../components/MenuItemCard';
import MealTabs from '../components/MealTabs';
import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';

const DiningHallPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeMeal, setActiveMeal] = useState<MealPeriod>('Breakfast');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [diningHall, setDiningHall] = useState(diningHalls.find((hall) => hall.id === id));

  // Handle invalid IDs
  useEffect(() => {
    if (!diningHall) {
      navigate('/');
    }
  }, [diningHall, navigate]);

  // Load menu items for the selected dining hall and meal
  useEffect(() => {
    if (id) {
      const items = getMenuItemsByDiningHallAndMeal(id, activeMeal);
      setMenuItems(items);
    }
  }, [id, activeMeal]);

  // Handle meal change
  const handleMealChange = (meal: MealPeriod) => {
    setActiveMeal(meal);
  };

  // Handle rating change
  const handleRatingChange = () => {
    // Update all ratings and refresh menu items
    updateAverageRatings();
    if (id) {
      const items = getMenuItemsByDiningHallAndMeal(id, activeMeal);
      setMenuItems(items);
    }
  };

  if (!diningHall) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-6">
            <div className="w-full md:w-2/3">
              <AspectRatio ratio={16 / 9} className="mb-4 bg-muted overflow-hidden rounded-lg">
                <img 
                  src={diningHall.image} 
                  alt={diningHall.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </AspectRatio>
            </div>
            <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
              <h1 className="text-3xl font-bold text-campus-primary">{diningHall.name}</h1>
              <p className="text-gray-600 mb-2">{diningHall.location}</p>
              <div className="p-2 border rounded my-2 bg-gray-50">
                <h3 className="font-medium text-gray-800">Hours of Operation</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{diningHall.hours}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="mt-4 w-full"
              >
                Back to Dining Halls
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <MealTabs activeMeal={activeMeal} onMealChange={handleMealChange} />

            {menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {menuItems.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    menuItem={item} 
                    onRatingChange={handleRatingChange}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No menu items available for {activeMeal.toLowerCase()}.</p>
              </div>
            )}
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

export default DiningHallPage;
