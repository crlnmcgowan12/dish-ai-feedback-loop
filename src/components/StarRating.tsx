
import React, { useState } from 'react';
import { toast } from 'sonner';
import { saveRating } from '../services/mockDataService';

interface StarRatingProps {
  menuItemId: string;
  initialRating?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  menuItemId,
  initialRating = 0,
  size = 'md',
  readOnly = false,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;

    setRating(selectedRating);
    if (onRatingChange) onRatingChange(selectedRating);
    
    // Save the rating
    saveRating(menuItemId, selectedRating);
    toast.success('Rating saved!');
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-lg';
      case 'md':
        return 'text-xl';
      case 'lg':
        return 'text-2xl';
      default:
        return 'text-xl';
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHoveredRating(star)}
          onMouseLeave={() => !readOnly && setHoveredRating(0)}
          disabled={readOnly}
          className={`${getSizeClass()} ${
            readOnly ? 'cursor-default' : 'cursor-pointer'
          } focus:outline-none transition-colors duration-200`}
          aria-label={`Rate ${star} stars`}
        >
          <span
            className={
              star <= (hoveredRating || rating)
                ? 'text-yellow-500'
                : 'text-gray-300'
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
