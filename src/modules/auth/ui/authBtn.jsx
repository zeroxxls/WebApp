import React from "react";
import { Link } from "react-router-dom";

const AuthBtn =()=>{
    return(
        <div className="flex gap-7">
            <Link to="/RegisterPage">
            <button className="cursor-pointer rounded m-auto text-gray-300 font-semibold bg-gray-600/70 w-25 h-10
            hover:shadow-md hover:outline-none hover:bg-gray-600 transition-all duration-500">
                Sign up
            </button>
            </Link>

            <Link to ="/LoginPage">
                <button className="cursor-pointer rounded m-auto text-black font-semibold  bg-blue-600 w-25 h-10 hover:bg-blue-500
                transition-all duration-500 hover:shadow-md hover:outline-none
                " >Sign in</button>
            </Link>
        </div>
    )
}

export default AuthBtn