
import React from "react";
import { Book } from "@/types/book";
import BookCard from "./BookCard";
import BookSkeleton from "./BookSkeleton";

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  error: Error | null;
  onSelectBook: (book: Book) => void;
}

const BookList = ({ books, isLoading, error, onSelectBook }: BookListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading resources. Please try again later.</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No books found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard 
          key={book.identifier}
          book={book} 
          onClick={onSelectBook} 
        />
      ))}
    </div>
  );
};

export default BookList;
