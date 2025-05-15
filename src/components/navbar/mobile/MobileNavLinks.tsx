
import React from "react";
import { Book, GraduationCap, Users, MessageSquare } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import NavbarLink from "../NavbarLink";

interface MobileNavLinksProps {
  onClose: () => void;
}

const MobileNavLinks = ({ onClose }: MobileNavLinksProps) => {
  const { isSignedIn } = useAuth();
  
  return (
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
    </div>
  );
};

export default MobileNavLinks;
