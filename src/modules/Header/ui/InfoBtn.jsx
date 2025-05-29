import React from "react";
import { Link } from "react-router-dom";

export const InfoBtn =()=>{
    return(
        <div className="flex gap-12">
                <Link to="/MainPage">
                <button className="cursor-pointer m-auto text-gray-300 text-xl font-semibold bg-transparent transition-all duration-300 
                border-0 border-b-2 border-transparent hover:border-b-blue-500">Explore</button>
                </Link>
                <button className="cursor-pointer m-auto text-gray-300 text-xl font-semibold bg-transparent transition-all duration-300 
                border-0 border-b-2 border-transparent hover:border-b-blue-500">Learning</button>
                <Link to="/NewsPage">
                <button className="cursor-pointer m-auto text-gray-300 text-xl font-semibold bg-transparent transition-all duration-300 
                border-0 border-b-2 border-transparent hover:border-b-blue-500">News</button>
                </Link>
        </div>
    )
}