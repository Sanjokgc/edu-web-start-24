
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare, RefreshCcw, MoreHorizontal } from "lucide-react";

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
  upvotedBy: string[];
  downvotedBy: string[];
}

interface PostTabProps {
  posts: Post[];
  tabValue: string;
}

export const PostTab: React.FC<PostTabProps> = ({ posts, tabValue }) => {
  if (posts.length === 0) {
    let message = "No posts yet";
    let description = "Be the first to share with the community!";
    
    if (tabValue === "trending-post") {
      message = "No trending posts";
      description = "Engage with the community to see trending content!";
    } else if (tabValue === "discussions") {
      message = "No discussions yet";
      description = "Start a discussion to get the conversation going!";
    } else if (tabValue === "media-pics") {
      message = "No media content";
      description = "Share photos and videos to see them here!";
    }
    
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
        <h3 className="text-xl font-medium text-gray-700 mb-2">{message}</h3>
        <p className="text-gray-500 mb-6">{description}</p>
      </div>
    );
  }
  
  return (
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
    </div>
  );
};
