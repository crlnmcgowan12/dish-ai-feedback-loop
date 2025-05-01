
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemsByDiningHallAndMeal, diningHalls, updateAverageRatings } from '../services/mockDataService';
import { MenuItem, MealPeriod } from '../types';
import Navbar from '../components/Navbar';
import MenuItemCard from '../components/MenuItemCard';
import MealTabs from '../components/MealTabs';
import { Button } from '../components/ui/button';

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
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-campus-primary">{diningHall.name}</h1>
              <p className="text-gray-600 mb-2">{diningHall.location}</p>
              <p className="text-sm text-gray-500">Hours: {diningHall.hours}</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Dining Halls
            </Button>
          </div>

          <div className="mt-8">
            <MealTabs activeMeal={activeMeal} onMealChange={handleMealChange} />

            {menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
