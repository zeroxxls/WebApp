import React from 'react'
import { handleProfileClick } from '../../../../shared/utils/navigation'
import { useNavigate } from 'react-router-dom'

export const UserInfoBlock = ({ selectedUser, user }) => {
  const navigate = useNavigate()
  if (!selectedUser) return null;

  return (
    <div className="mb-8 flex items-center">
      <img
        src={selectedUser.avatarUrl}
        alt={selectedUser.name}
        className="w-16 h-16 rounded-full object-cover mb-4 cursor-pointer"
        onClick={() => handleProfileClick(navigate, selectedUser._id)}
      />
      <h2
        className="ml-4 text-lg font-bold hover:text-blue-100 text-white cursor-pointer"
        onClick={() => handleProfileClick(navigate, selectedUser._id)}
      >
        {selectedUser.name}
      </h2>
    </div>
  )
}

