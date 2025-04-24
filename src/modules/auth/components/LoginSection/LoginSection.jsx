import React from 'react';
import '../../styles/LoginBorder.css';
import { AuthInput } from '../../ui/AuthInput';

export const LoginSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-lg border border-transparent animate-border">
            <div className="p-8 bg-gray-950/25 border border-blue-900 rounded-lg relative z-10">
                <h2 className="text-white text-xl font-bold text-center mb-4">Sign In</h2>
                <AuthInput placeholder={'Name'}/>
                <AuthInput placeholder={'Password'} type={'password'}/>
                <button className="w-full bg-blue-700 hover:bg-blue-500
                transition-all duration-500 hover:shadow-md hover:outline-none text-white py-2 rounded">Sign In</button>
            </div>
        </div>
    </div>
  );
};

