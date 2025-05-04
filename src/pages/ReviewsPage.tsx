
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import { getSortedRatings, getDiningHallForRating } from '../services/ratingsService';
import { Rating, ReviewSortOption } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { ArrowUp, ArrowDown, MessageSquare, Star } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [sortBy, setSortBy] = useState<ReviewSortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const sortedRatings = getSortedRatings(sortBy);
    setRatings(sortedRatings);
  }, [sortBy]);

  const handleSortChange = (option: ReviewSortOption) => {
    setSortBy(option);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(ratings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRatings = ratings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-campus-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-campus-primary mb-6">All Reviews</h1>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Filter & Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={sortBy === 'highest' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleSortChange('highest')}
                className="flex items-center gap-1"
              >
                <Star size={16} />
                Highest Rated
              </Button>
              <Button 
                variant={sortBy === 'lowest' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleSortChange('lowest')}
                className="flex items-center gap-1"
              >
                <Star size={16} className="opacity-50" />
                Lowest Rated
              </Button>
              <Button 
                variant={sortBy === 'newest' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleSortChange('newest')}
                className="flex items-center gap-1"
              >
                <ArrowUp size={16} />
                Newest First
              </Button>
              <Button 
                variant={sortBy === 'oldest' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleSortChange('oldest')}
                className="flex items-center gap-1"
              >
                <ArrowDown size={16} />
                Oldest First
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0 sm:p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rating</TableHead>
                  <TableHead>Menu Item</TableHead>
                  <TableHead className="hidden md:table-cell">Dining Hall</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="w-[100px] text-center">Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRatings.length > 0 ? (
                  paginatedRatings.map(rating => (
                    <TableRow key={rating.id}>
                      <TableCell>
                        <StarRating
                          menuItemId={rating.menuItemId}
                          initialRating={rating.value}
                          size="sm"
                          readOnly
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link 
                          to={`/menu-item/${rating.menuItemId}`}
                          className="text-campus-primary hover:underline"
                        >
                          {rating.menuItemName || "Unknown Item"}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getDiningHallForRating(rating)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatDate(rating.timestamp)}
                      </TableCell>
                      <TableCell className="text-center">
                        {rating.comment ? (
                          <div className="flex justify-center" title={rating.comment}>
                            <MessageSquare size={18} className="text-gray-600" />
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No ratings found. Start rating some menu items!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="bg-campus-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 CampusDish Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ReviewsPage;
