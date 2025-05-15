
// This is the main entry point for the posts service
// It re-exports all functionality from the smaller modules

// Export types
export type { Post, Comment } from './types';

// Export post-related functionality
export { fetchPosts, createPost } from './postsDataService';

// Export comment-related functionality
export { addComment } from './commentsService';

// Export vote-related functionality
export { addVote } from './votesService';

// Export realtime-related functionality
export { subscribeToPostChanges } from './realtimeService';
