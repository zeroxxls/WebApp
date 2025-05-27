import React from "react";
import { WorkCard } from "../../../MainContent/index";
import { Loader } from "../../../../shared/ui/Loader";

export const ProfileWorksGrid = ({ isLoading, userWorks, user, onWorkClick }) => {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {userWorks.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            user={user}
            onClick={() => onWorkClick(work)}
          />
        ))}
      </div>
    </>
  );
};
