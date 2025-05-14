
import { Book, PaginatedResponse } from "@/types/book";
import { toast } from "@/components/ui/use-toast";

export const fetchBooks = async (
  searchTerm: string, 
  page: number = 1,
  itemsPerPage: number = 12
): Promise<PaginatedResponse> => {
  try {
    const searchQuery = searchTerm.trim() ? searchTerm : "education";
    const response = await fetch(
      `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
        searchQuery
      )}+mediatype%3Atexts&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=description&fl[]=mediatype&sort[]=&sort[]=&sort[]=&rows=${itemsPerPage}&page=${page}&output=json`,
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
    
    // Calculate total pages
    const totalResults = data.response.numFound || 0;
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    
    return {
      books,
      totalResults,
      currentPage: page,
      totalPages
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    toast({
      title: "Error",
      description: "Failed to fetch books. Please try again later.",
      variant: "destructive",
    });
    return {
      books: [],
      totalResults: 0,
      currentPage: page,
      totalPages: 0
    };
  }
};
