
import React from 'react';
import { University } from '../types';
import { universities } from '../services/universityService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UniversitySelectorProps {
  selectedUniversity: University | null;
  onUniversityChange: (university: University) => void;
}

const UniversitySelector: React.FC<UniversitySelectorProps> = ({ 
  selectedUniversity, 
  onUniversityChange 
}) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <label htmlFor="university-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Your University
      </label>
      <Select
        value={selectedUniversity?.id || ""}
        onValueChange={(value) => {
          const university = universities.find(u => u.id === value);
          if (university) {
            onUniversityChange(university);
          }
        }}
      >
        <SelectTrigger className="w-full" id="university-select">
          <SelectValue placeholder="Select a university" />
        </SelectTrigger>
        <SelectContent>
          {universities.map((university) => (
            <SelectItem key={university.id} value={university.id}>
              {university.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UniversitySelector;
