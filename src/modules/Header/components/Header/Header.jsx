import React from "react";
import { Link } from "react-router-dom";
import {SearchInput} from "../HeaderFeatures/SearchInput";
import {AuthBtn} from "../../../auth/ui/authBtn";
import {InfoBtn} from "../../ui/InfoBtn";
import { Logo } from "../../../../shared/ui/Logo";
import {Brand} from "../../../../shared/ui/Brand"
import { VscSettings } from "react-icons/vsc";

export const Header =()=>{
    return(
        <header className="flex justify-between items-center border-b border-gray-200/10 
  transition-all duration-600
  hover:border-blue-400 hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.5)]">
            <div className="flex">
                <Logo/>
                <Brand/>
            </div>
            <InfoBtn/>
            <SearchInput/>
            <div className="flex">
                <div className="flex gap-7">
                    <Link to="/RegisterPage">
                     <AuthBtn variant="signUp">Sign Up</AuthBtn>
                     </Link>
                    <Link to="/LoginPage">
                    <AuthBtn variant="signIn">Sign In</AuthBtn>
                    </Link>
                </div>
                <Link to="/SettingsPage">
                    <VscSettings  className="w-8 h-8 mx-10 cursor-pointer"/>
                </Link>
            </div>
        </header>
    )
}