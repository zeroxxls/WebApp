import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsPostLoading } from "../../../store/slices/loadingSlice";

export const useProfileData = (id, currentUser) => {
  const dispatch = useDispatch();
  const [profileUser, setProfileUser] = useState(null);
  const [userWorks, setUserWorks] = useState([]);
  const isOwnProfile = currentUser && currentUser._id === id;

const fetchUserData = useCallback(async () => {
  try {
    dispatch(setIsPostLoading(true));
    let userData;

    if (isOwnProfile) {
      userData = currentUser;
    } else {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`);
      userData = response.data.user;
    }

    setProfileUser(userData);

    const validWorkIds = await Promise.all(
      (userData.works || []).map(async workId => {
        try {
          await axios.get(`${import.meta.env.VITE_BACKEND_URL}/works/${workId}`);
          return workId;
        } catch {
          return null;
        }
      })
    );

    const existingWorkIds = validWorkIds.filter(Boolean);

    if (existingWorkIds.length > 0) {
      const worksResponses = await Promise.all(
        existingWorkIds.map(workId => 
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/works/${workId}`)
        )
      );
      const fetchedWorks = worksResponses.map(res => res.data.work);
      setUserWorks(fetchedWorks);
    } else {
      setUserWorks([]);
    }

  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    dispatch(setIsPostLoading(false));
  }
}, [dispatch, id, currentUser, isOwnProfile]);
const deleteWork = async (workId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/works/${workId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.data.success) {
      throw new Error('Failed to delete work');
    }
    
    const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    setProfileUser(userResponse.data.user);
    setUserWorks(prevWorks => prevWorks.filter(work => work._id !== workId));
    
    return true;
  } catch (error) {
    console.error('Error deleting work:', error);
    return false;
  }
};
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    profileUser,
    setProfileUser,
    userWorks,
    setUserWorks,
    isOwnProfile,
    reloadProfileData: fetchUserData,
    onDeleteWork: deleteWork
  };
};