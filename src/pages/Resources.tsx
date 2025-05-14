
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/services/resourcesApi";
import { Book, PaginatedResponse } from "@/types/book";
import BookDetail from "@/components/resources/BookDetail";
import ResourceListView from "@/components/resources/ResourceListView";

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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16 flex-grow">
        {selectedBook ? (
          // Book Detail View
          <BookDetail book={selectedBook} onBack={handleBackToList} />
        ) : (
          // Book List View with Search & Pagination
          <ResourceListView
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSearch={handleSearch}
            paginatedData={paginatedData}
            isLoading={isLoading}
            error={error as Error | null}
            onSelectBook={handleSelectBook}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
