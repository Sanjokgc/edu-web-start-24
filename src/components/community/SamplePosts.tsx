
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, RefreshCcw, MoreHorizontal } from "lucide-react";

interface SamplePostsProps {
  setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SamplePosts: React.FC<SamplePostsProps> = ({
  setVideoModalOpen,
}) => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      author: "Arlene McCoy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      avatarFallback: "AM",
      badge: "Chef",
      time: "1 day ago",
      content: "Here I teach advanced proofing techniques. It's hard for people to refuse if you use this technique. Watch it first on YouTube, then I'll comment.\nNote: Invite me to see if your proofing improves dramatically :)",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      upvotes: 15200,
      downvotes: 0,
      comments: 769,
      shares: 164,
      showComments: false
    },
    {
      id: "2",
      author: "Theresa Webb",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      avatarFallback: "TW",
      time: "2 days ago",
      content: "I finally understood why I said I didn't need to take the course, until I saw it. Now I even want to join Bakers Club even more.",
      upvotes: 15200,
      downvotes: 0,
      comments: 769,
      shares: 164,
      showComments: false
    }
  ]);

  const handleUpvote = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  const handleDownvote = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post
    ));
  };

  const handleCommentsToggle = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const handleShare = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  return (
    <>
      {posts.map(post => (
        <Card key={post.id} className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium flex items-center">
                      {post.author}
                      {post.badge && <Badge className="ml-2 bg-[#FFE4D6] text-[#FF7F50] hover:bg-[#FFD6C2]">{post.badge}</Badge>}
                    </h4>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded cursor-pointer">
                    <MoreHorizontal size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm mb-3">{post.content}</p>
            {post.image && (
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src={post.image}
                  alt={`${post.author}'s post`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-3">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap"
                onClick={() => handleUpvote(post.id)}
              >
                <ArrowUp size={18} />
                <span>{post.upvotes.toLocaleString()}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap"
                onClick={() => handleDownvote(post.id)}
              >
                <ArrowDown size={18} />
                {post.downvotes > 0 && <span>{post.downvotes}</span>}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap"
                onClick={() => handleCommentsToggle(post.id)}
              >
                <MessageSquare size={18} />
                <span>{post.comments}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap"
                onClick={() => handleShare(post.id)}
              >
                <RefreshCcw size={18} />
                <span>{post.shares}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto"
              >
                <MoreHorizontal size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default SamplePosts;
