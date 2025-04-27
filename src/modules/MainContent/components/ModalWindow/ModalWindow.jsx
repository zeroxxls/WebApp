import React from 'react'

export const ModalWindow = ({ onClose, selectedWork, selectedUser }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Оверлей */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Модальное окно - увеличенный размер */}
      <div className="flex z-10 w-full max-w-10xl h-[90vh] bg-[#1c1c25] rounded-lg shadow-xl overflow-hidden">
        {/* Левая часть - большое изображение проекта */}
        <div className="p-6 w-3/4 h-full">
          {selectedWork && (
            <div className="h-full flex ">
              <img 
                src={selectedWork.imageUrl} 
                alt={selectedWork.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>
        
        {/* Правая часть - информация (оставлена как у вас) */}
        <div className='flex flex-col w-1/4 p-6 border-l border-gray-800'>
          {selectedUser && (
            <div className="mb-8">
              <img 
                src={selectedUser.avatarUrl} 
                alt={selectedUser.name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <h2 className="text-lg font-bold text-white">{selectedUser.name}</h2>
            </div>
          )}
          {selectedWork && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">{selectedWork.title}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}