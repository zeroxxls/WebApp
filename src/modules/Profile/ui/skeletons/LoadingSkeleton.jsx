import React from "react";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { ProfileWorksGrid } from "../../components/Profile/ProfileWorksGrid";

export const LoadingSkeleton = ({ isAvatarLoading, isOwnProfile }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ProfileHeader
        user={null}
        isLoading={true}
        isOwnProfile={isOwnProfile}
        isAvatarLoading={isAvatarLoading}
      />
      <ProfileWorksGrid
        isLoading={true}
        userWorks={[]}
        user={null}
        onWorkClick={() => {}}
      />
    </div>
  );
};
