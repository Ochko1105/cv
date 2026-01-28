"use client";

import { useState } from "react";
import { ProfileSection } from "./_components/sections/profile-section";
import { ContactSection } from "./_components/sections/contact-section";
import { AddressSection } from "./_components/sections/address-section";
import { EmergencySection } from "./_components/sections/emergency-section";
import { DocumentsSection } from "./_components/sections/documents-section";
import { MobileHeader } from "./_components/mobile-header";
import { BottomNavigation } from "./_components/bottom-navigation";


const tabTitles: Record<string, string> = {
  profile: "My Profile",
  contact: "Contact Info",
  address: "Addresses",


};

export default function PersonalInfoApp() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "contact":
        return <ContactSection />;
      case "address":
        return <AddressSection />;
    
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <MobileHeader title={tabTitles[activeTab]} />
      
      <main className="overflow-y-auto">
        {renderContent()}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
