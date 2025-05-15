import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostTab } from "@/components/community/PostTab";
import { Post } from "@/hooks/usePostManagement";

interface TabNavigationProps {
  posts: Post[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  posts,
  activeTab,
  setActiveTab,
}) => {
  // Filter posts based on tab
  const getTrendingPosts = () => {
    return [...posts].sort((a, b) => 
      (b.upvotes + b.comments.length) - (a.upvotes + a.comments.length)
    ).slice(0, 10); // Just get top 10 for trending
  };

  const getDiscussionPosts = () => {
    return [...posts].sort((a, b) => b.comments.length - a.comments.length);
  };

  const getMediaPosts = () => {
    // In a real app, you'd filter for posts containing media
    return posts;
  };

  return (
    <Tabs defaultValue="all-posts" className="mb-4" onValueChange={setActiveTab}>
      <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start gap-2 h-auto p-0">
        <TabsTrigger
          value="all-posts"
          className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'all-posts' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
        >
          All Posts
        </TabsTrigger>
        <TabsTrigger
          value="trending-post"
          className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'trending-post' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
        >
          Trending Post
        </TabsTrigger>
        <TabsTrigger
          value="discussions"
          className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'discussions' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
        >
          Discussions
        </TabsTrigger>
        <TabsTrigger
          value="media-pics"
          className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'media-pics' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
        >
          Media/Pics
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all-posts" className="mt-4">
        <PostTab posts={posts} tabValue="all-posts" />
      </TabsContent>

      <TabsContent value="trending-post" className="mt-4">
        <PostTab posts={getTrendingPosts()} tabValue="trending-post" />
      </TabsContent>

      <TabsContent value="discussions" className="mt-4">
        <PostTab posts={getDiscussionPosts()} tabValue="discussions" />
      </TabsContent>

      <TabsContent value="media-pics" className="mt-4">
        <PostTab posts={getMediaPosts()} tabValue="media-pics" />
      </TabsContent>
    </Tabs>
  );
};
