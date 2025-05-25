import React from 'react';
import { OnCloseBtn } from '../../ui/OnCloseBtn';
import { LeftSide } from './LeftSide';
import { UserInfoBlock } from './UserInfoBlock';
import { LikeSaveButtons } from './LikeSaveButtons';
import { PriceBlock } from './PriceBlock';
import { DescriptionBlock } from './DescriptionBlock';
import { TagsBlock } from './TagsBlock';
import { TechnologiesBlock } from './TechnologiesBlock';
import { CommentsBlock } from './CommentsBlock';

export const ModalContent = ({
  onClose,
  selectedWork,
  selectedUser,
  allWorks,
  isLiked,
  isSaved,
  isAddingToCart,
  handleLike,
  handleSave,
  handleAddToCart,
  handleProfileClick,
}) => {
  const {
    _id: workId,
    technologies = [],
    filters = [],
    title,
    description,
    price,
    comments = [],
  } = selectedWork;

  return (
    <div className="flex z-10 w-full max-w-10xl h-[90vh] bg-[#1c1c25] rounded-lg shadow-xl overflow-hidden">
      <LeftSide selectedWork={selectedWork} allWorks={allWorks} />
      <div className="flex flex-col w-1/4 p-6 border-l border-gray-800 relative overflow-y-auto">
        <OnCloseBtn onClose={onClose} />
        <UserInfoBlock
          selectedUser={selectedUser}
          onProfileClick={(userId) => handleProfileClick(onClose, userId)}
        />
        <LikeSaveButtons
          isLiked={isLiked}
          isSaved={isSaved}
          handleLike={handleLike}
          handleSave={handleSave}
        />
        <PriceBlock
          price={price}
          isAddingToCart={isAddingToCart}
          handleAddToCart={handleAddToCart}
        />
        <DescriptionBlock title={title} description={description} />
        <TechnologiesBlock technologies={technologies} />
        <TagsBlock tags={filters} />
        <CommentsBlock comments={comments} selectedUser={selectedUser} selectedWorkId={workId} />
      </div>
    </div>
  );
};