
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { mockBookmarks } from "./mockData";

interface BookmarksSectionProps {
  handleBack: () => void;
}

const BookmarksSection = ({ handleBack }: BookmarksSectionProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Your Bookmarks</h3>
        <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
      </div>
      <div className="space-y-3">
        {mockBookmarks.map(bookmark => (
          <div key={bookmark.id} className="p-2 border border-gray-100 rounded-md hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <Link to={bookmark.url} className="font-medium text-sm text-education-blue">
                {bookmark.title}
              </Link>
              <button 
                className="text-xs text-gray-400 hover:text-red-500"
                onClick={() => {
                  toast({
                    title: "Bookmark Removed",
                    description: `Removed "${bookmark.title}" from bookmarks.`,
                  });
                }}
              >
                Remove
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Added on {bookmark.addedOn}</p>
          </div>
        ))}
        <button 
          className="w-full bg-education-blue text-white rounded-md py-1.5 text-sm mt-2"
          onClick={() => {
            toast({
              title: "Manage Bookmarks",
              description: "Advanced bookmark management will be available soon.",
            });
          }}
        >
          Manage All Bookmarks
        </button>
      </div>
    </div>
  );
};

export default BookmarksSection;
