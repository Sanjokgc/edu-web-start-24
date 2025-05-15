
import React from "react";
import { PostForm } from "@/components/community/PostForm";
import { SearchBar } from "@/components/community/SearchBar";
import { TabNavigation } from "@/components/community/TabNavigation";
import { Post } from "@/components/community/Post";
import { useToast } from "@/hooks/use-toast";

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
}

interface CommunityContentProps {
  posts: Post[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommunityContent: React.FC<CommunityContentProps> = ({
  posts,
  activeTab,
  setActiveTab,
  setVideoModalOpen,
}) => {
  const { toast } = useToast();

  const handleVote = (postId: string, voteType: "upvote" | "downvote") => {
    // Get existing posts from localStorage
    const storedPosts = localStorage.getItem("communityPosts");
    if (!storedPosts) return;
    
    // Parse and update the posts
    const parsedPosts = JSON.parse(storedPosts);
    const updatedPosts = parsedPosts.map((post: Post) => {
      if (post.id === postId) {
        if (voteType === "upvote") {
          return { ...post, upvotes: post.upvotes + 1 };
        } else {
          return { ...post, downvotes: post.downvotes + 1 };
        }
      }
      return post;
    });
    
    // Save back to localStorage
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    
    // Display success message
    toast({
      title: "Vote registered",
      description: `Your ${voteType} has been recorded.`,
    });
  };

  const addComment = (postId: string, comment: Comment) => {
    // Get existing posts from localStorage
    const storedPosts = localStorage.getItem("communityPosts");
    if (!storedPosts) return;
    
    // Parse and update the posts
    const parsedPosts = JSON.parse(storedPosts);
    const updatedPosts = parsedPosts.map((post: Post) => {
      if (post.id === postId) {
        return { 
          ...post, 
          comments: [comment, ...post.comments]
        };
      }
      return post;
    });
    
    // Save back to localStorage
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    
    // Display success message
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  return (
    <div className="flex-1">
      <div className="mb-4">
        <SearchBar />
      </div>
      
      <PostForm />
      
      <TabNavigation 
        posts={posts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {activeTab === "all-posts" && posts.length > 0 && (
        <div className="space-y-6 mt-4">
          {posts.map((post) => (
            <Post 
              key={post.id}
              post={post}
              onVote={handleVote}
              onAddComment={addComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityContent;
