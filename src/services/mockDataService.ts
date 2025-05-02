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
  // UNC Charlotte dining halls - updated with accurate information
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

// Sample menu items - Updated with current menu items from DineOn Campus for UNC Charlotte
export const menuItems: MenuItem[] = [
  // UNC Charlotte - Crown Commons (1602) - Current menu items from DineOn Campus
  // Breakfast Items
  {
    id: "cc_b1",
    name: "French Toast",
    description: "Classic French toast made with thick-sliced bread, dipped in egg batter and grilled.",
    ingredients: "Bread, eggs, milk, cinnamon, vanilla extract, butter, maple syrup",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.5,
    ratingsCount: 78,
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_b2",
    name: "Scrambled Eggs",
    description: "Fluffy scrambled eggs prepared fresh throughout the morning.",
    ingredients: "Eggs, butter, salt, pepper",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.2,
    ratingsCount: 95,
    image: "https://images.unsplash.com/photo-1551185618-3a923c5e2c81?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_b3",
    name: "Bacon",
    description: "Crispy bacon strips cooked to perfection.",
    ingredients: "Pork bacon, salt, spices",
    category: "Breakfast",
    dietaryInfo: ["Gluten-Free"],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.8,
    ratingsCount: 110,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_b4",
    name: "Breakfast Potatoes",
    description: "Seasoned diced potatoes roasted with peppers and onions.",
    ingredients: "Potatoes, peppers, onions, olive oil, rosemary, thyme, salt, black pepper",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.3,
    ratingsCount: 85,
    image: "https://images.unsplash.com/photo-1600336153113-d66c79de3e91?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_b5",
    name: "Assorted Breakfast Pastries",
    description: "Freshly baked muffins, pastries, and danishes.",
    ingredients: "Flour, butter, sugar, eggs, yeast, various fillings (chocolate chips, blueberries, cinnamon)",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.6,
    ratingsCount: 72,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&h=600"
  },
  
  // Lunch Items
  {
    id: "cc_l1",
    name: "Chicken Teriyaki Bowl",
    description: "Grilled teriyaki chicken served over steamed rice with vegetables.",
    ingredients: "Chicken breast, teriyaki sauce (soy sauce, mirin, sugar, ginger), broccoli, carrots, steamed rice",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.6,
    ratingsCount: 88,
    image: "https://images.unsplash.com/photo-1546069901-d5aeb35d27ed?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_l2",
    name: "Baked Ziti",
    description: "Pasta baked with marinara sauce, ricotta, and mozzarella cheese.",
    ingredients: "Ziti pasta, marinara sauce, ricotta cheese, mozzarella cheese, parmesan cheese, Italian seasoning",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.4,
    ratingsCount: 75,
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_l3",
    name: "Garden Salad Bar",
    description: "Fresh salad bar with a variety of toppings and dressings.",
    ingredients: "Mixed greens, tomatoes, cucumbers, carrots, bell peppers, red onions, croutons, various dressings",
    category: "Side",
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.2,
    ratingsCount: 65,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_l4",
    name: "Buffalo Chicken Wrap",
    description: "Crispy buffalo chicken with lettuce, tomato, and ranch dressing in a flour tortilla.",
    ingredients: "Fried chicken, buffalo sauce, lettuce, tomato, ranch dressing, flour tortilla",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.5,
    ratingsCount: 92,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_l5",
    name: "French Fries",
    description: "Crispy seasoned french fries.",
    ingredients: "Potatoes, vegetable oil, salt",
    category: "Side",
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.3,
    ratingsCount: 105,
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&h=600"
  },
  
  // Dinner Items
  {
    id: "cc_d1",
    name: "Herb Roasted Chicken",
    description: "Roasted chicken seasoned with fresh herbs and garlic.",
    ingredients: "Chicken, olive oil, rosemary, thyme, garlic, salt, black pepper, lemon",
    category: "Entree",
    dietaryInfo: ["Gluten-Free"],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.7,
    ratingsCount: 95,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_d2",
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables stir-fried with tofu in a savory sauce.",
    ingredients: "Tofu, broccoli, carrots, bell peppers, snap peas, soy sauce, ginger, garlic, sesame oil",
    category: "Entree",
    dietaryInfo: ["Vegetarian", "Vegan"],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.3,
    ratingsCount: 65,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_d3",
    name: "Mashed Potatoes",
    description: "Creamy mashed potatoes with gravy.",
    ingredients: "Potatoes, butter, milk, salt, pepper, chicken gravy",
    category: "Side",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.5,
    ratingsCount: 78,
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_d4",
    name: "Steamed Broccoli",
    description: "Fresh broccoli florets steamed and lightly seasoned.",
    ingredients: "Broccoli, salt, butter",
    category: "Side",
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.0,
    ratingsCount: 55,
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "cc_d5",
    name: "Chocolate Chip Cookies",
    description: "Freshly baked chocolate chip cookies.",
    ingredients: "Flour, butter, sugar, brown sugar, eggs, vanilla, baking soda, salt, chocolate chips",
    category: "Dessert",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.8,
    ratingsCount: 125,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&h=600"
  },
  
  // UNC Charlotte - SoVi Dining Hall (1601) - Current menu items from DineOn Campus
  // Breakfast Items
  {
    id: "sovi_b1",
    name: "Belgian Waffles",
    description: "Golden Belgian waffles served with syrup and toppings.",
    ingredients: "Flour, eggs, milk, butter, sugar, baking powder, vanilla extract",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1601",
    averageRating: 4.7,
    ratingsCount: 85,
    image: "https://images.unsplash.com/photo-1504712598893-24159a89200e?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "sovi_b2",
    name: "Egg & Cheese Breakfast Sandwich",
    description: "English muffin topped with fried egg and melted cheese.",
    ingredients: "English muffin, eggs, American cheese, butter",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1601",
    averageRating: 4.4,
    ratingsCount: 72,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "sovi_b3",
    name: "Greek Yogurt Parfait",
    description:
