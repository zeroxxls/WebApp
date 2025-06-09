import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSavedWorks } from '../../../../store/slices/userSlice';

export const useSaveWork = (selectedWorkId) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?._id);
  const savedWorks = useSelector(state => state.user.savedWorks || []);
  const [isSavingRequest, setIsSavingRequest] = useState(false);
  const isSaved = savedWorks.includes(selectedWorkId);

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

  return { isSaved, updateSave, isSavingRequest };
};
