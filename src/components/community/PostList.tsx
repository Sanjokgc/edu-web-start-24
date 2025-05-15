
import React from "react";
import { usePostsData } from "@/hooks/usePostsData";
import { PostsListContent } from "./PostsListContent";

export const PostList = () => {
  const { posts, loading } = usePostsData();
  
  return (
    <PostsListContent posts={posts} loading={loading} />
  );
};
