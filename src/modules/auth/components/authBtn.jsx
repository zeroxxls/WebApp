import React from "react";
import SearchBtn from "../../../components/Header/ui/SearchBtn";

const AuthBtn =()=>{
    return(
        <div className="flex gap-7">
            <button className="cursor-pointer rounded m-auto text-gray-300 font-semibold bg-gray-600/70 w-25 h-10
            hover:shadow-md hover:outline-none hover:bg-gray-600 transition-all duration-500">Sign up</button>
            <button className="cursor-pointer rounded m-auto text-black font-semibold  bg-blue-600 w-25 h-10 hover:bg-blue-500
            transition-all duration-500 hover:shadow-md hover:outline-none
            ">Sign in</button>
        </div>
    )
}

export default AuthBtn