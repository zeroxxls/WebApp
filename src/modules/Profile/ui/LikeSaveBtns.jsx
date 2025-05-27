import React from "react";
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';

export const LikeSaveBtns =()=>{
    return(
    <div className="flex justify-center md:justify-start gap-4 mt-4">
     <Link to="/LikedPage" className="text-gray-400 hover:text-red-500">
       <AiOutlineHeart size={24} />
     </Link>
     <Link to="/SavedPage" className="text-gray-400 hover:text-blue-500">
       <FiBookmark size={24} />
     </Link>
    </div>
)
}