
import React from "react";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <div 
      key={book.identifier} 
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(book)}
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
  );
};

export default BookCard;
