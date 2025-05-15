
import { supabase } from "@/integrations/supabase/client";
import { Post } from "./types";
import { fetchPosts } from "./postsDataService";

// Subscribe to post changes
export const subscribeToPostChanges = (
  callback: (posts: Post[]) => void
) => {
  return supabase
    .channel('public:posts')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      async () => {
        // Refetch all posts to get the latest state
        try {
          const posts = await fetchPosts();
          callback(posts);
        } catch (error) {
          console.error('Error refreshing posts after change:', error);
        }
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'comments' },
      async () => {
        // Refetch all posts to get the latest state with comments
        try {
          const posts = await fetchPosts();
          callback(posts);
        } catch (error) {
          console.error('Error refreshing posts after comment change:', error);
        }
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'post_votes' },
      async () => {
        // Refetch all posts to get the latest state with votes
        try {
          const posts = await fetchPosts();
          callback(posts);
        } catch (error) {
          console.error('Error refreshing posts after vote change:', error);
        }
      }
    )
    .subscribe();
};
