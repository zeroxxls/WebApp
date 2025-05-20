import React from "react";
import { ProfileContacts } from "../Profile/ProfileContacts";

export const ContactStatsSection = ({ contacts, worksCount = 0 }) => (
  <>
    <div className="mt-6">
      <ProfileContacts contacts={contacts} />
    </div>
    <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">{worksCount}</span>
        <span className="text-gray-400 text-sm">works</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">1.2k</span>
        <span className="text-gray-400 text-sm">followers</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">256</span>
        <span className="text-gray-400 text-sm">following</span>
      </div>
    </div>
  </>
);
