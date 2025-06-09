import React, { useState } from 'react';
import { ProfileContacts } from '../Profile/ProfileContacts';
import { Modal } from '../../ui/Modal';
import { UserList } from '../Stats/UserList';

export const ContactStatsSection = ({ 
  contacts, 
  worksCount = 0, 
  followersCount = 0, 
  followingCount = 0,
  profileUserId ,
  getFollowers,
  getFollowing,
}) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

    const handleCloseFollowersModal = () => {
    setShowFollowers(false);
  };

  const handleCloseFollowingModal = () => {
    setShowFollowing(false);
  };

  return (
    <>
      <div className="mt-6">
        <ProfileContacts contacts={contacts} />
      </div>
      <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{worksCount}</span>
          <span className="text-gray-400 text-sm">works</span>
        </div>
        <button 
          onClick={() => setShowFollowers(true)}
          className="flex items-center gap-2 hover:underline cursor-pointer"
        >
          <span className="text-white font-medium">{followersCount}</span>
          <span className="text-gray-400 text-sm">followers</span>
        </button>
        <button 
          onClick={() => setShowFollowing(true)}
          className="flex items-center gap-2 hover:underline cursor-pointer"
        >
          <span className="text-white font-medium">{followingCount}</span>
          <span className="text-gray-400 text-sm">following</span>
        </button>
      </div>

      <Modal isOpen={showFollowers} onClose={() => setShowFollowers(false)}>
        <UserList 
          title="Followers" 
          fetchUsers={() => getFollowers(profileUserId)} 
          onClose={handleCloseFollowersModal}
        />
      </Modal>

      <Modal isOpen={showFollowing} onClose={() => setShowFollowing(false)}>
        <UserList 
          title="Following" 
          fetchUsers={() => getFollowing(profileUserId)} 
          onClose={handleCloseFollowingModal}
        />
      </Modal>
    </>
  );
};
