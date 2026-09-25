import React, { useRef, useEffect, useState } from 'react';

const ThreeDModelViewer = ({ modelUrl, onLoaded, onError }) => {
  const modelViewerRef = useRef(null);
  const [isViewerReady, setIsViewerReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    import('@google/model-viewer')
      .then(() => {
        if (isMounted) setIsViewerReady(true);
      })
      .catch((error) => {
        if (isMounted) onError?.(error);
      });

    return () => {
      isMounted = false;
    };
  }, [onError]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const handleModelLoaded = () => {
      if (onLoaded) {
        onLoaded();
      }
    };

    const handleModelError = (event) => {
      onError?.(event);
    };

    if (modelViewer) {
      modelViewer.addEventListener('load', handleModelLoaded);
      modelViewer.addEventListener('error', handleModelError);
    }

    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener('load', handleModelLoaded);
        modelViewer.removeEventListener('error', handleModelError);
      }
    };
  }, [isViewerReady, modelUrl, onLoaded, onError]);

  if (!isViewerReady) {
    return null;
  }

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
