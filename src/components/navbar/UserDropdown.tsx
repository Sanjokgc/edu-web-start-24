
import React from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageSquare, BookmarkIcon, FileEdit, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const UserDropdown = () => {
  const { user } = useUser();
  
  const handleMenuItemClick = (actionName: string) => {
    // For now, we'll just show a toast notification
    toast({
      title: `${actionName} clicked`,
      description: "This feature will be implemented soon.",
      variant: "default",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8 border hover:ring-2 hover:ring-gray-200">
            <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? "User"} />
            <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden lg:block">{user?.fullName ?? user?.firstName}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <div className="flex items-center gap-2 p-2 border-b">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? "User"} />
            <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">Hi, {user?.firstName ?? "User"}</span>
            <span className="text-xs text-gray-500">{user?.emailAddresses[0].emailAddress}</span>
          </div>
        </div>
        
        <div className="py-2">
          <DropdownMenuItem onClick={() => handleMenuItemClick("Profile")} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Messages")} className="cursor-pointer">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Bookmarks")} className="cursor-pointer">
            <BookmarkIcon className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Your Content")} className="cursor-pointer">
            <FileEdit className="mr-2 h-4 w-4" />
            <span>Your Content</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />
        
        <div className="py-2">
          <DropdownMenuItem onClick={() => handleMenuItemClick("Settings")} className="cursor-pointer">
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
  );
};

export default UserDropdown;
