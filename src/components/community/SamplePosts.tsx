
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SamplePostsProps {
  setVideoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SamplePosts: React.FC<SamplePostsProps> = ({
  setVideoModalOpen,
}) => {
  return (
    <>
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
    </>
  );
};

export default SamplePosts;
