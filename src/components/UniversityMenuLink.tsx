
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link, FileText, Download } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { University } from '../types';
import { saveUniversityMenuLink } from '../services/universityService';
import { scrapeMenuFromWebsite } from '../services/menuScraperService';
import { getDiningHallsByUniversity } from '../services/mockDataService';

interface UniversityMenuLinkProps {
  university: University;
  onMenuLinkSaved: (university: University) => void;
  onMenuScraped: () => void;
}

const UniversityMenuLink: React.FC<UniversityMenuLinkProps> = ({ 
  university, 
  onMenuLinkSaved,
  onMenuScraped
}) => {
  const [menuLink, setMenuLink] = useState<string>(university.menuLink || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveMenuLink = () => {
    if (!menuLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid menu link",
        variant: "destructive",
      });
      return;
    }

    // Save the menu link
    const updatedUniversity = saveUniversityMenuLink(university.id, menuLink);
    
    toast({
      title: "Menu Link Saved",
      description: `The menu link for ${university.name} has been saved.`,
    });

    // Update the parent component
    onMenuLinkSaved(updatedUniversity);
  };

  const handleScrapeMenu = async () => {
    if (!menuLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter and save a menu link first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Get dining halls for this university
      const diningHalls = getDiningHallsByUniversity(university.id);
      
      if (diningHalls.length === 0) {
        toast({
          title: "Error",
          description: "No dining halls found for this university",
          variant: "destructive",
        });
        return;
      }
      
      // For each dining hall, scrape menu items
      for (const hall of diningHalls) {
        await scrapeMenuFromWebsite(menuLink, hall.id);
      }
      
      toast({
        title: "Menu Scraped Successfully",
        description: `Menu items have been imported for ${university.name}.`,
      });
      
      // Notify parent component that menu has been scraped
      onMenuScraped();
    } catch (error) {
      console.error("Error scraping menu:", error);
      toast({
        title: "Error Scraping Menu",
        description: "There was a problem importing the menu items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        University Menu Link
      </h3>
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Link className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="url"
            value={menuLink}
            onChange={(e) => setMenuLink(e.target.value)}
            placeholder="Enter your university's menu website"
            className="pl-10"
          />
        </div>
        <Button onClick={handleSaveMenuLink}>Save Link</Button>
      </div>
      
      {university.menuLink && (
        <div className="mt-3 flex flex-col space-y-2">
          <a 
            href={university.menuLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <Link className="h-3 w-3" />
            View current menu website
          </a>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleScrapeMenu}
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            {isLoading ? "Importing Menu Data..." : "Import Menu Items From Website"}
          </Button>
          
          <p className="text-xs text-gray-500 italic">
            This will extract menu items from the university's menu website and add them to the app.
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversityMenuLink;
