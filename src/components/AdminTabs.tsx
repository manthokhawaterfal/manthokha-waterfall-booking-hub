
import React from "react";
import { Button } from "@/components/ui/button";

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-4">
        <Button
          variant={activeTab === "bookings" ? "default" : "ghost"}
          className={`rounded-none border-b-2 ${
            activeTab === "bookings" 
              ? "border-waterfall-600 bg-transparent text-waterfall-800 hover:bg-gray-50" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          Booking Management
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "ghost"}
          className={`rounded-none border-b-2 ${
            activeTab === "settings" 
              ? "border-waterfall-600 bg-transparent text-waterfall-800 hover:bg-gray-50" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminTabs;
