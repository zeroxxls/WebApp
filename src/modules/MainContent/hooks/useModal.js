import { useState } from 'react';
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
  const [isLikedLocal, setIsLikedLocal] = useState(likedWorks.includes(selectedWorkId));
  const [isSavedLocal, setIsSavedLocal] = useState(savedWorks.includes(selectedWorkId));

  const updateLike = async () => {
    if (!userId || !selectedWorkId || isLikingRequest) return;

    setIsLikingRequest(true);
    const action = isLikedLocal ? 'unlike' : 'like';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/users/${userId}/${action}/${selectedWorkId}`, // Обновленный базовый URL
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setLikedWorks(response.data.likedWorks));
      setIsLikedLocal(!isLikedLocal);
    } catch (error) {
      console.error('Error updating like:', error);
      setIsLikedLocal(prevState => !prevState);
    } finally {
      setIsLikingRequest(false);
    }
  };

  const updateSave = async () => {
    if (!userId || !selectedWorkId || isSavingRequest) return;

    setIsSavingRequest(true);
    const action = isSavedLocal ? 'unsave' : 'save';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/users/${userId}/${action}/${selectedWorkId}`, // Обновленный базовый URL
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setSavedWorks(response.data.savedWorks));
      setIsSavedLocal(!isSavedLocal);
    } catch (error) {
      console.error('Error updating save:', error);
      setIsSavedLocal(prevState => !prevState);
    } finally {
      setIsSavingRequest(false);
    }
  };

  return {
    isLiked: isLikedLocal,
    isSaved: isSavedLocal,
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