
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link, FileText, Download, ExternalLink } from 'lucide-react';
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
  const [scrapingStatus, setScrapingStatus] = useState<string>('');

  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSaveMenuLink = () => {
    if (!menuLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid menu link",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    if (!isValidUrl(menuLink)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://www.university.edu/dining)",
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
    setScrapingStatus('Connecting to website...');
    
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
      let successCount = 0;
      for (const hall of diningHalls) {
        setScrapingStatus(`Importing menu for ${hall.name}...`);
        const result = await scrapeMenuFromWebsite(menuLink, hall.id);
        if (result) successCount++;
      }
      
      if (successCount > 0) {
        toast({
          title: "Menu Scraped Successfully",
          description: `Menu items have been imported for ${successCount} dining halls at ${university.name}.`,
        });
      
        // Notify parent component that menu has been scraped
        onMenuScraped();
      } else {
        toast({
          title: "Warning",
          description: "No menu items were successfully imported.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error scraping menu:", error);
      toast({
        title: "Error Scraping Menu",
        description: "There was a problem importing the menu items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setScrapingStatus('');
    }
  };

  const handleOpenMenuLink = () => {
    if (university.menuLink) {
      window.open(university.menuLink, '_blank', 'noopener,noreferrer');
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
          <Button 
            variant="link" 
            onClick={handleOpenMenuLink}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1 p-0 h-auto justify-start"
          >
            <ExternalLink className="h-3 w-3" />
            Open menu website in new tab
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleScrapeMenu}
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            {isLoading ? scrapingStatus || "Importing Menu Data..." : "Import Menu Items From Website"}
          </Button>
          
          {isLoading && (
            <div className="text-xs bg-blue-50 p-2 rounded animate-pulse">
              {scrapingStatus}
            </div>
          )}
          
          <p className="text-xs text-gray-500 italic">
            This will extract menu items from the university's menu website and add them to the app.
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversityMenuLink;
