import React from 'react';

export const RelatedWorksList = ({ relatedWorks }) => {
  return (
    relatedWorks.length > 0 && (
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
                />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center rounded bg-gray-800 text-gray-400">
                  No image
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    )
  );
};