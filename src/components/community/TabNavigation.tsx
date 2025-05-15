
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostTab } from "@/components/community/PostTab";

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
        <PostTab posts={[]} tabValue="trending-post" />
      </TabsContent>

      <TabsContent value="discussions" className="mt-4">
        <PostTab posts={[]} tabValue="discussions" />
      </TabsContent>

      <TabsContent value="media-pics" className="mt-4">
        <PostTab posts={[]} tabValue="media-pics" />
      </TabsContent>
    </Tabs>
  );
};
