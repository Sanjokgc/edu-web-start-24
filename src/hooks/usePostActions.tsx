
import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { addVote, addComment } from "@/services/postsService";

export const usePostActions = (postId: string, onVote?: (postId: string, voteType: "upvote" | "downvote") => void) => {
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();

  const handleUpvote = async () => {
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to vote on posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addVote(postId, user.id, "upvote");
      // The real-time subscription will update the UI
      if (onVote) onVote(postId, "upvote");
    } catch (error) {
      console.error("Error upvoting post:", error);
      toast({
        title: "Error",
        description: "Failed to upvote post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownvote = async () => {
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to vote on posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addVote(postId, user.id, "downvote");
      // The real-time subscription will update the UI
      if (onVote) onVote(postId, "downvote");
    } catch (error) {
      console.error("Error downvoting post:", error);
      toast({
        title: "Error",
        description: "Failed to downvote post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitComment = async (commentText: string) => {
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to comment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!commentText.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingComment(true);
    
    try {
      await addComment(postId, {
        content: commentText,
        author: user.firstName || user.username || "Anonymous",
        authorId: user.id,
      });
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return {
    isSubmittingComment,
    handleUpvote,
    handleDownvote,
    handleSubmitComment
  };
};
