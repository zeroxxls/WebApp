import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../shared/styles/Border.css';
import { AuthBtns } from '../../ui/AuthBtns';
import { AuthInput } from '../../ui/AuthInput';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/slices/authSlice';

export const LoginSection = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  if (!email.trim() || !password.trim()) {
    setError('Пожалуйста, заполните все поля');
    return;
  }

  try {
    const response = await fetch('http://localhost:4444/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка входа');
    }

    const data = await response.json();
    dispatch(setUser(data.user));
    navigate(`/profile/${data.user.id}`);
  } catch (err) {
    console.error('Login error:', err);
    setError(err.message || 'Ошибка сервера');
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form>
            <div className="w-full max-w-sm [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-lg border border-transparent animate-border">
            <div className="p-8 bg-gray-950/25 border border-blue-900 rounded-lg relative z-10">
                <h2 className="text-white text-xl font-bold text-center mb-4">Sign In</h2>
                <AuthInput 
                  placeholder={'Email'} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />

                <AuthInput 
                  placeholder={'Password'} 
                  type={'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <AuthBtns onClick={handleLogin} variant='signIn'>Sign In</AuthBtns>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                {children && <div className="mt-4">{children}</div>}
            </div>
        </div>
      </form>
    </div>
  );
};
