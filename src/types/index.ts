
// Dining hall related types
export interface DiningHall {
  id: string;
  name: string;
  location: string;
  hours: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., "Entree", "Side", "Dessert"
  dietaryInfo: string[]; // e.g., ["Vegetarian", "Gluten-Free"]
  mealPeriod: MealPeriod;
  diningHallId: string;
  averageRating: number;
  ratingsCount: number;
  image?: string;
}

export interface Rating {
  id: string;
  menuItemId: string;
  value: number; // 1-5
  deviceId: string; // For anonymous ratings
  timestamp: string; // ISO format
}

export interface HistoricalRating {
  date: string; // ISO format for the day
  averageRating: number;
  count: number;
}

// Enums
export type MealPeriod = 'Breakfast' | 'Lunch' | 'Dinner';
