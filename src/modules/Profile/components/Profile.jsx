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
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl text-white font-medium mb-2">No works yet</h4>
            <p className="text-gray-400 max-w-md">This user hasn't uploaded any works. Check back later or follow to see their new creations.</p>
          </div>
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