import { Rating } from '../types';
import { getCurrentUser, isLoggedIn } from './authService';
import { toast } from '../hooks/use-toast';

// Store ratings in localStorage
const RATINGS_STORAGE_KEY = 'campusDish_ratings';

// Generate a unique device ID for the current browser
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('campusDish_deviceId');
  if (!deviceId) {
    deviceId = `device_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('campusDish_deviceId', deviceId);
  }
  return deviceId;
};

// Save a rating for a menu item
export const saveRating = (menuItemId: string, value: number): Rating | null => {
  const isUserLoggedIn = isLoggedIn();
  const currentUser = getCurrentUser();
  
  // If user is logged in, use their ID; otherwise use device ID
  const userId = currentUser?.id;
  const deviceId = getDeviceId();
  
  // Create the new rating object
  const newRating: Rating = {
    id: `rating_${Math.random().toString(36).substring(2, 15)}`,
    menuItemId,
    value,
    deviceId,
    userId: userId || undefined,
    timestamp: new Date().toISOString()
  };

  // Get existing ratings from localStorage
  const existingRatingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
  const existingRatings: Rating[] = existingRatingsJson ? JSON.parse(existingRatingsJson) : [];
  
  // Check if the user has already rated this item today
  if (isUserLoggedIn && userId) {
    const today = new Date().toISOString().split('T')[0];
    const userRatedToday = existingRatings.some(
      rating => 
        rating.menuItemId === menuItemId && 
        rating.userId === userId && 
        rating.timestamp.split('T')[0] === today
    );
    
    if (userRatedToday) {
      toast({
        title: "Rating limited",
        description: "You can only rate this item once per day. Your previous rating today has been counted.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Filter out any previous rating by this device/user for this menu item (if not logged in)
  // If logged in, keep previous ratings to maintain history, just add the new one
  let filteredRatings = existingRatings;
  if (!isUserLoggedIn) {
    filteredRatings = existingRatings.filter(
      rating => !(rating.menuItemId === menuItemId && rating.deviceId === deviceId && !rating.userId)
    );
  }
  
  // Add the new rating
  const updatedRatings = [...filteredRatings, newRating];
  
  // Save back to localStorage
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(updatedRatings));
  
  return newRating;
};

// Get all ratings for a specific menu item
export const getRatingsByMenuItem = (menuItemId: string): Rating[] => {
  const ratingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
  if (!ratingsJson) return [];
  
  const ratings: Rating[] = JSON.parse(ratingsJson);
  return ratings.filter(rating => rating.menuItemId === menuItemId);
};

// Get current user's rating for a specific menu item (if any)
export const getUserRatingForMenuItem = (menuItemId: string): Rating | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  const ratingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
  if (!ratingsJson) return null;
  
  const ratings: Rating[] = JSON.parse(ratingsJson);
  // Find the most recent rating by the user for this menu item
  const userRatings = ratings
    .filter(rating => rating.menuItemId === menuItemId && rating.userId === currentUser.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  return userRatings.length > 0 ? userRatings[0] : null;
};

// Calculate average rating for a menu item
export const getAverageRating = (menuItemId: string): number => {
  const ratings = getRatingsByMenuItem(menuItemId);
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((total, rating) => total + rating.value, 0);
  return sum / ratings.length;
};

// Calculate daily rating for a menu item
export const getDailyRating = (menuItemId: string): { rating: number; count: number } => {
  const ratings = getRatingsByMenuItem(menuItemId);
  if (ratings.length === 0) return { rating: 0, count: 0 };
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter ratings from today
  const todayRatings = ratings.filter(rating => rating.timestamp.split('T')[0] === today);
  
  if (todayRatings.length === 0) return { rating: 0, count: 0 };
  
  const sum = todayRatings.reduce((total, rating) => total + rating.value, 0);
  return { 
    rating: sum / todayRatings.length,
    count: todayRatings.length 
  };
};

// Get all ratings from localStorage
export const getRatings = (): Rating[] => {
  const ratingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
  if (!ratingsJson) return [];
  return JSON.parse(ratingsJson);
};
