
import React from 'react';
import { MenuItem } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import StarRating from './StarRating';

interface MenuItemCardProps {
  menuItem: MenuItem;
  onRatingChange?: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem, onRatingChange }) => {
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
        <div className="flex flex-wrap gap-1 mb-2">
          {menuItem.dietaryInfo.map((info) => (
            <Badge key={info} variant="secondary" className="text-xs">
              {info}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <span className="text-sm mr-2">
              {menuItem.averageRating} ({menuItem.ratingsCount})
            </span>
            <StarRating
              menuItemId={menuItem.id}
              initialRating={menuItem.averageRating}
              size="sm"
              readOnly
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          <p className="text-sm mb-2">Rate this item:</p>
          <StarRating
            menuItemId={menuItem.id}
            size="md"
            onRatingChange={() => {
              if (onRatingChange) onRatingChange();
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
