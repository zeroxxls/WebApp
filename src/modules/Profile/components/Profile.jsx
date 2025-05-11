import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { setIsPostLoading } from "../../../store/slices/loadingSlice.js";
import { users } from "../../MainContent/data/users.js";
import { works } from "../../MainContent/data/works.js"; 
import { ModalWindow } from "../../MainContent/components/ModalWindow/ModalWindow"; 
import { Loader } from "../../../shared/ui/Loader";
import { WorkCard } from "../../MainContent/components/Channels/WorkCard"; 
import { Footer } from "../../Footer/index.js";

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
  <div>
   <div className="p-6 max-w-7xl mx-auto">
        {/* User Profile Header */}
    <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700/50">
      <div className="relative group">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg transition-all duration-300 group-hover:border-indigo-500/60"
        />
        <div className="absolute inset-0 rounded-full bg-indigo-600/10 group-hover:bg-transparent transition-all duration-300" />
      </div>
      
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
        <p className="text-gray-400 mb-3">{user.bio || "Digital artist & creator"}</p>
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{userWorks.length}</span>
            <span className="text-gray-400 text-sm">works</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">1.2k</span>
            <span className="text-gray-400 text-sm">followers</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">256</span>
            <span className="text-gray-400 text-sm">following</span>
          </div>
        </div>
      </div>
      
      <button className="ml-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
        Follow
      </button>
    </div>

    {/* Works Grid */}
    {isPostLoading ? (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    ) : (
      <>
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-indigo-500 rounded-full" />
          Latest Works
        </h3>
        
        {userWorks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
      </>
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
    <Footer/>
  </div>
);
};

