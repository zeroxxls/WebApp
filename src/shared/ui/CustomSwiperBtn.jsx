import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const CustomSwiperBtn = ({ prevRef, nextRef }) => {
  return (
    <>
      <button
        ref={prevRef}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-[100] bg-gray-800/80 hover:bg-gray-700 rounded-full p-3 shadow-lg transition-all transform hover:scale-110"
      >
        <FaChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-[100] bg-gray-800/80 hover:bg-gray-700 rounded-full p-3 shadow-lg transition-all transform hover:scale-110"
      >
        <FaChevronRight className="w-5 h-5 text-white" />
      </button>
    </>
  );
};