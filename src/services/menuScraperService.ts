
import { MenuItem, MealPeriod } from '../types';
import { toast } from '../hooks/use-toast';

// Local storage key for scraped menu items
const SCRAPED_MENU_ITEMS_KEY = 'campusDish_scrapedMenuItems';
const REPORTED_LABELS_KEY = 'campusDish_reportedLabels';

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

/**
 * Save a reported incorrect label to local storage
 */
export const reportIncorrectLabel = (
  menuItemId: string,
  reportType: 'missing' | 'incorrect',
  dietaryLabel: string
): void => {
  const reportedLabels = getReportedLabels();
  
  // Add the new report
  reportedLabels.push({
    menuItemId,
    reportType,
    dietaryLabel,
    timestamp: new Date().toISOString(),
    resolved: false
  });
  
  // Save to localStorage
  localStorage.setItem(REPORTED_LABELS_KEY, JSON.stringify(reportedLabels));
  
  toast({
    title: "Thank you for your feedback",
    description: "We'll review the dietary information for this item.",
    variant: "default"
  });
};

/**
 * Get all reported labels from local storage
 */
export const getReportedLabels = (): Array<{
  menuItemId: string;
  reportType: 'missing' | 'incorrect';
  dietaryLabel: string;
  timestamp: string;
  resolved: boolean;
}> => {
  const stored = localStorage.getItem(REPORTED_LABELS_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Analyzes ingredients to determine dietary restrictions more accurately
 */
const analyzeDietaryRestrictions = (ingredients: string): string[] => {
  const ingredientsLower = ingredients.toLowerCase();
  const dietaryLabels: string[] = [];
  
  // More comprehensive list of non-vegetarian ingredients
  const nonVegetarianIngredients = [
    'beef', 'chicken', 'pork', 'turkey', 'lamb', 'veal', 'ham', 
    'bacon', 'sausage', 'fish', 'salmon', 'tuna', 'shrimp', 'crab', 
    'lobster', 'clam', 'oyster', 'scallop', 'meat', 'gelatin',
    'lard', 'tallow', 'suet', 'rennet', 'anchovies', 'worcestershire sauce',
    'pepperoni', 'prosciutto', 'salami', 'chorizo', 'ground beef'
  ];
  
  // Check if any non-vegetarian ingredient is present
  const hasNonVegetarianIngredient = nonVegetarianIngredients.some(ingredient => 
    ingredientsLower.includes(ingredient) || 
    ingredientsLower.includes(ingredient + 's') || 
    ingredientsLower.includes(ingredient + 'es')
  );
  
  if (!hasNonVegetarianIngredient) {
    dietaryLabels.push('Vegetarian');
    
    // If it's vegetarian, check if it's vegan too
    const nonVeganIngredients = [
      'milk', 'cheese', 'butter', 'cream', 'yogurt', 'egg', 
      'honey', 'mayo', 'mayonnaise', 'whey', 'casein', 'lactose',
      'ghee', 'custard', 'ice cream', 'dairy', 'heavy cream', 'buttermilk',
      'sour cream', 'half and half', 'condensed milk', 'evaporated milk'
    ];
    
    const hasNonVeganIngredient = nonVeganIngredients.some(ingredient => 
      ingredientsLower.includes(ingredient) || 
      ingredientsLower.includes(ingredient + 's')
    );
    
    if (!hasNonVeganIngredient) {
      dietaryLabels.push('Vegan');
    }
  }
  
  // More extensive list for gluten-containing ingredients
  const glutenContainingIngredients = [
    'wheat', 'barley', 'rye', 'flour', 'pasta', 'bread', 
    'biscuit', 'cookie', 'cracker', 'cereal', 'malt', 'beer',
    'couscous', 'farro', 'semolina', 'durum', 'bulgur', 'spelt',
    'graham', 'kamut', 'matzo', 'panko', 'seitan', 'soy sauce',
    'udon', 'wheat germ', 'wheat starch', 'triticale', 'orzo',
    'bun', 'tortilla', 'english muffin'
  ];
  
  // Check for gluten-free if no gluten ingredients are present
  const hasGlutenIngredient = glutenContainingIngredients.some(ingredient => 
    ingredientsLower.includes(ingredient) || 
    ingredientsLower.includes(ingredient + 's')
  );
  
  if (!hasGlutenIngredient) {
    dietaryLabels.push('Gluten-Free');
  }
  
  return dietaryLabels;
};

// Helper function to generate detailed mock menu items
const generateDetailedMenuItems = (diningHallId: string, url: string): MenuItem[] => {
  const mealPeriods: MealPeriod[] = ['Breakfast', 'Lunch', 'Dinner'];
  
  // Enhanced ingredients and dietary information data with more accurate details
  const foodDetails: Record<string, {ingredients: string, dietary?: string[]}> = {
    // Breakfast items
    "Pancakes": {
      ingredients: "Flour, eggs, milk, butter, baking powder, sugar, vanilla extract"
    },
    "Omelette Station": {
      ingredients: "Eggs, cheese, bell peppers, onions, mushrooms, spinach, tomatoes, ham (optional)"
    },
    "Breakfast Burrito": {
      ingredients: "Flour tortilla, scrambled eggs, cheese, black beans, salsa, avocado"
    },
    "Oatmeal Bar": {
      ingredients: "Steel-cut oats, water, milk, cinnamon, brown sugar, berries, nuts, honey"
    },
    "Fresh Fruit": {
      ingredients: "Seasonal selection of fresh fruit including apples, oranges, bananas, berries"
    },
    "Breakfast Sandwich": {
      ingredients: "English muffin, fried egg, bacon, cheese, tomato"
    },
    "Harvard Square Pancakes": {
      ingredients: "Flour, eggs, milk, butter, maple syrup, blueberries, powdered sugar"
    },
    "Cambridge Omelette": {
      ingredients: "Free-range eggs, artisanal cheese, baby spinach, heirloom tomatoes, herbs"
    },
    "Veritas Breakfast Bowl": {
      ingredients: "Quinoa, poached egg, avocado, roasted sweet potato, kale, olive oil"
    },
    "Crimson Yogurt Parfait": {
      ingredients: "Greek yogurt, house-made granola, local honey, fresh berries, mint"
    },
    "Cardinal Morning Bowl": {
      ingredients: "Acai base, granola, banana, strawberry, blueberry, coconut, honey"
    },
    "Palo Alto Pancakes": {
      ingredients: "Buttermilk, eggs, vanilla, flour, maple syrup, butter, seasonal berries"
    },
    "Silicon Valley Smoothies": {
      ingredients: "Almond milk, banana, spinach, protein powder, chia seeds, almond butter"
    },
    "Stanford Sunrise Wrap": {
      ingredients: "Whole wheat tortilla, scrambled eggs, avocado, black beans, salsa fresca"
    },
    "Golden Bear Granola": {
      ingredients: "Rolled oats, honey, almonds, walnuts, pumpkin seeds, dried cranberries, cinnamon"
    },
    "Berkeley Breakfast Bowl": {
      ingredients: "Brown rice, poached eggs, avocado, roasted vegetables, tahini sauce"
    },
    "Bay Area Avocado Toast": {
      ingredients: "Sourdough bread, smashed avocado, micro greens, olive oil, sea salt, poached egg"
    },
    "Cal Crêpes": {
      ingredients: "Flour, eggs, milk, butter, fresh seasonal berries, whipped cream, maple syrup"
    },
    
    // Lunch items
    "Pizza Station": {
      ingredients: "House-made dough, tomato sauce, mozzarella cheese, various toppings"
    },
    "Burger Bar": {
      ingredients: "Beef patty, brioche bun, lettuce, tomato, onion, pickles, American cheese"
    },
    "Salad Bar": {
      ingredients: "Mixed greens, cherry tomatoes, cucumber, carrots, bell peppers, various dressings"
    },
    "Sandwich Station": {
      ingredients: "Artisan bread, deli meats, cheeses, lettuce, tomato, condiments"
    },
    "Soup of the Day": {
      ingredients: "Varies daily - check with server for ingredients and allergens"
    },
    "Pasta Bar": {
      ingredients: "Assorted pastas, marinara sauce, alfredo sauce, garlic, herbs, parmesan cheese"
    },
    "Harvard Club Sandwich": {
      ingredients: "Multi-grain bread, smoked turkey, avocado, bacon, lettuce, tomato, aioli"
    },
    "Quincy House Salad": {
      ingredients: "Mixed greens, grilled chicken, goat cheese, dried cranberries, candied walnuts, balsamic vinaigrette"
    },
    "Academic Bowl Soup": {
      ingredients: "Vegetable broth, seasonal vegetables, barley, herbs, olive oil"
    },
    "John Harvard Burger": {
      ingredients: "Grass-fed beef, brioche bun, aged cheddar, caramelized onions, special sauce"
    },
    "Tree House Salad": {
      ingredients: "Spring mix, grilled tofu, edamame, shredded carrots, avocado, sesame ginger dressing"
    },
    "Memorial Court Sandwich": {
      ingredients: "Focaccia bread, roasted turkey, brie cheese, green apple, honey mustard"
    },
    "Stanford GSB Burger": {
      ingredients: "Grass-fed beef, artisanal roll, arugula, tomato jam, aged white cheddar"
    },
    "Computer Science Curry": {
      ingredients: "Basmati rice, chickpeas, spinach, tomato, onion, garlic, ginger, curry spices, coconut milk"
    },
    "Telegraph Ave Tacos": {
      ingredients: "Corn tortillas, seasoned black beans, avocado, salsa verde, cilantro, lime"
    },
    "Sproul Plaza Salad": {
      ingredients: "Local greens, quinoa, roasted seasonal vegetables, goat cheese, balsamic vinaigrette"
    },
    "Berkeley Bowl": {
      ingredients: "Brown rice, roasted sweet potatoes, kale, avocado, tempeh, tahini dressing"
    },
    "Campanile Club Sandwich": {
      ingredients: "Sourdough bread, roasted turkey, bacon, avocado, greens, tomato, garlic aioli"
    },
    
    // Dinner items
    "Carved Turkey": {
      ingredients: "Roasted turkey breast, herb gravy, cranberry sauce"
    },
    "Vegetable Stir Fry": {
      ingredients: "Assorted vegetables, tofu, soy sauce, ginger, garlic, sesame oil"
    },
    "Pasta Alfredo": {
      ingredients: "Fettuccine pasta, heavy cream, butter, parmesan cheese, garlic, parsley"
    },
    "Roasted Vegetables": {
      ingredients: "Seasonal vegetables, olive oil, garlic, herbs, salt, pepper"
    },
    "Grilled Salmon": {
      ingredients: "Atlantic salmon fillet, lemon, dill, butter, salt, pepper"
    },
    "Taco Bar": {
      ingredients: "Corn and flour tortillas, seasoned beef, lettuce, tomatoes, cheese, sour cream, salsa"
    },
    "New England Clam Chowder": {
      ingredients: "Clams, potatoes, onions, celery, bacon, heavy cream, herbs"
    },
    "Charles River Salmon": {
      ingredients: "Wild-caught salmon, lemon herb butter, roasted asparagus, fingerling potatoes"
    },
    "Massachusetts Steak": {
      ingredients: "Grass-fed ribeye, herb butter, roasted garlic mashed potatoes, seasonal vegetables"
    },
    "Widener Library Pasta": {
      ingredients: "House-made pasta, heirloom tomato sauce, basil, parmesan, olive oil"
    },
    "California Veggie Plate": {
      ingredients: "Seasonal farm-to-table vegetables, quinoa, herb oil, lemon zest"
    },
    "Cardinal Chicken": {
      ingredients: "Free-range chicken breast, white wine sauce, herb roasted potatoes, broccolini"
    },
    "Stanford Steak": {
      ingredients: "Grass-fed New York strip, chimichurri, roasted fingerling potatoes, grilled asparagus"
    },
    "Farm to Table Specials": {
      ingredients: "Rotating selection of dishes featuring locally sourced seasonal ingredients"
    },
    "California Cuisine Plate": {
      ingredients: "Locally sourced vegetables, ancient grains, avocado, sprouts, citrus vinaigrette"
    },
    "Chez Panisse Inspired Entrée": {
      ingredients: "Seasonal organic vegetables, heirloom beans, herbs, olive oil, lemon"
    },
    "Bears Den Burger": {
      ingredients: "Grass-fed beef, brioche bun, caramelized onions, blue cheese, arugula, special sauce"
    },
    "Bay View Pasta": {
      ingredients: "Fresh pasta, seasonal vegetables, white wine sauce, parmesan, herbs"
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
        ingredients: `Various fresh ingredients for ${itemName.toLowerCase()}.`
      };
      
      // Analyze ingredients to determine dietary restrictions
      const dietaryLabels = analyzeDietaryRestrictions(details.ingredients);
      
      result.push({
        id: `scraped_${diningHallId}_${domainName}_${mealPeriod}_${index}`,
        name: itemName,
        description: `Fresh ${itemName.toLowerCase()} prepared daily by our chefs.`,
        ingredients: details.ingredients,
        category: "Menu Item",
        dietaryInfo: dietaryLabels,
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
