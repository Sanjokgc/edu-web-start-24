
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Book, GraduationCap, Users, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarLink from "./NavbarLink";
import UserDropdown from "./UserDropdown";

const DesktopMenu = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavbarLink to="/" label="Home" />
      <NavbarLink to="#courses" label="Courses" isAnchor={true} />
      <NavbarLink to="#features" label="Features" isAnchor={true} />
      <NavbarLink 
        to="/experience" 
        label="Experience" 
        icon={<GraduationCap size={18} />} 
      />
      <NavbarLink 
        to="/community" 
        label="Community" 
        icon={<Users size={18} />} 
      />
      <NavbarLink 
        to="/resources" 
        label="Resources" 
        icon={<Book size={18} />} 
      />
      
      {isSignedIn ? (
        <UserDropdown />
      ) : (
        <Link to="/sign-in">
          <Button className="bg-education-blue hover:bg-blue-700 text-white flex items-center gap-2">
            <LogIn size={18} />
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default DesktopMenu;
