
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MealPeriod } from '../types';
import { Coffee, Sun, Moon } from 'lucide-react';

interface MealTabsProps {
  activeMeal: MealPeriod;
  onMealChange: (meal: MealPeriod) => void;
}

const MealTabs: React.FC<MealTabsProps> = ({ activeMeal, onMealChange }) => {
  return (
    <Tabs
      value={activeMeal}
      onValueChange={(value: string) => onMealChange(value as MealPeriod)}
      className="w-full mb-6"
    >
      <TabsList className="w-full grid grid-cols-3 p-1">
        <TabsTrigger value="Breakfast" className="rounded-md flex items-center gap-1.5 py-2">
          <Coffee size={16} />
          <span>Breakfast</span>
        </TabsTrigger>
        <TabsTrigger value="Lunch" className="rounded-md flex items-center gap-1.5 py-2">
          <Sun size={16} />
          <span>Lunch</span>
        </TabsTrigger>
        <TabsTrigger value="Dinner" className="rounded-md flex items-center gap-1.5 py-2">
          <Moon size={16} />
          <span>Dinner</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MealTabs;
