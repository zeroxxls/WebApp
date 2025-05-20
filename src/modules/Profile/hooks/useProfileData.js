// hooks/useProfileData.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch,} from "react-redux";
import { setIsPostLoading } from "../../../store/slices/loadingSlice";

export const useProfileData = (id, currentUser) => {
  const dispatch = useDispatch();
  const [profileUser, setProfileUser] = useState(null);
  const isOwnProfile = currentUser && currentUser._id === id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(setIsPostLoading(true));
        if (isOwnProfile) {
          setProfileUser(currentUser);
        } else {
          const response = await axios.get(`http://localhost:4444/users/${id}`);
          setProfileUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        dispatch(setIsPostLoading(false));
      }
    };

    fetchUserData();
  }, [id, currentUser, dispatch, isOwnProfile]);

  return { profileUser, setProfileUser, isOwnProfile };
};
