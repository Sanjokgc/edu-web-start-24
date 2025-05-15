
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface TopicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topics: Array<{ id: number, name: string, icon: string, color: string }>;
  setTopics: React.Dispatch<React.SetStateAction<Array<{ id: number, name: string, icon: string, color: string }>>>;
}

export const TopicDialog: React.FC<TopicDialogProps> = ({
  open,
  onOpenChange,
  topics,
  setTopics,
}) => {
  const { toast } = useToast();
  const [newTopicName, setNewTopicName] = useState("");
  const [editingTopic, setEditingTopic] = useState<number | null>(null);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button onClick={() => onOpenChange(false)} className="rounded whitespace-nowrap">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDialog;
