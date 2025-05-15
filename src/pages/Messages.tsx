
import React from "react";
import { useUser } from "@clerk/clerk-react";
import Layout from "@/components/Layout";
import { MessagesContent } from "@/components/messages/MessagesContent";
import AuthRoute from "@/components/AuthRoute"; // Fixed import statement
import { NoMessages } from "@/components/messages/NoMessages";

const Messages = () => {
  const { isSignedIn } = useUser();

  return (
    <AuthRoute>
      <Layout>
        <div className="pt-20 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>
            <MessagesContent />
          </div>
        </div>
      </Layout>
    </AuthRoute>
  );
};

export default Messages;
