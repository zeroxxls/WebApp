import React from 'react';
import ThreeDModelViewer from '../../Viewer/ThreeDModelViewer';
import { ThreeDModelLogo } from '../../../ui/ThreeDModelLogo';
import { ViewerLayoutBtns } from '../../../ui/ViewerLayoutBtns';
import { FullScreenBtn } from '../../../ui/FullScreenBtn';

export const ModelViewerWithLoader = ({ file, isFullscreen,  viewerRef,toggleFullscreen, isModelLoading, setIsModelLoading }) => {
  

  return (
    <div
      ref={viewerRef}
      key={`model-${file.path}`}
      className={`w-full rounded-lg relative overflow-hidden shadow-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen m-0' : 'h-[700px]'
      }`}
    >
      <ThreeDModelViewer
        modelUrl={file.url}
        onLoaded={() => setIsModelLoading(false)}
      />
      <ThreeDModelLogo/>
      <ViewerLayoutBtns/>
      <FullScreenBtn
        isFullscreen={isFullscreen} // Передаем isFullscreen
        viewerRef={viewerRef}
        toggleFullscreen={toggleFullscreen}
      />

      {isModelLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-indigo-500 animate-spin mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-indigo-300 font-medium">Loading 3D Model...</span>
          </div>
        </div>
      )}
    </div>
  );
};