import React from 'react';
import { Link } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import { MdFileUpload } from "react-icons/md";
import { handleProfileClick } from '../../../../shared/utils/navigation';

export const UserDropdown = ({ user, isDropdownOpen, onMouseEnter, onMouseLeave, onLogout, navigate }) => {
  return (
    <div
      className="flex items-center gap-4 relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={`http://localhost:4444/avatars/${user._id}/avatar?${Date.now()}}`}
          alt={user.fullName || user.name || 'User'}
          className="w-8 h-8 rounded-full object-cover"
          onClick={() => handleProfileClick(navigate, user._id || user.id)}
        />
        <span className="text-white">{user.fullName || user.name || 'User'}</span>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
          <div className="py-1">
            <Link
              to={`/profile/${user._id || user.id}`}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Profile
            </Link>
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <VscSignOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};