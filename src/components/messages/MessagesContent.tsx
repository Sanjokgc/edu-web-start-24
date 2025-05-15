
import React, { useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import { MessagesSidebar } from "./MessagesSidebar";
import { ConversationView } from "./ConversationView";
import { NoMessages } from "./NoMessages";

export const MessagesContent: React.FC = () => {
  const { 
    conversations,
    currentConversation,
    messages,
    loading,
    sendingMessage,
    loadConversation,
    sendMessage
  } = useMessages();
  
  if (loading && conversations.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-220px)] bg-white shadow-lg rounded-lg overflow-hidden">
      <MessagesSidebar 
        conversations={conversations}
        currentConversationId={currentConversation?.id}
        onSelectConversation={loadConversation}
        loading={loading}
      />
      
      {currentConversation ? (
        <ConversationView
          conversation={currentConversation}
          messages={messages}
          onSendMessage={sendMessage}
          sendingMessage={sendingMessage}
        />
      ) : (
        <NoMessages />
      )}
    </div>
  );
};
