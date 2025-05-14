
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchBar = ({ searchTerm, onSearchTermChange, onSearch }: SearchBarProps) => {
  return (
    <form onSubmit={onSearch} className="mb-8">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
