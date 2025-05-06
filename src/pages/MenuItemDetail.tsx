import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItems, getHistoricalRatings, diningHalls } from '../services/mockDataService';
import { MenuItem, HistoricalRating, Rating } from '../types';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import HistoricalRatingChart from '../components/HistoricalRatingChart';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getAverageRating, getDailyRating, getRatingsByMenuItem } from '../services/ratingsService';
import { Utensils } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const MenuItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>(
    id ? menuItems.find((item) => item.id === id) : undefined
  );
  const [historicalRatings, setHistoricalRatings] = useState<HistoricalRating[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  const [overallCount, setOverallCount] = useState(0);
  const [todayRating, setTodayRating] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [recentRatings, setRecentRatings] = useState<Rating[]>([]);

  // Handle invalid IDs
  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "No menu item ID provided",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    const foundItem = menuItems.find((item) => item.id === id);
    if (!foundItem) {
      toast({
        title: "Error",
        description: "Menu item not found",
        variant: "destructive",
      });
      navigate('/');
    } else {
      setMenuItem(foundItem);
      
      // Load historical ratings
      const ratings = getHistoricalRatings(foundItem.id);
      setHistoricalRatings(ratings);
      
      // Get real-time ratings
      const avgRating = getAverageRating(foundItem.id);
      const { rating: dailyRating, count: dailyCount } = getDailyRating(foundItem.id);
      
      setOverallRating(avgRating > 0 ? avgRating : foundItem.averageRating);
      setOverallCount(foundItem.ratingsCount);
      setTodayRating(dailyRating);
      setTodayCount(dailyCount);
      
      // Get recent ratings with comments
      const allRatings = getRatingsByMenuItem(foundItem.id);
      const sortedRatings = allRatings
        .filter(r => r.comment && r.comment.trim() !== '')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5); // Show only 5 most recent comments
      setRecentRatings(sortedRatings);
    }
  }, [id, navigate]);
  
  const handleRatingChange = () => {
    if (!menuItem || !id) return;
    
    // Update ratings after a new rating is submitted
    const avgRating = getAverageRating(id);
    const { rating: dailyRating, count: dailyCount } = getDailyRating(id);
    
    setOverallRating(avgRating);
    setTodayRating(dailyRating);
    setTodayCount(dailyCount);
    
    // Refresh recent ratings
    const allRatings = getRatingsByMenuItem(id);
    const sortedRatings = allRatings
      .filter(r => r.comment && r.comment.trim() !== '')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
    setRecentRatings(sortedRatings);
  };

  if (!menuItem || !id) {
    return null; // Will redirect via useEffect
  }

  const diningHall = diningHalls.find((hall) => hall.id === menuItem.diningHallId);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/reviews')}
            >
              View All Reviews
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

              {menuItem.ingredients && (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="h-5 w-5 text-amber-700" />
                    <h3 className="text-lg font-semibold text-amber-800">Ingredients</h3>
                  </div>
                  <p className="text-amber-900 leading-relaxed">{menuItem.ingredients}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-campus-background p-6 rounded-lg shadow-sm border border-blue-100">
                  <h2 className="text-xl font-semibold mb-4 text-center">Overall Rating</h2>
                  <div className="flex flex-col items-center">
                    <p className="text-5xl font-bold text-campus-primary mb-2">{overallRating.toFixed(1)}</p>
                    <p className="text-sm text-gray-500 mb-4">{overallCount} ratings</p>
                    <StarRating
                      menuItemId={menuItem.id}
                      initialRating={overallRating}
                      size="lg"
                      readOnly
                      prominentDisplay={true}
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-center">Today's Rating</h2>
                  <div className="flex flex-col items-center">
                    <p className="text-5xl font-bold text-campus-primary mb-2">
                      {todayRating > 0 ? todayRating.toFixed(1) : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {todayCount > 0 ? `${todayCount} ratings today` : 'No ratings today'}
                    </p>
                    {todayRating > 0 && (
                      <StarRating
                        menuItemId={menuItem.id}
                        initialRating={todayRating}
                        size="lg"
                        readOnly
                        prominentDisplay={true}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-campus-accent/10 p-6 rounded-lg mb-8 shadow-sm border border-campus-accent/20">
                <h2 className="text-2xl font-bold mb-6 text-center text-campus-primary">Rate This Item</h2>
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <StarRating 
                      menuItemId={menuItem.id} 
                      size="lg" 
                      onRatingChange={handleRatingChange}
                      prominentDisplay={true}
                    />
                  </div>
                </div>
              </div>

              {recentRatings.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
                  <div className="space-y-4">
                    {recentRatings.map((rating) => (
                      <div key={rating.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <StarRating 
                            menuItemId={menuItem.id}
                            initialRating={rating.value}
                            size="sm"
                            readOnly
                          />
                          <span className="text-sm text-gray-500">{formatDate(rating.timestamp)}</span>
                        </div>
                        <p className="text-gray-700">{rating.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
