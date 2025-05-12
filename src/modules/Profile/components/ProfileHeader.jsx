import React from 'react'
import { useParams } from 'react-router-dom';
import { FollowBtn } from '../ui/FollowBtn';
import {users} from '../../../shared/data/users'
import { works } from '../../../shared/data/works';

export const ProfileHeader = () => {
    const { id } = useParams();
    const user = users.find(item => item.id === Number(id));
    const userWorks = works.filter(work => work.userId === Number(id));
  return (
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700/50">
          <div className="relative group">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg transition-all duration-300 group-hover:border-indigo-500/60"
            />
            <div className="absolute inset-0 rounded-full bg-indigo-600/10 group-hover:bg-transparent transition-all duration-300" />
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-gray-400 mb-3">{user.bio || ""}</p>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{userWorks.length}</span>
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
          <FollowBtn/>
        </div>
  )
}
