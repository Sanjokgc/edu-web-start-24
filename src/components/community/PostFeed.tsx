
import React from "react";
import { Post as PostComponent } from "@/components/community/Post";
import { Post } from "@/hooks/usePostManagement";
import { filterPostsByTab } from "@/utils/postFilters";

interface PostFeedProps {
  activeTab: string;
  posts: Post[];
  onVote: (postId: string, voteType: "upvote" | "downvote") => void;
  onAddComment: (postId: string, comment: any) => void;
}

export const PostFeed: React.FC<PostFeedProps> = ({
  activeTab,
  posts,
  onVote,
  onAddComment
}) => {
  // Get filtered posts based on active tab
  const filteredPosts = filterPostsByTab(posts, activeTab);
  
  return (
    <div className="space-y-6 mt-4">
      {filteredPosts.map((post) => (
        <PostComponent 
          key={post.id}
          post={post}
          onVote={onVote}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
};

export default PostFeed;
