import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Image, Video, CalendarCheck, Smile, BarChart, Video as Live } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/hooks/usePostManagement";

interface PostFormProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const PostForm = ({ setPosts }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setIsExpanded(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to create a post.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Validation Error",
        description: "Post content is required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Create new post object
    const newPost = {
      id: Date.now().toString(),
      title: title.trim() || "New Post",
      content,
      author: user.firstName || user.username || "Anonymous",
      authorId: user.id,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: [],
      upvotedBy: [],
      downvotedBy: []
    };
    
    // Get existing posts from localStorage or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem("communityPosts") || "[]");
    
    // Add new post to beginning of array
    const updatedPosts = [newPost, ...existingPosts];
    
    // Save updated posts back to localStorage
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    
    // Update posts state
    setPosts(updatedPosts);
    
    // Reset form
    setTitle("");
    setContent("");
    setIsSubmitting(false);
    setIsExpanded(false);
    
    toast({
      title: "Success!",
      description: "Your post has been published.",
    });
  };

  return (
    <Card className="mb-6 shadow-sm bg-white">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={user?.imageUrl} 
                alt={user?.firstName || user?.username || "User"} 
              />
              <AvatarFallback>{(user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={`What's on your mind?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`border-none bg-gray-50 hover:bg-gray-100 focus:ring-0 resize-none transition-all min-h-[48px] ${isExpanded ? 'min-h-[120px]' : ''}`}
                onFocus={handleFocus}
              />
              
              {isExpanded && (
                <Input
                  type="text"
                  placeholder="Add a title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-3 border-gray-200"
                />
              )}
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-education-blue hover:bg-gray-50 p-1 rounded-full">
                    <Image size={18} />
                    <span className="ml-1 text-xs sm:text-sm hidden sm:inline">Photo</span>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-education-blue hover:bg-gray-50 p-1 rounded-full">
                    <Video size={18} />
                    <span className="ml-1 text-xs sm:text-sm hidden sm:inline">Video</span>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-education-blue hover:bg-gray-50 p-1 rounded-full">
                    <Smile size={18} />
                    <span className="ml-1 text-xs sm:text-sm hidden sm:inline">Feeling</span>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-education-blue hover:bg-gray-50 p-1 rounded-full">
                    <BarChart size={18} />
                    <span className="ml-1 text-xs sm:text-sm hidden sm:inline">Poll</span>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-education-blue hover:bg-gray-50 p-1 rounded-full">
                    <Live size={18} />
                    <span className="ml-1 text-xs sm:text-sm hidden sm:inline">Live</span>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-education-blue hover:bg-gray-50 p-1 rounded-full">
                    <CalendarCheck size={18} />
                    <span className="ml-1 text-xs sm:text-sm hidden sm:inline">Schedule</span>
                  </Button>
                </div>
                
                {isExpanded && (
                  <div className="ml-auto flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="sm" 
                      className="bg-education-blue hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Publishing..." : "Publish"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        {!isExpanded && (
          <CardFooter className="flex justify-end px-4 pt-0 pb-4">
            <Button 
              type="submit" 
              className="bg-education-blue hover:bg-blue-700 text-white"
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};
