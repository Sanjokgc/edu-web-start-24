
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topics: Array<{ id: number, name: string, icon: string, color: string }>;
}

export const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  open,
  onOpenChange,
  topics,
}) => {
  const { toast } = useToast();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupIcon, setGroupIcon] = useState('');
  const [privacySetting, setPrivacySetting] = useState<'public' | 'private'>('public');
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [memberSearch, setMemberSearch] = useState('');

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      toast({
        title: "Group Created",
        description: `Group "${groupName}" has been created successfully.`
      });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
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
  );
};

export default CreateGroupDialog;
