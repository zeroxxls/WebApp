import React from 'react'
import '../styles/LoginBorder.css'
import { AuthInput } from '../ui/AuthInput'

export const RegisterSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-lg border border-transparent animate-border">
            <div className="p-8 bg-blue-950/10 border border-blue-900 rounded-lg relative z-10">
                <h2 className="text-white text-xl font-bold text-center mb-4">Sign Up</h2>
                <AuthInput placeholder={'Name'}/>
                <AuthInput placeholder={'E-Mail'}/>
                <AuthInput placeholder={'Telefon'}/>
                <AuthInput placeholder={'Password'} type={'password'}/>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded">Войти</button>
            </div>
        </div>
    </div>
  )
}
