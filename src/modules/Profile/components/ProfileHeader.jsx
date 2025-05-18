import React, { useRef, useState } from 'react';
import { FollowBtn } from '../ui/FollowBtn';
import { EditProfileModal } from './EditProfileModal';
import { ProfileContacts } from './ProfileContacts';
import { MdModeEdit } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { FaCheck, FaReact, FaNodeJs, FaJs, FaPython, FaJava, FaHtml5, FaCss3Alt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiKubernetes } from "react-icons/si";

const techIcons = {
  react: <FaReact className="text-blue-500" />,
  node: <FaNodeJs className="text-green-500" />,
  javascript: <FaJs className="text-yellow-500" />,
  typescript: <SiTypescript className="text-blue-600" />,
  python: <FaPython className="text-blue-400" />,
  java: <FaJava className="text-red-500" />,
  html: <FaHtml5 className="text-orange-500" />,
  css: <FaCss3Alt className="text-blue-300" />,
  mongodb: <SiMongodb className="text-green-600" />,
  postgresql: <SiPostgresql className="text-blue-700" />,
  docker: <SiDocker className="text-blue-400" />,
  kubernetes: <SiKubernetes className="text-blue-600" />,
  database: <FaDatabase className="text-gray-400" />,
};

export const ProfileHeader = ({ 
  user, 
  isLoading, 
  isOwnProfile, 
  onAvatarUpload, 
  isAvatarLoading,
  onProfileUpdate 
}) => {
  const fileInputRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState([]);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarUpload(e.target.files[0]);
    }
  };

  const toggleTechSelection = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const getTechIcon = (techName) => {
    const lowerTech = techName.toLowerCase();
    for (const [key, icon] of Object.entries(techIcons)) {
      if (lowerTech.includes(key)) {
        return icon;
      }
    }
    return <FaCode className="text-gray-400" />;
  };

  if (isLoading || !user) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700/50 animate-pulse">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-700"></div>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-700 rounded"></div>
          <div className="h-4 w-64 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 pb-8 border-b border-gray-700/50">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Блок с аватаром */}
        <div className="relative group">
          <img 
            src={`http://localhost:4444/auth/avatar/${user._id}?${Date.now()}`}
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
        
        {/* Основная информация профиля */}
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{user.fullName}</h2>
              <p className="text-gray-400 mt-2">{user.bio || "No bio yet"}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <MdModeEdit />
                  Edit Profile
                </button>
              )}
              {!isOwnProfile && <FollowBtn />}
            </div>
          </div>
          
          {/* Стек технологий */}
          {user.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
              {user.techStack.map((tech, index) => (
                <button
                  key={index}
                  onClick={() => toggleTechSelection(tech)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                    selectedTech.includes(tech) 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50'
                  }`}
                >
                  {getTechIcon(tech)}
                  <span>{tech}</span>
                  {selectedTech.includes(tech) && (
                    <FaCheck className="text-xs" />
                  )}
                </button>
              ))}
            </div>
          )}
          
          {/* Контакты */}
          <div className="mt-6">
            <ProfileContacts contacts={user.contacts} />
          </div>
          
          {/* Статистика */}
          <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
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
      </div>
      
      {/* Модальное окно редактирования */}
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onProfileUpdate}
        />
      )}
    </div>
  );
};