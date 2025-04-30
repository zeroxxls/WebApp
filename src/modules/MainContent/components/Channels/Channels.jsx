import React from 'react'
import { works } from '../../data/works'; // Импортируем массив works из файла data.js
import { users } from '../../data/users'; // Импортируем массив users из файла data.js
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const Channels = () => {
const [open, setOpen] = React.useState(false);
const [selectedWork, setSelectedWork] = React.useState(null);
const [selectedUser, setSelectedUser] = React.useState(null);

return (
  <div className="p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
      {works.map((work, index) => (
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
