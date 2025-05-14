
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowLeft, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  // Fetch books from Internet Archive with optimized query parameters and caching
  const fetchBooks = async () => {
    try {
      const searchQuery = searchTerm.trim() ? searchTerm : "education";
      const response = await fetch(
        `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
          searchQuery
        )}+mediatype%3Atexts&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=description&fl[]=mediatype&sort[]=&sort[]=&sort[]=&rows=12&page=1&output=json`,
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'max-age=3600' // Cache for 1 hour
          }
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      
      const data = await response.json();
      
      // Process and enhance the results
      const books = data.response.docs.map((book: any) => ({
        ...book,
        coverUrl: `https://archive.org/services/img/${book.identifier}`
      }));
      
      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again later.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  const { data: books = [], isLoading, error, refetch } = useQuery({
    queryKey: ["books", searchTerm],
    queryFn: fetchBooks,
    staleTime: 1800000, // 30 minutes to reduce API calls
    cacheTime: 3600000, // 1 hour cache
    retry: 1,
  });

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
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
          // Book Reader View with expanded width and details below
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="ghost"
                onClick={handleBackToList}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to Books
              </Button>
              <h2 className="text-xl font-medium line-clamp-1 hidden md:block">{selectedBook.title}</h2>
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleBackToList}
                className="flex items-center gap-2"
              >
                <X size={18} />
                Close
              </Button>
            </div>
            
            {/* Expanded reader that fills available width */}
            <div className="w-full h-[calc(100vh-300px)] mb-6">
              <iframe
                src={`https://archive.org/embed/${selectedBook.identifier}?ui=embed`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Book Reader"
                className="rounded-lg shadow-md"
                loading="eager" // Force eager loading for faster rendering
              ></iframe>
            </div>
            
            {/* Book details below the frame */}
            <Card className="w-full mb-6">
              <CardContent className="pt-6">
                <CardTitle className="mb-2">{selectedBook.title}</CardTitle>
                {selectedBook.creator && (
                  <div className="mb-2 text-sm text-gray-600">
                    <span className="font-medium">Author/Creator:</span> {selectedBook.creator}
                  </div>
                )}
                {selectedBook.description && (
                  <CardDescription className="text-sm mt-2">
                    {selectedBook.description}
                  </CardDescription>
                )}
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(`https://archive.org/details/${selectedBook.identifier}`, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <BookOpen size={16} />
                    View on Internet Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Book List View
          <div>
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
            
            {/* Loading State with Skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="aspect-[2/3] bg-gray-200" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading resources. Please try again later.</p>
              </div>
            )}
            
            {/* Books Grid with better loading */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book: Book) => (
                  <div 
                    key={book.identifier} 
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedBook(book)}
                  >
                    <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/400x600/e2e8f0/64748b?text=No+Cover";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-2 text-education-blue">{book.title}</h3>
                      {book.creator && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{book.creator}</p>
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
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
