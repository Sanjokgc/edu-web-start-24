
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavbarLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isAnchor?: boolean;
}

const NavbarLink = ({ to, label, icon, onClick, isAnchor = false }: NavbarLinkProps) => {
  if (isAnchor) {
    return (
      <a 
        href={to} 
        className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2"
        onClick={onClick}
      >
        {icon && icon}
        {label}
      </a>
    );
  }

  return (
    <Link 
      to={to} 
      className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2"
      onClick={onClick}
    >
      {icon && icon}
      {label}
    </Link>
  );
};

export default NavbarLink;
