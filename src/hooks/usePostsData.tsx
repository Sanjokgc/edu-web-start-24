
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Post, fetchPosts, subscribeToPostChanges } from "@/services/postsService";

export const usePostsData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load posts. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    
    // Subscribe to real-time updates
    const subscription = subscribeToPostChanges((updatedPosts) => {
      setPosts(updatedPosts);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return { posts, loading };
};
