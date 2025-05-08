import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {SearchInput} from "../HeaderFeatures/SearchInput";
import {AuthHeaderBtn} from "../../ui/authHeaderBtn";
import {InfoBtn} from "../../ui/InfoBtn";
import { Logo } from "../../../../shared/ui/Logo";
import {Brand} from "../../../../shared/ui/Brand"
import { VscSettings } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { MdFileUpload } from "react-icons/md";
import { handleProfileClick } from "../../../../shared/utils/navigation";

export const Header =()=>{
    const navigate = useNavigate();
    const user = useSelector((state)=> state.auth.user)
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
            {user ? (
          // Если залогинен — показываем аватар и имя
          <div className="flex items-center gap-4 mr-6">
            <MdFileUpload className="w-8 h-8 mx-10 cursor-pointer"/>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={()=>handleProfileClick(navigate,user.id)}
            />
            <span className="text-white">{user.name}</span>
          </div>
        ) : (
          // Если не залогинен — обычные кнопки
          <div className="flex gap-7">
            <Link to="/RegisterPage">
              <AuthHeaderBtn variant="signHeaderUp">Sign Up</AuthHeaderBtn>
            </Link>
            <Link to="/LoginPage">
              <AuthHeaderBtn variant="signHeaderIn">Sign In</AuthHeaderBtn>
            </Link>
          </div>
        )}
                <Link to="/SettingsPage">
                    <VscSettings  className="w-8 h-8 mx-10 cursor-pointer"/>
                </Link>
            </div>
        </header>
    )
}