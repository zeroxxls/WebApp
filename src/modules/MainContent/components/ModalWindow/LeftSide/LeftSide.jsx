import React, { useState, useRef } from 'react';
import '../../../../../shared/styles/hideScrollBar.css';
import {ModelViewerWithLoader} from './ModelViewerWithLoader';
import {RelatedWorksList} from './RelatedWorks';
import { useFullscreen } from '../../../hooks/useFullscreen';

export const LeftSide = ({ selectedWork, allWorks }) => {
  const authorId = selectedWork?.author?._id;
  const relatedWorks = allWorks.filter(
    (work) => work.author?._id === authorId && work._id !== selectedWork._id
  );
  const [isModelLoading, setIsModelLoading] = useState(true);
  const viewerRef = useRef(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <div className="p-4 w-full h-full overflow-y-auto scroll-smooth pr-2 hide-scrollbar">
      <div className="flex flex-col items-center justify-start space-y-4 mb-8">
        {selectedWork.files &&
          selectedWork.files.map((file) => {
            const pathParts = file.path?.split('.');
            const extension = pathParts ? pathParts[pathParts.length - 1]?.toLowerCase() : '';
            const isModel = ['glb', 'gltf'].includes(extension);
            const isImage = file.mimeType?.startsWith('image/');

            if (isModel) {
              return (
                <ModelViewerWithLoader
                  key={`model-${file.path}`}
                  file={file}
                  isFullscreen={isFullscreen}
                  toggleFullscreen={toggleFullscreen}
                  viewerRef={viewerRef}
                  isModelLoading={isModelLoading}
                  setIsModelLoading={setIsModelLoading}
                />
              );
            } else if (isImage) {
              return (
                <img
                  key={`image-${file.path}`}
                  src={file.url}
                  alt={`${selectedWork.title} - File ${file.path}`}
                  className="w-full rounded object-contain shadow-md"
                />
              );
            }
            return null;
          })}
        {(!selectedWork.files || selectedWork.files.length === 0) && (
          <div className="w-full h-64 flex items-center justify-center rounded bg-gray-800 text-gray-400">
            No files for this work
          </div>
        )}
      </div>

      <RelatedWorksList relatedWorks={relatedWorks} />
    </div>
  );
};