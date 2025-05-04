
import { MenuItem, MealPeriod } from '../types';
import { toast } from '../hooks/use-toast';

// Local storage key for scraped menu items
const SCRAPED_MENU_ITEMS_KEY = 'campusDish_scrapedMenuItems';

/**
 * Simulates extracting menu items from a website
 * In a real application, this would make a backend API call
 * Here we simulate the process for demo purposes
 */
export const scrapeMenuFromWebsite = async (
  url: string,
  diningHallId: string
): Promise<MenuItem[] | null> => {
  try {
    // Validate URL before proceeding
    if (!isValidURL(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive"
      });
      return null;
    }
    
    // Remove trailing slash if present for consistent handling
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    
    // Simulate menu page navigation
    toast({
      title: "Navigating to Menu Page",
      description: `Accessing ${new URL(cleanUrl).hostname}...`,
    });
    
    await simulateNetworkDelay(800);
    
    // Simulate detecting dining halls
    toast({
      title: "Analyzing Website",
      description: "Identifying dining hall structure...",
    });
    
    await simulateNetworkDelay(1000);
    
    // Simulate menu extraction
    toast({
      title: "Scraping Menu",
      description: "Fetching menu items from the provided link...",
    });
    
    await simulateNetworkDelay(1500);
    
    // Generate some random menu items based on the URL
    // This simulates what would be extracted from the website
    const scrapedItems = generateMockScrapedItems(diningHallId, cleanUrl);
    
    // Save to local storage
    saveScrapedMenuItems(diningHallId, scrapedItems);
    
    toast({
      title: "Menu Imported",
      description: `Successfully imported ${scrapedItems.length} menu items.`,
      variant: "default"
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

// Helper to validate URLs
const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Simulate network delay
const simulateNetworkDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
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
const generateMockScrapedItems = (diningHallId: string, url: string): MenuItem[] => {
  const mealPeriods: MealPeriod[] = ['Breakfast', 'Lunch', 'Dinner'];
  const categories = ['Entree', 'Side', 'Dessert', 'Beverage'];
  const dietaryInfo = [
    ['Vegetarian'], 
    ['Vegetarian', 'Gluten-Free'], 
    ['Vegan', 'Gluten-Free'], 
    []
  ];
  
  // Different menu items based on the URL domain to simulate different websites having different menus
  let domainBasedItems: Record<string, Record<MealPeriod, string[]>> = {
    default: {
      'Breakfast': [
        'Pancakes', 'Omelette Station', 'Breakfast Burrito', 
        'Oatmeal Bar', 'Fresh Fruit', 'Breakfast Sandwich'
      ],
      'Lunch': [
        'Pizza Station', 'Burger Bar', 'Salad Bar', 
        'Sandwich Station', 'Soup of the Day', 'Pasta Bar'
      ],
      'Dinner': [
        'Carved Turkey', 'Vegetable Stir Fry', 'Pasta Alfredo',
        'Roasted Vegetables', 'Grilled Salmon', 'Taco Bar'
      ]
    }
  };
  
  // Add specific domains for realistic simulation
  domainBasedItems['harvard.edu'] = {
    'Breakfast': ['Harvard Square Pancakes', 'Cambridge Omelette', 'Veritas Breakfast Bowl', 'Crimson Yogurt Parfait'],
    'Lunch': ['Harvard Club Sandwich', 'Quincy House Salad', 'Academic Bowl Soup', 'John Harvard Burger'],
    'Dinner': ['New England Clam Chowder', 'Charles River Salmon', 'Massachusetts Steak', 'Widener Library Pasta']
  };
  
  domainBasedItems['stanford.edu'] = {
    'Breakfast': ['Cardinal Morning Bowl', 'Palo Alto Pancakes', 'Silicon Valley Smoothies', 'Stanford Sunrise Wrap'],
    'Lunch': ['Tree House Salad', 'Memorial Court Sandwich', 'Stanford GSB Burger', 'Computer Science Curry'],
    'Dinner': ['California Veggie Plate', 'Cardinal Chicken', 'Stanford Steak', 'Farm to Table Specials']
  };
  
  domainBasedItems['berkeley.edu'] = {
    'Breakfast': ['Golden Bear Granola', 'Berkeley Breakfast Bowl', 'Bay Area Avocado Toast', 'Cal Crêpes'],
    'Lunch': ['Telegraph Ave Tacos', 'Sproul Plaza Salad', 'Berkeley Bowl', 'Campanile Club Sandwich'],
    'Dinner': ['California Cuisine Plate', 'Chez Panisse Inspired Entrée', 'Bears' Den Burger', 'Bay View Pasta']
  };
  
  // Determine which menu items to use based on URL
  let domainName = 'default';
  try {
    const hostname = new URL(url).hostname;
    const possibleDomains = Object.keys(domainBasedItems);
    
    // Find matching domain name
    for (const domain of possibleDomains) {
      if (hostname.includes(domain)) {
        domainName = domain;
        break;
      }
    }
  } catch (e) {
    // Use default if URL parsing fails
  }
  
  const itemsByMeal = domainBasedItems[domainName] || domainBasedItems.default;
  
  const result: MenuItem[] = [];
  
  // Generate items for each meal period
  mealPeriods.forEach(mealPeriod => {
    const items = itemsByMeal[mealPeriod];
    items.forEach((itemName, index) => {
      const category = categories[index % categories.length];
      const dietary = dietaryInfo[index % dietaryInfo.length];
      
      // Use the URL domain in the ID to simulate website-specific data
      result.push({
        id: `scraped_${diningHallId}_${domainName}_${mealPeriod}_${index}`,
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

