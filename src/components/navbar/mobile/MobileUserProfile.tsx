
import React from "react";
import { Link } from "react-router-dom";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { User, MessageSquare, BookmarkIcon, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface MobileUserProfileProps {
  onClose: () => void;
}

const MobileUserProfile = ({ onClose }: MobileUserProfileProps) => {
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center gap-2 pt-2 border-t">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? user?.firstName} />
          <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user?.fullName ?? user?.firstName}</span>
      </div>
      <div className="space-y-3 pl-2">
        <Link to="#" className="flex items-center gap-2 text-gray-700 hover:text-education-blue text-sm">
          <User size={16} />
          <span>Profile</span>
        </Link>
        <Link 
          to="/messages" 
          className="flex items-center gap-2 text-gray-700 hover:text-education-blue text-sm" 
          onClick={onClose}
        >
          <MessageSquare size={16} />
          <span>Messages</span>
        </Link>
        <Link to="#" className="flex items-center gap-2 text-gray-700 hover:text-education-blue text-sm">
          <BookmarkIcon size={16} />
          <span>Bookmarks</span>
        </Link>
        <Link to="#" className="flex items-center gap-2 text-gray-700 hover:text-education-blue text-sm">
          <Settings size={16} />
          <span>Settings</span>
        </Link>
      </div>
      <SignOutButton>
        <Button variant="outline" className="flex items-center gap-2 w-full border-red-200 text-red-500">
          <LogOut size={18} />
          Sign Out
        </Button>
      </SignOutButton>
    </>
  );
};

export default MobileUserProfile;
