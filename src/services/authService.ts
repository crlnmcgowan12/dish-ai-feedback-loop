
import { toast } from "../hooks/use-toast";

// Types for authentication
export interface User {
  id: string;
  username: string;
  email: string;
}

// Storage keys
const USER_STORAGE_KEY = 'campusDish_user';
const SESSION_STORAGE_KEY = 'campusDish_session';

// Generate a unique ID
const generateId = (): string => {
  return `user_${Math.random().toString(36).substring(2, 15)}`;
};

// Get the current user from localStorage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;
  return JSON.parse(userJson);
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  const session = localStorage.getItem(SESSION_STORAGE_KEY);
  return !!session;
};

// Register a new user
export const registerUser = (username: string, email: string, password: string): User | null => {
  try {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('campusDish_users') || '[]');
    const userExists = existingUsers.some((user: any) => user.email === email);
    
    if (userExists) {
      toast({
        title: "Registration failed",
        description: "A user with that email already exists",
        variant: "destructive",
      });
      return null;
    }
    
    // Create new user
    const newUser = {
      id: generateId(),
      username,
      email,
      password, // In a real app, this would be hashed
    };
    
    // Add to users list
    existingUsers.push(newUser);
    localStorage.setItem('campusDish_users', JSON.stringify(existingUsers));
    
    // Create a session and store user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    localStorage.setItem(SESSION_STORAGE_KEY, new Date().toISOString());
    
    toast({
      title: "Registration successful",
      description: `Welcome, ${username}!`,
    });
    
    return userWithoutPassword;
  } catch (error) {
    console.error("Registration error:", error);
    toast({
      title: "Registration failed",
      description: "An error occurred during registration",
      variant: "destructive",
    });
    return null;
  }
};

// Login user
export const loginUser = (email: string, password: string): User | null => {
  try {
    // Get users list
    const existingUsers = JSON.parse(localStorage.getItem('campusDish_users') || '[]');
    const user = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return null;
    }
    
    // Create a session and store user (without password)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    localStorage.setItem(SESSION_STORAGE_KEY, new Date().toISOString());
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${user.username}!`,
    });
    
    return userWithoutPassword;
  } catch (error) {
    console.error("Login error:", error);
    toast({
      title: "Login failed",
      description: "An error occurred during login",
      variant: "destructive",
    });
    return null;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(SESSION_STORAGE_KEY);
  
  toast({
    title: "Logout successful",
    description: "You have been logged out",
  });
};
