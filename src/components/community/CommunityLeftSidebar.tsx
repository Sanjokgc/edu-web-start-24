
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CommunityLeftSidebarProps {
  topics: Array<{ id: number, name: string, icon: string, color: string }>;
  setIsTopicDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommunityLeftSidebar: React.FC<CommunityLeftSidebarProps> = ({ 
  topics, 
  setIsTopicDialogOpen 
}) => {
  return (
    <div className="w-[280px] shrink-0 hidden md:block">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="relative w-full h-[180px] rounded-t-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
              alt="International students"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <h2 className="text-xl font-bold mt-3">Global Education Community</h2>
          <p className="text-sm text-gray-600 mt-1">
            "Your gateway to international education success. Share experiences, get advice, and connect with fellow students worldwide."
          </p>
        </CardHeader>
        <CardContent className="pt-2 pb-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Public</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Education</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">15,432 members</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Active discussions</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full text-[#FF7F50] border-[#FF7F50] hover:bg-[#FFF1EC] rounded whitespace-nowrap cursor-pointer">
            Invite
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="mt-4 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Topics</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded cursor-pointer"
              onClick={() => setIsTopicDialogOpen(true)}
            >
              <span className="sr-only">Settings</span>
              ⚙️
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2">
            {topics.map(topic => (
              <li key={topic.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-sm">{topic.name}</span>
                </div>
              </li>
            ))}
            <li 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer" 
              onClick={() => setIsTopicDialogOpen(true)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Add Topic</span>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm mt-4 mb-4">
        <CardHeader className="pb-2">
          <h3 className="font-semibold">Filter Options</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
              </div>
              <span className="text-sm">Show All</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
              </div>
              <span className="text-sm">Questions Only</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
              </div>
              <span className="text-sm">Success Stories</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
              </div>
              <span className="text-sm">Tips & Advice</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
              </div>
              <span className="text-sm">Events & Meetups</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
              </div>
              <span className="text-sm">Resources</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityLeftSidebar;
