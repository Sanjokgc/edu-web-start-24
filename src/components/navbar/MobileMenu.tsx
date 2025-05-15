
import React from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import { Book, GraduationCap, Users, User, MessageSquare, BookmarkIcon, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavbarLink from "./NavbarLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white py-4 px-4 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <NavbarLink to="/" label="Home" onClick={onClose} />
        <NavbarLink to="#courses" label="Courses" onClick={onClose} isAnchor={true} />
        <NavbarLink to="#features" label="Features" onClick={onClose} isAnchor={true} />
        <NavbarLink 
          to="/experience" 
          label="Experience" 
          icon={<GraduationCap size={18} />} 
          onClick={onClose} 
        />
        <NavbarLink 
          to="/community" 
          label="Community" 
          icon={<Users size={18} />} 
          onClick={onClose} 
        />
        <NavbarLink 
          to="/resources" 
          label="Resources" 
          icon={<Book size={18} />} 
          onClick={onClose} 
        />
        
        {isSignedIn && (
          <NavbarLink 
            to="/messages" 
            label="Messages" 
            icon={<MessageSquare size={18} />} 
            onClick={onClose} 
          />
        )}
        
        {isSignedIn ? (
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
              <Link to="/messages" className="flex items-center gap-2 text-gray-700 hover:text-education-blue text-sm" onClick={onClose}>
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
        ) : (
          <Link to="/sign-in" onClick={onClose}>
            <Button className="bg-education-blue hover:bg-blue-700 text-white w-full flex items-center gap-2 justify-center">
              <LogOut size={18} />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
