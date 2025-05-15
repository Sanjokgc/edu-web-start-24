
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PostVoteButtonsProps {
  postId: string;
  upvotes: number;
  downvotes: number;
  hasUserUpvoted: boolean;
  hasUserDownvoted: boolean;
  onUpvote: () => void;
  onDownvote: () => void;
}

export const PostVoteButtons = ({
  postId,
  upvotes,
  downvotes,
  hasUserUpvoted,
  hasUserDownvoted,
  onUpvote,
  onDownvote
}: PostVoteButtonsProps) => {
  return (
    <div className="flex space-x-2 mr-4">
      <Button 
        onClick={onUpvote} 
        variant="ghost" 
        size="sm"
        className={`flex items-center ${hasUserUpvoted ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
      >
        <ArrowUp className="mr-1" size={16} />
        {upvotes}
      </Button>
      <Button 
        onClick={onDownvote} 
        variant="ghost" 
        size="sm"
        className={`flex items-center ${hasUserDownvoted ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
      >
        <ArrowDown className="mr-1" size={16} />
        {downvotes}
      </Button>
    </div>
  );
};
