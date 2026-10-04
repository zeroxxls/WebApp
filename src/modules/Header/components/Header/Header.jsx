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
    <header className="flex items-start gap-3 px-3 py-3 border-b border-gray-200/10 lg:justify-between lg:items-center
    transition-all duration-600 hover:border-blue-400 hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.5)]">
      <div className="hidden items-center justify-center lg:flex lg:justify-start">
        <Logo size="sm" className="w-10 h-10 sm:w-16 sm:h-16 lg:w-24 lg:h-24" />
        <Brand textSize="lg" className="mx-2 text-xl sm:text-3xl" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 self-center lg:contents">
        <InfoBtn />
        <div className="w-full lg:w-auto lg:flex-1 lg:max-w-md"><SearchInput /></div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2 lg:w-auto lg:flex-row lg:items-center lg:justify-end">
        {user && token ? (
          <>
            <Link to="/CartPage">
              <div className="bg-gray-700 mr-2 sm:mr-4 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
                <GiShoppingCart className="w-6 h-6 text-white transition hover:scale-110" />
              </div>
            </Link>
            <Link to="/UploadSelection">
              <div className="bg-gray-700 mr-2 sm:mr-4 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
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
          <div className="mr-2 flex flex-col items-end gap-2 sm:mr-6 lg:flex-row lg:gap-7">
            <Link to="/RegisterPage">
              <AuthHeaderBtn variant="signHeaderUp">Sign Up</AuthHeaderBtn>
            </Link>
            <Link to="/LoginPage">
              <AuthHeaderBtn variant="signHeaderIn">Sign In</AuthHeaderBtn>
            </Link>
          </div>
        )}
        <Link to="/SettingsPage">
          <div className="bg-gray-700 mx-2 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer sm:mx-4 lg:mx-6">
            <VscSettings className="w-6 h-6 text-white transition hover:scale-110" />
          </div>
        </Link>
      </div>
    </header>
  );
};
