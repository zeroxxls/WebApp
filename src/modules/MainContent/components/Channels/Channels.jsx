import React from 'react'
import { FILTER_TYPES } from '../../../filter/constant/filters.js'
import { useState } from 'react'
import { useFilters } from '../../../filter/context/FilterContext.jsx';
import { works } from '../../data/works'; // Импортируем массив works из файла data.js
import { users } from '../../data/users'; // Импортируем массив users из файла data.js
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const Channels = () => {
const [open, setOpen] = useState(false);
const [selectedWork, setSelectedWork] = useState(null);
const [selectedUser, setSelectedUser] = useState(null);
const { activeFilter } = useFilters(); // Получаем активный фильтр из контекста

const filteredWorks = works.filter(work => {
  if (!activeFilter || activeFilter === FILTER_TYPES.ALL) return true
  
  switch(activeFilter) {
    case FILTER_TYPES.TRENDING:
      return work.isTrending
    case FILTER_TYPES.FOLLOWING:
      return work.isFollowing
    case FILTER_TYPES.NO_AI:
      return !work.isAI
    case FILTER_TYPES.STYLIZED:
    case FILTER_TYPES.ARCHVIZ:
    case FILTER_TYPES.MECHA:
    case FILTER_TYPES.CHARACTER_DESIGN:
    case FILTER_TYPES.CHARACTER_MODELING:
    case FILTER_TYPES.ILLUSTRATION:
    case FILTER_TYPES.LIGHTING:
    case FILTER_TYPES.CONCEPT_ART:
    case FILTER_TYPES.ANIMATION:
    case FILTER_TYPES.VFX:
    case FILTER_TYPES.MODELING:
    case FILTER_TYPES.TEXTURING:
    case FILTER_TYPES.PAINTING:
    case FILTER_TYPES.RIGGING:
    case FILTER_TYPES.ANIMATION_TESTING:  
      return work.tags?.includes(activeFilter)
    default:
      return true
  }
})

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
)
}
