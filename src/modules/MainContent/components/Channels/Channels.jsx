import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FILTER_TYPES } from "../../../filter/constant/filters.js";
import { useFilters } from "../../../filter/hooks/useFilters.js";
import { works } from "../../data/works"; // Импортируем массив works из файла data.js
import { users } from "../../data/users"; // Импортируем массив users из файла data.js
import { ModalWindow } from "../ModalWindow/ModalWindow";

export const Channels = () => {
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { activeFilter } = useFilters(); // Получаем активный фильтр из контекста
  const search = useSelector((state) => state.search.searchQuery.toLowerCase()); // Получаем поисковый запрос из Redux
  console.log(search)

  // Фильтрация работ по поисковому запросу и фильтрам
  const filteredWorks = works.filter((work) => {
    const matchesTitle = work.title.toLowerCase().includes(search); // Поиск по названию
    const matchesTag = work.tags?.some(tag => tag.toLowerCase().includes(search)); // Поиск по тегам
  
    // Применение активных фильтров
    const matchesTrending = activeFilter.includes(FILTER_TYPES.TRENDING) ? work.isTrending : true;
    const matchesFollowing = activeFilter.includes(FILTER_TYPES.FOLLOWING) ? work.isFollowing : true;
    const matchesNoAI = activeFilter.includes(FILTER_TYPES.NO_AI) ? !work.isAI : true;
  
    const tagFilters = [
      FILTER_TYPES.STYLIZED,
      FILTER_TYPES.ARCHVIZ,
      FILTER_TYPES.MECHA,
      FILTER_TYPES.CHARACTER_DESIGN,
      FILTER_TYPES.CHARACTER_MODELING,
      FILTER_TYPES.ILLUSTRATION,
      FILTER_TYPES.LIGHTING,
      FILTER_TYPES.CONCEPT_ART,
      FILTER_TYPES.ANIMATION,
      FILTER_TYPES.VFX,
      FILTER_TYPES.MODELING,
      FILTER_TYPES.TEXTURING,
      FILTER_TYPES.PAINTING,
      FILTER_TYPES.RIGGING,
      FILTER_TYPES.ANIMATION_TESTING
    ];
  
    // Фильтрация по тегам
    const matchesTags = tagFilters.some(tag => activeFilter.includes(tag))
      ? work.tags?.some(tag => activeFilter.includes(tag))
      : true;
  
    // Применение активных фильтров и поиск
    const matchesActiveFilters = matchesTrending && matchesFollowing && matchesNoAI && matchesTags;
    const matchesSearch = matchesTitle || matchesTag; // Поиск по названию или тегам
  
    return matchesActiveFilters && matchesSearch;
  });
  
  console.log('Filtered works:', filteredWorks);

  return (
    <div className="p-4">
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
              <h3 className="text-white text-lg font-semibold transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {work.title}
              </h3>
              <div className="flex items-center space-x-2 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <img 
                  src={users[index % users.length].avatarUrl} 
                  alt={users[index % users.length].name} 
                  className="w-6 h-6 rounded-full object-cover" 
                />
                <span className="text-white text-sm">{users[index % users.length].name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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

