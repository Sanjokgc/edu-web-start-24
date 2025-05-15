
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { mockSettings } from "./mockData";
import { UserSetting } from "./types";

interface SettingsSectionProps {
  handleBack: () => void;
}

const SettingsSection = ({ handleBack }: SettingsSectionProps) => {
  const [settings, setSettings] = useState<UserSetting[]>(mockSettings);
  const [activeTab, setActiveTab] = useState<string>("appearance");

  // Handle setting toggle
  const handleToggleSetting = (settingId: string) => {
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === settingId 
          ? { ...setting, enabled: !setting.enabled } 
          : setting
      )
    );

    const setting = settings.find(s => s.id === settingId);
    
    if (setting) {
      toast({
        title: `${setting.name} ${!setting.enabled ? "Enabled" : "Disabled"}`,
        description: `You have ${!setting.enabled ? "enabled" : "disabled"} ${setting.name.toLowerCase()}.`,
        variant: "default",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Settings</h3>
        <button onClick={handleBack} className="text-sm text-blue-500">Back</button>
      </div>
      
      <Tabs 
        defaultValue="appearance" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-3">
          {settings
            .filter(setting => setting.category === "appearance")
            .map(setting => (
              <div key={setting.id} className="flex justify-between items-center p-2">
                <span className="text-sm">{setting.name}</span>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleToggleSetting(setting.id)} 
                />
              </div>
            ))}
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-3">
          {settings
            .filter(setting => setting.category === "notifications")
            .map(setting => (
              <div key={setting.id} className="flex justify-between items-center p-2">
                <span className="text-sm">{setting.name}</span>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleToggleSetting(setting.id)} 
                />
              </div>
            ))}
        </TabsContent>
        
        <TabsContent value="account" className="space-y-3">
          {settings
            .filter(setting => setting.category === "account")
            .map(setting => (
              <div key={setting.id} className="flex justify-between items-center p-2">
                <span className="text-sm">{setting.name}</span>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleToggleSetting(setting.id)} 
                />
              </div>
            ))}
            
          <div className="mt-4 space-y-2">
            <button 
              className="w-full bg-gray-100 text-gray-800 rounded-md py-1.5 text-sm"
              onClick={() => {
                toast({
                  title: "Change Password",
                  description: "Password change functionality will be available soon.",
                });
              }}
            >
              Change Password
            </button>
            
            <button 
              className="w-full bg-gray-100 text-gray-800 rounded-md py-1.5 text-sm"
              onClick={() => {
                toast({
                  title: "Link Accounts",
                  description: "Account linking will be available soon.",
                });
              }}
            >
              Link Other Accounts
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-3">
          {settings
            .filter(setting => setting.category === "privacy")
            .map(setting => (
              <div key={setting.id} className="flex justify-between items-center p-2">
                <span className="text-sm">{setting.name}</span>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleToggleSetting(setting.id)} 
                />
              </div>
            ))}
            
          <div className="mt-4 pt-4 border-t">
            <button 
              className="w-full bg-red-100 text-red-600 rounded-md py-1.5 text-sm"
              onClick={() => {
                toast({
                  title: "Data Export Requested",
                  description: "Your data export request has been received.",
                });
              }}
            >
              Export My Data
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsSection;
