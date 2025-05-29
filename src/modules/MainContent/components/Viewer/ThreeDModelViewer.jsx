import '@google/model-viewer';
import React, { useRef, useEffect } from 'react';

const ThreeDModelViewer = ({ modelUrl, onLoaded }) => {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const handleModelLoaded = () => {
      if (onLoaded) {
        onLoaded();
      }
    };

    if (modelViewer) {
      modelViewer.addEventListener('load', handleModelLoaded);
    }

    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener('load', handleModelLoaded);
      }
    };
  }, [modelUrl, onLoaded]);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={modelUrl}
      alt="A 3D model"
      auto-rotate
      camera-controls
      style={{ width: '100%', height: '100%' }}
    ></model-viewer>
  );
};

export default ThreeDModelViewer;