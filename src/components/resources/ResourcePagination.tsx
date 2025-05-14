
import React from "react";
import { PaginatedResponse } from "@/types/book";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ResourcePaginationProps {
  paginatedData: PaginatedResponse;
  onPageChange: (page: number) => void;
}

const ResourcePagination = ({ paginatedData, onPageChange }: ResourcePaginationProps) => {
  const { currentPage, totalPages } = paginatedData;
  
  // Don't show pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }
  
  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show the first page
    pages.push(1);
    
    // Calculate the range of pages to show around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis indicator if needed at start
    if (startPage > 2) {
      pages.push("ellipsis-start");
    }
    
    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis indicator if needed at end
    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end");
    }
    
    // Always show the last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {getPageNumbers().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === pageNumber}
                onClick={() => onPageChange(Number(pageNumber))}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ResourcePagination;
