
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Conversation, Message } from "@/services/messagesService";
import { MessageBubble } from "./MessageBubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => Promise<boolean>;
  sendingMessage: boolean;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  messages,
  onSendMessage,
  sendingMessage
}) => {
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const otherParticipant = conversation.participants?.find(
    p => p.user_id !== user?.id
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sendingMessage) return;
    
    const success = await onSendMessage(newMessage);
    if (success) {
      setNewMessage("");
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Conversation header */}
      <div className="p-4 border-b flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={otherParticipant?.user?.imageUrl} />
          <AvatarFallback>
            {otherParticipant?.user_id.substring(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">
            {otherParticipant?.user?.firstName || otherParticipant?.user_id}
          </h3>
          <p className="text-xs text-gray-500">
            {conversation.updated_at && 
              `Active ${formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}`
            }
          </p>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet. Send a message to start the conversation.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.sender_id === user?.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={sendingMessage}
        />
        <button 
          type="submit"
          className={`ml-2 p-2 rounded-full ${
            sendingMessage || !newMessage.trim()
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={sendingMessage || !newMessage.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
