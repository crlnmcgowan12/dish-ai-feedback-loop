
import { Link } from 'react-router-dom';
import AuthStatus from './AuthStatus';

const Navbar = () => {
  return (
    <header className="bg-campus-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">CampusDish</Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-campus-accent transition-colors">Home</Link>
              <Link to="/universities" className="hover:text-campus-accent transition-colors">Universities</Link>
              <Link to="/about" className="hover:text-campus-accent transition-colors">About</Link>
            </nav>
          </div>
          <AuthStatus />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
