import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  upvotedBy: string[];
  downvotedBy: string[];
}

export const usePostManagement = (posts: Post[], setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  /**
   * Handles voting on posts and saves the updated posts to Clerk's database
   * (Currently simulated with localStorage until Clerk backend integration is complete)
   */
  const handleVote = (postId: string, voteType: "upvote" | "downvote") => {
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to vote on posts.",
        variant: "destructive",
      });
      return;
    }
    
    const userId = user.id;
    
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          // Check if user has already voted
          const hasUpvoted = post.upvotedBy.includes(userId);
          const hasDownvoted = post.downvotedBy.includes(userId);
          
          if (voteType === "upvote") {
            // If already upvoted, remove the vote
            if (hasUpvoted) {
              return {
                ...post,
                upvotes: post.upvotes - 1,
                upvotedBy: post.upvotedBy.filter(id => id !== userId)
              };
            }
            
            // If previously downvoted, remove downvote and add upvote
            if (hasDownvoted) {
              return {
                ...post,
                upvotes: post.upvotes + 1,
                downvotes: post.downvotes - 1,
                upvotedBy: [...post.upvotedBy, userId],
                downvotedBy: post.downvotedBy.filter(id => id !== userId)
              };
            }
            
            // Add new upvote
            return {
              ...post,
              upvotes: post.upvotes + 1,
              upvotedBy: [...post.upvotedBy, userId]
            };
          } else {
            // If already downvoted, remove the vote
            if (hasDownvoted) {
              return {
                ...post,
                downvotes: post.downvotes - 1,
                downvotedBy: post.downvotedBy.filter(id => id !== userId)
              };
            }
            
            // If previously upvoted, remove upvote and add downvote
            if (hasUpvoted) {
              return {
                ...post,
                downvotes: post.downvotes + 1,
                upvotes: post.upvotes - 1,
                downvotedBy: [...post.downvotedBy, userId],
                upvotedBy: post.upvotedBy.filter(id => id !== userId)
              };
            }
            
            // Add new downvote
            return {
              ...post,
              downvotes: post.downvotes + 1,
              downvotedBy: [...post.downvotedBy, userId]
            };
          }
        }
        return post;
      });
      
      // Save to Clerk's database (simulated with localStorage for now)
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      return updatedPosts;
    });
    
    // Display success message
    toast({
      title: "Vote registered",
      description: `Your ${voteType} has been recorded.`,
    });
  };

  /**
   * Adds a comment to a post and saves the updated posts to Clerk's database
   * (Currently simulated with localStorage until Clerk backend integration is complete)
   */
  const addComment = (postId: string, comment: Comment) => {
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to comment.",
        variant: "destructive",
      });
      return;
    }
    
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => {
        if (post.id === postId) {
          return { 
            ...post, 
            comments: [comment, ...post.comments]
          };
        }
        return post;
      });
      
      // Save to Clerk's database (simulated with localStorage for now)
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      return updatedPosts;
    });
    
    // Display success message
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  return {
    handleVote,
    addComment
  };
};
