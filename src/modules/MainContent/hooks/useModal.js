import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLikedWorks, setSavedWorks } from '../../../store/slices/userSlice';

export const useModal = (selectedWorkId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const likedWorks = useSelector((state) => state.user.likedWorks || []);
  const savedWorks = useSelector((state) => state.user.savedWorks || []);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLikingRequest, setIsLikingRequest] = useState(false);
  const [isSavingRequest, setIsSavingRequest] = useState(false);

  // Получаем текущее состояние из Redux store
  const isLiked = likedWorks.includes(selectedWorkId);
  const isSaved = savedWorks.includes(selectedWorkId);

  const updateLike = async () => {
    if (!userId || !selectedWorkId || isLikingRequest) return;

    setIsLikingRequest(true);
    const action = isLiked ? 'unlike' : 'like';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/users/${userId}/${action}/${selectedWorkId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setLikedWorks(response.data.likedWorks));
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsLikingRequest(false);
    }
  };

  const updateSave = async () => {
    if (!userId || !selectedWorkId || isSavingRequest) return;

    setIsSavingRequest(true);
    const action = isSaved ? 'unsave' : 'save';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/users/${userId}/${action}/${selectedWorkId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setSavedWorks(response.data.savedWorks));
    } catch (error) {
      console.error('Error updating save:', error);
    } finally {
      setIsSavingRequest(false);
    }
  };

  return {
    isLiked,
    isSaved,
    isAddingToCart,
    handleLike: updateLike,
    handleSave: updateSave,
    handleAddToCart: () => setIsAddingToCart(!isAddingToCart),
    handleProfileClick: (onClose, userId) => {
      onClose();
      navigate(`/profile/${userId}`);
    },
    isLikingRequest,
    isSavingRequest
  };
};