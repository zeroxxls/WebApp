import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../../store/slices/searchSlice";

const Input =()=>{
  const dispatch = useDispatch();
  const search = useSelector ((state)=> state.search.searchQuery);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    dispatch(setSearchQuery(query));
    navigate(`/MainPage?search=${encodeURIComponent(query)}`);
  };

    return(
        <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto lg:mx-5">
        <input 
          type="text" 
          placeholder="Search" 
          value={search}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          aria-label="Search works"
          className="p-2 w-full min-w-0 bg-transparent text-white transition-all duration-400
           border-b-1 border-b-gray-400
           focus:border-b-blue-500 focus:translate-y-[-2px]
           focus:shadow-md focus:outline-none"
        />
        <button type="submit" className="px-3 text-gray-300 hover:text-white" aria-label="Search">
          Search
        </button>
      </form>
    )
}

export default Input
