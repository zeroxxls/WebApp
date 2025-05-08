import React from 'react'
import '../../../../shared/styles/Border.css';
import { Link } from 'react-router-dom';
import { LoginSection } from '../LoginSection/LoginSection';

export const AuthSection = () => {
  return (
<LoginSection>
      <div className="mt-4 flex justify-center items-center flex-col">
        <p className="text-white text-sm mb-2">You don't have an account?</p>
        <Link 
          to="/RegisterPage" 
          className="text-sm text-blue-500 hover:text-blue-400 hover:underline transition-all duration-300 ease-in-out"
        >
          <p className="text-sm">Create Account</p>
        </Link>
      </div>
    </LoginSection>

  )
}
