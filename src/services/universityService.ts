
import { University } from "../types";

// Storage keys
const FAVORITE_UNIVERSITIES_KEY = 'campusDish_favoriteUniversities';
const UNIVERSITY_MENU_LINKS_KEY = 'campusDish_universityMenuLinks';

// Helper function to get favorite universities from local storage
const getFavoriteUniversities = (): string[] => {
  const stored = localStorage.getItem(FAVORITE_UNIVERSITIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper function to get menu links from local storage
const getUniversityMenuLinks = (): Record<string, string> => {
  const stored = localStorage.getItem(UNIVERSITY_MENU_LINKS_KEY);
  return stored ? JSON.parse(stored) : {};
};

// List of popular US colleges
const universityList: University[] = [
  { id: "1", name: "Harvard University", state: "Massachusetts", city: "Cambridge" },
  { id: "2", name: "Stanford University", state: "California", city: "Stanford" },
  { id: "3", name: "Massachusetts Institute of Technology", state: "Massachusetts", city: "Cambridge" },
  { id: "4", name: "University of California, Berkeley", state: "California", city: "Berkeley" },
  { id: "5", name: "University of Michigan", state: "Michigan", city: "Ann Arbor" },
  { id: "6", name: "Cornell University", state: "New York", city: "Ithaca" },
  { id: "7", name: "University of Texas at Austin", state: "Texas", city: "Austin" },
  { id: "8", name: "University of Wisconsin-Madison", state: "Wisconsin", city: "Madison" },
  { id: "9", name: "Penn State University", state: "Pennsylvania", city: "University Park" },
  { id: "10", name: "Ohio State University", state: "Ohio", city: "Columbus" },
  { id: "11", name: "University of Florida", state: "Florida", city: "Gainesville" },
  { id: "12", name: "University of Washington", state: "Washington", city: "Seattle" },
  { id: "13", name: "New York University", state: "New York", city: "New York" },
  { id: "14", name: "UCLA", state: "California", city: "Los Angeles" },
  { id: "15", name: "University of North Carolina at Chapel Hill", state: "North Carolina", city: "Chapel Hill" },
  { id: "16", name: "University of North Carolina at Charlotte", state: "North Carolina", city: "Charlotte" },
  { id: "17", name: "Arizona State University", state: "Arizona", city: "Tempe" },
  { id: "18", name: "University of Virginia", state: "Virginia", city: "Charlottesville" },
  { id: "19", name: "Georgia Tech", state: "Georgia", city: "Atlanta" },
  { id: "20", name: "University of Chicago", state: "Illinois", city: "Chicago" },
];

// Enrich university data with favorites and menu links
const enrichUniversityData = (): University[] => {
  const favoriteIds = getFavoriteUniversities();
  const menuLinks = getUniversityMenuLinks();
  
  return universityList.map(university => ({
    ...university,
    isFavorite: favoriteIds.includes(university.id),
    menuLink: menuLinks[university.id]
  }));
};

// Export the enriched universities list
export const universities: University[] = enrichUniversityData();

// Toggle favorite status for a university
export const toggleFavoriteUniversity = (universityId: string): University => {
  const favoriteIds = getFavoriteUniversities();
  
  // Toggle the favorite status
  const isCurrentlyFavorite = favoriteIds.includes(universityId);
  
  let newFavoriteIds: string[];
  if (isCurrentlyFavorite) {
    // Remove from favorites
    newFavoriteIds = favoriteIds.filter(id => id !== universityId);
  } else {
    // Add to favorites
    newFavoriteIds = [...favoriteIds, universityId];
  }
  
  // Save to localStorage
  localStorage.setItem(FAVORITE_UNIVERSITIES_KEY, JSON.stringify(newFavoriteIds));
  
  // Update the in-memory university object
  const universityIndex = universities.findIndex(u => u.id === universityId);
  if (universityIndex >= 0) {
    universities[universityIndex] = {
      ...universities[universityIndex],
      isFavorite: !isCurrentlyFavorite
    };
  }
  
  return universities[universityIndex];
};

// Save menu link for a university
export const saveUniversityMenuLink = (universityId: string, menuLink: string): University => {
  const menuLinks = getUniversityMenuLinks();
  
  // Update the menu link
  menuLinks[universityId] = menuLink;
  
  // Save to localStorage
  localStorage.setItem(UNIVERSITY_MENU_LINKS_KEY, JSON.stringify(menuLinks));
  
  // Update the in-memory university object
  const universityIndex = universities.findIndex(u => u.id === universityId);
  if (universityIndex >= 0) {
    universities[universityIndex] = {
      ...universities[universityIndex],
      menuLink
    };
  }
  
  return universities[universityIndex];
};

// Get the university by its ID
export const getUniversityById = (id: string): University | undefined => {
  return universities.find((university) => university.id === id);
};
