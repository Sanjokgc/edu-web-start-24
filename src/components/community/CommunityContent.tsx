
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PostForm } from "@/components/community/PostForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare, RefreshCcw, MoreHorizontal } from "lucide-react";
import PinnedPosts from "./PinnedPosts";
import SamplePosts from "./SamplePosts";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: {
    id: string;
    content: string;
    author: string;
    authorId: string;
    createdAt: string;
  }[];
}

interface CommunityContentProps {
  posts: Post[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommunityContent: React.FC<CommunityContentProps> = ({
  posts,
  activeTab,
  setActiveTab,
  setVideoModalOpen,
}) => {
  return (
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
      
      <PostForm />
      
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
          <PinnedPosts setVideoModalOpen={setVideoModalOpen} />
          
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium flex items-center">
                            {post.author}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded cursor-pointer">
                          <MoreHorizontal size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {post.title !== "New Post" && (
                    <h3 className="font-medium mb-2">{post.title}</h3>
                  )}
                  <p className="text-sm mb-3">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <ArrowUp size={18} />
                      <span>{post.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <ArrowDown size={18} />
                      <span>{post.downvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <MessageSquare size={18} />
                      <span>{post.comments.length}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                      <RefreshCcw size={18} />
                      <span>0</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                      <MoreHorizontal size={18} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
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
            
            <SamplePosts setVideoModalOpen={setVideoModalOpen} />
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
                        </h4>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded cursor-pointer">
                        <MoreHorizontal size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm mb-3">
                  Here I teach advanced proofing techniques. It's hard for people to refuse if you use this technique.
                </p>
              </CardContent>
              <CardFooter className="border-t border-gray-100 pt-3">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <ArrowUp size={18} />
                    <span>15.2K</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <ArrowDown size={18} />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <MessageSquare size={18} />
                    <span>769</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <RefreshCcw size={18} />
                    <span>164</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                    <MoreHorizontal size={18} />
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
                    <ArrowUp size={18} />
                    <span>15.2K</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <ArrowDown size={18} />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <MessageSquare size={18} />
                    <span>769</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap">
                    <RefreshCcw size={18} />
                    <span>164</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#FF7F50] rounded cursor-pointer whitespace-nowrap ml-auto">
                    <MoreHorizontal size={18} />
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
  );
};

export default CommunityContent;
