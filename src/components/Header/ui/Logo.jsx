import React from "react"
import logo from '../../../assets/logo.svg'

export const Logo=()=>{
    return(
    <div className="flex items-center">
        <img src={logo} alt="logo" className="w-25 cursor-pointer"/>
        <h1 className="mx-5 text-4xl font-bold bg-gradient-to-r from-blue-600  via-cyan-500 to-cyan-300
         bg-clip-text text-transparent bg-size-200 animate-gradient
         duration-300 cursor-pointer">Sellica</h1>
    </div>
    )
}
