import React, { useEffect } from 'react';
import '../../../../shared/styles/hideScrollBar.css';
import ThreeDModelViewer from '../Viewer/ThreeDModelViewer'; // Убедитесь, что путь верный

export const LeftSide = ({ selectedWork, allWorks }) => {
  const authorId = selectedWork?.author?._id;
  const relatedWorks = allWorks.filter(work => work.author?._id === authorId && work._id !== selectedWork._id);

  useEffect(() => {
    console.log('selectedWork.files:', selectedWork.files);
    selectedWork.files?.forEach(file => {
      const pathParts = file.path?.split('.');
      const extension = pathParts ? pathParts[pathParts.length - 1]?.toLowerCase() : '';
      const isModel = ['glb', 'gltf'].includes(extension);
      const isImage = file.mimeType?.startsWith('image/');
      console.log(`File: ${file.path}, ext: ${extension}, isModel: ${isModel}, isImage: ${isImage}`);
    });
  }, [selectedWork.files]);

  return (
    <div className="p-4 w-3/4 h-full overflow-y-auto scroll-smooth pr-2 hide-scrollbar">
      <div className="flex flex-col items-center justify-start space-y-4 mb-8">
        {/* Все файлы выбранной работы (изображения и 3D-модели) */}
{selectedWork.files && selectedWork.files.length > 0 && (
          selectedWork.files.map((file, index) => {
            const pathParts = file.path?.split('.');
            const extension = pathParts ? pathParts[pathParts.length - 1]?.toLowerCase() : '';
            const isModel = ['glb', 'gltf'].includes(extension);
            const isImage = file.mimeType?.startsWith('image/');

            if (isModel) {
              return (
                <div key={`model-${file.path}`} className="w-full aspect-square rounded shadow-md overflow-hidden">
                  <ThreeDModelViewer modelUrl={file.url} />
                </div>
              );
            } else if (isImage) {
              return (
                <img
                  key={`image-${file.path}`}
                  src={file.url}
                  alt={`${selectedWork.title} - File ${index + 1}`}
                  className="w-full rounded object-contain shadow-md"
                />
              );
            }
            return null; // Пропускаем неопознанные файлы
          })
        )}
        {(!selectedWork.files || selectedWork.files.length === 0) && (
          <div className="w-full h-64 flex items-center justify-center rounded bg-gray-800 text-gray-400">
            No files for this work
          </div>
        )}
      </div>

      {/* Другие работы этого же автора */}
      {relatedWorks.length > 0 && (
        <>
          <h4 className="text-xl font-semibold text-white mt-6">More from this creator</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {relatedWorks.map((work) => (
              <div key={work._id} className="relative cursor-pointer group overflow-hidden rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                {work.files && work.files.length > 0 ? (
                  <img
                    src={work.files[0].url}
                    alt={work.title}
                    className="w-full aspect-square object-cover"
                    // Вам может понадобиться добавить onClick, чтобы при клике менять selectedWork в модальном окне.
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center rounded bg-gray-800 text-gray-400">
                    No image
                  </div>
                )}
                {/* Можно добавить overlay с названием при наведении */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
