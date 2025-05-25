import React from 'react';
import '../../../../shared/styles/Border.css';
import { useLogin } from '../../hooks/useLogin';
import { LoginForm } from './LoginForm';

export const LoginSection = ({ children }) => {
  const { email, setEmail, password, setPassword, error, handleLogin } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        onSubmit={handleLogin}
        children={children}
      />
    </div>
  );
};
