import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsPostLoading } from "../../../store/slices/loadingSlice.js";
import { users } from "../../../shared/data/users.js";
import { works } from "../../../shared/data/works.js";
import { ModalWindow } from "../../MainContent/components/ModalWindow/ModalWindow";
import { Footer } from "../../Footer/index.js";
import { ProfileHeader } from "./ProfileHeader.jsx";
import { NoUserFound } from "./NoUserFound.jsx";
import { NoWorksFound } from "./NoWorksFound.jsx";
import {ProfileWorksGrid } from "./ProfileWorksGrid.jsx";

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);

  const user = users.find((item) => item.id === Number(id));
  const userWorks = works.filter((work) => work.userId === Number(id));

  useEffect(() => {
    dispatch(setIsPostLoading(true));
    const timer = setTimeout(() => {
      dispatch(setIsPostLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, id]);

  if (!user) return <NoUserFound />;

  return (
    <div>
      <div className="p-6 max-w-7xl mx-auto">
        <ProfileHeader />
        {isPostLoading ? (
          <ProfileWorksGrid
            isLoading={true}
            userWorks={[]}
            user={user}
            onWorkClick={() => {}}
          />
        ) : userWorks.length > 0 ? (
          <ProfileWorksGrid
            isLoading={false}
            userWorks={userWorks}
            user={user}
            onWorkClick={(work) => {
              setSelectedWork(work);
              setOpen(true);
            }}
          />
        ) : (
          <NoWorksFound/>
        )}

        {open && (
          <ModalWindow
            onClose={() => setOpen(false)}
            selectedWork={selectedWork}
            selectedUser={user}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};