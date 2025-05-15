
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { mockProfile } from "./mockData";

interface ProfileSectionProps {
  handleBack: () => void;
}

const ProfileSection = ({ handleBack }: ProfileSectionProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Your Profile</h3>
        <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium">Bio:</span>
          <p className="text-sm text-gray-600">{mockProfile.bio}</p>
        </div>
        <div>
          <span className="text-sm font-medium">Location:</span>
          <p className="text-sm text-gray-600">{mockProfile.location}</p>
        </div>
        <div>
          <span className="text-sm font-medium">Website:</span>
          <p className="text-sm text-gray-600">{mockProfile.website}</p>
        </div>
        <div>
          <span className="text-sm font-medium">Member since:</span>
          <p className="text-sm text-gray-600">{mockProfile.joinedDate}</p>
        </div>
        <button 
          className="w-full bg-education-blue text-white rounded-md py-1.5 text-sm mt-4"
          onClick={() => {
            toast({
              title: "Edit Profile",
              description: "Profile editing will be available soon.",
            });
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
