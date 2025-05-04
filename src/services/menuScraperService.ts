
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
    
    // Step 1: Simulate menu page navigation
    toast({
      title: "Navigating to Menu Page",
      description: `Accessing ${new URL(cleanUrl).hostname}...`,
    });
    
    await simulateNetworkDelay(800);
    
    // Step 2: Simulate detecting dining hall structure
    toast({
      title: "Analyzing Website Structure",
      description: "Identifying dining hall menu layout...",
    });
    
    await simulateNetworkDelay(1000);
    
    // Step 3: Simulate menu deep scanning
    toast({
      title: "Deep Scanning Menu Pages",
      description: "Detecting meal periods and food items...",
    });
    
    await simulateNetworkDelay(1200);
    
    // Step 4: Simulate ingredient extraction
    toast({
      title: "Extracting Ingredient Information",
      description: "Analyzing detailed food components and nutritional data...",
    });
    
    await simulateNetworkDelay(1000);
    
    // Step 5: Simulate dietary label detection
    toast({
      title: "Detecting Dietary Information",
      description: "Identifying vegetarian, vegan, gluten-free options...",
    });
    
    await simulateNetworkDelay(800);
    
    // Generate enhanced mock menu items based on the URL
    const scrapedItems = generateDetailedMenuItems(diningHallId, cleanUrl);
    
    // Save to local storage
    saveScrapedMenuItems(diningHallId, scrapedItems);
    
    toast({
      title: "Menu Import Complete",
      description: `Successfully imported ${scrapedItems.length} menu items with detailed ingredient information.`,
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

// Helper function to generate detailed mock menu items
const generateDetailedMenuItems = (diningHallId: string, url: string): MenuItem[] => {
  const mealPeriods: MealPeriod[] = ['Breakfast', 'Lunch', 'Dinner'];
  
  // Enhanced ingredients and dietary information data
  const foodDetails: Record<string, {ingredients: string, dietary: string[]}> = {
    // Breakfast items
    "Pancakes": {
      ingredients: "Flour, eggs, milk, butter, baking powder, sugar, vanilla extract",
      dietary: ["Vegetarian"]
    },
    "Omelette Station": {
      ingredients: "Eggs, cheese, bell peppers, onions, mushrooms, spinach, tomatoes, ham (optional)",
      dietary: []
    },
    "Breakfast Burrito": {
      ingredients: "Flour tortilla, scrambled eggs, cheese, black beans, salsa, avocado",
      dietary: ["Vegetarian"]
    },
    "Oatmeal Bar": {
      ingredients: "Steel-cut oats, water, milk, cinnamon, brown sugar, berries, nuts, honey",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Fresh Fruit": {
      ingredients: "Seasonal selection of fresh fruit including apples, oranges, bananas, berries",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Breakfast Sandwich": {
      ingredients: "English muffin, fried egg, bacon, cheese, tomato",
      dietary: []
    },
    "Harvard Square Pancakes": {
      ingredients: "Flour, eggs, milk, butter, maple syrup, blueberries, powdered sugar",
      dietary: ["Vegetarian"]
    },
    "Cambridge Omelette": {
      ingredients: "Free-range eggs, artisanal cheese, baby spinach, heirloom tomatoes, herbs",
      dietary: ["Vegetarian", "Gluten-Free"]
    },
    "Veritas Breakfast Bowl": {
      ingredients: "Quinoa, poached egg, avocado, roasted sweet potato, kale, olive oil",
      dietary: ["Vegetarian", "Gluten-Free"]
    },
    "Crimson Yogurt Parfait": {
      ingredients: "Greek yogurt, house-made granola, local honey, fresh berries, mint",
      dietary: ["Vegetarian"]
    },
    "Cardinal Morning Bowl": {
      ingredients: "Acai base, granola, banana, strawberry, blueberry, coconut, honey",
      dietary: ["Vegetarian"]
    },
    "Palo Alto Pancakes": {
      ingredients: "Buttermilk, eggs, vanilla, flour, maple syrup, butter, seasonal berries",
      dietary: ["Vegetarian"]
    },
    "Silicon Valley Smoothies": {
      ingredients: "Almond milk, banana, spinach, protein powder, chia seeds, almond butter",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Stanford Sunrise Wrap": {
      ingredients: "Whole wheat tortilla, scrambled eggs, avocado, black beans, salsa fresca",
      dietary: ["Vegetarian"]
    },
    "Golden Bear Granola": {
      ingredients: "Rolled oats, honey, almonds, walnuts, pumpkin seeds, dried cranberries, cinnamon",
      dietary: ["Vegetarian"]
    },
    "Berkeley Breakfast Bowl": {
      ingredients: "Brown rice, poached eggs, avocado, roasted vegetables, tahini sauce",
      dietary: ["Vegetarian", "Gluten-Free"]
    },
    "Bay Area Avocado Toast": {
      ingredients: "Sourdough bread, smashed avocado, micro greens, olive oil, sea salt, poached egg",
      dietary: ["Vegetarian"]
    },
    "Cal Crêpes": {
      ingredients: "Flour, eggs, milk, butter, fresh seasonal berries, whipped cream, maple syrup",
      dietary: ["Vegetarian"]
    },
    
    // Lunch items
    "Pizza Station": {
      ingredients: "House-made dough, tomato sauce, mozzarella cheese, various toppings",
      dietary: ["Vegetarian"]
    },
    "Burger Bar": {
      ingredients: "Beef patty, brioche bun, lettuce, tomato, onion, pickles, American cheese",
      dietary: []
    },
    "Salad Bar": {
      ingredients: "Mixed greens, cherry tomatoes, cucumber, carrots, bell peppers, various dressings",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Sandwich Station": {
      ingredients: "Artisan bread, deli meats, cheeses, lettuce, tomato, onion, condiments",
      dietary: []
    },
    "Soup of the Day": {
      ingredients: "Varies daily - check with server for ingredients and allergens",
      dietary: []
    },
    "Pasta Bar": {
      ingredients: "Assorted pastas, marinara sauce, alfredo sauce, garlic, herbs, parmesan cheese",
      dietary: ["Vegetarian"]
    },
    "Harvard Club Sandwich": {
      ingredients: "Multi-grain bread, smoked turkey, avocado, bacon, lettuce, tomato, aioli",
      dietary: []
    },
    "Quincy House Salad": {
      ingredients: "Mixed greens, grilled chicken, goat cheese, dried cranberries, candied walnuts, balsamic vinaigrette",
      dietary: ["Gluten-Free"]
    },
    "Academic Bowl Soup": {
      ingredients: "Vegetable broth, seasonal vegetables, barley, herbs, olive oil",
      dietary: ["Vegan"]
    },
    "John Harvard Burger": {
      ingredients: "Grass-fed beef, brioche bun, aged cheddar, caramelized onions, special sauce",
      dietary: []
    },
    "Tree House Salad": {
      ingredients: "Spring mix, grilled tofu, edamame, shredded carrots, avocado, sesame ginger dressing",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Memorial Court Sandwich": {
      ingredients: "Focaccia bread, roasted turkey, brie cheese, green apple, honey mustard",
      dietary: []
    },
    "Stanford GSB Burger": {
      ingredients: "Grass-fed beef, artisanal roll, arugula, tomato jam, aged white cheddar",
      dietary: []
    },
    "Computer Science Curry": {
      ingredients: "Basmati rice, chickpeas, spinach, tomato, onion, garlic, ginger, curry spices, coconut milk",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Telegraph Ave Tacos": {
      ingredients: "Corn tortillas, seasoned black beans, avocado, salsa verde, cilantro, lime",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Sproul Plaza Salad": {
      ingredients: "Local greens, quinoa, roasted seasonal vegetables, goat cheese, balsamic vinaigrette",
      dietary: ["Vegetarian", "Gluten-Free"]
    },
    "Berkeley Bowl": {
      ingredients: "Brown rice, roasted sweet potatoes, kale, avocado, tempeh, tahini dressing",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Campanile Club Sandwich": {
      ingredients: "Sourdough bread, roasted turkey, bacon, avocado, greens, tomato, garlic aioli",
      dietary: []
    },
    
    // Dinner items
    "Carved Turkey": {
      ingredients: "Roasted turkey breast, herb gravy, cranberry sauce",
      dietary: ["Gluten-Free"]
    },
    "Vegetable Stir Fry": {
      ingredients: "Assorted vegetables, tofu, soy sauce, ginger, garlic, sesame oil",
      dietary: ["Vegan"]
    },
    "Pasta Alfredo": {
      ingredients: "Fettuccine pasta, heavy cream, butter, parmesan cheese, garlic, parsley",
      dietary: ["Vegetarian"]
    },
    "Roasted Vegetables": {
      ingredients: "Seasonal vegetables, olive oil, garlic, herbs, salt, pepper",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Grilled Salmon": {
      ingredients: "Atlantic salmon fillet, lemon, dill, butter, salt, pepper",
      dietary: ["Gluten-Free"]
    },
    "Taco Bar": {
      ingredients: "Corn and flour tortillas, seasoned beef, lettuce, tomatoes, cheese, sour cream, salsa",
      dietary: []
    },
    "New England Clam Chowder": {
      ingredients: "Clams, potatoes, onions, celery, bacon, heavy cream, herbs",
      dietary: []
    },
    "Charles River Salmon": {
      ingredients: "Wild-caught salmon, lemon herb butter, roasted asparagus, fingerling potatoes",
      dietary: ["Gluten-Free"]
    },
    "Massachusetts Steak": {
      ingredients: "Grass-fed ribeye, herb butter, roasted garlic mashed potatoes, seasonal vegetables",
      dietary: ["Gluten-Free"]
    },
    "Widener Library Pasta": {
      ingredients: "House-made pasta, heirloom tomato sauce, basil, parmesan, olive oil",
      dietary: ["Vegetarian"]
    },
    "California Veggie Plate": {
      ingredients: "Seasonal farm-to-table vegetables, quinoa, herb oil, lemon zest",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Cardinal Chicken": {
      ingredients: "Free-range chicken breast, white wine sauce, herb roasted potatoes, broccolini",
      dietary: ["Gluten-Free"]
    },
    "Stanford Steak": {
      ingredients: "Grass-fed New York strip, chimichurri, roasted fingerling potatoes, grilled asparagus",
      dietary: ["Gluten-Free"]
    },
    "Farm to Table Specials": {
      ingredients: "Rotating selection of dishes featuring locally sourced seasonal ingredients",
      dietary: []
    },
    "California Cuisine Plate": {
      ingredients: "Locally sourced vegetables, ancient grains, avocado, sprouts, citrus vinaigrette",
      dietary: ["Vegan", "Gluten-Free"]
    },
    "Chez Panisse Inspired Entrée": {
      ingredients: "Seasonal organic vegetables, heirloom beans, herbs, olive oil, lemon",
      dietary: ["Vegetarian", "Gluten-Free"]
    },
    "Bears Den Burger": {
      ingredients: "Grass-fed beef, brioche bun, caramelized onions, blue cheese, arugula, special sauce",
      dietary: []
    },
    "Bay View Pasta": {
      ingredients: "Fresh pasta, seasonal vegetables, white wine sauce, parmesan, herbs",
      dietary: ["Vegetarian"]
    }
  };

  // Different menu items based on the URL domain
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
    'Dinner': ['California Cuisine Plate', 'Chez Panisse Inspired Entrée', "Bears Den Burger", 'Bay View Pasta']
  };
  
  // Determine which menu items to use based on URL
  let domainName = 'default';
  try {
    const hostname = new URL(url).hostname;
    const possibleDomains = Object.keys(domainBasedItems);
    
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
  
  // Generate items for each meal period with detailed information
  mealPeriods.forEach(mealPeriod => {
    const items = itemsByMeal[mealPeriod];
    items.forEach((itemName, index) => {
      // Use stored food details or generate default ones
      const details = foodDetails[itemName] || {
        ingredients: `Various fresh ingredients for ${itemName.toLowerCase()}.`,
        dietary: index % 2 === 0 ? ["Vegetarian"] : []
      };
      
      result.push({
        id: `scraped_${diningHallId}_${domainName}_${mealPeriod}_${index}`,
        name: itemName,
        description: `Fresh ${itemName.toLowerCase()} prepared daily by our chefs.`,
        ingredients: details.ingredients,
        // No longer using category from the original implementation
        category: "Menu Item",
        dietaryInfo: details.dietary,
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
