
import { University } from "../types";

// List of popular US colleges
export const universities: University[] = [
  { id: "1", name: "Harvard University", state: "Massachusetts", city: "Cambridge" },
  { id: "2", name: "Stanford University", state: "California", city: "Stanford" },
  { id: "3", name: "Massachusetts Institute of Technology", state: "Massachusetts", city: "Cambridge" },
  { id: "4", name: "University of California, Berkeley", state: "California", city: "Berkeley" },
  { id: "5", name: "University of Michigan", state: "Michigan", city: "Ann Arbor" },
  { id: "6", name: "Cornell University", state: "New York", city: "Ithaca" },
  { id: "7", name: "University of Texas at Austin", state: "Texas", city: "Austin" },
  { id: "8", name: "University of Wisconsin-Madison", state: "Wisconsin", city: "Madison" },
  { id: "9", name: "Penn State University", state: "Pennsylvania", city: "University Park" },
  { id: "10", name: "Ohio State University", state: "Ohio", city: "Columbus" },
  { id: "11", name: "University of Florida", state: "Florida", city: "Gainesville" },
  { id: "12", name: "University of Washington", state: "Washington", city: "Seattle" },
  { id: "13", name: "New York University", state: "New York", city: "New York" },
  { id: "14", name: "UCLA", state: "California", city: "Los Angeles" },
  { id: "15", name: "University of North Carolina at Chapel Hill", state: "North Carolina", city: "Chapel Hill" },
];

// Get the university by its ID
export const getUniversityById = (id: string): University | undefined => {
  return universities.find((university) => university.id === id);
};
