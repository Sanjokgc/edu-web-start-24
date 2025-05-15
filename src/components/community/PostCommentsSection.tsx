
import React from "react";
import { PostCommentForm } from "./PostCommentForm";
import { PostCommentsList } from "./PostCommentsList";
import { Comment } from "@/services/types";

interface PostCommentsSectionProps {
  postId: string;
  comments: Comment[];
  isSignedIn: boolean;
  isSubmitting: boolean;
  onSubmitComment: (commentText: string) => void;
}

export const PostCommentsSection = ({
  postId,
  comments,
  isSignedIn,
  isSubmitting,
  onSubmitComment
}: PostCommentsSectionProps) => {
  return (
    <div className="w-full space-y-4">
      <PostCommentForm 
        isSubmitting={isSubmitting}
        onSubmit={onSubmitComment}
      />
      <PostCommentsList comments={comments} />
    </div>
  );
};
