
import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Post as PostType } from "@/services/postsService";
import { PostVoteButtons } from "./PostVoteButtons";
import { PostCommentsSection } from "./PostCommentsSection";
import { usePostActions } from "@/hooks/usePostActions";

interface PostProps {
  post: PostType;
  onVote?: (postId: string, voteType: "upvote" | "downvote") => void;
  onAddComment?: (postId: string, comment: any) => void;
}

export const Post = ({ post, onVote, onAddComment }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  const hasUserUpvoted = user && post.upvotedBy.includes(user.id);
  const hasUserDownvoted = user && post.downvotedBy.includes(user.id);

  const { 
    isSubmittingComment,
    handleUpvote,
    handleDownvote,
    handleSubmitComment
  } = usePostActions(post.id, onVote);

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
        </div>
      </CardHeader>
      <CardContent className="px-5">
        <p className="whitespace-pre-line text-black">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4 px-5 pb-5">
        <div className="w-full flex items-center">
          <PostVoteButtons
            postId={post.id}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            hasUserUpvoted={hasUserUpvoted}
            hasUserDownvoted={hasUserDownvoted}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-700 hover:text-blue-600"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="mr-2" size={16} />
            {post.comments.length} Comments
          </Button>
        </div>
        
        {showComments && (
          <PostCommentsSection
            postId={post.id}
            comments={post.comments}
            isSignedIn={isSignedIn}
            isSubmitting={isSubmittingComment}
            onSubmitComment={(commentText) => {
              handleSubmitComment(commentText);
              if (onAddComment && user) {
                // Optimistic UI update - the real update will come from the subscription
                const optimisticComment = {
                  id: `temp-${Date.now()}`,
                  content: commentText,
                  author: user.firstName || user.username || "Anonymous",
                  authorId: user.id,
                  createdAt: new Date().toISOString(),
                };
                onAddComment(post.id, optimisticComment);
              }
            }}
          />
        )}
      </CardFooter>
    </Card>
  );
};
