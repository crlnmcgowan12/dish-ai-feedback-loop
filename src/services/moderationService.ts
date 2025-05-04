
// A simple service to filter out offensive language from comments
// In a production app, this would use a more sophisticated API

// List of common offensive words to filter
const offensiveWords = [
  'shit', 'fuck', 'damn', 'bitch', 'cunt', 'ass', 'asshole', 
  'bastard', 'dick', 'piss', 'slut', 'whore'
];

// Check if a comment contains offensive language
export const containsOffensiveLanguage = (text: string): boolean => {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  // Check for exact matches or partial matches with word boundaries
  return offensiveWords.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lowerText);
  });
};

// Filter out offensive words with asterisks
export const filterOffensiveLanguage = (text: string): string => {
  if (!text) return '';
  
  let filteredText = text;
  offensiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredText = filteredText.replace(regex, '*'.repeat(word.length));
  });
  
  return filteredText;
};
