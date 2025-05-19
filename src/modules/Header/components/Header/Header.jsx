import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { SearchInput } from "../HeaderFeatures/SearchInput";
import { AuthHeaderBtn } from "../../ui/authHeaderBtn";
import { InfoBtn } from "../../ui/InfoBtn";
import { Logo } from "../../../../shared/ui/Logo";
import { Brand } from "../../../../shared/ui/Brand";
import { VscSettings, VscSignOut } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { MdFileUpload } from "react-icons/md";
import { handleProfileClick } from "../../../../shared/utils/navigation";
import { logout } from "../../../../store/slices/authSlice";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Используем useRef, чтобы хранить ID таймаута
    const timeoutRef = useRef(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleMouseEnter = () => {
        // При входе мыши сразу открываем меню
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        // При уходе мыши ставим таймаут на закрытие меню
        timeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 250); // задержка 250 мс
    };

    return (
        <header className="flex justify-between items-center border-b border-gray-200/10 
                transition-all duration-600
              hover:border-blue-400 hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.5)]">
            <div className="flex">
                <Logo />
                <Brand />
            </div>
            <InfoBtn />
            <SearchInput />
            <div className="flex items-center">
                {user && token ? (
                    <div className="flex items-center gap-4 mr-6 relative"
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                    >
                        <div className="bg-gray-700 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
                            <MdFileUpload className="w-6 h-6 text-white transition hover:scale-110" />
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer">
                            <img
                                src={`http://localhost:4444/auth/avatar/${user._id}?${Date.now()}`}
                                alt={user.fullName || user.name || 'User'}
                                className="w-8 h-8 rounded-full object-cover"
                                onClick={() => handleProfileClick(navigate, user._id || user.id)}
                            />
                            <span className="text-white">{user.fullName || user.name || 'User'}</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                                <div className="py-1">
                                    <Link
                                        to={`/profile/${user._id || user.id}`}
                                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <VscSignOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
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
                    <div className="bg-gray-700 mx-10 rounded-xl p-2 transition hover:bg-gray-500 cursor-pointer">
                        <VscSettings className="w-6 h-6 text-white transition hover:scale-110" />
                    </div>
                </Link>
            </div>
        </header>
    );
};
