
import { supabase } from "@/integrations/supabase/client";
import { Comment } from "./types";

export const addComment = async (
  postId: string,
  commentData: {
    content: string;
    author: string;
    authorId: string;
  }
): Promise<Comment> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        content: commentData.content,
        author: commentData.author,
        author_id: commentData.authorId,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      content: data.content,
      author: data.author,
      authorId: data.author_id,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
