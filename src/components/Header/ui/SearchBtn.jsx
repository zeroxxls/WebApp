import React from "react";

const SearchBtn =()=>{
    return(
        <div className="flex">
            <button className="rounded m-auto text-gray-300 font-semibold  bg-blue-600 w-20 h-10 hover:bg-blue-800
            transition-all duration-300 hover:translate-y-[-2px]
           hover:shadow-md hover:outline-none">Search</button>
        </div>
    )
}

export default SearchBtn