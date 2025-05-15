
import React from "react";
import { MessageSquare } from "lucide-react";

export const NoMessages: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
      <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-700">No conversation selected</h3>
      <p className="text-gray-500 mt-2 max-w-md">
        Select a conversation from the sidebar or start a new conversation to begin messaging.
      </p>
    </div>
  );
};
