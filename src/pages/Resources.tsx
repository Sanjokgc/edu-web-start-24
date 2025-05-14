
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Book {
  identifier: string;
  title: string;
  creator?: string;
  description?: string;
  mediatype: string;
  coverUrl?: string;
}

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  
  // Fetch books from Internet Archive
  const fetchBooks = async () => {
    const searchQuery = searchTerm.trim() ? searchTerm : "education";
    const response = await fetch(
      `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
        searchQuery
      )}+mediatype%3Atexts&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=description&fl[]=mediatype&sort[]=&sort[]=&sort[]=&rows=12&page=1&output=json`
    );
    
    const data = await response.json();
    
    // Process and enhance the results
    const books = data.response.docs.map((book: any) => ({
      ...book,
      coverUrl: `https://archive.org/services/img/${book.identifier}`
    }));
    
    return books;
  };
  
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ["books", searchTerm],
    queryFn: fetchBooks,
    staleTime: 300000, // 5 minutes
  });

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will automatically trigger due to the queryKey change
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Book List */}
          <div className={`w-full ${selectedBook ? 'lg:w-1/3' : 'lg:w-full'}`}>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-6">Educational Resources</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our collection of free educational resources from the Internet Archive.
              These books and documents are available to read directly on our platform.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search for books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
            </form>
            
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading resources...</p>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading resources. Please try again later.</p>
              </div>
            )}
            
            {/* Books Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book: Book) => (
                  <div 
                    key={book.identifier} 
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedBook(book.identifier)}
                  >
                    <div className="aspect-[2/3] bg-gray-100">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/400x600/e2e8f0/64748b?text=No+Cover";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-2 text-education-blue">{book.title}</h3>
                      {book.creator && (
                        <p className="text-sm text-gray-600 mt-1">{book.creator}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Empty State */}
            {!isLoading && !error && books.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No books found matching your search criteria.</p>
              </div>
            )}
          </div>
          
          {/* Right Side - Book Reader */}
          {selectedBook && (
            <div className="w-full lg:w-2/3 h-screen lg:h-[800px] bg-white border rounded-lg shadow-md">
              <div className="h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-medium">Reading Mode</h3>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedBook(null)}
                  >
                    Close
                  </Button>
                </div>
                <iframe
                  src={`https://archive.org/embed/${selectedBook}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Book Reader"
                  className="h-[calc(100%-60px)]"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
