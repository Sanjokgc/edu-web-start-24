
import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to create a post.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // In a real app, this would call an API to save the post
    // For now, we'll simulate the process with a setTimeout
    setTimeout(() => {
      // Create new post object
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        author: user?.firstName || "Anonymous",
        authorId: user?.id || "guest",
        createdAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        comments: [],
      };
      
      // Get existing posts from localStorage or initialize empty array
      const existingPosts = JSON.parse(localStorage.getItem("communityPosts") || "[]");
      
      // Add new post to beginning of array
      const updatedPosts = [newPost, ...existingPosts];
      
      // Save updated posts back to localStorage
      localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
      
      // Reset form
      setTitle("");
      setContent("");
      setIsSubmitting(false);
      
      toast({
        title: "Success!",
        description: "Your post has been published.",
      });
    }, 1000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h2 className="text-xl font-semibold">Create a New Post</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title"
              className="w-full"
              maxLength={100}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the community..."
              className="w-full min-h-[150px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-education-blue hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
