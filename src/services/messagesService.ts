import { supabase } from "@/integrations/supabase/client";
import { User } from "@clerk/clerk-react";
import { toast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_text: string;
  participants: ConversationParticipant[];
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  created_at: string;
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  };
}

// Get all conversations for the current user
export const getConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    const { data: participantData, error: participantError } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id
      `)
      .eq('user_id', userId);

    if (participantError) throw participantError;

    if (!participantData || participantData.length === 0) {
      return [];
    }

    const conversationIds = participantData.map(p => p.conversation_id);

    const { data: conversations, error: conversationsError } = await supabase
      .from('conversations')
      .select(`
        *,
        participants:conversation_participants(
          id,
          user_id,
          created_at
        )
      `)
      .in('id', conversationIds)
      .order('updated_at', { ascending: false });

    if (conversationsError) throw conversationsError;

    return conversations || [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch conversations',
      variant: 'destructive',
    });
    return [];
  }
};

// Get a specific conversation with messages
export const getConversationWithMessages = async (conversationId: string): Promise<{
  conversation: Conversation | null;
  messages: Message[];
}> => {
  try {
    // Get the conversation
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .select(`
        *,
        participants:conversation_participants(
          id,
          user_id,
          created_at
        )
      `)
      .eq('id', conversationId)
      .single();

    if (conversationError) throw conversationError;

    // Get messages for the conversation
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (messagesError) throw messagesError;

    return {
      conversation,
      messages: messages || [],
    };
  } catch (error) {
    console.error('Error fetching conversation:', error);
    toast({
      title: 'Error',
      description: 'Failed to fetch conversation and messages',
      variant: 'destructive',
    });
    return { conversation: null, messages: [] };
  }
};

// Create a new conversation between users
export const createConversation = async (currentUserId: string, otherUserId: string): Promise<string | null> => {
  try {
    // Check if conversation already exists
    const { data: existingConversations } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', currentUserId);

    if (existingConversations && existingConversations.length > 0) {
      const conversationIds = existingConversations.map(c => c.conversation_id);
      
      const { data: sharedConversations } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', otherUserId)
        .in('conversation_id', conversationIds);
      
      if (sharedConversations && sharedConversations.length > 0) {
        // Existing conversation found
        return sharedConversations[0].conversation_id;
      }
    }

    // Create a new conversation
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .insert({})
      .select()
      .single();

    if (conversationError) throw conversationError;

    // Add participants
    const participants = [
      { conversation_id: conversation.id, user_id: currentUserId },
      { conversation_id: conversation.id, user_id: otherUserId }
    ];

    const { error: participantsError } = await supabase
      .from('conversation_participants')
      .insert(participants);

    if (participantsError) throw participantsError;

    return conversation.id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    toast({
      title: 'Error',
      description: 'Failed to create conversation',
      variant: 'destructive',
    });
    return null;
  }
};

// Send a message in a conversation
export const sendMessage = async (conversationId: string, senderId: string, content: string): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    toast({
      title: 'Error',
      description: 'Failed to send message',
      variant: 'destructive',
    });
    return null;
  }
};

// Mark messages as read
export const markMessagesAsRead = async (conversationId: string, userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('read', false);

    if (error) throw error;
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};

// Subscribe to new messages in a conversation
export const subscribeToMessages = (
  conversationId: string,
  callback: (message: Message) => void
) => {
  const subscription = supabase
    .channel('messages-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        const newMessage = payload.new as Message;
        callback(newMessage);
      }
    )
    .subscribe();

  return subscription;
};

// Subscribe to conversation updates
export const subscribeToConversations = (
  userId: string,
  callback: () => void
) => {
  const subscription = supabase
    .channel('conversations-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations'
      },
      () => {
        callback();
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages'
      },
      () => {
        callback();
      }
    )
    .subscribe();

  return subscription;
};

// Get all users (for starting new conversations)
export const getAllUsers = async (currentUserId: string): Promise<any[]> => {
  // This is a simplified implementation - in a real app, you would need to create a users or profiles table
  // that you can query. For now, we'll use clerk's auth data that was passed in from the UI
  return [];
};
