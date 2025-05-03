
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { saveRating } from '../services/ratingsService';

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

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

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
    
    setRating(value);
    saveRating(menuItemId, value);
    
    if (onRatingChange) {
      onRatingChange();
    }
  };

  return (
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
  );
};

export default StarRating;
