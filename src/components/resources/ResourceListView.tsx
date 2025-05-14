
import React from "react";
import { Book, PaginatedResponse } from "@/types/book";
import SearchBar from "@/components/resources/SearchBar";
import BookList from "@/components/resources/BookList";
import ResourcePagination from "@/components/resources/ResourcePagination";
import ResourceHeader from "@/components/resources/ResourceHeader";

interface ResourceListViewProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  paginatedData: PaginatedResponse;
  isLoading: boolean;
  error: Error | null;
  onSelectBook: (book: Book) => void;
  onPageChange: (page: number) => void;
}

const ResourceListView = ({ 
  searchTerm, 
  onSearchTermChange, 
  onSearch,
  paginatedData,
  isLoading,
  error,
  onSelectBook,
  onPageChange
}: ResourceListViewProps) => {
  return (
    <div>
      <ResourceHeader 
        title="Educational Resources" 
        description="Explore our collection of free educational resources from the Internet Archive.
        These books and documents are available to read directly on our platform." 
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
        onSearch={onSearch}
      />
      
      <BookList 
        books={paginatedData.books}
        isLoading={isLoading}
        error={error}
        onSelectBook={onSelectBook}
      />
      
      <ResourcePagination 
        paginatedData={paginatedData} 
        onPageChange={onPageChange} 
      />
    </div>
  );
};

export default ResourceListView;
