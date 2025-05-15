
import React from "react";
import { Input } from "@/components/ui/input";

export const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search for keywords, #hashtag, @Name"
        className="pl-10 pr-4 py-2 border-gray-200 rounded-full focus:ring-[#FF7F50] focus:border-[#FF7F50] text-sm"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
    </div>
  );
};
