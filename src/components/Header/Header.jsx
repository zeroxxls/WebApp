import React from "react";
import SearchInput from "./components/SearchInput";
import AuthBtn from "../../modules/auth/ui/authBtn";
import InfoBtn from "./ui/InfoBtn";
import { Logo } from "./ui/Logo";
import { HeaderBrand } from "./ui/HeaderBrand";
import { MoreBtn } from "./ui/MoreBtn";

const Header =()=>{
    return(
        <header className="flex justify-between items-center border-b border-gray-200/10 
  transition-all duration-600
  hover:border-blue-400 hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.5)]">
            <div className="flex">
                <Logo/>
                <HeaderBrand/>
            </div>
            <InfoBtn/>
            <SearchInput/>
            <div className="flex">
                <AuthBtn/>
                <MoreBtn/>
            </div>
        </header>
    )
}

export default Header