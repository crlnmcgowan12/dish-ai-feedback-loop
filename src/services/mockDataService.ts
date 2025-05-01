import { DiningHall, MenuItem, HistoricalRating, MealPeriod } from '../types';

// Dining halls organized by university ID
export const universityDiningHalls: Record<string, DiningHall[]> = {
  // Harvard dining halls
  "1": [
    {
      id: "101",
      name: "Annenberg Hall",
      location: "Memorial Hall",
      hours: "7:30 AM - 7:30 PM (Mon-Fri), 8:00 AM - 7:00 PM (Sat-Sun)",
      dailyHours: {
        Monday: "7:30 AM - 7:30 PM",
        Tuesday: "7:30 AM - 7:30 PM",
        Wednesday: "7:30 AM - 7:30 PM",
        Thursday: "7:30 AM - 7:30 PM",
        Friday: "7:30 AM - 7:30 PM",
        Saturday: "8:00 AM - 7:00 PM",
        Sunday: "8:00 AM - 7:00 PM"
      },
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&h=800"
    },
    {
      id: "102",
      name: "Leverett House Dining Hall",
      location: "28 DeWolfe St",
      hours: "7:30 AM - 10:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
      dailyHours: {
        Monday: "7:30 AM - 10:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Tuesday: "7:30 AM - 10:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Wednesday: "7:30 AM - 10:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Thursday: "7:30 AM - 10:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Friday: "7:30 AM - 10:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Saturday: "8:00 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:00 PM",
        Sunday: "8:00 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:00 PM"
      },
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=800"
    }
  ],
  // Stanford dining halls
  "2": [
    {
      id: "201",
      name: "Arrillaga Family Dining Commons",
      location: "489 Arguello Way",
      hours: "6:30 AM - 9:30 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:30 PM",
      dailyHours: {
        Monday: "6:30 AM - 9:30 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Tuesday: "6:30 AM - 9:30 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Wednesday: "6:30 AM - 9:30 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Thursday: "6:30 AM - 9:30 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Friday: "6:30 AM - 9:30 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Saturday: "7:30 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Sunday: "7:30 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM"
      },
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&h=800"
    },
    {
      id: "202",
      name: "Lakeside Dining",
      location: "326 Santa Teresa St",
      hours: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
      dailyHours: {
        Monday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Tuesday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Wednesday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Thursday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Friday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Saturday: "8:00 AM - 11:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM",
        Sunday: "8:00 AM - 11:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 7:30 PM"
      },
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=1200&h=800"
    }
  ],
  // UNC Chapel Hill dining halls
  "15": [
    {
      id: "1501",
      name: "Lenoir Hall",
      location: "South Campus",
      hours: "7:00 AM - 10:00 PM (Mon-Fri), 10:00 AM - 8:00 PM (Sat-Sun)",
      dailyHours: {
        Monday: "7:00 AM - 10:00 PM",
        Tuesday: "7:00 AM - 10:00 PM",
        Wednesday: "7:00 AM - 10:00 PM",
        Thursday: "7:00 AM - 10:00 PM",
        Friday: "7:00 AM - 10:00 PM",
        Saturday: "10:00 AM - 8:00 PM",
        Sunday: "10:00 AM - 8:00 PM"
      },
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&h=800"
    },
    {
      id: "1502",
      name: "Chase Dining Hall",
      location: "North Campus",
      hours: "7:00 AM - 9:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 9:00 PM",
      dailyHours: {
        Monday: "7:00 AM - 9:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 9:00 PM",
        Tuesday: "7:00 AM - 9:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 9:00 PM",
        Wednesday: "7:00 AM - 9:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 9:00 PM",
        Thursday: "7:00 AM - 9:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 9:00 PM",
        Friday: "7:00 AM - 9:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Saturday: "8:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Sunday: "8:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 5:00 PM - 8:00 PM"
      },
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=800"
    }
  ],
  // UNC Charlotte dining halls
  "16": [
    {
      id: "1601",
      name: "SoVi Dining Hall",
      location: "South Village",
      hours: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 4:30 PM - 9:00 PM (Mon-Fri), 10:30 AM - 2:00 PM, 5:00 PM - 8:00 PM (Sat-Sun)",
      dailyHours: {
        Monday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 4:30 PM - 9:00 PM",
        Tuesday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 4:30 PM - 9:00 PM",
        Wednesday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 4:30 PM - 9:00 PM",
        Thursday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 4:30 PM - 9:00 PM",
        Friday: "7:00 AM - 10:00 AM, 11:00 AM - 2:00 PM, 4:30 PM - 9:00 PM",
        Saturday: "10:30 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Sunday: "10:30 AM - 2:00 PM, 5:00 PM - 8:00 PM"
      },
      image: "https://images.unsplash.com/photo-1635321593217-40050ad13c74?auto=format&fit=crop&w=1200&h=800"
    },
    {
      id: "1602",
      name: "Crown Commons",
      location: "Student Union",
      hours: "7:30 AM - 9:00 PM (Mon-Thu), 7:30 AM - 8:00 PM (Fri), 10:30 AM - 8:00 PM (Sat-Sun)",
      dailyHours: {
        Monday: "7:30 AM - 9:00 PM",
        Tuesday: "7:30 AM - 9:00 PM",
        Wednesday: "7:30 AM - 9:00 PM",
        Thursday: "7:30 AM - 9:00 PM",
        Friday: "7:30 AM - 8:00 PM",
        Saturday: "10:30 AM - 8:00 PM",
        Sunday: "10:30 AM - 8:00 PM"
      },
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=800"
    }
  ],
  // Default dining halls for all other universities
  "default": [
    {
      id: "901",
      name: "Main Dining Hall",
      location: "Student Center",
      hours: "7:00 AM - 10:00 AM, 11:00 AM - 2:30 PM, 5:00 PM - 9:00 PM",
      dailyHours: {
        Monday: "7:00 AM - 10:00 AM, 11:00 AM - 2:30 PM, 5:00 PM - 9:00 PM",
        Tuesday: "7:00 AM - 10:00 AM, 11:00 AM - 2:30 PM, 5:00 PM - 9:00 PM",
        Wednesday: "7:00 AM - 10:00 AM, 11:00 AM - 2:30 PM, 5:00 PM - 9:00 PM",
        Thursday: "7:00 AM - 10:00 AM, 11:00 AM - 2:30 PM, 5:00 PM - 9:00 PM",
        Friday: "7:00 AM - 10:00 AM, 11:00 AM - 2:30 PM, 5:00 PM - 9:00 PM",
        Saturday: "8:00 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Sunday: "8:00 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM"
      },
      image: "https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?auto=format&fit=crop&w=1200&h=800"
    },
    {
      id: "902",
      name: "North Campus Dining",
      location: "North Quadrangle",
      hours: "7:30 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
      dailyHours: {
        Monday: "7:30 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Tuesday: "7:30 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Wednesday: "7:30 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Thursday: "7:30 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
        Friday: "7:30 AM - 10:30 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Saturday: "9:00 AM - 11:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:00 PM",
        Sunday: "9:00 AM - 11:00 AM, 11:30 AM - 2:00 PM, 5:00 PM - 8:00 PM"
      },
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1200&h=800"
    },
    {
      id: "903",
      name: "South Commons",
      location: "South Residence Area",
      hours: "8:00 AM - 10:30 AM, 11:00 AM - 2:30 PM, 5:00 PM - 10:00 PM",
      dailyHours: {
        Monday: "8:00 AM - 10:30 AM, 11:00 AM - 2:30 PM, 5:00 PM - 10:00 PM",
        Tuesday: "8:00 AM - 10:30 AM, 11:00 AM - 2:30 PM, 5:00 PM - 10:00 PM",
        Wednesday: "8:00 AM - 10:30 AM, 11:00 AM - 2:30 PM, 5:00 PM - 10:00 PM",
        Thursday: "8:00 AM - 10:30 AM, 11:00 AM - 2:30 PM, 5:00 PM - 10:00 PM",
        Friday: "8:00 AM - 10:30 AM, 11:00 AM - 2:30 PM, 5:00 PM - 10:00 PM",
        Saturday: "9:00 AM - 11:00 AM, 11:30 AM - 2:30 PM, 5:00 PM - 9:00 PM",
        Sunday: "9:00 AM - 11:00 AM, 11:30 AM - 2:30 PM, 5:00 PM - 9:00 PM"
      },
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&h=800"
    }
  ]
};

// Helper function to get dining halls for a specific university
export const getDiningHallsByUniversity = (universityId: string): DiningHall[] => {
  return universityDiningHalls[universityId] || universityDiningHalls["default"];
};

// Maintain a list of all dining halls for backward compatibility
export const diningHalls: DiningHall[] = Object.values(universityDiningHalls).flat();

// Sample menu items
export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and cheese.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "901",
    averageRating: 4.2,
    ratingsCount: 120,
    image: "/placeholder.svg"
  },
  {
    id: "m2",
    name: "Vegetarian Pizza",
    description: "Delicious pizza with a variety of fresh vegetables.",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Dinner",
    diningHallId: "902",
    averageRating: 4.5,
    ratingsCount: 95,
    image: "/placeholder.svg"
  },
  {
    id: "m3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan cheese and Caesar dressing.",
    category: "Side",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "901",
    averageRating: 4.0,
    ratingsCount: 80,
    image: "/placeholder.svg"
  },
  {
    id: "m4",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting.",
    category: "Dessert",
    dietaryInfo: [],
    mealPeriod: "Dinner",
    diningHallId: "902",
    averageRating: 4.7,
    ratingsCount: 110,
    image: "/placeholder.svg"
  },
  {
    id: "m5",
    name: "Grilled Chicken Sandwich",
    description: "Grilled chicken breast with avocado and chipotle mayo.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "903",
    averageRating: 4.3,
    ratingsCount: 100,
    image: "/placeholder.svg"
  },
  {
    id: "m6",
    name: "Pasta Primavera",
    description: "Pasta with seasonal vegetables in a light cream sauce.",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Dinner",
    diningHallId: "903",
    averageRating: 4.4,
    ratingsCount: 85,
    image: "/placeholder.svg"
  },
  {
    id: "m7",
    name: "Apple Pie",
    description: "Classic apple pie with a flaky crust.",
    category: "Dessert",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Dinner",
    diningHallId: "901",
    averageRating: 4.6,
    ratingsCount: 125,
    image: "/placeholder.svg"
  },
  {
    id: "m8",
    name: "Tomato Soup",
    description: "Creamy tomato soup with basil.",
    category: "Side",
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealPeriod: "Lunch",
    diningHallId: "902",
    averageRating: 4.1,
    ratingsCount: 75,
    image: "/placeholder.svg"
  },
  {
    id: "m9",
    name: "Salmon with Roasted Vegetables",
    description: "Grilled salmon served with a medley of roasted vegetables.",
    category: "Entree",
    dietaryInfo: ["Gluten-Free"],
    mealPeriod: "Dinner",
    diningHallId: "1601",
    averageRating: 4.5,
    ratingsCount: 90,
    image: "/placeholder.svg"
  },
  {
    id: "m10",
    name: "Black Bean Burger",
    description: "Vegetarian black bean burger with all the fixings.",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.2,
    ratingsCount: 115,
    image: "/placeholder.svg"
  },
  {
    id: "m11",
    name: "Chicken Tenders",
    description: "Crispy chicken tenders served with your choice of dipping sauce.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Dinner",
    diningHallId: "1501",
    averageRating: 3.8,
    ratingsCount: 150,
    image: "/placeholder.svg"
  },
    {
    id: "m12",
    name: "Mac and Cheese",
    description: "Creamy mac and cheese",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "1502",
    averageRating: 3.8,
    ratingsCount: 150,
    image: "/placeholder.svg"
  },
];

// Sample historical ratings
export const historicalRatings: Record<string, HistoricalRating[]> = {
  "m1": [
    { date: "2024-01-01", averageRating: 4.1, count: 30 },
    { date: "2024-01-02", averageRating: 4.3, count: 35 },
    { date: "2024-01-03", averageRating: 4.2, count: 40 }
  ],
  "m2": [
    { date: "2024-01-01", averageRating: 4.4, count: 25 },
    { date: "2024-01-02", averageRating: 4.6, count: 30 },
    { date: "2024-01-03", averageRating: 4.5, count: 32 }
  ],
  "m3": [
    { date: "2024-01-01", averageRating: 3.9, count: 20 },
    { date: "2024-01-02", averageRating: 4.1, count: 22 },
    { date: "2024-01-03", averageRating: 4.0, count: 28 }
  ],
  "m9": [
    { date: "2024-01-01", averageRating: 4.3, count: 28 },
    { date: "2024-01-02", averageRating: 4.5, count: 32 },
    { date: "2024-01-03", averageRating: 4.4, count: 36 }
  ],
  "m10": [
    { date: "2024-01-01", averageRating: 4.0, count: 32 },
    { date: "2024-01-02", averageRating: 4.2, count: 38 },
    { date: "2024-01-03", averageRating: 4.1, count: 42 }
  ],
    "m11": [
    { date: "2024-01-01", averageRating: 3.9, count: 32 },
    { date: "2024-01-02", averageRating: 4.1, count: 38 },
    { date: "2024-01-03", averageRating: 4.0, count: 42 }
  ],
      "m12": [
    { date: "2024-01-01", averageRating: 3.7, count: 32 },
    { date: "2024-01-02", averageRating: 3.9, count: 38 },
    { date: "2024-01-03", averageRating: 3.8, count: 42 }
  ],
};

// Function to get menu items for a specific dining hall and meal period
export const getMenuItems = (diningHallId: string, mealPeriod?: MealPeriod): MenuItem[] => {
  return menuItems.filter(item => item.diningHallId === diningHallId && (!mealPeriod || item.mealPeriod === mealPeriod));
};

// Function to get historical ratings for a menu item
export const getHistoricalRatingsForItem = (menuItemId: string): HistoricalRating[] => {
  return historicalRatings[menuItemId] || [];
};

// NEW FUNCTIONS TO FIX MISSING EXPORTS

// Function to save a rating for a menu item
export const saveRating = (menuItemId: string, rating: number): void => {
  // Find the menu item
  const menuItem = menuItems.find(item => item.id === menuItemId);
  
  if (menuItem) {
    // Update the menu item's rating
    const totalRatingValue = menuItem.averageRating * menuItem.ratingsCount;
    const newTotalRatingValue = totalRatingValue + rating;
    const newRatingsCount = menuItem.ratingsCount + 1;
    
    menuItem.ratingsCount = newRatingsCount;
    menuItem.averageRating = parseFloat((newTotalRatingValue / newRatingsCount).toFixed(1));
    
    // Add to historical ratings if possible
    const today = new Date().toISOString().split('T')[0];
    
    if (!historicalRatings[menuItemId]) {
      historicalRatings[menuItemId] = [];
    }
    
    const existingRating = historicalRatings[menuItemId].find(r => r.date === today);
    
    if (existingRating) {
      const totalValue = existingRating.averageRating * existingRating.count;
      existingRating.count += 1;
      existingRating.averageRating = parseFloat(((totalValue + rating) / existingRating.count).toFixed(1));
    } else {
      historicalRatings[menuItemId].push({
        date: today,
        averageRating: rating,
        count: 1
      });
    }
  }
};

// Function to get menu items by dining hall and meal period
// This is an alias for the existing getMenuItems function to fix the missing export
export const getMenuItemsByDiningHallAndMeal = (diningHallId: string, mealPeriod: MealPeriod): MenuItem[] => {
  return getMenuItems(diningHallId, mealPeriod);
};

// Function to get historical ratings (alias for getHistoricalRatingsForItem)
export const getHistoricalRatings = (menuItemId: string): HistoricalRating[] => {
  return getHistoricalRatingsForItem(menuItemId);
};

// Function to simulate updating average ratings across the system
export const updateAverageRatings = (): void => {
  // In a real app, this would recalculate all averages from the database
  // For this mock, we'll just log that it was called
  console.log("Average ratings updated across the system");
};
