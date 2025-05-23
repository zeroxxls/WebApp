import '@google/model-viewer';
import React from 'react';

const ThreeDModelViewer = ({ modelUrl }) => {
  return (
    <model-viewer
      src={modelUrl}
      alt="A 3D model"
      auto-rotate
      camera-controls
      style={{ width: '100%', height: '100%' }}
    ></model-viewer>
  );
};

export default ThreeDModelViewer;