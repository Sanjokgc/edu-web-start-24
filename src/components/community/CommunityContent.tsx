
import React from "react";
import { PostForm } from "@/components/community/PostForm";
import { SearchBar } from "@/components/community/SearchBar";
import { TabNavigation } from "@/components/community/TabNavigation";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: {
    id: string;
    content: string;
    author: string;
    authorId: string;
    createdAt: string;
  }[];
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
    </div>
  );
};

export default CommunityContent;
