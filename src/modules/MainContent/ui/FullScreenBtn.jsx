import React from 'react'

export const FullScreenBtn = ({isFullscreen,viewerRef,toggleFullscreen}) => {
    const handleFullscreenClick = () => {
    if (viewerRef.current) {
      toggleFullscreen(viewerRef.current);
    }
  };
  return (
     <button
            className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-200 group"
            onClick={handleFullscreenClick}
            aria-label="Fullscreen"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            )}
            </svg>
      </button>
  )
}
