
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityRightSidebarProps {
  setIsCreateGroupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommunityRightSidebar: React.FC<CommunityRightSidebarProps> = ({ 
  setIsCreateGroupOpen 
}) => {
  return (
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
  );
};

export default CommunityRightSidebar;
