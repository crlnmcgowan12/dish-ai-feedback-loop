
import React from 'react';
import { Link } from 'react-router-dom';
import { DiningHall } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import { Clock } from 'lucide-react';
import { getHoursForDiningHall } from '../services/menuScraperService';

interface DiningHallCardProps {
  diningHall: DiningHall;
}

const DiningHallCard: React.FC<DiningHallCardProps> = ({ diningHall }) => {
  // Get current day of week
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof diningHall.dailyHours;
  
  // Check if we have scraped hours from the official website
  const scrapedHours = getHoursForDiningHall(diningHall.id);
  const todaysHours = scrapedHours 
    ? scrapedHours[currentDay]
    : diningHall.dailyHours[currentDay];
  
  // Check if hours are from official source
  const isOfficialHours = !!scrapedHours;

  return (
    <Link to={`/dining-hall/${diningHall.id}`} className="block">
      <Card className="h-full overflow-hidden card-hover">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={diningHall.image}
            alt={diningHall.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-semibold text-campus-primary">{diningHall.name}</h3>
        </CardHeader>
        <CardContent className="pb-2 pt-0">
          <p className="text-sm text-gray-600 mb-2">{diningHall.location}</p>
          <div className="h-px bg-gradient-to-r from-campus-primary/20 via-campus-secondary/30 to-campus-primary/20 my-2"></div>
        </CardContent>
        <CardFooter className="pt-0 text-sm text-gray-500 flex flex-col items-start">
          <div className="flex items-center gap-1 text-xs text-campus-secondary font-medium mb-1">
            <Clock size={14} className="opacity-70" />
            <span>Today's Hours ({currentDay})</span>
            {isOfficialHours && (
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full ml-1 text-[10px] font-medium">
                Official
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-gray-600">{todaysHours}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DiningHallCard;
