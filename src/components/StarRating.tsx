
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { saveRating, getUserRatingForMenuItem } from '../services/ratingsService';
import { isLoggedIn } from '../services/authService';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import AuthModal from './AuthModal';

interface StarRatingProps {
  menuItemId: string;
  initialRating?: number;
  size: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onRatingChange?: () => void;
}

const StarRating = ({
  menuItemId,
  initialRating = 0,
  size = 'md',
  readOnly = false,
  onRatingChange
}: StarRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // If readOnly, use the provided initialRating
    if (readOnly) {
      setRating(initialRating);
      return;
    }
    
    // For interactive ratings, check if the user has already rated this item
    const checkUserRating = async () => {
      const userRatingObj = getUserRatingForMenuItem(menuItemId);
      if (userRatingObj) {
        setRating(userRatingObj.value);
        setUserRating(userRatingObj.value);
      } else {
        setRating(0);
        setUserRating(0);
      }
    };
    
    checkUserRating();
  }, [initialRating, readOnly, menuItemId]);

  const sizes = {
    sm: {
      starSize: 16,
      gap: 1
    },
    md: {
      starSize: 20,
      gap: 2
    },
    lg: {
      starSize: 24,
      gap: 3
    }
  };

  const handleRating = (value: number) => {
    if (readOnly) return;
    
    // Check if user is logged in
    if (!isLoggedIn()) {
      setAuthModalOpen(true);
      return;
    }
    
    // Save the rating
    const result = saveRating(menuItemId, value);
    
    // Update UI only if rating was successfully saved
    if (result) {
      setRating(value);
      setUserRating(value);
      
      if (onRatingChange) {
        onRatingChange();
      }
    }
  };

  const handleAuthSuccess = () => {
    // After successful authentication, check if the user has a rating
    const userRatingObj = getUserRatingForMenuItem(menuItemId);
    if (userRatingObj) {
      setRating(userRatingObj.value);
      setUserRating(userRatingObj.value);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div
          className="inline-flex"
          style={{ gap: `${sizes[size].gap}px` }}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={sizes[size].starSize}
              className={`cursor-${readOnly ? 'default' : 'pointer'}`}
              fill={(hover !== null ? hover >= value : rating >= value) ? 'gold' : 'transparent'}
              stroke={(hover !== null ? hover >= value : rating >= value) ? 'gold' : 'gray'}
              strokeWidth={1.5}
              onMouseEnter={() => !readOnly && setHover(value)}
              onMouseLeave={() => !readOnly && setHover(null)}
              onClick={() => handleRating(value)}
              data-testid={`star-${value}`}
            />
          ))}
        </div>
        
        {!readOnly && !isLoggedIn() && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 p-1 h-auto" onClick={() => setAuthModalOpen(true)}>
                <span className="text-xs text-blue-600 hover:underline">Login to rate</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Login to save your ratings across devices and see your rating history
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        setOpen={setAuthModalOpen} 
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default StarRating;
