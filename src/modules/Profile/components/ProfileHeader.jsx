import React, { useRef } from 'react';
import { FollowBtn } from '../ui/FollowBtn';

export const ProfileHeader = ({ 
  user, 
  isLoading, 
  isOwnProfile, 
  onAvatarUpload, 
  isAvatarLoading 
}) => {
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarUpload(e.target.files[0]);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700/50 animate-pulse">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-700"></div>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-700 rounded"></div>
          <div className="h-4 w-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700/50">
      <div className="relative group">
        <img 
          src={user.avatarUrl || 'https://avatar.iran.liara.run/public'} 
          alt={user.fullName} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg transition-all duration-300 group-hover:border-indigo-500/60"
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
      
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white mb-1">{user.fullName}</h2>
        <p className="text-gray-400 mb-3">{user.bio || ""}</p>
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{user.worksCount || 0}</span>
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
      </div>
      
      {!isOwnProfile && <FollowBtn />}
    </div>
  );
};