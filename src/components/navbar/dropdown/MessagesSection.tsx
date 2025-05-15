
import { toast } from "@/hooks/use-toast";
import { mockMessages } from "./mockData";

interface MessagesSectionProps {
  handleBack: () => void;
}

const MessagesSection = ({ handleBack }: MessagesSectionProps) => {
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
};

export default MessagesSection;
