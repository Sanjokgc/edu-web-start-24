import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { Post as PostType } from "@/hooks/usePostManagement";

interface PostProps {
  post: PostType;
  onVote: (postId: string, voteType: "upvote" | "downvote") => void;
  onAddComment: (postId: string, comment: any) => void;
}

export const Post = ({ post, onVote, onAddComment }: PostProps) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  
  const hasUserUpvoted = user && post.upvotedBy.includes(user.id);
  const hasUserDownvoted = user && post.downvotedBy.includes(user.id);

  const handleUpvote = () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to vote on posts.",
        variant: "destructive",
      });
      return;
    }
    onVote(post.id, "upvote");
  };

  const handleDownvote = () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to vote on posts.",
        variant: "destructive",
      });
      return;
    }
    onVote(post.id, "downvote");
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn || !user) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to comment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!commentText.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    const newComment = {
      id: Date.now().toString(),
      content: commentText,
      author: user.firstName || user.username || "Anonymous",
      authorId: user.id,
      createdAt: new Date().toISOString(),
    };
    
    onAddComment(post.id, newComment);
    setCommentText("");
  };

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <Card className="overflow-hidden bg-white border border-gray-100 shadow-sm">
      <CardHeader className="pb-3 pt-5 px-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-black">{post.title}</h3>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleUpvote} 
              variant="ghost" 
              size="sm"
              className={`flex items-center ${hasUserUpvoted ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <ArrowUp className="mr-1" size={16} />
              {post.upvotes}
            </Button>
            <Button 
              onClick={handleDownvote} 
              variant="ghost" 
              size="sm"
              className={`flex items-center ${hasUserDownvoted ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
            >
              <ArrowDown className="mr-1" size={16} />
              {post.downvotes}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5">
        <p className="whitespace-pre-line text-black">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4 px-5 pb-5">
        <div className="w-full flex items-center">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-700 hover:text-blue-600"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="mr-2" size={16} />
            {post.comments.length} Comments
          </Button>
          <div className="ml-auto text-gray-700">
            <span>Comments: {post.comments.length}</span>
          </div>
        </div>
        
        {showComments && (
          <div className="w-full space-y-4">
            <form onSubmit={handleSubmitComment} className="space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Post Comment
              </Button>
            </form>
            
            <div className="space-y-3 mt-4">
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                    </div>
                    <p className="text-black">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
