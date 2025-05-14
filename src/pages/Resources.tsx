import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/services/resourcesApi";
import { Book, PaginatedResponse } from "@/types/book";
import BookList from "@/components/resources/BookList";
import BookDetail from "@/components/resources/BookDetail";
import SearchBar from "@/components/resources/SearchBar";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["books", searchTerm, currentPage],
    queryFn: () => fetchBooks(searchTerm, currentPage, itemsPerPage),
    staleTime: 1800000, // 30 minutes to reduce API calls
    gcTime: 3600000, // 1 hour cache (renamed from cacheTime)
    retry: 1,
  });
  
  const paginatedData: PaginatedResponse = data || {
    books: [],
    totalResults: 0,
    currentPage: 1,
    totalPages: 0
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    refetch();
  };

  // Select a book to display
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  // Return to book list view
  const handleBackToList = () => {
    setSelectedBook(null);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };
  
  // Generate pagination links
  const renderPaginationLinks = () => {
    const { totalPages, currentPage: activePage } = paginatedData;
    
    // If we have 7 or fewer pages, show all links
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <PaginationItem key={page}>
          <PaginationLink 
            onClick={() => handlePageChange(page)} 
            isActive={page === activePage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ));
    }
    
    // For more than 7 pages, show a condensed version with ellipsis
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink 
          onClick={() => handlePageChange(1)} 
          isActive={1 === activePage}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if active page is > 3
    if (activePage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around the active page
    const startPage = Math.max(2, activePage - 1);
    const endPage = Math.min(totalPages - 1, activePage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)} 
            isActive={i === activePage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if active page is < totalPages - 2
    if (activePage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page
    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink 
          onClick={() => handlePageChange(totalPages)} 
          isActive={totalPages === activePage}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
    
    return items;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16 flex-grow">
        {selectedBook ? (
          // Book Detail View
          <BookDetail book={selectedBook} onBack={handleBackToList} />
        ) : (
          // Book List View
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-6">Educational Resources</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our collection of free educational resources from the Internet Archive.
              These books and documents are available to read directly on our platform.
            </p>
            
            <SearchBar 
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onSearch={handleSearch}
            />
            
            <BookList 
              books={paginatedData.books}
              isLoading={isLoading}
              error={error as Error | null}
              onSelectBook={handleSelectBook}
            />
            
            {/* Pagination Controls */}
            {!isLoading && paginatedData.totalPages > 1 && (
              <Pagination className="my-8">
                <PaginationContent>
                  {/* Previous Page Button */}
                  {paginatedData.currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(paginatedData.currentPage - 1)} 
                      />
                    </PaginationItem>
                  )}
                  
                  {/* Page Numbers */}
                  {renderPaginationLinks()}
                  
                  {/* Next Page Button */}
                  {paginatedData.currentPage < paginatedData.totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(paginatedData.currentPage + 1)} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
