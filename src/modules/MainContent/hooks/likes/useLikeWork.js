import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLikedWorks } from '../../../../store/slices/userSlice';

export const useLikeWork = (selectedWorkId) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?._id);
  const likedWorks = useSelector(state => state.user.likedWorks || []);
  const [isLikingRequest, setIsLikingRequest] = useState(false);
  const isLiked = likedWorks.includes(selectedWorkId);

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

  return { isLiked, updateLike, isLikingRequest };
};
