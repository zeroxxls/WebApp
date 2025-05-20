import React, { useRef } from "react";

export const AvatarSection = ({ user, isOwnProfile, isAvatarLoading, onAvatarUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarUpload(e.target.files[0]);
    }
  };

  return (
    <div className="relative group">
      <img 
        src={`http://localhost:4444/avatars/${user._id}/avatar?${Date.now()}`}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg transition-all duration-300 group-hover:border-indigo-500/60"
        alt={`${user.fullName}'s avatar`}
      />
      {isOwnProfile && (
        <>
          <button
            onClick={() => fileInputRef.current.click()}
            disabled={isAvatarLoading}
            className={`absolute inset-0 w-full h-full flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isAvatarLoading ? 'cursor-wait' : 'cursor-pointer'
            }`}
          >
            <span className="text-white font-medium">
              {isAvatarLoading ? 'Uploading...' : 'Change Avatar'}
            </span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </>
      )}
    </div>
  );
};
