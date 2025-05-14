
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/services/resourcesApi";
import { Book } from "@/types/book";
import BookList from "@/components/resources/BookList";
import BookDetail from "@/components/resources/BookDetail";
import SearchBar from "@/components/resources/SearchBar";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  const { data: books = [], isLoading, error, refetch } = useQuery({
    queryKey: ["books", searchTerm],
    queryFn: () => fetchBooks(searchTerm),
    staleTime: 1800000, // 30 minutes to reduce API calls
    gcTime: 3600000, // 1 hour cache (renamed from cacheTime)
    retry: 1,
  });

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
              books={books}
              isLoading={isLoading}
              error={error as Error | null}
              onSelectBook={handleSelectBook}
            />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
