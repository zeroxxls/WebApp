import React from "react";
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { ProfileWorksGrid } from "./ProfileWorksGrid";
import { NoWorksFound } from "../Errors/NoWorksFound";
import { ModalWindow } from "../../../MainContent/components/ModalWindow/ModalWindow";

export const ProfileContent = ({
    profileUser,
    userWorks, // Получаем userWorks как пропс
    isOwnProfile,
    handleAvatarUpload,
    isAvatarLoading,
    handleProfileUpdate,
    selectedWork,
    setSelectedWork,
    open,
    setOpen,
    isLoading // Добавляем пропс isLoading
}) => {

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <ProfileHeader
                user={profileUser}
                isOwnProfile={isOwnProfile}
                onAvatarUpload={handleAvatarUpload}
                isAvatarLoading={isAvatarLoading}
                onProfileUpdate={handleProfileUpdate}
            />

            {isLoading ? (
                <div>Loading works...</div>
            ) : userWorks.length > 0 ? (
                <ProfileWorksGrid
                    userWorks={userWorks}
                    user={profileUser}
                    isOwnProfile={isOwnProfile}
                    onWorkClick={(work) => {
                        setSelectedWork(work);
                        setOpen(true);
                    }}
                />
            ) : (
                <NoWorksFound isOwnProfile={isOwnProfile} />
            )}

            {open && (
                <ModalWindow
                    onClose={() => setOpen(false)}
                    selectedWork={selectedWork}
                    selectedUser={profileUser}
                />
            )}
        </div>
    );
};
