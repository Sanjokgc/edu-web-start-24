
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PinnedPostsProps {
  setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PinnedPosts: React.FC<PinnedPostsProps> = ({
  setVideoModalOpen,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-700">Pinned Post · 3</h3>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">Sarah Chen</h4>
              <p className="text-xs text-gray-500">8hr ago</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm mb-3">Just got my US Student Visa approved! 🎉 Here's my experience and tips for the interview process! #StudentVisa #USEducation</p>
          <div className="relative rounded-lg overflow-hidden h-[240px] mb-3">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Sunset over ocean"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-full bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70 rounded cursor-pointer"
                onClick={() => setVideoModalOpen(true)}
              >
                <span className="text-xl">▶️</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinnedPosts;
