
import React from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { PaginatedResponse } from "@/types/book";

interface ResourcePaginationProps {
  paginatedData: PaginatedResponse;
  onPageChange: (page: number) => void;
}

const ResourcePagination = ({ paginatedData, onPageChange }: ResourcePaginationProps) => {
  if (paginatedData.totalPages <= 1) {
    return null;
  }
  
  const { totalPages, currentPage: activePage } = paginatedData;
  
  // Generate pagination links
  const renderPaginationLinks = () => {
    // If we have 7 or fewer pages, show all links
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <PaginationItem key={page}>
          <PaginationLink 
            onClick={() => onPageChange(page)} 
            isActive={page === activePage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ));
    }
    
    // For more than 7 pages, show a condensed version with ellipsis
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink 
          onClick={() => onPageChange(1)} 
          isActive={1 === activePage}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if active page is > 3
    if (activePage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around the active page
    const startPage = Math.max(2, activePage - 1);
    const endPage = Math.min(totalPages - 1, activePage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => onPageChange(i)} 
            isActive={i === activePage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if active page is < totalPages - 2
    if (activePage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page
    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink 
          onClick={() => onPageChange(totalPages)} 
          isActive={totalPages === activePage}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
    
    return items;
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {/* Previous Page Button */}
        {activePage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(activePage - 1)} 
            />
          </PaginationItem>
        )}
        
        {/* Page Numbers */}
        {renderPaginationLinks()}
        
        {/* Next Page Button */}
        {activePage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(activePage + 1)} 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ResourcePagination;
