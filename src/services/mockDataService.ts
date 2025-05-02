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

// Sample menu items - Updated with more items and photos
export const menuItems: MenuItem[] = [
  // UNC Charlotte - SoVi Dining Hall (1601)
  {
    id: "m101",
    name: "Breakfast Burrito",
    description: "Scrambled eggs, cheddar cheese, and bacon wrapped in a warm flour tortilla.",
    category: "Breakfast",
    dietaryInfo: [],
    mealPeriod: "Breakfast",
    diningHallId: "1601",
    averageRating: 4.2,
    ratingsCount: 85,
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m102",
    name: "Avocado Toast",
    description: "Sourdough bread topped with mashed avocado, cherry tomatoes, and a sprinkle of feta cheese.",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1601",
    averageRating: 4.5,
    ratingsCount: 62,
    image: "https://images.unsplash.com/photo-1603046891744-76bfa19c10a5?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m103",
    name: "Southern Fried Chicken",
    description: "Crispy fried chicken served with mashed potatoes and gravy.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "1601",
    averageRating: 4.7,
    ratingsCount: 110,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m104",
    name: "Caprese Panini",
    description: "Fresh mozzarella, tomato, and basil on ciabatta bread, grilled to perfection.",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "1601",
    averageRating: 4.4,
    ratingsCount: 78,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m105",
    name: "Beef Stroganoff",
    description: "Tender beef in a rich mushroom sauce served over egg noodles.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Dinner",
    diningHallId: "1601",
    averageRating: 4.3,
    ratingsCount: 92,
    image: "https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m106",
    name: "Salmon with Roasted Vegetables",
    description: "Grilled salmon served with a medley of roasted vegetables.",
    category: "Entree",
    dietaryInfo: ["Gluten-Free"],
    mealPeriod: "Dinner",
    diningHallId: "1601",
    averageRating: 4.5,
    ratingsCount: 90,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m107",
    name: "Fresh Fruit Parfait",
    description: "Greek yogurt layered with fresh berries and granola.",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1601",
    averageRating: 4.6,
    ratingsCount: 55,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&h=600"
  },

  // UNC Charlotte - Crown Commons (1602)
  {
    id: "m201",
    name: "Pancake Stack",
    description: "Fluffy buttermilk pancakes served with maple syrup and whipped butter.",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.4,
    ratingsCount: 75,
    image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m202",
    name: "Western Omelet",
    description: "Three-egg omelet with ham, bell peppers, onions, and cheddar cheese.",
    category: "Breakfast",
    dietaryInfo: [],
    mealPeriod: "Breakfast",
    diningHallId: "1602",
    averageRating: 4.3,
    ratingsCount: 68,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m203",
    name: "Black Bean Burger",
    description: "Vegetarian black bean burger with all the fixings on a brioche bun.",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.2,
    ratingsCount: 115,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m204",
    name: "Chicken Caesar Wrap",
    description: "Grilled chicken, romaine lettuce, parmesan cheese, and Caesar dressing in a spinach wrap.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "1602",
    averageRating: 4.1,
    ratingsCount: 95,
    image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m205",
    name: "Spaghetti and Meatballs",
    description: "Classic Italian pasta with savory meatballs and marinara sauce.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.5,
    ratingsCount: 88,
    image: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m206",
    name: "Garden Vegetable Stir Fry",
    description: "Fresh vegetables and tofu in a savory sauce, served over steamed rice.",
    category: "Entree",
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealPeriod: "Dinner",
    diningHallId: "1602",
    averageRating: 4.0,
    ratingsCount: 72,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&h=600"
  },

  // UNC Chapel Hill - Lenoir Hall (1501)
  {
    id: "m301",
    name: "Steel-Cut Oatmeal Bar",
    description: "Freshly made oatmeal with a variety of toppings including fresh fruit, nuts, and honey.",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian", "Vegan"],
    mealPeriod: "Breakfast",
    diningHallId: "1501",
    averageRating: 4.2,
    ratingsCount: 65,
    image: "https://images.unsplash.com/photo-1505714091216-22ba89a4f180?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m302",
    name: "Mediterranean Bowl",
    description: "Quinoa, roasted vegetables, feta cheese, olives, and tzatziki sauce.",
    category: "Entree",
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    mealPeriod: "Lunch",
    diningHallId: "1501",
    averageRating: 4.5,
    ratingsCount: 82,
    image: "https://images.unsplash.com/photo-1529059997568-3e58c45f2b5a?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m303",
    name: "Chicken Tenders",
    description: "Crispy chicken tenders served with your choice of dipping sauce.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Dinner",
    diningHallId: "1501",
    averageRating: 3.8,
    ratingsCount: 150,
    image: "https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m304",
    name: "Spinach and Strawberry Salad",
    description: "Fresh spinach with strawberries, candied pecans, and balsamic vinaigrette.",
    category: "Side",
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    mealPeriod: "Lunch",
    diningHallId: "1501",
    averageRating: 4.3,
    ratingsCount: 60,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m305",
    name: "Carolina BBQ Sandwich",
    description: "Slow-cooked pulled pork with Carolina BBQ sauce on a brioche bun.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "1501",
    averageRating: 4.6,
    ratingsCount: 95,
    image: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?auto=format&fit=crop&w=800&h=600"
  },

  // UNC Chapel Hill - Chase Dining Hall (1502)
  {
    id: "m401",
    name: "Belgian Waffles",
    description: "Crispy Belgian waffles served with fresh berries and whipped cream.",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "1502",
    averageRating: 4.7,
    ratingsCount: 72,
    image: "https://images.unsplash.com/photo-1504712598893-24159a89200e?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m402",
    name: "Mac and Cheese",
    description: "Creamy macaroni and cheese made with a blend of three cheeses.",
    category: "Entree",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Lunch",
    diningHallId: "1502",
    averageRating: 3.8,
    ratingsCount: 150,
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m403",
    name: "Herb Roasted Turkey",
    description: "Sliced turkey breast with herb gravy, mashed potatoes, and seasonal vegetables.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Dinner",
    diningHallId: "1502",
    averageRating: 4.4,
    ratingsCount: 85,
    image: "https://images.unsplash.com/photo-1574672280600-ec31bf78f04a?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m404",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    category: "Dessert",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Dinner",
    diningHallId: "1502",
    averageRating: 4.9,
    ratingsCount: 120,
    image: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?auto=format&fit=crop&w=800&h=600"
  },

  // Harvard - Annenberg Hall (101)
  {
    id: "m501",
    name: "Eggs Benedict",
    description: "English muffin topped with poached eggs, Canadian bacon, and hollandaise sauce.",
    category: "Breakfast",
    dietaryInfo: [],
    mealPeriod: "Breakfast",
    diningHallId: "101",
    averageRating: 4.6,
    ratingsCount: 90,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m502",
    name: "Lobster Roll",
    description: "New England style lobster roll with butter on a toasted brioche bun.",
    category: "Entree",
    dietaryInfo: [],
    mealPeriod: "Lunch",
    diningHallId: "101",
    averageRating: 4.8,
    ratingsCount: 105,
    image: "https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?auto=format&fit=crop&w=800&h=600"
  },

  // Stanford - Arrillaga Family Dining (201)
  {
    id: "m601",
    name: "Açai Bowl",
    description: "Organic açai blend topped with granola, fresh fruit, and honey.",
    category: "Breakfast",
    dietaryInfo: ["Vegetarian"],
    mealPeriod: "Breakfast",
    diningHallId: "201",
    averageRating: 4.7,
    ratingsCount: 88,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "m602",
    name: "Sustainable Seafood Tacos",
    description: "Grilled fish tacos with cabbage slaw and chipotle aioli on corn tortillas.",
    category: "Entree",
    dietaryInfo: ["Gluten-Free"],
    mealPeriod: "Lunch",
    diningHallId: "201",
    averageRating: 4.5,
    ratingsCount: 94,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&h=600"
  }
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
