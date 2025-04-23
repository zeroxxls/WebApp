import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const CustomSwiperBtn = () => {
  return (
    <div>
                <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-600 rounded-full p-2 shadow-md transition">
                  <FaChevronLeft className=" w-5 h-5" />
                </button>
                <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-600 rounded-full p-2 shadow-md transition">
                  <FaChevronRight className=" w-5 h-5" />
                </button>
    </div>
  )
}
