
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Book, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-education-blue">EduLearn</h1>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-education-blue font-medium transition-colors">
            Home
          </Link>
          <Link to="#courses" className="text-gray-700 hover:text-education-blue font-medium transition-colors">
            Courses
          </Link>
          <Link to="#features" className="text-gray-700 hover:text-education-blue font-medium transition-colors">
            Features
          </Link>
          <Link to="#testimonials" className="text-gray-700 hover:text-education-blue font-medium transition-colors">
            Testimonials
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2">
            <Book size={18} />
            Resources
          </Link>
          
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="text-sm font-medium">{user?.fullName ?? user?.firstName}</span>
              </div>
              <SignOutButton>
                <Button variant="outline" className="flex items-center gap-2">
                  <LogOut size={18} />
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          ) : (
            <Link to="/sign-in">
              <Button className="bg-education-blue hover:bg-blue-700 text-white flex items-center gap-2">
                <LogIn size={18} />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-education-blue font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#courses" 
              className="text-gray-700 hover:text-education-blue font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-education-blue font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-education-blue font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link 
              to="/resources" 
              className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Book size={18} />
              Resources
            </Link>
            
            {isSignedIn ? (
              <>
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span className="text-sm font-medium">{user?.fullName ?? user?.firstName}</span>
                </div>
                <SignOutButton>
                  <Button variant="outline" className="flex items-center gap-2 w-full">
                    <LogOut size={18} />
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <Link 
                to="/sign-in" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-education-blue hover:bg-blue-700 text-white w-full flex items-center gap-2 justify-center">
                  <LogIn size={18} />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
