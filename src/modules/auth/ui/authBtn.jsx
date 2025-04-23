import React from "react";
import clsx from "clsx";

export const AuthBtn =({children, variant='signIn', className='', ...props})=>{
    const baseClasses = "cursor-pointer rounded m-auto text-gray-300 font-semibold w-25 h-10 hover:shadow-md hover:outline-none transition-all duration-500"
    const variants={
        signIn:"bg-blue-600 hover:bg-blue-500",
        signUp:"bg-gray-600/70 hover:bg-gray-600",
    };
    return(
    <button
      className={clsx(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
    )
}