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
import { Post } from "@/hooks/usePostManagement";

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}

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
  
  // Load ALL posts from localStorage on component mount
  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      try {
        const storedPosts = localStorage.getItem("communityPosts");
        if (storedPosts) {
          const parsedPosts = JSON.parse(storedPosts);
          
          // Filter out posts older than 30 days
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const filteredPosts = parsedPosts.filter((post: Post) => {
            const postDate = new Date(post.createdAt);
            return postDate > thirtyDaysAgo;
          });
          
          // Ensure all posts have upvotedBy and downvotedBy arrays
          const updatedPosts = filteredPosts.map((post: any) => ({
            ...post,
            upvotedBy: post.upvotedBy || [],
            downvotedBy: post.downvotedBy || []
          }));
          
          // Sort posts by creation date (newest first)
          updatedPosts.sort((a: Post, b: Post) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          
          setPosts(updatedPosts);
          // Update localStorage with the normalized and filtered data
          localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
        }
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
    
    fetchPosts();
    
    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "communityPosts") {
        fetchPosts();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
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
