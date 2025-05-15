
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/services/types";

interface PostCommentsListProps {
  comments: Comment[];
}

export const PostCommentsList = ({ comments }: PostCommentsListProps) => {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">No comments yet. Be the first to comment!</p>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span className="font-medium">{comment.author}</span>
            <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
          </div>
          <p className="text-black">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};
