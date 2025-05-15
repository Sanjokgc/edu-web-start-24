
import React from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileLoginButtonProps {
  onClose: () => void;
}

const MobileLoginButton = ({ onClose }: MobileLoginButtonProps) => {
  return (
    <Link to="/sign-in" onClick={onClose}>
      <Button className="bg-education-blue hover:bg-blue-700 text-white w-full flex items-center gap-2 justify-center">
        <LogIn size={18} />
        Sign In
      </Button>
    </Link>
  );
};

export default MobileLoginButton;
