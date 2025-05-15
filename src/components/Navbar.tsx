import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Book, LogIn, LogOut, User, Users, Settings, BookmarkIcon, MessageSquare, FileEdit } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth, useUser, SignOutButton } from "@clerk/clerk-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <Link to="/community" className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2">
            <Users size={18} />
            Community
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2">
            <Book size={18} />
            Resources
          </Link>
          
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-8 w-8 border hover:ring-2 hover:ring-gray-200">
                      <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? user?.firstName} />
                      <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden lg:block">{user?.fullName ?? user?.firstName}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? user?.firstName} />
                      <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.fullName ?? user?.firstName}</span>
                      <span className="text-xs text-gray-500">{user?.emailAddresses[0].emailAddress}</span>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <BookmarkIcon className="mr-2 h-4 w-4" />
                      <span>Bookmarks</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <FileEdit className="mr-2 h-4 w-4" />
                      <span>Your Content</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator />
                  
                  <div className="py-2">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <SignOutButton>
                      <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </SignOutButton>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <Link 
              to="/community" 
              className="text-gray-700 hover:text-education-blue font-medium transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} />
              Community
            </Link>
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
                  <Link to="#" className="flex items-center gap-2 text-gray-700 hover:text-education-blue text-sm">
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
