import React from "react";

const Input =()=>{
    return(
        <div className="mt-7.5 w-200 max-w-md mx-5 ">
        <input 
          type="text" 
          placeholder="Search" 
          className="p-2 w-full bg-transparent transition-all duration-300 
           border-0 border-b-2 border-transparent
           focus:border-b-blue-500 focus:translate-y-[-2px]
           focus:shadow-md focus:outline-none"
        />
      </div>
    )
}

export default Input