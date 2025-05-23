import React from 'react';
import '../../../../shared/styles/hideScrollBar.css';

export const LeftSide = ({ selectedWork, allWorks }) => {
  const authorId = selectedWork?.author?._id;
  const relatedWorks = allWorks.filter(work => work.author?._id === authorId && work._id !== selectedWork._id);
  return (
    <div className="p-4 w-3/4 h-full overflow-y-auto scroll-smooth pr-2 hide-scrollbar">
      <div className="flex flex-col items-center justify-start space-y-4 mb-8">
        {/* Все изображения выбранной работы */}
        {selectedWork.files && selectedWork.files.length > 0 && (
          selectedWork.files.map((file, index) => (
            <img
              key={index}
              src={file.url}
              alt={`${selectedWork.title} - Image ${index + 1}`}
              className="w-full rounded object-contain shadow-md"
            />
          ))
        )}
        {!selectedWork.files || selectedWork.files.length === 0 && (
          <div className="w-full h-64 flex items-center justify-center rounded bg-gray-800 text-gray-400">
            No images for this work
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
