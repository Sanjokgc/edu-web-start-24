
import { UserProfile, Message, Bookmark, UserContent, UserSetting } from "./types";

// Mock data (in a real app, this would come from an API/database)
export const mockProfile: UserProfile = {
  bio: "Passionate about education and learning new technologies.",
  location: "San Francisco, CA",
  website: "myportfolio.com",
  joinedDate: "January 2023"
};

export const mockMessages: Message[] = [
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

export const mockBookmarks: Bookmark[] = [
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

export const mockUserContent: UserContent[] = [
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

export const mockSettings: UserSetting[] = [
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
