
import React from 'react';
import { Link } from 'react-router-dom';
import { DiningHall } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';

interface DiningHallCardProps {
  diningHall: DiningHall;
}

const DiningHallCard: React.FC<DiningHallCardProps> = ({ diningHall }) => {
  // Get current day of week
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof diningHall.dailyHours;

  return (
    <Link to={`/dining-hall/${diningHall.id}`} className="block">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={diningHall.image}
            alt={diningHall.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-semibold">{diningHall.name}</h3>
        </CardHeader>
        <CardContent className="pb-2 pt-0">
          <p className="text-sm text-gray-600">{diningHall.location}</p>
        </CardContent>
        <CardFooter className="pt-0 text-sm text-gray-500 flex flex-col items-start">
          <p className="font-medium text-xs text-gray-700">Today's Hours ({currentDay}):</p>
          <p className="line-clamp-2">{diningHall.dailyHours[currentDay]}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DiningHallCard;
