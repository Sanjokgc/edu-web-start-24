
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UsersListDialogProps {
  onStartConversation: (userId: string) => Promise<void>;
}

export const UsersListDialog: React.FC<UsersListDialogProps> = ({ onStartConversation }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  // In a real app, this would fetch users from your database
  // For now, we're using a simple hardcoded example
  const handleStartConversation = async () => {
    if (!userId) return;
    
    setLoading(true);
    await onStartConversation(userId);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Users size={16} />
          <span>New Message</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a conversation</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter user ID to message"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              For this demo, enter any user ID to start a conversation with that user
            </p>
          </div>
          
          <Button 
            onClick={handleStartConversation} 
            disabled={!userId || loading} 
            className="w-full"
          >
            {loading ? "Starting conversation..." : "Start Conversation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
