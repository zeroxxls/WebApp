import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../store/slices/searchSlice";

const Input =()=>{
  const dispatch = useDispatch();
  const search = useSelector ((state)=> state.search.searchQuery.toLowerCase())

    return(
        <div className=" w-200 max-w-md mx-5  ">
        <input 
          type="text" 
          placeholder="Search" 
          value={search}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="p-2 w-full bg-transparent  transition-all duration-400 
           border-b-1 border-b-gray-400
           focus:border-b-blue-500 focus:translate-y-[-2px]
           focus:shadow-md focus:outline-none"
        />
      </div>
    )
}

export default Input