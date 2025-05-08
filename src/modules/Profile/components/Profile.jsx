import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { setIsPostLoading } from "../../../store/slices/loadingSlice.js";
import { users } from "../../MainContent/data/users.js";
import { works } from "../../MainContent/data/works.js"; 
import { ModalWindow } from "../../MainContent/components/ModalWindow/ModalWindow"; 
import { Loader } from "../../../shared/ui/Loader";
import { WorkCard } from "../../MainContent/components/Channels/WorkCard"; 

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);

  const user = users.find(item => item.id === Number(id));
  const userWorks = works.filter(work => work.userId === Number(id));

  useEffect(() => {
    dispatch(setIsPostLoading(true));
    
    const timer = setTimeout(() => {
      dispatch(setIsPostLoading(false));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dispatch, id]);

  if (!user) {
    return <div className="text-white text-center mt-10">User not found</div>;
  }

  return (
    <div className="p-4">
      {/* User Profile Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400">{userWorks.length} works</p>
        </div>
      </div>

      {/* Works Grid */}
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
          {userWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              user={user}
              onClick={() => {
                setSelectedWork(work);
                setOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Window */}
      {open && (
        <ModalWindow
          onClose={() => setOpen(false)}
          selectedWork={selectedWork}
          selectedUser={user}
        />
      )}
    </div>
  );
};

