
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="relative">
          <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
            <DialogTitle className="text-white">Tuesday "Technique Talk" Session</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white/20 rounded"
              onClick={() => onOpenChange(false)}
            >
              <span>✖️</span>
            </Button>
          </DialogHeader>
          <div className="aspect-video bg-black">
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 relative">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Video placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Emma Richardson</h4>
                    <p className="text-sm text-gray-500">Master Baker & Instructor</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  In this week's Technique Talk, we're covering advanced bread proofing techniques that will take your baking to the next level. Learn the secrets of perfect timing, temperature control, and how to recognize when your dough is properly proofed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
