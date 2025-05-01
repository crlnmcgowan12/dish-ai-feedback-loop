
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItems, getHistoricalRatings, diningHalls } from '../services/mockDataService';
import { MenuItem, HistoricalRating } from '../types';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import HistoricalRatingChart from '../components/HistoricalRatingChart';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const MenuItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>(
    menuItems.find((item) => item.id === id)
  );
  const [historicalRatings, setHistoricalRatings] = useState<HistoricalRating[]>([]);

  // Handle invalid IDs
  useEffect(() => {
    if (!menuItem) {
      navigate('/');
    } else {
      // Load historical ratings
      const ratings = getHistoricalRatings(menuItem.id);
      setHistoricalRatings(ratings);
    }
  }, [menuItem, navigate, id]);

  if (!menuItem) {
    return null; // Will redirect via useEffect
  }

  const diningHall = diningHalls.find((hall) => hall.id === menuItem.diningHallId);

  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/dining-hall/${menuItem.diningHallId}`)}
            >
              Back to Menu
            </Button>
          </div>

          <Card className="overflow-hidden">
            {menuItem.image && (
              <div className="h-64 overflow-hidden">
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-campus-primary mb-2">{menuItem.name}</h1>
                  {diningHall && (
                    <p className="text-gray-600">
                      {diningHall.name} - {menuItem.mealPeriod}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="bg-campus-accent text-campus-primary text-sm">
                  {menuItem.category}
                </Badge>
              </div>

              <p className="text-lg mb-4">{menuItem.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {menuItem.dietaryInfo.map((info) => (
                  <Badge key={info} variant="secondary">
                    {info}
                  </Badge>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Rating</h2>
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="text-3xl font-bold text-campus-primary">{menuItem.averageRating}</p>
                    <p className="text-sm text-gray-500">{menuItem.ratingsCount} ratings</p>
                  </div>
                  <StarRating
                    menuItemId={menuItem.id}
                    initialRating={menuItem.averageRating}
                    size="lg"
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Rate This Item</h2>
                <StarRating menuItemId={menuItem.id} size="lg" />
              </div>

              {historicalRatings.length > 0 && (
                <HistoricalRatingChart historicalRatings={historicalRatings} />
              )}
            </CardContent>
          </Card>
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

export default MenuItemDetail;
