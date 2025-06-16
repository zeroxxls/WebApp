import React from "react";
import { Link } from "react-router-dom";
import { SearchInput } from "../HeaderFeatures/SearchInput";
import { AuthHeaderBtn } from "../../ui/authHeaderBtn";
import { InfoBtn } from "../../ui/InfoBtn";
import { Logo } from "../../../../shared/ui/Logo";
import { Brand } from "../../../../shared/ui/Brand";
import { VscSettings } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useUserDropdown } from "../../hooks/useUserDropdown";
import { UserDropdown } from "../HeaderFeatures/UserDropdown";
import { MdFileUpload } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";

export const Header = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { isDropdownOpen, handleMouseEnter, handleMouseLeave, handleLogout, navigate } = useUserDropdown();

  return (
    <header className="flex justify-between items-center border-b border-gray-200/10
    transition-all duration-600 hover:border-blue-400 hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.5)]">
      <div className="flex">
        <Logo />
        <Brand />
      </div>
      <InfoBtn />
      <SearchInput />
      <div className="flex items-center">
        {user && token ? (
          <>
            <Link to="/CartPage">
              <div className="bg-gray-700 mr-4 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
                <GiShoppingCart className="w-6 h-6 text-white transition hover:scale-110" />
              </div>
            </Link>
            <Link to="/UploadSelection">
              <div className="bg-gray-700 mr-4 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
                <MdFileUpload className="w-6 h-6 text-white transition hover:scale-110" />
              </div>
            </Link>
            <UserDropdown
              user={user}
              isDropdownOpen={isDropdownOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onLogout={handleLogout}
              navigate={navigate}
            />
          </>
        ) : (
          <div className="flex gap-7 mr-6">
            <Link to="/RegisterPage">
              <AuthHeaderBtn variant="signHeaderUp">Sign Up</AuthHeaderBtn>
            </Link>
            <Link to="/LoginPage">
              <AuthHeaderBtn variant="signHeaderIn">Sign In</AuthHeaderBtn>
            </Link>
          </div>
        )}
        <Link to="/SettingsPage">
          <div className="bg-gray-700 mx-10 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
            <VscSettings className="w-6 h-6 text-white transition hover:scale-110" />
          </div>
        </Link>
      </div>
    </header>
  );
};