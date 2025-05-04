
import React from 'react';
import Navbar from '../components/Navbar';
import SchoolSuggestionForm from '../components/SchoolSuggestionForm';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-campus-primary mb-6">About CampusDish Insights</h1>
            
            <div className="prose prose-lg">
              <p className="mb-4">
                CampusDish Insights is an innovative application designed to revolutionize the university student dining 
                experience by providing real-time access to dining hall menus and aggregating valuable feedback through 
                item ratings and historical data.
              </p>
              
              <h2 className="text-xl font-semibold text-campus-secondary mt-6 mb-3">Our Mission</h2>
              <p className="mb-4">
                Our mission is to empower students with comprehensive dining hall information and peer feedback, 
                enabling them to make more informed decisions about their meals and enhancing their overall 
                satisfaction with campus dining services.
              </p>
              
              <h2 className="text-xl font-semibold text-campus-secondary mt-6 mb-3">Key Features</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Real-time access to daily dining hall menus</li>
                <li>Anonymous rating system for menu items</li>
                <li>Historical rating trends for each menu item</li>
                <li>Detailed dietary information for food items</li>
                <li>User-friendly mobile-first interface</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-campus-secondary mt-6 mb-3">Future Plans</h2>
              <p className="mb-4">
                In future versions of CampusDish Insights, we plan to implement user authentication, personalized 
                recommendations, dietary preference filtering, and direct feedback channels to university food services.
              </p>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-campus-secondary mb-6">Suggest a School</h2>
            <p className="mb-6 text-gray-600">
              Don't see your school listed? Let us know which university you'd like us to add next!
            </p>
            <SchoolSuggestionForm />
          </section>
        </div>
      </main>
      <footer className="bg-campus-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 CampusDish Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
