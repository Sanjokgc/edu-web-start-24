
import { supabase } from "@/integrations/supabase/client";
import { Post, Comment } from "./types";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    // Fetch posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) throw postsError;

    // Fetch comments for all posts
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (commentsError) throw commentsError;

    // Fetch votes
    const { data: votes, error: votesError } = await supabase
      .from('post_votes')
      .select('*');

    if (votesError) throw votesError;

    // Group comments by post_id
    const commentsByPostId: Record<string, Comment[]> = {};
    comments?.forEach(comment => {
      if (!commentsByPostId[comment.post_id]) {
        commentsByPostId[comment.post_id] = [];
      }
      commentsByPostId[comment.post_id].push({
        id: comment.id,
        content: comment.content,
        author: comment.author,
        authorId: comment.author_id,
        createdAt: comment.created_at,
      });
    });

    // Group votes by post_id and type
    const upvotesByPostId: Record<string, string[]> = {};
    const downvotesByPostId: Record<string, string[]> = {};
    
    votes?.forEach(vote => {
      if (vote.vote_type === 'upvote') {
        if (!upvotesByPostId[vote.post_id]) {
          upvotesByPostId[vote.post_id] = [];
        }
        upvotesByPostId[vote.post_id].push(vote.user_id);
      } else {
        if (!downvotesByPostId[vote.post_id]) {
          downvotesByPostId[vote.post_id] = [];
        }
        downvotesByPostId[vote.post_id].push(vote.user_id);
      }
    });

    // Format posts with their comments and votes
    const formattedPosts: Post[] = posts?.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      authorId: post.author_id,
      createdAt: post.created_at,
      upvotes: post.upvotes,
      downvotes: post.downvotes,
      comments: commentsByPostId[post.id] || [],
      upvotedBy: upvotesByPostId[post.id] || [],
      downvotedBy: downvotesByPostId[post.id] || [],
    })) || [];

    return formattedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (postData: {
  title: string;
  content: string;
  author: string;
  authorId: string;
}): Promise<Post> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: postData.title,
        content: postData.content,
        author: postData.author,
        author_id: postData.authorId,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author,
      authorId: data.author_id,
      createdAt: data.created_at,
      upvotes: data.upvotes,
      downvotes: data.downvotes,
      comments: [],
      upvotedBy: [],
      downvotedBy: [],
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
