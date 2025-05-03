
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { University } from '../types';
import { saveUniversityMenuLink } from '../services/universityService';

interface UniversityMenuLinkProps {
  university: University;
  onMenuLinkSaved: (university: University) => void;
}

const UniversityMenuLink: React.FC<UniversityMenuLinkProps> = ({ 
  university, 
  onMenuLinkSaved 
}) => {
  const [menuLink, setMenuLink] = useState<string>(university.menuLink || '');

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
        <div className="mt-2">
          <a 
            href={university.menuLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <Link className="h-3 w-3" />
            View current menu website
          </a>
        </div>
      )}
    </div>
  );
};

export default UniversityMenuLink;
