
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { MealPeriod } from '../types';

interface MealTabsProps {
  activeMeal: MealPeriod;
  onMealChange: (meal: MealPeriod) => void;
}

const MealTabs: React.FC<MealTabsProps> = ({ activeMeal, onMealChange }) => {
  return (
    <Tabs
      value={activeMeal}
      onValueChange={(value: string) => onMealChange(value as MealPeriod)}
      className="w-full mb-4"
    >
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="Breakfast">Breakfast</TabsTrigger>
        <TabsTrigger value="Lunch">Lunch</TabsTrigger>
        <TabsTrigger value="Dinner">Dinner</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MealTabs;
