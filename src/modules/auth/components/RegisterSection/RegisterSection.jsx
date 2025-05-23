import React, { useState } from 'react';
import '../../../../shared/styles/Border.css';
import { AuthBtns } from '../../ui/AuthBtns';
import { AuthInput } from '../../ui/AuthInput';
import { useNavigate } from 'react-router-dom';

export const RegisterSection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4444/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Показываем сообщение об успехе
      setSuccessMessage('Registration successful! Redirecting to login...');
      setError('');
      
      // Через 2 секунды перенаправляем на страницу логина
      setTimeout(() => {
        navigate('/LoginPage');
      }, 2000);
      
    } catch (err) {
      console.error('Register error:', err);
      setError(err.message || 'Registration failed');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleRegister}>
        <div className="w-full max-w-sm [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-lg border border-transparent animate-border">
          <div className="p-8 bg-gray-950/25 border border-blue-900 rounded-lg relative z-10">
            <h2 className="text-white text-xl font-bold text-center mb-4">Sign Up</h2>
            
            {successMessage && (
              <p className="text-green-500 text-sm text-center mb-2">
                {successMessage}
              </p>
            )}
            
            {error && (
              <p className="text-red-500 text-sm text-center mb-2">
                {error}
              </p>
            )}
            
            <AuthInput
              placeholder={'Full Name'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <AuthInput
              placeholder={'E-Mail'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              placeholder={'Phone'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <AuthInput
              placeholder={'Password'}
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <AuthBtns variant='signUp'>Register</AuthBtns>
          </div>
        </div>
      </form>
    </div>
  );
};

