
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation } from "@/services/messagesService";
import { useUser } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";

interface MessagesSidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  loading: boolean;
}

export const MessagesSidebar: React.FC<MessagesSidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  loading
}) => {
  const { user } = useUser();

  if (loading) {
    return (
      <div className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="font-semibold text-lg mb-4">Conversations</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Conversations</h2>
      
      {conversations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No conversations yet
        </div>
      ) : (
        <div className="space-y-1">
          {conversations.map((conversation) => {
            // Find the other participant
            const otherParticipant = conversation.participants?.find(
              p => p.user_id !== user?.id
            );
            
            const isActive = conversation.id === currentConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-800" 
                    : "hover:bg-gray-100"
                }`}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={otherParticipant?.user?.imageUrl} />
                  <AvatarFallback>
                    {otherParticipant?.user_id.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-left flex-1 overflow-hidden">
                  <div className="font-medium truncate">
                    {otherParticipant?.user?.firstName || otherParticipant?.user_id}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {conversation.last_message_text || "No messages yet"}
                  </div>
                </div>
                
                {conversation.updated_at && (
                  <div className="text-xs text-gray-400 ml-2">
                    {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
