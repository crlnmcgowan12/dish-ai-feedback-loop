
import { DiningHall, MenuItem, Rating, HistoricalRating, MealPeriod } from '../types';

// Generate a random device ID for anonymous ratings
export const getDeviceId = (): string => {
  const deviceId = localStorage.getItem('campusDishDeviceId');
  if (deviceId) return deviceId;
  
  const newDeviceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('campusDishDeviceId', newDeviceId);
  return newDeviceId;
};

// Mock Dining Halls
export const diningHalls: DiningHall[] = [
  {
    id: '1',
    name: 'University Center',
    location: 'Central Campus',
    hours: '7:00 AM - 9:00 PM',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980',
  },
  {
    id: '2',
    name: 'North Commons',
    location: 'North Campus',
    hours: '7:30 AM - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1950',
  },
  {
    id: '3',
    name: 'South Dining Hall',
    location: 'South Campus',
    hours: '8:00 AM - 8:30 PM',
    image: 'https://images.unsplash.com/photo-1656131590461-7f68a54dce4c?q=80&w=1770',
  }
];

// Mock Menu Items
const generateMenuItems = (): MenuItem[] => {
  const menuItems: MenuItem[] = [];
  const categories = ['Entree', 'Side', 'Dessert', 'Beverage'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal', 'Kosher'];
  
  const breakfastItems = [
    'Scrambled Eggs', 'Pancakes', 'French Toast', 'Oatmeal', 'Bacon', 'Sausage',
    'Breakfast Burrito', 'Yogurt Parfait', 'Fresh Fruit', 'Cereal'
  ];
  
  const lunchItems = [
    'Burger', 'Pizza', 'Salad Bar', 'Sandwich', 'Soup of the Day', 'Pasta',
    'Stir Fry', 'Tacos', 'Quesadilla', 'Grilled Cheese'
  ];
  
  const dinnerItems = [
    'Grilled Chicken', 'Roasted Vegetables', 'Lasagna', 'Steak', 'Salmon',
    'Rice Bowl', 'Curry', 'Pasta Primavera', 'Tofu Stir Fry', 'Meatloaf'
  ];
  
  const images = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1770',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1650',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1770',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1770',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1770',
    'https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=1773'
  ];

  let id = 1;
  
  // Add breakfast items for each dining hall
  diningHalls.forEach((hall) => {
    breakfastItems.forEach((item, index) => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomDietary: string[] = [];
      
      // Assign 0-2 random dietary options
      for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
        const option = dietaryOptions[Math.floor(Math.random() * dietaryOptions.length)];
        if (!randomDietary.includes(option)) {
          randomDietary.push(option);
        }
      }
      
      menuItems.push({
        id: id.toString(),
        name: item,
        description: `Delicious ${item.toLowerCase()} fresh from our kitchen.`,
        category: randomCategory,
        dietaryInfo: randomDietary,
        mealPeriod: 'Breakfast',
        diningHallId: hall.id,
        averageRating: (2.5 + Math.random() * 2.5).toFixed(1) as unknown as number,
        ratingsCount: Math.floor(Math.random() * 50),
        image: images[Math.floor(Math.random() * images.length)]
      });
      id++;
    });
  });
  
  // Add lunch items for each dining hall
  diningHalls.forEach((hall) => {
    lunchItems.forEach((item) => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomDietary: string[] = [];
      
      // Assign 0-2 random dietary options
      for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
        const option = dietaryOptions[Math.floor(Math.random() * dietaryOptions.length)];
        if (!randomDietary.includes(option)) {
          randomDietary.push(option);
        }
      }
      
      menuItems.push({
        id: id.toString(),
        name: item,
        description: `Tasty ${item.toLowerCase()} made with quality ingredients.`,
        category: randomCategory,
        dietaryInfo: randomDietary,
        mealPeriod: 'Lunch',
        diningHallId: hall.id,
        averageRating: (2.5 + Math.random() * 2.5).toFixed(1) as unknown as number,
        ratingsCount: Math.floor(Math.random() * 50),
        image: images[Math.floor(Math.random() * images.length)]
      });
      id++;
    });
  });
  
  // Add dinner items for each dining hall
  diningHalls.forEach((hall) => {
    dinnerItems.forEach((item) => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomDietary: string[] = [];
      
      // Assign 0-2 random dietary options
      for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
        const option = dietaryOptions[Math.floor(Math.random() * dietaryOptions.length)];
        if (!randomDietary.includes(option)) {
          randomDietary.push(option);
        }
      }
      
      menuItems.push({
        id: id.toString(),
        name: item,
        description: `Savory ${item.toLowerCase()} prepared by our talented chefs.`,
        category: randomCategory,
        dietaryInfo: randomDietary,
        mealPeriod: 'Dinner',
        diningHallId: hall.id,
        averageRating: (2.5 + Math.random() * 2.5).toFixed(1) as unknown as number,
        ratingsCount: Math.floor(Math.random() * 50),
        image: images[Math.floor(Math.random() * images.length)]
      });
      id++;
    });
  });
  
  return menuItems;
};

export const menuItems = generateMenuItems();

// Ratings storage (simulated backend)
const RATINGS_STORAGE_KEY = 'campusDishRatings';

// Load ratings from localStorage
export const getRatings = (): Rating[] => {
  const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save a rating
export const saveRating = (menuItemId: string, value: number): void => {
  const deviceId = getDeviceId();
  const ratings = getRatings();
  
  // Check if this device has already rated this item
  const existingRatingIndex = ratings.findIndex(
    (r) => r.menuItemId === menuItemId && r.deviceId === deviceId
  );
  
  const newRating: Rating = {
    id: existingRatingIndex >= 0 ? ratings[existingRatingIndex].id : Date.now().toString(),
    menuItemId,
    value,
    deviceId,
    timestamp: new Date().toISOString()
  };
  
  if (existingRatingIndex >= 0) {
    // Update existing rating
    ratings[existingRatingIndex] = newRating;
  } else {
    // Add new rating
    ratings.push(newRating);
  }
  
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
  updateAverageRatings();
};

// Update average ratings for all menu items
export const updateAverageRatings = (): void => {
  const ratings = getRatings();
  const ratingsByItem: Record<string, number[]> = {};
  
  // Group ratings by menu item
  ratings.forEach((rating) => {
    if (!ratingsByItem[rating.menuItemId]) {
      ratingsByItem[rating.menuItemId] = [];
    }
    ratingsByItem[rating.menuItemId].push(rating.value);
  });
  
  // Update average ratings for each item
  for (const item of menuItems) {
    const itemRatings = ratingsByItem[item.id] || [];
    if (itemRatings.length > 0) {
      const sum = itemRatings.reduce((acc, val) => acc + val, 0);
      item.averageRating = parseFloat((sum / itemRatings.length).toFixed(1));
      item.ratingsCount = itemRatings.length;
    }
  }
};

// Get menu items for a specific dining hall and meal period
export const getMenuItemsByDiningHallAndMeal = (
  diningHallId: string,
  mealPeriod: MealPeriod
): MenuItem[] => {
  return menuItems.filter(
    (item) => item.diningHallId === diningHallId && item.mealPeriod === mealPeriod
  );
};

// Get historical ratings for a menu item (mock data)
export const getHistoricalRatings = (menuItemId: string): HistoricalRating[] => {
  const result: HistoricalRating[] = [];
  const today = new Date();
  
  // Generate 7 days of historical data
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Base the rating on the current average with some random variation
    const menuItem = menuItems.find((item) => item.id === menuItemId);
    const baseRating = menuItem ? menuItem.averageRating : 3;
    const randomVariation = (Math.random() * 1.5) - 0.75; // -0.75 to 0.75
    let rating = baseRating + randomVariation;
    rating = Math.min(Math.max(rating, 1), 5); // Clamp between 1 and 5
    
    result.push({
      date: date.toISOString().split('T')[0],
      averageRating: parseFloat(rating.toFixed(1)),
      count: Math.floor(Math.random() * 20) + 1
    });
  }
  
  return result;
};

// Initialize the ratings from localStorage
updateAverageRatings();
