import React from 'react'

export const ViewerLayoutBtns = () => {
  return (
     <div className="absolute bottom-4 left-4 bg-black/60 text-white/80 text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
                <span className="bg-white/10 px-2 py-1 rounded">← →</span>
                <span>Rotate</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
                <span className="bg-white/10 px-2 py-1 rounded">Scroll</span>
                <span>Zoom</span>
            </div>
      </div>
  )
}
