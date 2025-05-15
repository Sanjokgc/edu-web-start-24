
import React from "react";
import { useAuth } from "@clerk/clerk-react";
import MobileNavLinks from "./mobile/MobileNavLinks";
import MobileUserProfile from "./mobile/MobileUserProfile";
import MobileLoginButton from "./mobile/MobileLoginButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isSignedIn } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white py-4 px-4 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <MobileNavLinks onClose={onClose} />
        
        {isSignedIn ? (
          <MobileUserProfile onClose={onClose} />
        ) : (
          <MobileLoginButton onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
