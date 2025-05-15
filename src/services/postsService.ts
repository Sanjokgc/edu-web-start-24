import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  upvotedBy: string[];
  downvotedBy: string[];
}

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

// Define the interface for vote parameters to match the expected parameters for the handle_vote RPC
interface VoteParams {
  p_post_id: string;
  p_user_id: string; 
  p_vote_type: 'upvote' | 'downvote';
  p_existing_vote_type: string | null;
}

export const addVote = async (
  postId: string,
  userId: string,
  voteType: 'upvote' | 'downvote'
): Promise<void> => {
  try {
    // Check if the user already has a vote for this post
    const { data: existingVote, error: fetchError } = await supabase
      .from('post_votes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    const transaction = async () => {
      // Create params object matching the interface
      const params: VoteParams = {
        p_post_id: postId,
        p_user_id: userId, 
        p_vote_type: voteType,
        p_existing_vote_type: existingVote ? existingVote.vote_type : null
      };
      
      // Call the RPC without specifying generic types - let TypeScript infer them
      const { error } = await supabase.rpc('handle_vote', params);
      
      if (error) throw error;
    };

    await transaction();
  } catch (error) {
    console.error('Error adding vote:', error);
    throw error;
  }
};

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
