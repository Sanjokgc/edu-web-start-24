
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PostCommentFormProps {
  isSubmitting: boolean;
  onSubmit: (commentText: string) => void;
}

export const PostCommentForm = ({ isSubmitting, onSubmit }: PostCommentFormProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        rows={2}
      />
      <Button 
        type="submit" 
        size="sm" 
        className="bg-blue-600 text-white hover:bg-blue-700"
        disabled={isSubmitting || !commentText.trim()}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
};
