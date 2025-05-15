import React, { useState, useEffect } from "react";
import { Post as PostComponent } from "@/components/community/Post";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/hooks/usePostManagement";

type PostType = {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: CommentType[];
  upvotedBy: string[];  // Changed from optional to required
  downvotedBy: string[]; // Changed from optional to required
};

type CommentType = {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
};

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load posts from localStorage
    const loadPosts = () => {
      try {
        const savedPosts = localStorage.getItem("communityPosts");
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        
        // Normalize posts to ensure all have required fields
        const normalizedPosts = parsedPosts.map((post: any) => ({
          ...post,
          upvotedBy: post.upvotedBy || [],
          downvotedBy: post.downvotedBy || [],
          comments: post.comments || []
        }));
        
        setPosts(normalizedPosts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load posts. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Simulate network request
    setTimeout(() => {
      loadPosts();
    }, 800);
    
    // Listen for storage events (when other users/tabs update posts)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "communityPosts") {
        loadPosts();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [toast]);

  const handleVote = (postId: string, voteType: "upvote" | "downvote") => {
    setPosts(currentPosts => {
      const updatedPosts = currentPosts.map(post => {
        if (post.id === postId) {
          if (voteType === "upvote") {
            return { ...post, upvotes: post.upvotes + 1 };
          } else {
            return { ...post, downvotes: post.downvotes + 1 };
          }
        }
        return post;
      });
      
      // Update localStorage
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      return updatedPosts;
    });
  };

  const addComment = (postId: string, comment: any) => {
    setPosts(currentPosts => {
      const updatedPosts = currentPosts.map(post => {
        if (post.id === postId) {
          return { 
            ...post, 
            comments: [comment, ...post.comments]
          };
        }
        return post;
      });
      
      // Update localStorage
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      return updatedPosts;
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No posts yet</h3>
        <p className="text-gray-500 mb-6">Be the first to share with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostComponent 
          key={post.id} 
          post={post} 
          onVote={handleVote} 
          onAddComment={addComment}
        />
      ))}
    </div>
  );
};
