import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLikedWorks, setSavedWorks } from '../store/userSlice';

export const useLikeSaveWork = (workId) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const likedWorks = useSelector((state) => state.user.likedWorks || []);
  const savedWorks = useSelector((state) => state.user.savedWorks || []);
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isLiked = likedWorks.includes(workId);
  const isSaved = savedWorks.includes(workId);

  const updateLike = async () => {
    if (!userId || !workId) return;
    setIsLiking(true);
    try {
      const token = localStorage.getItem('token');
      const action = isLiked ? 'unlike' : 'like';
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/${action}/${workId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setLikedWorks(response.data.likedWorks));
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const updateSave = async () => {
    if (!userId || !workId) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const action = isSaved ? 'unsave' : 'save';
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/${action}/${workId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setSavedWorks(response.data.savedWorks));
    } catch (error) {
      console.error('Error updating save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isLiked,
    isSaved,
    handleLike: updateLike,
    handleSave: updateSave,
    isLiking,
    isSaving,
  };
};