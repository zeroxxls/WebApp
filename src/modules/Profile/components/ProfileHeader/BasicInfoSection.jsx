import React from "react";
import { MdModeEdit } from "react-icons/md";
import { LikeSaveProfileBtns } from "../../ui/LikeSaveProfileBtns";

export const BasicInfoSection = ({ user, isOwnProfile, setIsEditModalOpen }) => (
    <div className="flex items-center flex-col md:flex-row md:items-end md:justify-between gap-4 w-full">
        <div className="flex-1">
            <h2 className="text-3xl font-bold text-white">{user.fullName}</h2>
            <p className="text-gray-400 mt-2">{user.bio || "No bio yet"}</p>
        </div>
        {isOwnProfile && (
            <div className="flex flex-col items-end gap-3">
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <MdModeEdit />
                    Edit Profile
                </button>
                <LikeSaveProfileBtns />
            </div>
        )}
    </div>
);
