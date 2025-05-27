import React from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { ActionBtn } from '../../ui/ActionBtn';

export const LikeSaveButtons = ({
  isLiked,
  isSaved,
  handleLike,
  handleSave,
  isLikingRequest,
  isSavingRequest,
}) => (
  <div className="flex space-x-4 mb-8">
    <ActionBtn
      variant="like"
      isActive={isLiked}
      onClick={handleLike}
      disabled={isLikingRequest}
    >
      {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
      <span>{isLiked ? 'Liked' : 'Like'}</span>
    </ActionBtn>

    <ActionBtn
      variant="save"
      isActive={isSaved}
      onClick={handleSave}
      disabled={isSavingRequest}
    >
      {isSaved ? <FaBookmark size={18} /> : <FiBookmark size={18} />}
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </ActionBtn>
  </div>
);
