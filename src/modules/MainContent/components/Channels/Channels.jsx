import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FILTER_TYPES } from "../../../filter/constant/filters.js";
import { useFilters } from "../../../filter/hooks/useFilters.js";
import { works } from "../../data/works";
import { users } from "../../data/users";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Loader } from "../../../../shared/ui/Loader.jsx";

export const Channels = () => {
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const { activeFilter } = useFilters();
  const search = useSelector((state) => state.search.searchQuery.toLowerCase());


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPostsLoading(false);
    },1000);

    return () => clearTimeout(timer);
  }, []);

  // Фильтрация
  const filteredWorks = works.filter((work) => {
    const matchesTitle = work.title.toLowerCase().includes(search);
    const matchesTag = work.tags?.some(tag => tag.toLowerCase().includes(search));

    const matchesTrending = activeFilter.includes(FILTER_TYPES.TRENDING) ? work.isTrending : true;
    const matchesFollowing = activeFilter.includes(FILTER_TYPES.FOLLOWING) ? work.isFollowing : true;
    const matchesNoAI = activeFilter.includes(FILTER_TYPES.NO_AI) ? !work.isAI : true;

    const tagFilters = [
      FILTER_TYPES.STYLIZED, FILTER_TYPES.ARCHVIZ, FILTER_TYPES.MECHA,
      FILTER_TYPES.CHARACTER_DESIGN, FILTER_TYPES.CHARACTER_MODELING,
      FILTER_TYPES.ILLUSTRATION, FILTER_TYPES.LIGHTING, FILTER_TYPES.CONCEPT_ART,
      FILTER_TYPES.ANIMATION, FILTER_TYPES.VFX, FILTER_TYPES.MODELING,
      FILTER_TYPES.TEXTURING, FILTER_TYPES.PAINTING, FILTER_TYPES.RIGGING,
      FILTER_TYPES.ANIMATION_TESTING
    ];

    const matchesTags = tagFilters.some(tag => activeFilter.includes(tag))
      ? work.tags?.some(tag => activeFilter.includes(tag))
      : true;

    const matchesActiveFilters = matchesTrending && matchesFollowing && matchesNoAI && matchesTags;
    const matchesSearch = matchesTitle || matchesTag;

    return matchesActiveFilters && matchesSearch;
  });

  return (
    <div className="p-4">
      {isPostsLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
          {filteredWorks.map((work, index) => (
            <div
              key={work.id}
              onClick={() => {
                setSelectedWork(work);
                setSelectedUser(users[index % users.length]);
                setOpen(true);
              }}
              className="relative group overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow bg-gray-100"
            >
              <img
                src={work.channelUrl}
                alt={work.title}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition duration-300 z-10"></div>
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 space-y-1 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white text-lg font-semibold transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {work.title}
                </h3>
                <div className="flex items-center space-x-2 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <img
                    src={users[index % users.length].avatarUrl}
                    alt={users[index % users.length].name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-white text-sm">
                    {users[index % users.length].name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <ModalWindow
          onClose={() => setOpen(false)}
          selectedWork={selectedWork}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
