import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalContent } from './ModalContent';
import { useModal } from '../../hooks/useModal';
import { fetchWorkById } from '../../../../api/worksApi';

export const ModalWindow = ({ onClose, selectedWork = {}, selectedUser }) => {
  const { _id: workId } = selectedWork;
  const [detailedWork, setDetailedWork] = useState(selectedWork);
  const {
    isAddingToCart,
    isLiked,
    isSaved,
    handleAddToCart,
    handleLike,
    handleSave,
    handleProfileClick,
    isLikingRequest,
    isSavingRequest,
  } = useModal(workId);
  const allWorks = useSelector((state) => state.works.userWorks);
  const userId = useSelector((state) => state.auth.user?._id); // Получаем userId из Redux

  useEffect(() => {
    let active = true;
    setDetailedWork(selectedWork);
    fetchWorkById(workId)
      .then((work) => {
        if (active && work) setDetailedWork(work);
      })
      .catch((error) => console.error('Failed to load work files:', error));
    return () => { active = false; };
  }, [workId, selectedWork]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <ModalContent
        onClose={onClose}
        selectedWork={detailedWork}
        selectedUser={selectedUser}
        allWorks={allWorks}
        isLiked={isLiked}
        isSaved={isSaved}
        isAddingToCart={isAddingToCart}
        handleLike={handleLike}
        handleSave={handleSave}
        handleAddToCart={handleAddToCart}
        handleProfileClick={handleProfileClick}
        isLikingRequest={isLikingRequest}
        isSavingRequest={isSavingRequest}
        userId={userId} 
      />
    </div>
  );
};
