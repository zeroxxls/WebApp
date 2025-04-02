import React from "react";
import SearchInput from "./components/SearchInput";
import AuthBtn from "../../modules/auth/components/authBtn";
import InfoBtn from "./ui/InfoBtn";
import { Logo } from "./ui/Logo";
import { MoreBtn } from "./ui/MoreBtn";

const Header =()=>{
    return(
        <header className="flex justify-between">
                <Logo/>
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