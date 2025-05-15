
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PostForm } from "@/components/community/PostForm";
import { PostList } from "@/components/community/PostList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Community</h1>
            
            <Tabs defaultValue="feed" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="create">Create Post</TabsTrigger>
              </TabsList>
              <TabsContent value="feed" className="pt-6">
                <PostList />
              </TabsContent>
              <TabsContent value="create" className="pt-6">
                <PostForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
