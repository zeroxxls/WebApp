import React from 'react';
import '../../../../shared/styles/Border.css';
import { useRegister } from '../../hooks/useRegister';
import { RegisterForm } from './RegisterForm';

export const RegisterSection = () => {
  const {
    email,
    setEmail,
    fullName,
    setFullName,
    phone,
    setPhone,
    password,
    setPassword,
    error,
    successMessage,
    handleRegister,
  } = useRegister();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegisterForm
        email={email}
        setEmail={setEmail}
        fullName={fullName}
        setFullName={setFullName}
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        error={error}
        successMessage={successMessage}
        onSubmit={handleRegister}
      />
    </div>
  );
};