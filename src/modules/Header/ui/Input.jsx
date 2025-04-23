import React from "react";

const Input =()=>{
    return(
        <div className=" w-200 max-w-md mx-5  ">
        <input 
          type="text" 
          placeholder="Search" 
          className="p-2 w-full bg-transparent  transition-all duration-400 
           border-b-1 border-b-gray-400
           focus:border-b-blue-500 focus:translate-y-[-2px]
           focus:shadow-md focus:outline-none"
        />
      </div>
    )
}

export default Input