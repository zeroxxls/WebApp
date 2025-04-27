import React from 'react'

export const ModalWindow = ({work,onClose}) => {
  return (
    <div>
         <div>
         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
                <img src={work.imageUrl} alt={work.title} className="rounded-lg mb-4" />
                <h2 className="text-xl font-bold mb-2">{work.title}</h2>
            </div>
         </div>
    </div>
  )
}
