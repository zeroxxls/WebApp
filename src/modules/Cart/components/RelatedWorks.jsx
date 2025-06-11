import React from "react";

export const RelatedWorks = ({ relatedWorks, onOpenModal }) => (
  <div className="mt-12 py-8 border-t border-gray-700">
    <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {relatedWorks.map((work) => (
        <div
          key={work._id}
          className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          onClick={() => onOpenModal(work, work.author)}
        >
          <img src={work.files?.[0]?.url || "https://via.placeholder.com/100"} alt={work.title} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{work.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{work.author?.fullName || 'Unknown'}</p>
            <p className="text-blue-400 font-medium">${work.price?.toFixed(2)}</p>
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(work, work.author);
              }}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);