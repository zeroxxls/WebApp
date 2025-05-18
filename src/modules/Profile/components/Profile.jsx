import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsPostLoading } from "../../../store/slices/loadingSlice.js";
import { ModalWindow } from "../../MainContent/components/ModalWindow/ModalWindow";
import { Footer } from "../../Footer/index.js";
import { ProfileHeader } from "./ProfileHeader.jsx";
import { NoUserFound } from "./NoUserFound.jsx";
import { NoWorksFound } from "./NoWorksFound.jsx";
import { ProfileWorksGrid } from "./ProfileWorksGrid.jsx";
import { ProfileContacts } from './ProfileContacts';
import axios from "axios";
import { setUser } from "../../../store/slices/authSlice.js"; // Импортируем action для обновления пользователя

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [userWorks, setUserWorks] = useState([]);
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const isOwnProfile = currentUser && currentUser._id === id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(setIsPostLoading(true));
        
        if (isOwnProfile) {
          setProfileUser(currentUser);
        } else {
          const userResponse = await axios.get(`http://localhost:4444/auth/user/${id}`);
          setProfileUser(userResponse.data.user);
        }
        
        dispatch(setIsPostLoading(false));
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(setIsPostLoading(false));
      }
    };

    fetchUserData();
  }, [dispatch, id, currentUser, isOwnProfile]);

 const handleAvatarUpload = async (file) => {
  if (!file || !isOwnProfile) return;
  
  try {
    setIsAvatarLoading(true);
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    // Добавляем токен в заголовки
    const token = localStorage.getItem('token');
    
    const response = await axios.patch(
      `http://localhost:4444/auth/upload-avatar/${currentUser._id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    ); 
    
    // Обновляем только пользователя, сохраняя текущий токен
    dispatch(setUser({
      user: response.data.user,
      token: token // Сохраняем текущий токен
    }));
    
    setProfileUser(response.data.user);
    
    setIsAvatarLoading(false);
  } catch (error) {
    console.error("Error uploading avatar:", error);
    setIsAvatarLoading(false);
  }
};

  if (isPostLoading) {
    return (
      <div>
        <div className="p-6 max-w-7xl mx-auto">
          <ProfileHeader user={profileUser}
          isLoading={isPostLoading}
          isOwnProfile={isOwnProfile}
          onAvatarUpload={handleAvatarUpload}
          isAvatarLoading={isAvatarLoading} />
          <ProfileWorksGrid
            isLoading={true}
            userWorks={[]}
            user={null}
            onWorkClick={() => {}}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileUser) return <NoUserFound />;

    const handleProfileUpdate = (updatedUser) => {
    setProfileUser(updatedUser);
    if (isOwnProfile) {
      dispatch(setUser({
        user: updatedUser,
        token: localStorage.getItem('token')
      }));
    }
  }; 

  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto">
        <ProfileHeader 
          user={profileUser} 
          isOwnProfile={isOwnProfile}
          onAvatarUpload={handleAvatarUpload}
          isAvatarLoading={isAvatarLoading}
          onProfileUpdate={handleProfileUpdate}
        />
        {userWorks.length > 0 ? (
          <ProfileWorksGrid
            isLoading={false}
            userWorks={userWorks}
            user={profileUser}
            isOwnProfile={isOwnProfile}
            onWorkClick={(work) => {
              setSelectedWork(work);
              setOpen(true);
            }}
          />
        ) : (
          <NoWorksFound isOwnProfile={isOwnProfile} />
        )}

        {open && (
          <ModalWindow
            onClose={() => setOpen(false)}
            selectedWork={selectedWork}
            selectedUser={profileUser}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};