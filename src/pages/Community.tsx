import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { PostForm } from "@/components/community/PostForm";
import { PostList } from "@/components/community/PostList";
import CommunityLeftSidebar from "@/components/community/CommunityLeftSidebar";
import CommunityRightSidebar from "@/components/community/CommunityRightSidebar";
import CommunityContent from "@/components/community/CommunityContent";
import TopicDialog from "@/components/community/TopicDialog";
import CreateGroupDialog from "@/components/community/CreateGroupDialog";
import VideoModal from "@/components/community/VideoModal";
import { Post, fetchPosts, subscribeToPostChanges } from "@/services/postsService";

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-posts");
  const [isTopicDialogOpen, setIsTopicDialogOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [topics, setTopics] = useState([
    { id: 1, name: "Study Abroad Guide", icon: "graduation-cap", color: "amber" },
    { id: 2, name: "Visa Experience", icon: "passport", color: "amber" },
    { id: 3, name: "University Life", icon: "university", color: "amber" },
    { id: 4, name: "Career Advice", icon: "briefcase", color: "amber" },
    { id: 5, name: "Immigration Tips", icon: "plane", color: "amber" },
    { id: 6, name: "Language Tests", icon: "language", color: "amber" }
  ]);
  
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
        toast({
          title: "Error",
          description: "Failed to load community posts.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
    
    // Set up real-time subscription
    const subscription = subscribeToPostChanges((updatedPosts) => {
      setPosts(updatedPosts);
    });
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 bg-[#FFFAF7]">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <CommunityLeftSidebar 
              topics={topics} 
              setIsTopicDialogOpen={setIsTopicDialogOpen} 
            />
            
            {/* Main Content */}
            <CommunityContent 
              posts={posts} 
              setPosts={setPosts}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setVideoModalOpen={setVideoModalOpen}
            />
            
            {/* Right Sidebar */}
            <CommunityRightSidebar setIsCreateGroupOpen={setIsCreateGroupOpen} />
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <TopicDialog 
        open={isTopicDialogOpen} 
        onOpenChange={setIsTopicDialogOpen}
        topics={topics}
        setTopics={setTopics}
      />

      <CreateGroupDialog
        open={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
        topics={topics}
      />
      
      <VideoModal 
        open={videoModalOpen}
        onOpenChange={setVideoModalOpen}
      />

      <Footer />
    </div>
  );
};

export default Community;
