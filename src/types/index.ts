
// Dining hall related types
export interface DiningHall {
  id: string;
  name: string;
  location: string;
  hours: string;
  dailyHours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients?: string; // Added ingredients field
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
  comment?: string; // Added comment field
  deviceId: string; // For anonymous ratings
  userId?: string; // For authenticated users
  timestamp: string; // ISO format
  menuItemName?: string; // Added for easier display on Reviews page
  diningHallId?: string; // Added for easier filtering on Reviews page
}

export interface HistoricalRating {
  date: string; // ISO format for the day
  averageRating: number;
  count: number;
}

// University related types
export interface University {
  id: string;
  name: string;
  state: string;
  city: string;
  menuLink?: string; // Added menu link field
  isFavorite?: boolean; // Added favorite status
}

// Enums
export type MealPeriod = 'Breakfast' | 'Lunch' | 'Dinner';

// Sorting options for reviews
export type ReviewSortOption = 'highest' | 'lowest' | 'newest' | 'oldest';
