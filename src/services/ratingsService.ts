
import { Rating } from '../types';

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
export const saveRating = (menuItemId: string, value: number): Rating => {
  const deviceId = getDeviceId();
  
  // Create the new rating object
  const newRating: Rating = {
    id: `rating_${Math.random().toString(36).substring(2, 15)}`,
    menuItemId,
    value,
    deviceId,
    timestamp: new Date().toISOString()
  };

  // Get existing ratings from localStorage
  const existingRatingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
  const existingRatings: Rating[] = existingRatingsJson ? JSON.parse(existingRatingsJson) : [];
  
  // Filter out any previous rating by this device for this menu item
  const filteredRatings = existingRatings.filter(
    rating => !(rating.menuItemId === menuItemId && rating.deviceId === deviceId)
  );
  
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

// Calculate average rating for a menu item
export const getAverageRating = (menuItemId: string): number => {
  const ratings = getRatingsByMenuItem(menuItemId);
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((total, rating) => total + rating.value, 0);
  return sum / ratings.length;
};

// Get all ratings from localStorage
export const getRatings = (): Rating[] => {
  const ratingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
  if (!ratingsJson) return [];
  return JSON.parse(ratingsJson);
};
