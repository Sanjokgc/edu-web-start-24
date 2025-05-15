
-- Function to handle vote operations
CREATE OR REPLACE FUNCTION public.handle_vote(
  p_post_id UUID,
  p_user_id TEXT,
  p_vote_type TEXT,
  p_existing_vote_type TEXT
)
RETURNS VOID AS $$
DECLARE
  upvote_delta INT := 0;
  downvote_delta INT := 0;
BEGIN
  -- If there's an existing vote
  IF p_existing_vote_type IS NOT NULL THEN
    -- If same vote type, remove the vote (toggle behavior)
    IF p_existing_vote_type = p_vote_type THEN
      -- Remove vote record
      DELETE FROM public.post_votes 
      WHERE post_id = p_post_id AND user_id = p_user_id;
      
      -- Update post vote counts
      IF p_vote_type = 'upvote' THEN
        upvote_delta := -1;
      ELSE
        downvote_delta := -1;
      END IF;
    
    -- If different vote type, change the vote
    ELSE
      -- Update vote record
      UPDATE public.post_votes 
      SET vote_type = p_vote_type
      WHERE post_id = p_post_id AND user_id = p_user_id;
      
      -- Update post vote counts
      IF p_vote_type = 'upvote' THEN
        upvote_delta := 1;
        downvote_delta := -1;
      ELSE
        upvote_delta := -1;
        downvote_delta := 1;
      END IF;
    END IF;
  
  -- If there's no existing vote, add a new one
  ELSE
    -- Insert new vote
    INSERT INTO public.post_votes (post_id, user_id, vote_type)
    VALUES (p_post_id, p_user_id, p_vote_type);
    
    -- Update post vote counts
    IF p_vote_type = 'upvote' THEN
      upvote_delta := 1;
    ELSE
      downvote_delta := 1;
    END IF;
  END IF;
  
  -- Update the post's vote counts
  UPDATE public.posts
  SET 
    upvotes = upvotes + upvote_delta,
    downvotes = downvotes + downvote_delta
  WHERE id = p_post_id;
  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
