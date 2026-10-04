import React from "react";
import { AvatarSection } from "./AvatarSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { TechStackSection } from "./TechStackSection";
import { ContactStatsSection } from "./ContactsStatsSection";
import { EditProfileModalWrapper } from "./EditProfileModalWrapper";
import { FollowBtn } from "../../ui/btns/FollowBtn";
import { useFollow } from "../../hooks/follow/useFollow";

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
   const {
       getFollowers,
       getFollowing,
       isFollowing,
       isLoading: isFollowLoading,
       toggleFollow,
       followersCount,
       followingCount,
   } = useFollow(user);
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
                    <BasicInfoSection
                        user={user}
                        isOwnProfile={isOwnProfile}
                        setIsEditModalOpen={openEditModal}
                    />
                    <TechStackSection techStack={user.techStack} />
                    <ContactStatsSection
                        contacts={user.contacts}
                        worksCount={worksCount}
                        followersCount={followersCount}
                        followingCount={followingCount}
                        profileUserId={user._id}
                        getFollowers={getFollowers}
                        getFollowing={getFollowing}
                    />
                    {!isOwnProfile && (
                        <div className="mt-4 flex justify-center md:justify-start">
                            <FollowBtn
                                isFollowing={isFollowing}
                                isLoading={isFollowLoading}
                                onToggle={toggleFollow}
                            />
                        </div>
                    )}
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
