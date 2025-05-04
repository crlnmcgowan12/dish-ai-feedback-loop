
import React, { useState } from 'react';
import { University } from '../types';
import { universities, toggleFavoriteUniversity } from '../services/universityService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface UniversitySelectorProps {
  selectedUniversity: University | null;
  onUniversityChange: (university: University) => void;
}

const UniversitySelector: React.FC<UniversitySelectorProps> = ({ 
  selectedUniversity, 
  onUniversityChange 
}) => {
  // Get favorites for display at the top
  const favoriteUniversities = universities.filter(u => u.isFavorite);
  const regularUniversities = universities.filter(u => !u.isFavorite);
  
  // Combine with favorites at the top
  const sortedUniversities = [...favoriteUniversities, ...regularUniversities];

  const handleFavoriteToggle = () => {
    if (!selectedUniversity) return;
    
    const updated = toggleFavoriteUniversity(selectedUniversity.id);
    onUniversityChange(updated);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-1">
        <label htmlFor="university-select" className="block text-sm font-medium text-gray-700">
          Select Your University
        </label>
        {selectedUniversity && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleFavoriteToggle}
                className="p-1 h-auto"
              >
                <Star 
                  className={`h-4 w-4 ${selectedUniversity.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                />
                <span className="sr-only">
                  {selectedUniversity.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {selectedUniversity.isFavorite 
                ? 'Remove from favorites' 
                : 'Add to favorites for quick access'}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Select
        value={selectedUniversity?.id || ""}
        onValueChange={(value) => {
          const university = universities.find(u => u.id === value);
          if (university) {
            onUniversityChange(university);
          }
        }}
      >
        <SelectTrigger className="w-full" id="university-select">
          <SelectValue placeholder="Select a university" />
        </SelectTrigger>
        <SelectContent>
          {favoriteUniversities.length > 0 && (
            <>
              <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
                Favorites
              </div>
              {favoriteUniversities.map((university) => (
                <SelectItem key={university.id} value={university.id}>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-2 fill-yellow-400 text-yellow-400" />
                    {university.name}
                  </div>
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-xs font-medium text-gray-500 border-t mt-1 pt-1">
                All Universities
              </div>
            </>
          )}
          {regularUniversities.map((university) => (
            <SelectItem key={university.id} value={university.id}>
              {university.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UniversitySelector;
