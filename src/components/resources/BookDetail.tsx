
import React from "react";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowLeft, X, BookOpen } from "lucide-react";

interface BookDetailProps {
  book: Book;
  onBack: () => void;
}

const BookDetail = ({ book, onBack }: BookDetailProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Books
        </Button>
        <h2 className="text-xl font-medium line-clamp-1 hidden md:block">{book.title}</h2>
        <Button 
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <X size={18} />
          Close
        </Button>
      </div>
      
      {/* Expanded reader that fills available width */}
      <div className="w-full h-[calc(100vh-300px)] mb-6">
        <iframe
          src={`https://archive.org/embed/${book.identifier}?ui=embed`}
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
          <CardTitle className="mb-2">{book.title}</CardTitle>
          {book.creator && (
            <div className="mb-2 text-sm text-gray-600">
              <span className="font-medium">Author/Creator:</span> {book.creator}
            </div>
          )}
          {book.description && (
            <CardDescription className="text-sm mt-2">
              {book.description}
            </CardDescription>
          )}
          <div className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => window.open(`https://archive.org/details/${book.identifier}`, '_blank')}
              className="flex items-center gap-2"
            >
              <BookOpen size={16} />
              View on Internet Archive
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;
