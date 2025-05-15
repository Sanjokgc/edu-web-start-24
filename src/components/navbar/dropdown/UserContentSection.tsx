
import { toast } from "@/hooks/use-toast";
import { mockUserContent } from "./mockData";

interface UserContentSectionProps {
  handleBack: () => void;
}

const UserContentSection = ({ handleBack }: UserContentSectionProps) => {
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
};

export default UserContentSection;
