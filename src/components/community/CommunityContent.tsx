
import React from "react";
import { PostForm } from "@/components/community/PostForm";
import { SearchBar } from "@/components/community/SearchBar";
import { TabNavigation } from "@/components/community/TabNavigation";
import { PostFeed } from "@/components/community/PostFeed";
import { usePostManagement, Post } from "@/hooks/usePostManagement";

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
  const { handleVote, addComment } = usePostManagement(posts, setPosts);

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
      
      <PostFeed
        activeTab={activeTab}
        posts={posts}
        onVote={handleVote}
        onAddComment={addComment}
      />
    </div>
  );
};

export default CommunityContent;
