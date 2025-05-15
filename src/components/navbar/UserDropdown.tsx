
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { mockMessages } from "./dropdown/mockData";

// Import refactored components
import ProfileSection from "./dropdown/ProfileSection";
import MessagesSection from "./dropdown/MessagesSection";
import BookmarksSection from "./dropdown/BookmarksSection";
import UserContentSection from "./dropdown/UserContentSection";
import SettingsSection from "./dropdown/SettingsSection";
import DropdownMainMenu from "./dropdown/DropdownMainMenu";

// Main component
const UserDropdown = () => {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const handleMenuItemClick = (actionName: string) => {
    setActiveSection(actionName);
    
    // Show toast notification
    toast({
      title: `${actionName} opened`,
      description: `Viewing your ${actionName.toLowerCase()}.`,
      variant: "default",
    });
  };
  
  // Navigate back to main dropdown menu
  const handleBack = () => {
    setActiveSection(null);
  };

  // Get unread messages count
  const unreadMessagesCount = mockMessages.filter(m => !m.read).length;

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return <ProfileSection handleBack={handleBack} />;
        
      case "Messages":
        return <MessagesSection handleBack={handleBack} />;

      case "Bookmarks":
        return <BookmarksSection handleBack={handleBack} />;

      case "Your Content":
        return <UserContentSection handleBack={handleBack} />;

      case "Settings":
        return <SettingsSection handleBack={handleBack} />;
        
      default:
        return null;
    }
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
      <DropdownMenuContent align="end" className="w-72 bg-white">
        {activeSection ? (
          renderContent()
        ) : (
          <DropdownMainMenu 
            handleMenuItemClick={handleMenuItemClick}
            unreadMessagesCount={unreadMessagesCount}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
