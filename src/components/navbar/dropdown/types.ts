
export interface UserProfile {
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  addedOn: string;
}

export interface UserContent {
  id: string;
  title: string;
  type: "article" | "question" | "comment";
  createdAt: string;
}

export interface UserSetting {
  id: string;
  name: string;
  enabled: boolean;
  category: "appearance" | "notifications" | "account" | "privacy";
}
