
import React from "react";
import { Post as PostComponent } from "@/components/community/Post";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "@/services/postsService";

interface PostsListContentProps {
  posts: Post[];
  loading: boolean;
}

export const PostsListContent: React.FC<PostsListContentProps> = ({ posts, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No posts yet</h3>
        <p className="text-gray-500 mb-6">Be the first to share with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostComponent 
          key={post.id} 
          post={post}
        />
      ))}
    </div>
  );
};
