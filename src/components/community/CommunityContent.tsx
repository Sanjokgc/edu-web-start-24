
import React from "react";
import { Input } from "@/components/ui/input";
import { PostForm } from "@/components/community/PostForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare, RefreshCcw, MoreHorizontal } from "lucide-react";
import { PostList } from "@/components/community/PostList";

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
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for keywords, #hashtag, @Name"
            className="pl-10 pr-4 py-2 border-gray-200 rounded-full focus:ring-[#FF7F50] focus:border-[#FF7F50] text-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>
      </div>
      
      <PostForm />
      
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
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium flex items-center">
                            {post.author}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded cursor-pointer">
                          <MoreHorizontal size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {post.title !== "New Post" && (
                    <h3 className="font-medium mb-2">{post.title}</h3>
                  )}
                  <p className="text-sm mb-3">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <ArrowUp size={18} />
                      <span>{post.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <ArrowDown size={18} />
                      <span>{post.downvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <MessageSquare size={18} />
                      <span>{post.comments.length}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <RefreshCcw size={18} />
                      <span>0</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                      <MoreHorizontal size={18} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {posts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-6">Be the first to share with the community!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending-post" className="mt-4">
          <div className="space-y-4">
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No trending posts</h3>
              <p className="text-gray-500 mb-6">Engage with the community to see trending content!</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="mt-4">
          <div className="space-y-4">
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No discussions yet</h3>
              <p className="text-gray-500 mb-6">Start a discussion to get the conversation going!</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media-pics" className="mt-4">
          <div className="space-y-4">
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No media content</h3>
              <p className="text-gray-500 mb-6">Share photos and videos to see them here!</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityContent;
