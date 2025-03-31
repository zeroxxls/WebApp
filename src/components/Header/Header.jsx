import React from "react";
import SearchInput from "./components/SearchInput";
import AuthBtn from "./ui/authBtn";
import InfoBtn from "./ui/InfoBtn";
import logo from '../../assets/logo.svg'

const Header =()=>{
    return(
        <header>
            <div>
                <img src={logo} alt="logo"/>
            </div>
                <InfoBtn/>
                <SearchInput/>
                <AuthBtn/>
        </header>
    )
}

export default Header