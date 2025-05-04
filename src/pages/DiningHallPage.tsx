import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemsByDiningHallAndMeal, diningHalls, updateAverageRatings } from '../services/mockDataService';
import { MenuItem, MealPeriod } from '../types';
import Navbar from '../components/Navbar';
import MenuItemCard from '../components/MenuItemCard';
import MealTabs from '../components/MealTabs';
import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { getScrapedMenuItemsByDiningHallAndMeal } from '../services/menuScraperService';
import { toast } from '../hooks/use-toast';
import { Clock, ArrowLeft, CalendarDays } from 'lucide-react';

const DiningHallPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeMeal, setActiveMeal] = useState<MealPeriod>('Breakfast');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [diningHall, setDiningHall] = useState(diningHalls.find((hall) => hall.id === id));
  const [selectedDay, setSelectedDay] = useState<keyof typeof diningHall.dailyHours | null>(null);
  
  // Get current day of the week
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof diningHall.dailyHours;

  // Set the current day as selected initially
  useEffect(() => {
    if (currentDay && !selectedDay) {
      setSelectedDay(currentDay);
    }
  }, [currentDay, selectedDay]);

  // Handle invalid IDs
  useEffect(() => {
    if (!diningHall) {
      navigate('/');
    }
  }, [diningHall, navigate]);

  // Load menu items for the selected dining hall and meal
  useEffect(() => {
    if (id) {
      // First check for scraped menu items
      const scrapedItems = getScrapedMenuItemsByDiningHallAndMeal(id, activeMeal);
      
      if (scrapedItems.length > 0) {
        // If we have scraped items, use those
        setMenuItems(scrapedItems);
        toast({
          title: "Using Imported Menu",
          description: `Showing ${scrapedItems.length} imported menu items for ${activeMeal.toLowerCase()}.`,
        });
      } else {
        // Otherwise fall back to mock data
        const mockItems = getMenuItemsByDiningHallAndMeal(id, activeMeal);
        setMenuItems(mockItems);
      }
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
      // First check for scraped menu items
      const scrapedItems = getScrapedMenuItemsByDiningHallAndMeal(id, activeMeal);
      
      if (scrapedItems.length > 0) {
        // If we have scraped items, use those
        setMenuItems(scrapedItems);
      } else {
        // Otherwise fall back to mock data
        const items = getMenuItemsByDiningHallAndMeal(id, activeMeal);
        setMenuItems(items);
      }
    }
  };

  // Handle day selection change
  const handleDaySelection = (day: keyof typeof diningHall.dailyHours) => {
    setSelectedDay(day);
  };

  if (!diningHall) {
    return null; // Will redirect via useEffect
  }

  // All days of the week for the hours display
  const daysOfWeek: Array<keyof typeof diningHall.dailyHours> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-campus-accent/20 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dining Halls
        </Button>
        
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="w-full md:w-2/3">
              <AspectRatio ratio={16 / 9} className="mb-6 bg-muted overflow-hidden rounded-2xl shadow-card">
                <img 
                  src={diningHall.image} 
                  alt={diningHall.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </AspectRatio>
              <h1 className="text-3xl md:text-4xl font-bold text-campus-primary mb-3">{diningHall.name}</h1>
              <p className="text-gray-600 mb-6 text-lg">{diningHall.location}</p>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="h-5 w-5 text-campus-primary" />
                  <h3 className="font-semibold text-lg text-campus-primary">Hours of Operation</h3>
                </div>
                
                {/* Day selection tabs */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDaySelection(day)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        selectedDay === day 
                          ? 'bg-campus-primary text-white shadow-sm' 
                          : day === currentDay 
                            ? 'bg-campus-accent text-campus-primary font-medium' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
                
                {/* Selected day hours */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-campus-accent/10 border border-campus-accent/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">
                      {selectedDay === currentDay ? `Today (${selectedDay})` : selectedDay}
                    </h4>
                    {selectedDay === currentDay && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {selectedDay ? diningHall.dailyHours[selectedDay] : 'Select a day'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <MealTabs activeMeal={activeMeal} onMealChange={handleMealChange} />

            {menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {menuItems.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    menuItem={item} 
                    onRatingChange={handleRatingChange}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500">No menu items available for {activeMeal.toLowerCase()}.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="bg-campus-primary text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
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

export default DiningHallPage;
