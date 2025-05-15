
import { supabase } from "@/integrations/supabase/client";
import { VoteParams } from "./types";

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
      
      // Call the RPC function with explicit typing to fix the TypeScript error
      const { error } = await supabase.rpc(
        'handle_vote',
        params
      );
      
      if (error) throw error;
    };

    await transaction();
  } catch (error) {
    console.error('Error adding vote:', error);
    throw error;
  }
};
