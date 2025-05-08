import React from 'react'
import { useState ,useEffect} from 'react'
import { ActionBtn } from '../../ui/ActionBtn'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { IoMdAddCircle } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleProfileClick } from "../../../../shared/utils/navigation";
import { useSelector } from 'react-redux';
import '../../../../shared/styles/hideScrollBar.css'

export const ModalWindow = ({ onClose, selectedWork, selectedUser }) => {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.user)
  const likeKey = `post_${selectedWork.id}_liked`
  const saveKey = `post_${selectedWork.id}_saved`;
  const addingKey = `post_${selectedWork.id}_adding`;

  const [isAddingToCart, setIsAddingToCart] = useState(
    localStorage.getItem(addingKey) === 'true'
  )
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem(likeKey)=== 'true'
  )
  const [isSaved, setIsSaved] = useState(
    localStorage.getItem(saveKey) === 'true'
  )
  useEffect(()=>{
    localStorage.setItem(likeKey, isLiked)
    localStorage.setItem(saveKey, isSaved)
  },[isLiked, isSaved,likeKey, saveKey])

  const handleAddToCart = () => {
    setIsAddingToCart(!isAddingToCart)
  }

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
            <div className="mb-8 flex items-center ">
              <img 
                src={selectedUser.avatarUrl} 
                alt={selectedUser.name}
                className="w-16 h-16 rounded-full object-cover mb-4 cursor-pointer"
                onClick={() => {
                  handleProfileClick(navigate, user.id);
                }}
              />
              <h2 className="ml-4 text-lg font-bold hover:text-blue-100
               text-white cursor-pointer"
                  onClick={() => {
                    handleProfileClick(navigate, user.id);
                  }}
              >{selectedUser.name}
              </h2>
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

          <div className="flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8">
              <h2 className="text-xl font-bold text-white">
                Cost: <span className="text-green-400">{selectedWork.price}$</span>
              </h2>
              <ActionBtn
                variant="cart"
                isActive={isAddingToCart}
                onClick={handleAddToCart}
                className="flex items-center gap-2 text-white">
                {isAddingToCart ? (
                  <IoMdAddCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <IoMdAddCircleOutline className="w-6 h-6" />
                )}
                <span>{isAddingToCart ? 'Added' : 'Add to Cart'}</span>
              </ActionBtn>
          </div>

          {selectedWork && (
            <div className='flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8'>
              <div>
                <h2 className="text-xl font-bold text-white mb-4">{selectedWork.title}</h2>
              </div>
              <div>
                <p className="text-gray-400">{selectedWork.description}</p>
              </div>
            </div>
          )}

          {selectedWork.tags && selectedWork.tags.length > 0 && (
            <div className='mt-4 mb-4'>
              <div className='flex flex-wrap gap-2'>
                {selectedWork.tags.map(tag=>(
                  <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-700 text-sm text-indigo-300 border border-indigo-400/30"
                >
                  {tag}
                </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8">
            <h3 className="text-lg font-semibold text-white">Comments({selectedWork.comments?.length || 0})</h3>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2 hide-scrollbar">
              {selectedWork.comments && selectedWork.comments.length > 0 ? (
                selectedWork.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">{selectedUser.name}:</span> {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No comments yet.</p>
              )}
            </div>
            
            <textarea
              placeholder="Write your comment here..."
              className="w-full min-h-[100px] p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <button
              className="self-end px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
