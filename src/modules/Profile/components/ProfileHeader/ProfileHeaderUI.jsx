import React from "react";
import { AvatarSection } from "./AvatarSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { TechStackSection } from "./TechStackSection";
import { ContactStatsSection } from "./ContactsStatsSection";
import { EditProfileModalWrapper } from "./EditProfileModalWrapper";
import { FollowBtn } from "../../ui/FollowBtn";
import { useFollow } from "../../hooks/useFollow";

export const ProfileHeaderUI = ({
    user,
    isOwnProfile,
    isAvatarLoading,
    onAvatarUpload,
    onProfileUpdate,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    worksCount,
}) => {
   const { getFollowers, getFollowing } = useFollow(user?._id);
    return (
        <div className="mb-8 pb-8 border-b border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <AvatarSection
                    user={user}
                    isOwnProfile={isOwnProfile}
                    isAvatarLoading={isAvatarLoading}
                    onAvatarUpload={onAvatarUpload}
                />
                <div className="text-center md:text-left flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <BasicInfoSection
                            user={user}
                            isOwnProfile={isOwnProfile}
                            setIsEditModalOpen={openEditModal}
                        />
                        {!isOwnProfile && <FollowBtn profileUserId={user._id} />}
                    </div>
                    <TechStackSection techStack={user.techStack} />
                    <ContactStatsSection
                        contacts={user.contacts}
                        worksCount={worksCount}
                        followersCount={user.followers?.length || 0}
                        followingCount={user.following?.length || 0}
                        profileUserId={user._id}
                        getFollowers={getFollowers}
                        getFollowing={getFollowing}
                    />
                </div>
            </div>
            <EditProfileModalWrapper
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onUpdate={onProfileUpdate}
                user={user}
            />
        </div>
    );
};