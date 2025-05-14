
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BookSkeleton = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Skeleton className="aspect-[2/3] bg-gray-200" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};

export default BookSkeleton;
