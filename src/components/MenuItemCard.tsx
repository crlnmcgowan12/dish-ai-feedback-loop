
import React, { useEffect, useState } from 'react';
import { MenuItem } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import StarRating from './StarRating';
import { getAverageRating, getDailyRating, getRatingsByMenuItem } from '../services/ratingsService';

interface MenuItemCardProps {
  menuItem: MenuItem;
  onRatingChange?: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem, onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState(menuItem.averageRating);
  const [ratingsCount, setRatingsCount] = useState(menuItem.ratingsCount);
  const [dailyRating, setDailyRating] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);

  // Update rating display whenever the component mounts or after a rating change
  useEffect(() => {
    // Calculate real-time average rating from localStorage
    const averageRating = getAverageRating(menuItem.id);
    const ratings = getRatingsByMenuItem(menuItem.id);
    
    // Get daily rating
    const { rating: todayRating, count: todayCount } = getDailyRating(menuItem.id);
    
    // Only update if we have ratings or if there's a difference
    if (ratings.length > 0 || averageRating !== currentRating) {
      setCurrentRating(averageRating);
      setRatingsCount(ratings.length);
    }
    
    setDailyRating(todayRating);
    setDailyCount(todayCount);
  }, [menuItem.id, currentRating]);

  // Handle when a user submits a new rating
  const handleRatingChange = () => {
    // Update local state with new rating data
    const averageRating = getAverageRating(menuItem.id);
    const ratings = getRatingsByMenuItem(menuItem.id);
    const { rating: todayRating, count: todayCount } = getDailyRating(menuItem.id);
    
    setCurrentRating(averageRating);
    setRatingsCount(ratings.length);
    setDailyRating(todayRating);
    setDailyCount(todayCount);
    
    // Call parent's onRatingChange if provided
    if (onRatingChange) {
      onRatingChange();
    }
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      {menuItem.image && (
        <div className="h-40 overflow-hidden">
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{menuItem.name}</h3>
          <Badge variant="outline" className="bg-campus-accent text-campus-primary">
            {menuItem.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-2">{menuItem.description}</p>
        {menuItem.ingredients && (
          <div className="mb-2">
            <p className="text-xs font-medium text-gray-700">Ingredients:</p>
            <p className="text-xs text-gray-600">{menuItem.ingredients}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {menuItem.dietaryInfo.map((info) => (
            <Badge key={info} variant="secondary" className="text-xs">
              {info}
            </Badge>
          ))}
        </div>
        
        <div className="bg-blue-50 p-2 rounded-md border border-blue-100 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-campus-primary">Rating:</span>
            <div className="flex items-center">
              <span className="font-bold text-lg mr-2 text-campus-primary">
                {currentRating.toFixed(1)}
              </span>
              <StarRating
                menuItemId={menuItem.id}
                initialRating={currentRating}
                size="sm"
                readOnly
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 text-right mt-1">
            {ratingsCount} {ratingsCount === 1 ? 'rating' : 'ratings'} total
          </div>
        </div>
        
        {dailyRating > 0 && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Today:</span> {dailyRating.toFixed(1)} 
            <span className="text-xs text-gray-500"> ({dailyCount} {dailyCount === 1 ? 'rating' : 'ratings'})</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          <p className="text-sm font-medium mb-1 text-center">Rate this item:</p>
          <StarRating
            menuItemId={menuItem.id}
            size="md"
            onRatingChange={handleRatingChange}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
