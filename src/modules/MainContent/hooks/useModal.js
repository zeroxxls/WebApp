import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLikeWork } from './likes/useLikeWork';
import { useSaveWork } from './saved/useSaveWork';
import { useAddToCartWork } from './cart/useAddToCartWork';

export const useModal = (selectedWorkId) => {
  const navigate = useNavigate();
  const selectedWork = useSelector(state =>
    state.works.userWorks.find(work => work._id === selectedWorkId)
  );

  const {
    isLiked,
    updateLike: handleLike,
    isLikingRequest
  } = useLikeWork(selectedWorkId);

  const {
    isSaved,
    updateSave: handleSave,
    isSavingRequest
  } = useSaveWork(selectedWorkId);

  const {
    handleAddToCart,
    isAddingToCart,
    isInCart
  } = useAddToCartWork(selectedWork);

  const handleProfileClick = (onClose, userId) => {
    onClose();
    navigate(`/profile/${userId}`);
  };

  return {
    isLiked,
    isSaved,
    isAddingToCart: isAddingToCart || isInCart,
    handleLike,
    handleSave,
    handleAddToCart,
    handleProfileClick,
    isLikingRequest,
    isSavingRequest
  };
};
