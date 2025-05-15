
// Define shared types for the post services
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

// Vote parameters interface for the handle_vote RPC
export interface VoteParams {
  p_post_id: string;
  p_user_id: string; 
  p_vote_type: 'upvote' | 'downvote';
  p_existing_vote_type: string | null;
}
