import React from "react";
import { WorkCard } from "../../../MainContent";
import { Loader } from "../../../../shared/ui/Loader";

export const ProfileWorksGrid = ({
   isLoading,
   userWorks,
   user,
   onWorkClick, 
   isOwnProfile,
   onDeleteWork,
  }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-indigo-500 rounded-full" />
        Latest Works
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {userWorks.map((work) => {
          return (
            <WorkCard
              key={work.id}
              work={work}
              user={user}
              onClick={() => onWorkClick(work)}
              isOwnProfile={isOwnProfile}
              onDelete={()=> onDeleteWork(work._id)}
            />
          );
        })}
      </div>
    </>
  );
};
