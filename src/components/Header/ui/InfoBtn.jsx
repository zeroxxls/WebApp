import React from "react";

const InfoBtn =()=>{
    return(
        <div className="flex gap-12">
                <button className="cursor-pointer m-auto text-gray-300 text-xl font-semibold bg-transparent transition-all duration-300 
                border-0 border-b-2 border-transparent hover:border-b-blue-500">Explore</button>
                <button className="cursor-pointer m-auto text-gray-300 text-xl font-semibold bg-transparent transition-all duration-300 
                border-0 border-b-2 border-transparent hover:border-b-blue-500">Shop</button>
                <button className="cursor-pointer m-auto text-gray-300 text-xl font-semibold bg-transparent transition-all duration-300 
                border-0 border-b-2 border-transparent hover:border-b-blue-500">Jobs</button>
        </div>
    )
}

export default InfoBtn