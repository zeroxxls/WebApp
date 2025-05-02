import React from 'react'
import { useState ,useEffect} from 'react'
import { ActionBtn } from '../../ui/ActionBtn'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from "react-icons/fa";
import '../../../../shared/styles/hideScrollBar.css'

export const ModalWindow = ({ onClose, selectedWork, selectedUser }) => {
  const likeKey = `post_${selectedWork.id}_liked`
  const saveKey = `post_${selectedWork.id}_saved`;
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem(likeKey)=== 'true'
  )
  const [isSaved, setIsSaved] = useState(
    localStorage.getItem(saveKey) === 'true'
  )
  useEffect(()=>{
    localStorage.setItem(likeKey, isLiked)
    localStorage.setItem(saveKey, isSaved)
  },[isLiked, isSaved])
  const handleLike=()=>{
    setIsLiked(!isLiked)
  }
  const handleSave=()=>{
    setIsSaved(!isSaved)
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Оверлей */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Модальное окно */}
      <div className="flex z-10 w-full max-w-10xl h-[90vh] bg-[#1c1c25] rounded-lg shadow-xl overflow-hidden" >
        {/* Левая часть — прокручиваемая */}
        <div className="p-4 w-3/4 h-full overflow-y-auto scroll-smooth space-y-4 pr-2 hide-scrollbar">
          {selectedWork && (
            <div className="flex flex-col items-center justify-start space-y-4 " >
              {/* Главное изображение */}
              <img 
                src={selectedWork.channelUrl} 
                alt={selectedWork.title} 
                className="w-full rounded object-contain"
              />
              
              {/* Остальные работы */}
              {Array.isArray(selectedWork.worksUrl) ? (
                selectedWork.worksUrl.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    className="w-full rounded object-contain"
                    alt={`Work ${index + 1}`}
                  />
                ))
              ) : (
                <img
                  src={selectedWork.worksUrl}
                  className="w-full rounded object-contain"
                  alt={selectedWork.title}
                />
              )}
            </div>
          )}
        </div>

        {/* Правая часть — инфо */}
        <div className='flex flex-col w-1/4 p-6 border-l border-gray-800 relative overflow-y-auto'>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
            ✕
          </button>

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

          <div className='m-2 mb-8'>
            <div className="flex space-x-4">
              <ActionBtn
               variant="like"
               isActive={isLiked}
               onClick={handleLike}
               >{isLiked ? <AiFillLike className="w-6 h-6"/> : <AiOutlineLike className="w-6 h-6" />} <span>{isLiked ? 'Liked' : 'Like' }</span>
               </ActionBtn>

              <ActionBtn 
              variant="save"
              isActive={isSaved}
              onClick={handleSave}
              >{isSaved? <FaBookmark className="w-6 h-6"/> : <FiBookmark className="w-6 h-6"/>}<span>{isSaved? 'Saved' : 'Save'}</span>
              </ActionBtn>
            </div>
          </div>

          {selectedWork && (
            <div>
              <div>
                <h2 className="text-xl font-bold text-white mb-4">{selectedWork.title}</h2>
              </div>
              <div>
                <p className="text-gray-400">{selectedWork.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
