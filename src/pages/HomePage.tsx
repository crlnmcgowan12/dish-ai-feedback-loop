
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-campus-primary/10 to-campus-accent/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
                Explore Campus Dining at Your Fingertips
              </h1>
              <p className="text-lg text-gray-700 mb-8 md:text-xl max-w-2xl mx-auto text-balance">
                Discover dining options, view menus, and rate dishes at your university's dining halls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-6">
                  <Link to="/universities">
                    Find Your University
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6">
                  <Link to="/reviews">
                    View Ratings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-campus-accent/30 to-campus-accent/10 p-6 rounded-2xl text-center">
                <div className="bg-campus-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-campus-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Select Your University</h3>
                <p className="text-gray-600">
                  Choose your school from our growing list of university campuses.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-campus-accent/30 to-campus-accent/10 p-6 rounded-2xl text-center">
                <div className="bg-campus-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-campus-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse Dining Options</h3>
                <p className="text-gray-600">
                  Explore dining halls and see what's being served today.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-campus-accent/30 to-campus-accent/10 p-6 rounded-2xl text-center">
                <div className="bg-campus-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-campus-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Rate & Discover</h3>
                <p className="text-gray-600">
                  Rate dishes and discover new favorites based on community feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase section */}
        <section className="py-16 bg-campus-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&h=600" 
                  alt="Campus Food" 
                  className="rounded-2xl shadow-card object-cover w-full h-[400px]"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-campus-primary">
                  Discover Your Campus Dining Experience
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  CampusDish Insights helps you make informed dining choices on campus. 
                  From nutritional information to peer reviews, we provide everything
                  you need to enjoy your campus dining experience.
                </p>
                <Button asChild>
                  <Link to="/universities">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-campus-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">CampusDish Insights</h3>
              <p className="text-white/70">Making campus dining deliciously simple</p>
            </div>
            <div>
              <p>&copy; 2025 CampusDish Insights. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
