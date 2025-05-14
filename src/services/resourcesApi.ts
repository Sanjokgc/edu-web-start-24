
import { Book } from "@/types/book";
import { toast } from "@/components/ui/use-toast";

export const fetchBooks = async (searchTerm: string): Promise<Book[]> => {
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
