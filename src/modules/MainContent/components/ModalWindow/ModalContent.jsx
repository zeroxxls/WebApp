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
import { AVAILABLE_TECHNOLOGIES } from '../../../../shared/constants/uploadFilters';

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
  userId,
}) => {
  const {
    _id: workId,
    technologies: workTechnologies = [],
    filters = [],
    title,
    description,
    price,
    comments = [],
  } = selectedWork;

  const technologiesWithIcons = workTechnologies.map(techName => {
    const techInfo = AVAILABLE_TECHNOLOGIES.find(t => t.label.toLowerCase() === techName.toLowerCase());
    return {
      name: techName,
      icon: techInfo ? techInfo.icon : null,
    };
  });

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
          disabled={isAddingToCart}
          isOwnWork={selectedWork?.author?._id === userId}
        />
        <DescriptionBlock title={title} description={description} />
        <TechnologiesBlock technologies={technologiesWithIcons} />
        <TagsBlock tags={filters} />
        <CommentsBlock comments={comments} selectedUser={selectedUser} selectedWorkId={workId} />
      </div>
    </div>
  );
};