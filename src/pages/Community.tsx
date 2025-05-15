
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-posts");
  const [isTopicDialogOpen, setIsTopicDialogOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupIcon, setGroupIcon] = useState('');
  const [privacySetting, setPrivacySetting] = useState<'public' | 'private'>('public');
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [memberSearch, setMemberSearch] = useState('');
  const [newTopicName, setNewTopicName] = useState("");
  const [editingTopic, setEditingTopic] = useState<number | null>(null);
  
  const [topics, setTopics] = useState([
    { id: 1, name: "Study Abroad Guide", icon: "graduation-cap", color: "amber" },
    { id: 2, name: "Visa Experience", icon: "passport", color: "amber" },
    { id: 3, name: "University Life", icon: "university", color: "amber" },
    { id: 4, name: "Career Advice", icon: "briefcase", color: "amber" },
    { id: 5, name: "Immigration Tips", icon: "plane", color: "amber" },
    { id: 6, name: "Language Tests", icon: "language", color: "amber" }
  ]);

  const handleAddTopic = () => {
    if (newTopicName.trim()) {
      setTopics([
        ...topics,
        {
          id: topics.length + 1,
          name: newTopicName,
          icon: "tag",
          color: "amber"
        }
      ]);
      setNewTopicName("");
      toast({
        title: "Topic Added",
        description: `Topic "${newTopicName}" has been added successfully.`
      });
    }
  };

  const handleDeleteTopic = (id: number) => {
    setTopics(topics.filter(topic => topic.id !== id));
    toast({
      title: "Topic Deleted",
      description: "The topic has been deleted successfully."
    });
  };

  const handleEditTopic = (id: number, newName: string) => {
    setTopics(topics.map(topic =>
      topic.id === id ? { ...topic, name: newName } : topic
    ));
    setEditingTopic(null);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newTopics = [...topics];
      [newTopics[index], newTopics[index - 1]] = [newTopics[index - 1], newTopics[index]];
      setTopics(newTopics);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < topics.length - 1) {
      const newTopics = [...topics];
      [newTopics[index], newTopics[index + 1]] = [newTopics[index + 1], newTopics[index]];
      setTopics(newTopics);
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      toast({
        title: "Group Created",
        description: `Group "${groupName}" has been created successfully.`
      });
      setIsCreateGroupOpen(false);
      // Reset form
      setGroupName('');
      setGroupDescription('');
      setGroupIcon('');
      setPrivacySetting('public');
      setSelectedTopics([]);
      setMemberSearch('');
    } else {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 bg-[#FFFAF7]">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <div className="w-[280px] shrink-0 hidden md:block">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="relative w-full h-[180px] rounded-t-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
                      alt="International students"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h2 className="text-xl font-bold mt-3">Global Education Community</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    "Your gateway to international education success. Share experiences, get advice, and connect with fellow students worldwide."
                  </p>
                </CardHeader>
                <CardContent className="pt-2 pb-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Public</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">15,432 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Active discussions</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full text-[#FF7F50] border-[#FF7F50] hover:bg-[#FFF1EC] rounded whitespace-nowrap cursor-pointer">
                    Invite
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-4 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Topics</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded cursor-pointer"
                      onClick={() => setIsTopicDialogOpen(true)}
                    >
                      <span className="sr-only">Settings</span>
                      ⚙️
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {topics.map(topic => (
                      <li key={topic.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{topic.name}</span>
                        </div>
                      </li>
                    ))}
                    <li 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer" 
                      onClick={() => setIsTopicDialogOpen(true)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Add Topic</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm mt-4 mb-4">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold">Filter Options</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
                      </div>
                      <span className="text-sm">Show All</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
                      </div>
                      <span className="text-sm">Questions Only</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
                      </div>
                      <span className="text-sm">Success Stories</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
                      </div>
                      <span className="text-sm">Tips & Advice</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
                      </div>
                      <span className="text-sm">Events & Meetups</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-[#FF7F50]">
                      </div>
                      <span className="text-sm">Resources</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for keywords, #hashtag, @Name"
                    className="pl-10 pr-4 py-2 border-gray-200 rounded-full focus:ring-[#FF7F50] focus:border-[#FF7F50] text-sm"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                </div>
              </div>
              
              <Card className="mb-4 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                      <AvatarFallback>YN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="What's on your mind?"
                        className="border-none bg-gray-50 rounded-lg focus:ring-0 text-sm"
                      />
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FF7F50] hover:bg-transparent p-0 rounded cursor-pointer whitespace-nowrap">
                          <span className="text-xs">Photo</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FF7F50] hover:bg-transparent p-0 rounded cursor-pointer whitespace-nowrap">
                          <span className="text-xs">Video</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FF7F50] hover:bg-transparent p-0 rounded cursor-pointer whitespace-nowrap">
                          <span className="text-xs">Feeling</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FF7F50] hover:bg-transparent p-0 rounded cursor-pointer whitespace-nowrap">
                          <span className="text-xs">Poll</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FF7F50] hover:bg-transparent p-0 rounded cursor-pointer whitespace-nowrap">
                          <span className="text-xs">Live</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FF7F50] hover:bg-transparent p-0 rounded cursor-pointer whitespace-nowrap">
                          <span className="text-xs">Schedule</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="all-posts" className="mb-4" onValueChange={setActiveTab}>
                <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start gap-2 h-auto p-0">
                  <TabsTrigger
                    value="all-posts"
                    className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'all-posts' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                    All Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="trending-post"
                    className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'trending-post' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                    Trending Post
                  </TabsTrigger>
                  <TabsTrigger
                    value="discussions"
                    className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'discussions' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                    Discussions
                  </TabsTrigger>
                  <TabsTrigger
                    value="media-pics"
                    className={`px-4 py-2 rounded-none border-b-2 ${activeTab === 'media-pics' ? 'border-[#FF7F50] text-[#FF7F50]' : 'border-transparent'} data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                  >
                    Media/Pics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all-posts" className="mt-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-700">Pinned Post · 3</h3>
                    </div>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Sarah Chen</h4>
                            <p className="text-xs text-gray-500">8hr ago</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm mb-3">Just got my US Student Visa approved! 🎉 Here's my experience and tips for the interview process! #StudentVisa #USEducation</p>
                        <div className="relative rounded-lg overflow-hidden h-[240px] mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Sunset over ocean"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-14 w-14 rounded-full bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70 rounded cursor-pointer"
                              onClick={() => setVideoModalOpen(true)}
                            >
                              <span className="text-xl">▶️</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                            <AvatarFallback>AM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  Arlene McCoy
                                  <Badge className="ml-2 bg-[#FFE4D6] text-[#FF7F50] hover:bg-[#FFD6C2]">Chef</Badge>
                                </h4>
                                <p className="text-xs text-gray-500">1 day ago</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded cursor-pointer">
                                <span>⋯</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm mb-3">
                          Here I teach advanced proofing techniques. It's hard for people to refuse if you use this technique. Watch it first on YouTube, then I'll comment.
                          <br />
                          Note: Invite me to see if your proofing improves dramatically :)
                        </p>
                        <div className="rounded-lg overflow-hidden mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="People with guitars"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-500 rounded cursor-pointer whitespace-nowrap">
                            <span className="text-[#FF7F50] mr-2">👍</span>
                            213
                          </Button>
                          <span className="text-sm text-gray-500">Comments: 200</span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬆️</span>
                            <span>15.2K</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬇️</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>💬</span>
                            <span>769</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>🔄</span>
                            <span>164</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                            <span>⋯</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                            <AvatarFallback>TW</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Theresa Webb</h4>
                            <p className="text-xs text-gray-500">2 days ago</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm mb-3">
                          I finally understood why I said I didn't need to take the course, until I saw it. Now I even want to join Bakers Club even more.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬆️</span>
                            <span>15.2K</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬇️</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>💬</span>
                            <span>769</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>🔄</span>
                            <span>164</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                            <span>⋯</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="trending-post" className="mt-4">
                  <div className="space-y-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                            <AvatarFallback>AM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  Arlene McCoy
                                  <Badge className="ml-2 bg-[#FFE4D6] text-[#FF7F50] hover:bg-[#FFD6C2]">Chef</Badge>
                                </h4>
                                <p className="text-xs text-gray-500">1 day ago</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded cursor-pointer">
                                <span>⋯</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm mb-3">
                          Here I teach advanced proofing techniques. It's hard for people to refuse if you use this technique. Watch it first on YouTube, then I'll comment.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬆️</span>
                            <span>15.2K</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬇️</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>💬</span>
                            <span>769</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>🔄</span>
                            <span>164</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                            <span>⋯</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="discussions" className="mt-4">
                  <div className="space-y-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                            <AvatarFallback>TW</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Theresa Webb</h4>
                            <p className="text-xs text-gray-500">2 days ago</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm mb-3">
                          I finally understood why I said I didn't need to take the course, until I saw it. Now I even want to join Bakers Club even more.
                        </p>
                      </CardContent>
                      <CardFooter className="border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬆️</span>
                            <span>15.2K</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>⬇️</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>💬</span>
                            <span>769</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                            <span>🔄</span>
                            <span>164</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                            <span>⋯</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="media-pics" className="mt-4">
                  <div className="space-y-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Sarah Chen</h4>
                            <p className="text-xs text-gray-500">8hr ago</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm mb-3">Just got my US Student Visa approved! 🎉 Here's my experience and tips for the interview process! #StudentVisa #USEducation</p>
                        <div className="relative rounded-lg overflow-hidden h-[240px] mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Sunset over ocean"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-14 w-14 rounded-full bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70 rounded cursor-pointer"
                              onClick={() => setVideoModalOpen(true)}
                            >
                              <span className="text-xl">▶️</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Sidebar */}
            <div className="w-[280px] shrink-0 hidden lg:block">
              <Card className="shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold">Upcoming Events</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#FFF1EC] rounded-md">
                        <span className="text-xs text-gray-600">15</span>
                        <span className="text-xs font-medium text-[#FF7F50]">MAY</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">IELTS Preparation Workshop</h4>
                        <p className="text-xs text-gray-500">10:00 - 12:00</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#FFF1EC] rounded-md">
                        <span className="text-xs text-gray-600">20</span>
                        <span className="text-xs font-medium text-[#FF7F50]">MAY</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">US Student Visa Q&A</h4>
                        <p className="text-xs text-gray-500">19:00 - 21:00</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#FFF1EC] rounded-md">
                        <span className="text-xs text-gray-600">25</span>
                        <span className="text-xs font-medium text-[#FF7F50]">MAY</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Scholarship Application Tips</h4>
                        <p className="text-xs text-gray-500">14:00 - 16:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full text-[#FF7F50] hover:bg-[#FFF1EC] rounded cursor-pointer whitespace-nowrap">
                    See All Events
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Group Chat</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs border-[#FF7F50] text-[#FF7F50] hover:bg-[#FFF1EC] rounded cursor-pointer whitespace-nowrap"
                      onClick={() => setIsCreateGroupOpen(true)}
                    >
                      Create Group
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      <Card className="shadow-sm">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                              <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-sm font-medium">Arlene McCoy</h4>
                                  <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded cursor-pointer">
                                  <span className="text-gray-500 text-xs">⋯</span>
                                </Button>
                              </div>
                              <p className="text-sm mt-1">
                                Here I teach advanced proofing techniques. It's hard for people to refuse if you use this technique.
                              </p>
                              <p className="text-sm mt-1">
                                Note: Invite me to see if your proofing improves dramatically :)
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button variant="ghost" size="sm" className="text-gray-500 p-0 h-6 rounded cursor-pointer whitespace-nowrap">
                                  <span className="text-[#FF7F50] mr-1 text-xs">👍</span>
                                  <span className="text-xs">213</span>
                                </Button>
                                <span className="text-xs text-gray-500">Comments: 200</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-gray-100 pt-2 pb-2">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] text-xs h-8 rounded cursor-pointer whitespace-nowrap">
                              <span>⬆️</span>
                              <span>15.2K</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] text-xs h-8 rounded cursor-pointer whitespace-nowrap">
                              <span>⬇️</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] text-xs h-8 rounded cursor-pointer whitespace-nowrap">
                              <span>💬</span>
                              <span>769</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] text-xs h-8 rounded cursor-pointer whitespace-nowrap ml-auto">
                              <span>⋯</span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                      <Card className="shadow-sm">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                              <AvatarFallback>TW</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-sm font-medium">Theresa Webb</h4>
                                  <p className="text-xs text-gray-500">2 days ago</p>
                                </div>
                              </div>
                              <p className="text-sm mt-1">
                                I finally understood why I said I didn't need to take the course, until I saw it. Now I even want to join Bakers Club even more.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <Dialog open={isTopicDialogOpen} onOpenChange={setIsTopicDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Topics</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add new topic"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddTopic} className="rounded whitespace-nowrap">
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {topics.map((topic, index) => (
                <div key={topic.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2 flex-1">
                    {editingTopic === topic.id ? (
                      <Input
                        value={topic.name}
                        onChange={(e) => handleEditTopic(topic.id, e.target.value)}
                        onBlur={() => setEditingTopic(null)}
                        autoFocus
                        className="h-8"
                      />
                    ) : (
                      <span className="text-sm">{topic.name}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="h-8 w-8 rounded"
                    >
                      <span>⬆️</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === topics.length - 1}
                      className="h-8 w-8 rounded"
                    >
                      <span>⬇️</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTopic(topic.id)}
                      className="h-8 w-8 rounded"
                    >
                      <span>✏️</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="h-8 w-8 rounded"
                    >
                      <span>🗑️</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTopicDialogOpen(false)} className="rounded whitespace-nowrap">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="relative">
            <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
              <DialogTitle className="text-white">Tuesday "Technique Talk" Session</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20 rounded"
                onClick={() => setVideoModalOpen(false)}
              >
                <span>✖️</span>
              </Button>
            </DialogHeader>
            <div className="aspect-video bg-black">
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Video placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Emma Richardson</h4>
                      <p className="text-sm text-gray-500">Master Baker & Instructor</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    In this week's Technique Talk, we're covering advanced bread proofing techniques that will take your baking to the next level. Learn the secrets of perfect timing, temperature control, and how to recognize when your dough is properly proofed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                {groupIcon ? (
                  <img src={groupIcon} alt="Group icon" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xl">📷</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        if (e.target?.result) {
                          setGroupIcon(e.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="group-name"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mb-2"
                />
                <Input
                  id="group-description"
                  placeholder="Group Description"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Privacy Setting</label>
              <div className="flex gap-4">
                <Button
                  variant={privacySetting === 'public' ? 'default' : 'outline'}
                  onClick={() => setPrivacySetting('public')}
                  className="flex-1 rounded"
                >
                  <span className="mr-2">🌐</span>
                  Public
                </Button>
                <Button
                  variant={privacySetting === 'private' ? 'default' : 'outline'}
                  onClick={() => setPrivacySetting('private')}
                  className="flex-1 rounded"
                >
                  <span className="mr-2">🔒</span>
                  Private
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Topic Tags</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map(topic => (
                  <Badge
                    key={topic.id}
                    variant={selectedTopics.includes(topic.id) ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      selectedTopics.includes(topic.id)
                        ? 'bg-[#FF7F50] hover:bg-[#FF7F50]/90'
                        : 'hover:bg-[#FFF1EC]'
                    }`}
                    onClick={() => {
                      setSelectedTopics(prev =>
                        prev.includes(topic.id)
                          ? prev.filter(id => id !== topic.id)
                          : [...prev, topic.id]
                      );
                    }}
                  >
                    {topic.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Add Members</label>
              <Input
                placeholder="Search members..."
                className="mt-2"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsCreateGroupOpen(false)}
              className="rounded"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateGroup}
              className="bg-[#FF7F50] text-white hover:bg-[#FF7F50]/90 rounded"
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Community;
