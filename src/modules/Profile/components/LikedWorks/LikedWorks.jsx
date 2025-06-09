import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalWindow } from '../../../MainContent';
import { WorkCardSkeleton } from '../../ui/skeletons/WorkCardSkeleton';
import { useLikedWorks } from '../../hooks/likes/useLikedWorks';
import { LikedWorksHeader } from './LikedWorksHeader';
import { LikedWorksGrid } from './LikedWorksGrid';
import { NoLikedWorks } from '../Errors/NoLikedWorks';

export const LikedWorks = () => {
  const userId = useSelector((state) => state.auth.user?._id);
  const { likedWorks, loading } = useLikedWorks(userId);

  const [openModal, setOpenModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const openWorkModal = (work, user) => {
    setSelectedWork(work);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const closeWorkModal = () => {
    setOpenModal(false);
    setSelectedWork(null);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="px-5 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <WorkCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <LikedWorksHeader />
      {likedWorks.length > 0 ? (
        <LikedWorksGrid works={likedWorks} onOpenModal={openWorkModal} />
      ) : (
        <NoLikedWorks />
      )}
      {openModal && selectedWork && (
        <ModalWindow
          onClose={closeWorkModal}
          selectedWork={selectedWork}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};