import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsPostLoading } from "../../../store/slices/loadingSlice.js";
import { ModalWindow } from "../../MainContent/components/ModalWindow/ModalWindow";
import { Footer } from "../../Footer/index.js";
import { ProfileHeader } from "./ProfileHeader.jsx";
import { NoUserFound } from "./NoUserFound.jsx";
import { NoWorksFound } from "./NoWorksFound.jsx";
import {ProfileWorksGrid } from "./ProfileWorksGrid.jsx";
import axios from "axios";

export const Profile = () => {
   const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user); // Получаем текущего пользователя из Redux
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [profileUser, setProfileUser] = useState(null); // Переименовываем user в profileUser для ясности
  const [userWorks, setUserWorks] = useState([]);
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);

  // Проверяем, просматривает ли пользователь свой собственный профиль
  const isOwnProfile = currentUser && currentUser._id === id;

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      dispatch(setIsPostLoading(true));
      
      // Если это профиль текущего пользователя, используем данные из Redux
      if (isOwnProfile) {
        setProfileUser(currentUser);
      } else {
        // Иначе загружаем данные пользователя с сервера
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

if (isPostLoading) {
  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto">
        <ProfileHeader isLoading={true} />
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

return (
  <div>
    <div className="p-6 max-w-7xl mx-auto">
      <ProfileHeader user={profileUser} isOwnProfile={isOwnProfile} />
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