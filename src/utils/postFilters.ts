
import { Post } from "@/hooks/usePostManagement";

export const filterPostsByTab = (posts: Post[], tabValue: string) => {
  if (tabValue === "all-posts") {
    // Show all posts, sorted by newest first
    return [...posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (tabValue === "trending-post") {
    // Show posts with most votes/comments as trending
    return [...posts].sort((a, b) => 
      (b.upvotes + b.comments.length) - (a.upvotes + a.comments.length)
    );
  } else if (tabValue === "discussions") {
    // Show posts with most comments
    return [...posts].sort((a, b) => b.comments.length - a.comments.length);
  } else if (tabValue === "media-pics") {
    // For demo purposes, just return posts
    return posts;
  }
  return posts;
};
