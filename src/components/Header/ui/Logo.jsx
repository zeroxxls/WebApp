import React from "react"
import logo from '../../../assets/logo.svg'
import { Link } from "react-router-dom"

export const Logo=({size='lg', className=''})=>{
    const sizes ={
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-24 h-24',
        xl: 'w-40 h-40'
    }
    return(
        <Link to='/'>
            <div>
                <img src={logo} alt="logo" className={`${sizes[size]} ${className}`}/>
            </div>
        </Link>
    )
}
