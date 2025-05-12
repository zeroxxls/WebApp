import React from 'react'

export const OnCloseBtn = ({onClose}) => {
  return (
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
            ✕
    </button>
  )
}
