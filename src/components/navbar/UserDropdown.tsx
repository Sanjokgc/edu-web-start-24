
import React, { useState } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageSquare, BookmarkIcon, FileEdit, Settings, LogOut, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interfaces for user profile and messages
interface UserProfile {
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  addedOn: string;
}

interface UserContent {
  id: string;
  title: string;
  type: "article" | "question" | "comment";
  createdAt: string;
}

interface UserSetting {
  id: string;
  name: string;
  enabled: boolean;
  category: "appearance" | "notifications" | "account" | "privacy";
}

// Mock data (in a real app, this would come from an API/database)
const mockProfile: UserProfile = {
  bio: "Passionate about education and learning new technologies.",
  location: "San Francisco, CA",
  website: "myportfolio.com",
  joinedDate: "January 2023"
};

const mockMessages: Message[] = [
  { 
    id: "1", 
    sender: "Learning Coach", 
    content: "Your next lesson is ready to start!", 
    timestamp: "2 hours ago", 
    read: false 
  },
  { 
    id: "2", 
    sender: "EduLearn Team", 
    content: "New course recommendations based on your interests.", 
    timestamp: "1 day ago", 
    read: true 
  },
  { 
    id: "3", 
    sender: "Course Instructor", 
    content: "Your assignment has been reviewed.", 
    timestamp: "2 days ago", 
    read: true 
  }
];

const mockBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    url: "/courses/machine-learning",
    addedOn: "May 10, 2025"
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    url: "/courses/web-dev",
    addedOn: "May 8, 2025"
  },
  {
    id: "3",
    title: "Data Structures and Algorithms",
    url: "/courses/dsa",
    addedOn: "May 5, 2025"
  }
];

const mockUserContent: UserContent[] = [
  {
    id: "1",
    title: "My Journey Learning React",
    type: "article",
    createdAt: "May 12, 2025"
  },
  {
    id: "2",
    title: "How to optimize database queries?",
    type: "question",
    createdAt: "May 9, 2025"
  },
  {
    id: "3",
    title: "Great explanation, thank you!",
    type: "comment",
    createdAt: "May 7, 2025"
  }
];

const mockSettings: UserSetting[] = [
  {
    id: "darkMode",
    name: "Dark Mode",
    enabled: false,
    category: "appearance"
  },
  {
    id: "largeText",
    name: "Large Text",
    enabled: false,
    category: "appearance"
  },
  {
    id: "highContrast",
    name: "High Contrast",
    enabled: false,
    category: "appearance"
  },
  {
    id: "emailNotifs",
    name: "Email Notifications",
    enabled: true,
    category: "notifications"
  },
  {
    id: "pushNotifs",
    name: "Push Notifications",
    enabled: true,
    category: "notifications"
  },
  {
    id: "courseUpdates",
    name: "Course Updates",
    enabled: true,
    category: "notifications"
  },
  {
    id: "messageNotifs",
    name: "Message Notifications",
    enabled: true,
    category: "notifications"
  },
  {
    id: "twoFactorAuth",
    name: "Two Factor Authentication",
    enabled: false,
    category: "account"
  },
  {
    id: "showProfile",
    name: "Show Profile to Public",
    enabled: true,
    category: "privacy"
  },
  {
    id: "showActivity",
    name: "Show Activity",
    enabled: false,
    category: "privacy"
  }
];

// Main component
const UserDropdown = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [settings, setSettings] = useState<UserSetting[]>(mockSettings);
  const [activeTab, setActiveTab] = useState<string>("appearance");
  
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

  // Handle setting toggle
  const handleToggleSetting = (settingId: string) => {
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === settingId 
          ? { ...setting, enabled: !setting.enabled } 
          : setting
      )
    );

    const setting = settings.find(s => s.id === settingId);
    
    if (setting) {
      toast({
        title: `${setting.name} ${!setting.enabled ? "Enabled" : "Disabled"}`,
        description: `You have ${!setting.enabled ? "enabled" : "disabled"} ${setting.name.toLowerCase()}.`,
        variant: "default",
      });
    }
  };

  // Render appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Profile</h3>
              <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium">Bio:</span>
                <p className="text-sm text-gray-600">{mockProfile.bio}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Location:</span>
                <p className="text-sm text-gray-600">{mockProfile.location}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Website:</span>
                <p className="text-sm text-gray-600">{mockProfile.website}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Member since:</span>
                <p className="text-sm text-gray-600">{mockProfile.joinedDate}</p>
              </div>
              <button 
                className="w-full bg-education-blue text-white rounded-md py-1.5 text-sm mt-4"
                onClick={() => {
                  toast({
                    title: "Edit Profile",
                    description: "Profile editing will be available soon.",
                  });
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        );
        
      case "Messages":
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Messages</h3>
              <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
            </div>
            <div className="space-y-3">
              {mockMessages.map(message => (
                <div key={message.id} className={`p-2 rounded-md ${message.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{message.sender}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                </div>
              ))}
              <button 
                className="w-full bg-education-blue text-white rounded-md py-1.5 text-sm mt-2"
                onClick={() => {
                  toast({
                    title: "View All Messages",
                    description: "Full messaging center will be available soon.",
                  });
                }}
              >
                View All
              </button>
            </div>
          </div>
        );

      case "Bookmarks":
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Bookmarks</h3>
              <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
            </div>
            <div className="space-y-3">
              {mockBookmarks.map(bookmark => (
                <div key={bookmark.id} className="p-2 border border-gray-100 rounded-md hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <Link to={bookmark.url} className="font-medium text-sm text-education-blue">
                      {bookmark.title}
                    </Link>
                    <button 
                      className="text-xs text-gray-400 hover:text-red-500"
                      onClick={() => {
                        toast({
                          title: "Bookmark Removed",
                          description: `Removed "${bookmark.title}" from bookmarks.`,
                        });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Added on {bookmark.addedOn}</p>
                </div>
              ))}
              <button 
                className="w-full bg-education-blue text-white rounded-md py-1.5 text-sm mt-2"
                onClick={() => {
                  toast({
                    title: "Manage Bookmarks",
                    description: "Advanced bookmark management will be available soon.",
                  });
                }}
              >
                Manage All Bookmarks
              </button>
            </div>
          </div>
        );

      case "Your Content":
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Content</h3>
              <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
            </div>
            <div className="space-y-3">
              {mockUserContent.map(content => (
                <div key={content.id} className="p-2 border border-gray-100 rounded-md hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{content.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      content.type === 'article' ? 'bg-blue-100 text-blue-700' : 
                      content.type === 'question' ? 'bg-orange-100 text-orange-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {content.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Created on {content.createdAt}</p>
                </div>
              ))}
              <button 
                className="w-full bg-education-blue text-white rounded-md py-1.5 text-sm mt-2"
                onClick={() => {
                  toast({
                    title: "Create New Content",
                    description: "Content creation tools will be available soon.",
                  });
                }}
              >
                Create New Content
              </button>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Settings</h3>
              <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
            </div>
            
            <Tabs defaultValue="appearance" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-4">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="space-y-3">
                {settings
                  .filter(setting => setting.category === "appearance")
                  .map(setting => (
                    <div key={setting.id} className="flex justify-between items-center p-2">
                      <span className="text-sm">{setting.name}</span>
                      <Switch 
                        checked={setting.enabled} 
                        onCheckedChange={() => handleToggleSetting(setting.id)} 
                      />
                    </div>
                  ))}
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-3">
                {settings
                  .filter(setting => setting.category === "notifications")
                  .map(setting => (
                    <div key={setting.id} className="flex justify-between items-center p-2">
                      <span className="text-sm">{setting.name}</span>
                      <Switch 
                        checked={setting.enabled} 
                        onCheckedChange={() => handleToggleSetting(setting.id)} 
                      />
                    </div>
                  ))}
              </TabsContent>
              
              <TabsContent value="account" className="space-y-3">
                {settings
                  .filter(setting => setting.category === "account")
                  .map(setting => (
                    <div key={setting.id} className="flex justify-between items-center p-2">
                      <span className="text-sm">{setting.name}</span>
                      <Switch 
                        checked={setting.enabled} 
                        onCheckedChange={() => handleToggleSetting(setting.id)} 
                      />
                    </div>
                  ))}
                  
                <div className="mt-4 space-y-2">
                  <button 
                    className="w-full bg-gray-100 text-gray-800 rounded-md py-1.5 text-sm"
                    onClick={() => {
                      toast({
                        title: "Change Password",
                        description: "Password change functionality will be available soon.",
                      });
                    }}
                  >
                    Change Password
                  </button>
                  
                  <button 
                    className="w-full bg-gray-100 text-gray-800 rounded-md py-1.5 text-sm"
                    onClick={() => {
                      toast({
                        title: "Link Accounts",
                        description: "Account linking will be available soon.",
                      });
                    }}
                  >
                    Link Other Accounts
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-3">
                {settings
                  .filter(setting => setting.category === "privacy")
                  .map(setting => (
                    <div key={setting.id} className="flex justify-between items-center p-2">
                      <span className="text-sm">{setting.name}</span>
                      <Switch 
                        checked={setting.enabled} 
                        onCheckedChange={() => handleToggleSetting(setting.id)} 
                      />
                    </div>
                  ))}
                  
                <div className="mt-4 pt-4 border-t">
                  <button 
                    className="w-full bg-red-100 text-red-600 rounded-md py-1.5 text-sm"
                    onClick={() => {
                      toast({
                        title: "Data Export Requested",
                        description: "Your data export request has been received.",
                      });
                    }}
                  >
                    Export My Data
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
        
      default:
        return null;
    }
  };

  const unreadMessagesCount = mockMessages.filter(m => !m.read).length;

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
          <>
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
              <DropdownMenuItem onClick={() => handleMenuItemClick("Messages")} className="cursor-pointer relative">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Messages</span>
                {unreadMessagesCount > 0 && (
                  <span className="absolute right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadMessagesCount}
                  </span>
                )}
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
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
