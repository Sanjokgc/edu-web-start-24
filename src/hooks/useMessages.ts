
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  getConversations, 
  getConversationWithMessages,
  createConversation, 
  sendMessage, 
  markMessagesAsRead,
  subscribeToMessages,
  subscribeToConversations,
  Conversation,
  Message
} from "@/services/messagesService";
import { useToast } from "./use-toast";

export const useMessages = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    const result = await getConversations(user.id);
    setConversations(result);
    setLoading(false);
  }, [user?.id]);

  // Initial load of conversations
  useEffect(() => {
    if (user?.id) {
      fetchConversations();
    }
  }, [user?.id, fetchConversations]);

  // Subscribe to conversation updates
  useEffect(() => {
    if (!user?.id) return;

    const subscription = subscribeToConversations(user.id, fetchConversations);

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, fetchConversations]);

  // Load a specific conversation and its messages
  const loadConversation = useCallback(async (conversationId: string) => {
    if (!user?.id) return;
    
    setLoading(true);
    const { conversation, messages } = await getConversationWithMessages(conversationId);
    
    if (conversation) {
      setCurrentConversation(conversation);
      setMessages(messages);

      // Mark messages as read
      await markMessagesAsRead(conversationId, user.id);
    }
    
    setLoading(false);
  }, [user?.id]);

  // Subscribe to new messages when conversation changes
  useEffect(() => {
    if (!currentConversation?.id || !user?.id) return;

    const subscription = subscribeToMessages(currentConversation.id, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      
      // Mark messages as read if they're from others
      if (newMessage.sender_id !== user.id) {
        markMessagesAsRead(currentConversation.id, user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentConversation?.id, user?.id]);

  // Start or load conversation with a user
  const startConversation = useCallback(async (otherUserId: string) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to start a conversation",
        variant: "destructive"
      });
      return;
    }
    
    const conversationId = await createConversation(user.id, otherUserId);
    
    if (conversationId) {
      await loadConversation(conversationId);
      return conversationId;
    }
    
    return null;
  }, [user?.id, loadConversation, toast]);

  // Send a message in the current conversation
  const handleSendMessage = useCallback(async (content: string) => {
    if (!user?.id || !currentConversation?.id || !content.trim()) {
      return;
    }
    
    setSendingMessage(true);
    
    const newMessage = await sendMessage(
      currentConversation.id, 
      user.id, 
      content
    );
    
    setSendingMessage(false);
    
    if (newMessage) {
      return true;
    }
    
    return false;
  }, [user?.id, currentConversation?.id]);

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    sendingMessage,
    fetchConversations,
    loadConversation,
    startConversation,
    sendMessage: handleSendMessage,
  };
};
