
import React, { useEffect, useState } from 'react';
import { MenuItem } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import StarRating from './StarRating';
import { getAverageRating, getDailyRating, getRatingsByMenuItem } from '../services/ratingsService';
import { reportIncorrectLabel } from '../services/menuScraperService';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Flag, AlertCircle, Utensils } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface MenuItemCardProps {
  menuItem: MenuItem;
  onRatingChange?: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem, onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState(menuItem.averageRating);
  const [ratingsCount, setRatingsCount] = useState(menuItem.ratingsCount);
  const [dailyRating, setDailyRating] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

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

  // Handle reporting of incorrect dietary labels
  const handleReportIncorrect = (dietaryLabel: string) => {
    reportIncorrectLabel(menuItem.id, 'incorrect', dietaryLabel);
    setReportSubmitted(true);
    toast({
      title: "Report Submitted",
      description: `Thank you for reporting that "${dietaryLabel}" is incorrectly applied to this item.`,
    });
  };

  // Handle reporting of missing dietary labels
  const handleReportMissing = (dietaryLabel: string) => {
    reportIncorrectLabel(menuItem.id, 'missing', dietaryLabel);
    setReportSubmitted(true);
    toast({
      title: "Report Submitted",
      description: `Thank you for reporting that "${dietaryLabel}" label is missing from this item.`,
    });
  };

  // Toggle ingredients visibility
  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  // Helper to check if ingredients are properly detailed
  const hasProperIngredients = () => {
    return menuItem.ingredients && 
           menuItem.ingredients.length > 15 &&
           !menuItem.ingredients.includes("various ingredients") &&
           !menuItem.ingredients.includes("Detailed ingredients unavailable");
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Flag className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div className="font-medium">Report Dietary Label Issues</div>
                <p className="text-sm text-gray-500">
                  Please help us improve our dietary information by reporting any incorrect or missing labels.
                </p>
                
                {reportSubmitted ? (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="text-green-700">
                        Thank you for your feedback! We'll review this information.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 font-medium text-sm">Current labels that may be incorrect:</div>
                      <div className="flex flex-wrap gap-2">
                        {menuItem.dietaryInfo.length > 0 ? (
                          menuItem.dietaryInfo.map((label) => (
                            <Badge 
                              key={`current-${label}`} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-red-50"
                              onClick={() => handleReportIncorrect(label)}
                            >
                              {label} <AlertCircle className="h-3 w-3 ml-1 text-red-500" />
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No dietary labels currently applied.</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-2 font-medium text-sm">Labels that might be missing:</div>
                      <div className="flex flex-wrap gap-2">
                        {['Vegetarian', 'Vegan', 'Gluten-Free'].map((label) => (
                          !menuItem.dietaryInfo.includes(label) && (
                            <Badge 
                              key={`missing-${label}`}
                              variant="outline"
                              className="cursor-pointer hover:bg-green-50"
                              onClick={() => handleReportMissing(label)}
                            >
                              Add {label}
                            </Badge>
                          )
                        ))}
                        {['Vegetarian', 'Vegan', 'Gluten-Free'].every(label => 
                          menuItem.dietaryInfo.includes(label)) && (
                          <span className="text-sm text-gray-500">All common dietary labels are applied.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-2">{menuItem.description}</p>
        
        {menuItem.dietaryInfo && menuItem.dietaryInfo.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {menuItem.dietaryInfo.map((info) => (
              <Badge key={info} variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                {info}
              </Badge>
            ))}
          </div>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-sm flex items-center justify-center gap-1 mb-1"
          onClick={toggleIngredients}
        >
          <Utensils className="h-3.5 w-3.5" />
          {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'} 
        </Button>
        
        {showIngredients && menuItem.ingredients && (
          <div className="mb-3 bg-amber-50 p-3 rounded-md border border-amber-100">
            <p className="text-xs font-medium text-amber-800 mb-1">Ingredients:</p>
            <p className="text-xs text-amber-700 leading-relaxed">{menuItem.ingredients}</p>
          </div>
        )}
        
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
