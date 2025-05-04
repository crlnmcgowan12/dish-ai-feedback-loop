
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { User, LogIn, LogOut } from 'lucide-react';
import { getCurrentUser, isLoggedIn, logoutUser } from '../services/authService';
import AuthModal from './AuthModal';

const AuthStatus = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  
  // Update state when authentication changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(isLoggedIn());
      setUser(getCurrentUser());
    };
    
    // Initial check
    checkAuth();
    
    // Listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleAuthSuccess = () => {
    setIsAuthenticated(isLoggedIn());
    setUser(getCurrentUser());
  };
  
  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
  };
  
  return (
    <div className="flex items-center gap-2">
      {isAuthenticated && user ? (
        <div className="flex items-center gap-2">
          <div className="text-sm hidden sm:block">
            <span className="font-medium">{user.username}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1" 
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      ) : (
        <Button 
          variant="default" 
          size="sm"
          onClick={() => setAuthModalOpen(true)}
          className="flex items-center gap-1 bg-campus-primary hover:bg-campus-secondary text-white shadow-md"
        >
          <LogIn className="h-4 w-4" />
          <span className="sm:inline">Login</span>
        </Button>
      )}
      
      <AuthModal 
        open={authModalOpen} 
        setOpen={setAuthModalOpen} 
        onSuccess={handleAuthSuccess} 
      />
    </div>
  );
};

export default AuthStatus;
