import React from "react";
import { Link } from "react-router-dom";

export const InfoBtn =()=>{
    return(
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12">
                <Link to="/MainPage" className="cursor-pointer m-auto text-gray-300 text-sm sm:text-base lg:text-xl font-semibold bg-transparent transition-all duration-300
                border-0 border-b-2 border-transparent hover:border-b-blue-500">
                Explore
                </Link>
                <Link to="/LearningPage" className="cursor-pointer m-auto text-gray-300 text-sm sm:text-base lg:text-xl font-semibold bg-transparent transition-all duration-300
                border-0 border-b-2 border-transparent hover:border-b-blue-500">
                Learning
                </Link>
                <Link to="/NewsPage" className="cursor-pointer m-auto text-gray-300 text-sm sm:text-base lg:text-xl font-semibold bg-transparent transition-all duration-300
                border-0 border-b-2 border-transparent hover:border-b-blue-500">
                News
                </Link>
        </nav>
    )
}
