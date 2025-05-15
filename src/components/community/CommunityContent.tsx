
import React, { useState, useEffect } from "react";
import { PostForm } from "@/components/community/PostForm";
import { SearchBar } from "@/components/community/SearchBar";
import { TabNavigation } from "@/components/community/TabNavigation";
import { Post } from "@/components/community/Post";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}

interface Post {
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

interface CommunityContentProps {
  posts: Post[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const CommunityContent: React.FC<CommunityContentProps> = ({
  posts,
  activeTab,
  setActiveTab,
  setVideoModalOpen,
  setPosts,
}) => {
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

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
      
      // Save to localStorage for persistence between sessions
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      return updatedPosts;
    });
    
    // Display success message
    toast({
      title: "Vote registered",
      description: `Your ${voteType} has been recorded.`,
    });
  };

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
      
      // Save to localStorage for persistence
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      return updatedPosts;
    });
    
    // Display success message
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  const filterPostsByTab = (tabValue: string) => {
    // For now return all posts for all tabs for visibility
    if (tabValue === "all-posts") {
      return posts;
    } else if (tabValue === "trending-post") {
      // Show posts with most votes/comments as trending
      return [...posts].sort((a, b) => 
        (b.upvotes + b.comments.length) - (a.upvotes + a.comments.length)
      );
    } else if (tabValue === "discussions") {
      // Show posts with most comments
      return [...posts].sort((a, b) => b.comments.length - a.comments.length);
    } else if (tabValue === "media-pics") {
      // For demo purposes, just return posts
      return posts;
    }
    return posts;
  };

  return (
    <div className="flex-1">
      <div className="mb-4">
        <SearchBar />
      </div>
      
      <PostForm setPosts={setPosts} />
      
      <TabNavigation 
        posts={posts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="space-y-6 mt-4">
        {filterPostsByTab(activeTab).map((post) => (
          <Post 
            key={post.id}
            post={post}
            onVote={handleVote}
            onAddComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityContent;
