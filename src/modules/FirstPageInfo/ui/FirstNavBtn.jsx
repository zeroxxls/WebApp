import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";

export const FirstNavBtn =()=>{
  const navigate = useNavigate();
  const {token, user} = useSelector((state) => state.auth);

  const handleProfileClick = () =>{
    if(token && user){
      navigate(`profile/${user._id}`)
    }else{
      navigate('/AuthPage')
    }
  }
    return(
        <div className="mt-5 flex flex-col md:h-[72px] md:w-[460px] md:flex-row justify-center">
        <Link to='/MainPage' className="hover:shadow-md transition-all duration-300 flex gap-x-2 border border-gray-200 px-9 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-700 rounded-t-lg border-b-0 md:rounded-l-lg md:rounded-tr-none md:border-b md:border-r-0 cursor-pointer">
          <div>
            Explore
          </div>
        </Link>
        <Link to='/NewsPage' className="hover:shadow-md transition-all duration-300 flex gap-x-2 border border-gray-200 px-9 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-700 cursor-pointer">
          <div >
            News
          </div>
        </Link>
        <div
        onClick={handleProfileClick}
        className="hover:shadow-md transition-all duration-300 flex gap-x-2 border border-gray-200 px-9 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-700 rounded-b-lg border-t-0 md:rounded-r-lg md:rounded-bl-none md:border-l-0 md:border-t cursor-pointer"
      >
        <div>Profile</div>
      </div>
      </div>
    )
}