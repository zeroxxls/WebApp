import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OnCloseBtn } from '../../ui/OnCloseBtn';
import { LeftSide } from './LeftSide';
import { UserInfoBlock } from './UserInfoBlock';
import { LikeSaveButtons } from './LikeSaveButtons';
import { PriceBlock } from './PriceBlock';
import { DescriptionBlock } from './DescriptionBlock';
import { TagsBlock } from './TagsBlock';
import { CommentsBlock } from './CommentsBlock';

export const ModalWindow = ({ onClose, selectedWork = {}, selectedUser }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { id = 'unknown' } = selectedWork;

  const { likeKey, saveKey, addingKey } = useMemo(() => ({
    likeKey: `post_${id}_liked`,
    saveKey: `post_${id}_saved`,
    addingKey: `post_${id}_adding`
  }), [id]);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsAddingToCart(localStorage.getItem(addingKey) === 'true');
    setIsLiked(localStorage.getItem(likeKey) === 'true');
    setIsSaved(localStorage.getItem(saveKey) === 'true');
  }, [addingKey, likeKey, saveKey]);

  useEffect(() => {
    localStorage.setItem(likeKey, isLiked);
    localStorage.setItem(saveKey, isSaved);
  }, [isLiked, isSaved, likeKey, saveKey]);

  const handleProfileClick = (userId) => {
    onClose();
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="flex z-10 w-full max-w-10xl h-[90vh] bg-[#1c1c25] rounded-lg shadow-xl overflow-hidden">
        <LeftSide selectedWork={selectedWork} />
        <div className="flex flex-col w-1/4 p-6 border-l border-gray-800 relative overflow-y-auto">
          <OnCloseBtn onClose={onClose} />
          <UserInfoBlock
            selectedUser={selectedUser}
            user={user}
            onProfileClick={handleProfileClick}
          />
          <LikeSaveButtons
            isLiked={isLiked}
            isSaved={isSaved}
            handleLike={() => setIsLiked(!isLiked)}
            handleSave={() => setIsSaved(!isSaved)}
          />
          <PriceBlock
            price={selectedWork.price}
            isAddingToCart={isAddingToCart}
            handleAddToCart={() => {
              const newState = !isAddingToCart;
              setIsAddingToCart(newState);
              localStorage.setItem(addingKey, newState);
            }}
          />
          <DescriptionBlock
            title={selectedWork.title}
            description={selectedWork.description}
          />
          <TagsBlock tags={selectedWork.tags || []} />
          <CommentsBlock
            comments={selectedWork.comments || []}
            selectedUser={selectedUser}
          />
        </div>
      </div>
    </div>
  );
};