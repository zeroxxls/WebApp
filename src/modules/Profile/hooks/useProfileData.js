import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export const useProfileData = (id, currentUser) => {
  const [profileUser, setProfileUser] = useState(null);
  const [userWorks, setUserWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isOwnProfile = currentUser && currentUser._id === id;

  const fetchUserData = useCallback(async (signal) => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setProfileUser(null);
    setUserWorks([]);

    try {
      const profileRequest = isOwnProfile
        ? Promise.resolve({ data: { user: currentUser } })
        : axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, { signal });
      const worksRequest = axios.get(`${import.meta.env.VITE_BACKEND_URL}/works/user/${id}`, { signal });
      const [profileResponse, worksResponse] = await Promise.all([profileRequest, worksRequest]);

      setProfileUser(profileResponse.data.user);
      setUserWorks(worksResponse.data.works || []);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching profile:", error);
      }
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, [id, currentUser, isOwnProfile]);

  const deleteWork = async (workId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/works/${workId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.data.success) throw new Error('Failed to delete work');

      setUserWorks(prevWorks => prevWorks.filter(work => work._id !== workId));
      setProfileUser(prevUser => prevUser && ({
        ...prevUser,
        works: (prevUser.works || []).filter(id => id !== workId),
      }));
      return true;
    } catch (error) {
      console.error('Error deleting work:', error);
      return false;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUserData(controller.signal);
    return () => controller.abort();
  }, [fetchUserData]);

  return {
    profileUser,
    setProfileUser,
    userWorks,
    isLoading,
    setUserWorks,
    isOwnProfile,
    reloadProfileData: fetchUserData,
    onDeleteWork: deleteWork
  };
};
