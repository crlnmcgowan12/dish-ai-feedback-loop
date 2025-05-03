
import { MenuItem, MealPeriod } from '../types';
import { toast } from '../hooks/use-toast';

// Local storage key for scraped menu items
const SCRAPED_MENU_ITEMS_KEY = 'campusDish_scrapedMenuItems';

// Function to extract menu items from a website
export const scrapeMenuFromWebsite = async (
  url: string,
  diningHallId: string
): Promise<MenuItem[] | null> => {
  try {
    // In a real application, this would make an API call to a backend service
    // that would scrape the website. For this demo, we'll simulate scraping
    // with a mock response after a short delay.
    
    // Simulate network request
    toast({
      title: "Scraping Menu",
      description: "Fetching menu items from the provided link...",
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate some random menu items based on the URL
    // This simulates what would be extracted from the website
    const scrapedItems = generateMockScrapedItems(diningHallId);
    
    // Save to local storage
    saveScrapedMenuItems(diningHallId, scrapedItems);
    
    toast({
      title: "Menu Imported",
      description: `Successfully imported ${scrapedItems.length} menu items.`,
      variant: "success"
    });
    
    return scrapedItems;
  } catch (error) {
    console.error('Error scraping menu:', error);
    toast({
      title: "Import Failed",
      description: "Failed to import menu items from the provided link.",
      variant: "destructive"
    });
    return null;
  }
};

// Save scraped menu items to local storage
export const saveScrapedMenuItems = (diningHallId: string, items: MenuItem[]): void => {
  const storedItems = getScrapedMenuItems();
  
  // Filter out existing items for this dining hall
  const filteredItems = storedItems.filter(item => item.diningHallId !== diningHallId);
  
  // Add new items
  const updatedItems = [...filteredItems, ...items];
  
  // Save to localStorage
  localStorage.setItem(SCRAPED_MENU_ITEMS_KEY, JSON.stringify(updatedItems));
};

// Get all scraped menu items from local storage
export const getScrapedMenuItems = (): MenuItem[] => {
  const stored = localStorage.getItem(SCRAPED_MENU_ITEMS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Get scraped menu items for a specific dining hall and meal period
export const getScrapedMenuItemsByDiningHallAndMeal = (
  diningHallId: string,
  mealPeriod: MealPeriod
): MenuItem[] => {
  const allItems = getScrapedMenuItems();
  return allItems.filter(
    item => item.diningHallId === diningHallId && item.mealPeriod === mealPeriod
  );
};

// Helper function to generate mock scraped items
// In a real application, this would be replaced by actual scraping logic
const generateMockScrapedItems = (diningHallId: string): MenuItem[] => {
  const mealPeriods: MealPeriod[] = ['Breakfast', 'Lunch', 'Dinner'];
  const categories = ['Entree', 'Side', 'Dessert'];
  const dietaryInfo = [
    ['Vegetarian'], 
    ['Vegetarian', 'Gluten-Free'], 
    ['Vegan', 'Gluten-Free'], 
    []
  ];
  
  const breakfastItems = [
    'Pancakes', 'Omelette Station', 'Breakfast Burrito', 
    'Oatmeal Bar', 'Fresh Fruit', 'Breakfast Sandwich'
  ];
  
  const lunchItems = [
    'Pizza Station', 'Burger Bar', 'Salad Bar', 
    'Sandwich Station', 'Soup of the Day', 'Pasta Bar'
  ];
  
  const dinnerItems = [
    'Carved Turkey', 'Vegetable Stir Fry', 'Pasta Alfredo',
    'Roasted Vegetables', 'Grilled Salmon', 'Taco Bar'
  ];
  
  const itemsByMeal = {
    'Breakfast': breakfastItems,
    'Lunch': lunchItems,
    'Dinner': dinnerItems
  };
  
  const result: MenuItem[] = [];
  
  // Generate items for each meal period
  mealPeriods.forEach(mealPeriod => {
    const items = itemsByMeal[mealPeriod];
    items.forEach((itemName, index) => {
      const category = categories[index % categories.length];
      const dietary = dietaryInfo[index % dietaryInfo.length];
      
      result.push({
        id: `scraped_${diningHallId}_${mealPeriod}_${index}`,
        name: itemName,
        description: `Fresh ${itemName.toLowerCase()} prepared daily by our chefs.`,
        ingredients: `Various ingredients for ${itemName.toLowerCase()}.`,
        category,
        dietaryInfo: dietary,
        mealPeriod,
        diningHallId,
        averageRating: 0,
        ratingsCount: 0,
        image: `https://images.unsplash.com/photo-${1500000000 + index * 10000}?auto=format&fit=crop&w=800&h=600`
      });
    });
  });
  
  return result;
};
