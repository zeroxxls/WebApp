import React from 'react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { ActionBtn } from '../../ui/ActionBtn';

export const LikeSaveButtons = ({ isLiked, isSaved, handleLike, handleSave }) => (
  <div className='m-2 mb-8'>
    <div className="flex space-x-4">
      <ActionBtn variant="like" isActive={isLiked} onClick={handleLike}>
        {isLiked ? <AiFillLike className="w-6 h-6" /> : <AiOutlineLike className="w-6 h-6" />}
        <span>{isLiked ? 'Liked' : 'Like'}</span>
      </ActionBtn>

      <ActionBtn variant="save" isActive={isSaved} onClick={handleSave}>
        {isSaved ? <FaBookmark className="w-6 h-6" /> : <FiBookmark className="w-6 h-6" />}
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </ActionBtn>
    </div>
  </div>
)
