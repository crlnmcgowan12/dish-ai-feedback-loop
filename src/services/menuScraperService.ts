
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
      title: "Extracting Detailed Ingredient Information",
      description: "Analyzing comprehensive ingredient lists and nutritional data...",
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
      description: `Successfully imported ${scrapedItems.length} menu items with comprehensive ingredient information.`,
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
      ingredients: "Wheat flour (unbleached), whole milk, fresh eggs, unsalted butter, baking powder, cane sugar, pure vanilla extract, salt"
    },
    "Omelette Station": {
      ingredients: "Fresh eggs, shredded cheddar cheese, diced bell peppers (red, green, yellow), diced yellow onions, sliced cremini mushrooms, fresh baby spinach, diced roma tomatoes, diced black forest ham (optional)"
    },
    "Breakfast Burrito": {
      ingredients: "Flour tortilla (wheat flour, vegetable oil, salt), scrambled eggs, monterey jack cheese, seasoned black beans (black beans, cumin, garlic powder, salt), house-made salsa (tomatoes, onions, jalapeños, cilantro, lime juice), fresh avocado"
    },
    "Oatmeal Bar": {
      ingredients: "Organic steel-cut oats, filtered water, whole milk (optional), ground cinnamon, brown sugar, fresh seasonal berries, toasted walnuts, clover honey"
    },
    "Fresh Fruit": {
      ingredients: "Seasonal selection: sliced honeycrisp apples, navel oranges, ripe bananas, fresh blueberries, strawberries, red grapes"
    },
    "Breakfast Sandwich": {
      ingredients: "Toasted english muffin (wheat flour, yeast, salt), fried egg, applewood smoked bacon, american cheese, sliced tomato"
    },
    "Harvard Square Pancakes": {
      ingredients: "Unbleached wheat flour, cage-free eggs, whole milk, unsalted butter, pure Vermont maple syrup, fresh blueberries, confectioners' sugar"
    },
    "Cambridge Omelette": {
      ingredients: "Local free-range eggs, artisanal Vermont cheddar cheese, organic baby spinach, heirloom tomatoes, fresh herbs (chives, parsley, thyme)"
    },
    "Veritas Breakfast Bowl": {
      ingredients: "Organic tri-color quinoa, poached cage-free egg, ripe avocado, roasted garnet sweet potato, massaged kale, extra virgin olive oil, sea salt, cracked black pepper"
    },
    "Crimson Yogurt Parfait": {
      ingredients: "Strained Greek yogurt, house-made granola (rolled oats, honey, almonds, cinnamon), local wildflower honey, seasonal fresh berries (strawberries, blueberries, blackberries), fresh mint"
    },
    "Cardinal Morning Bowl": {
      ingredients: "Organic acai berry puree, whole grain granola (rolled oats, honey, almonds), sliced ripe banana, fresh strawberries, fresh blueberries, toasted coconut flakes, clover honey"
    },
    "Palo Alto Pancakes": {
      ingredients: "Organic buttermilk, cage-free eggs, pure vanilla extract, unbleached flour, Grade A maple syrup, grass-fed butter, seasonal organic berries"
    },
    "Silicon Valley Smoothies": {
      ingredients: "Unsweetened almond milk, ripe banana, organic spinach, plant-based protein powder, chia seeds, stone-ground almond butter"
    },
    "Stanford Sunrise Wrap": {
      ingredients: "Whole wheat tortilla, scrambled cage-free eggs, fresh avocado, organic black beans, house-made salsa fresca (tomatoes, onions, cilantro, lime juice)"
    },
    "Golden Bear Granola": {
      ingredients: "Organic rolled oats, raw California honey, toasted almonds, candied walnuts, roasted pumpkin seeds, dried cranberries, ground cinnamon"
    },
    "Berkeley Breakfast Bowl": {
      ingredients: "Short-grain brown rice, poached farm eggs, sliced avocado, fire-roasted seasonal vegetables (sweet potato, bell peppers, onions), house-made tahini sauce (tahini, lemon juice, garlic)"
    },
    "Bay Area Avocado Toast": {
      ingredients: "San Francisco sourdough bread, smashed California avocado, locally grown microgreens, extra virgin olive oil, Maldon sea salt, soft poached free-range egg"
    },
    "Cal Crêpes": {
      ingredients: "Unbleached wheat flour, free-range eggs, whole milk, European butter, fresh organic seasonal berries, house-made whipped cream, pure maple syrup"
    },
    
    // Lunch items
    "Pizza Station": {
      ingredients: "House-made dough (unbleached flour, active yeast, olive oil, salt), San Marzano tomato sauce, fresh mozzarella cheese, various toppings (pepperoni, mushrooms, bell peppers, onions, olives)"
    },
    "Burger Bar": {
      ingredients: "Grass-fed beef patty (100% Angus beef), brioche bun (wheat flour, eggs, butter, milk), green leaf lettuce, vine-ripened tomato, red onion, dill pickles, aged American cheese"
    },
    "Salad Bar": {
      ingredients: "Organic mixed greens (romaine, arugula, spinach), cherry tomatoes, sliced English cucumber, shredded carrots, diced bell peppers, assorted dressings (ranch, balsamic vinaigrette, blue cheese, Italian)"
    },
    "Sandwich Station": {
      ingredients: "Artisan bread selection (whole grain, sourdough, rye), freshly sliced deli meats (turkey, ham, roast beef), assorted cheeses (cheddar, Swiss, provolone), crisp lettuce, sliced tomato, Dijon mustard, mayonnaise"
    },
    "Soup of the Day": {
      ingredients: "Varies daily - inquire with server for complete ingredients list and potential allergens"
    },
    "Pasta Bar": {
      ingredients: "Assorted pastas (penne, fettuccine, rigatoni), house-made marinara sauce (tomatoes, garlic, basil), alfredo sauce (heavy cream, butter, Parmesan cheese), roasted garlic, fresh herbs, grated Parmigiano-Reggiano cheese"
    },
    "Harvard Club Sandwich": {
      ingredients: "Organic multi-grain bread, smoked turkey breast, ripe avocado, applewood smoked bacon, hydroponic lettuce, heirloom tomato, house-made garlic aioli (egg yolks, olive oil, garlic, lemon juice)"
    },
    "Quincy House Salad": {
      ingredients: "Mixed field greens, grilled free-range chicken breast, Vermont goat cheese, organic dried cranberries, candied walnuts, house-made balsamic vinaigrette (balsamic vinegar, extra virgin olive oil, Dijon mustard, honey)"
    },
    "Academic Bowl Soup": {
      ingredients: "Fresh vegetable broth, seasonal organic vegetables (carrots, celery, onions, leeks), pearl barley, fresh herbs (thyme, bay leaf, parsley), cold-pressed olive oil"
    },
    "John Harvard Burger": {
      ingredients: "New England grass-fed beef (8oz patty), artisanal brioche bun, Vermont aged white cheddar, caramelized sweet onions, special sauce (mayonnaise, ketchup, relish, garlic powder, paprika)"
    },
    "Tree House Salad": {
      ingredients: "Locally grown spring mix, organic grilled tofu, steamed edamame, rainbow shredded carrots, California avocado, house-made sesame ginger dressing (rice vinegar, sesame oil, fresh ginger, soy sauce, honey)"
    },
    "Memorial Court Sandwich": {
      ingredients: "Artisanal focaccia bread (wheat flour, olive oil, rosemary), roasted heritage turkey breast, French brie cheese, sliced Granny Smith apple, honey mustard (Dijon mustard, clover honey)"
    },
    "Stanford GSB Burger": {
      ingredients: "California grass-fed beef (6oz patty), artisanal ciabatta roll, fresh arugula, house-made tomato jam (heirloom tomatoes, brown sugar, balsamic vinegar), aged white cheddar cheese"
    },
    "Computer Science Curry": {
      ingredients: "Organic basmati rice, chickpeas, fresh spinach, diced tomatoes, yellow onion, minced garlic, grated ginger, curry spice blend (turmeric, cumin, coriander, cardamom), coconut milk"
    },
    "Telegraph Ave Tacos": {
      ingredients: "Stone-ground corn tortillas, seasoned black beans (black beans, cumin, chili powder, oregano), fresh avocado, house-made salsa verde (tomatillos, jalapeños, cilantro, lime), chopped cilantro, lime wedges"
    },
    "Sproul Plaza Salad": {
      ingredients: "Local organic mixed greens, tri-color quinoa, roasted seasonal vegetables (zucchini, bell peppers, red onion, butternut squash), Laura Chenel goat cheese, balsamic vinaigrette (aged balsamic vinegar, extra virgin olive oil, Dijon mustard)"
    },
    "Berkeley Bowl": {
      ingredients: "Short-grain brown rice, maple-roasted garnet sweet potatoes, massaged dinosaur kale, California avocado, seasoned organic tempeh, house-made tahini dressing (tahini, lemon juice, garlic, olive oil)"
    },
    "Campanile Club Sandwich": {
      ingredients: "San Francisco sourdough bread, oven-roasted turkey breast, applewood smoked bacon, California avocado, organic baby greens, heirloom tomato, garlic aioli (egg yolks, olive oil, garlic, lemon juice)"
    },
    
    // Dinner items
    "Carved Turkey": {
      ingredients: "Slow-roasted turkey breast, house-made herb gravy (turkey drippings, flour, herbs, stock), cranberry orange sauce (fresh cranberries, orange zest, cane sugar)"
    },
    "Vegetable Stir Fry": {
      ingredients: "Seasonal assorted vegetables (broccoli, bell peppers, snap peas, carrots, mushrooms), organic extra-firm tofu, tamari soy sauce, fresh ginger, minced garlic, toasted sesame oil"
    },
    "Pasta Alfredo": {
      ingredients: "Fresh fettuccine pasta (semolina flour, eggs), heavy cream, European butter, imported Parmigiano-Reggiano cheese, fresh garlic, Italian flat-leaf parsley, freshly ground black pepper"
    },
    "Roasted Vegetables": {
      ingredients: "Seasonal organic vegetables (Brussels sprouts, carrots, red onions, bell peppers), extra virgin olive oil, fresh garlic, dried herbs (thyme, rosemary), sea salt, cracked black pepper"
    },
    "Grilled Salmon": {
      ingredients: "Wild-caught Atlantic salmon fillet, fresh lemon, dill sprigs, unsalted butter, sea salt, freshly ground black pepper"
    },
    "Taco Bar": {
      ingredients: "Fresh corn and flour tortillas, seasoned grass-fed ground beef (beef, onions, chili powder, cumin, oregano), shredded romaine lettuce, diced roma tomatoes, shredded Mexican blend cheese, sour cream, house-made salsa (tomatoes, onions, cilantro, jalapeños)"
    },
    "New England Clam Chowder": {
      ingredients: "Fresh-shucked clams, Yukon gold potatoes, yellow onions, celery, applewood smoked bacon, heavy cream, fresh thyme, bay leaves"
    },
    "Charles River Salmon": {
      ingredients: "Wild-caught Alaskan salmon, house-made lemon herb butter (unsalted butter, lemon zest, fresh herbs), roasted asparagus, fingerling potatoes, extra virgin olive oil"
    },
    "Massachusetts Steak": {
      ingredients: "Locally sourced grass-fed ribeye steak, compound herb butter (butter, garlic, rosemary, thyme), roasted garlic mashed potatoes (Yukon gold potatoes, butter, cream, roasted garlic), seasonal farm vegetables"
    },
    "Widener Library Pasta": {
      ingredients: "House-made fresh pasta (semolina flour, eggs), heirloom tomato sauce (San Marzano tomatoes, garlic, basil, olive oil), fresh basil, aged Parmigiano-Reggiano, cold-pressed extra virgin olive oil"
    },
    "California Veggie Plate": {
      ingredients: "Seasonal farm-to-table vegetables (rainbow carrots, golden beets, heirloom tomatoes, zucchini), organic red quinoa, herb-infused olive oil, fresh lemon zest, sea salt"
    },
    "Cardinal Chicken": {
      ingredients: "Free-range chicken breast, white wine reduction sauce (Chardonnay, shallots, butter, herbs), herb roasted fingerling potatoes (rosemary, thyme, olive oil), organic broccolini"
    },
    "Stanford Steak": {
      ingredients: "Grass-fed New York strip steak, house-made chimichurri (parsley, cilantro, garlic, olive oil, red wine vinegar), roasted fingerling potatoes, grilled asparagus, olive oil"
    },
    "Farm to Table Specials": {
      ingredients: "Rotating selection of dishes featuring locally sourced seasonal ingredients from sustainable Northern California farms"
    },
    "California Cuisine Plate": {
      ingredients: "Locally sourced organic seasonal vegetables, ancient grain medley (farro, quinoa, wild rice), California avocado, crispy microgreens, house-made citrus vinaigrette (orange juice, lemon juice, olive oil, shallots)"
    },
    "Chez Panisse Inspired Entrée": {
      ingredients: "Seasonal organic vegetables (whatever is best at the farmers' market today), heirloom beans (Rancho Gordo), fresh culinary herbs (parsley, thyme, oregano, chives), California extra virgin olive oil, Meyer lemon"
    },
    "Bears Den Burger": {
      ingredients: "Half-pound grass-fed beef patty, artisanal brioche bun, caramelized Vidalia onions, Point Reyes blue cheese, wild arugula, house special sauce (mayonnaise, relish, smoked paprika, garlic)"
    },
    "Bay View Pasta": {
      ingredients: "Fresh handmade pasta (Semolina flour, eggs), seasonal organic vegetables (asparagus, cherry tomatoes, baby spinach), white wine sauce (Chardonnay, shallots, butter), shaved Parmesan cheese, fresh herbs (basil, parsley)"
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
        ingredients: `Detailed ingredients unavailable for ${itemName.toLowerCase()}.`
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
