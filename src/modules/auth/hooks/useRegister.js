import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
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

      setSuccessMessage('Registration successful! Redirecting to login...');
      setError('');

      setTimeout(() => {
        navigate('/LoginPage');
      }, 2000);
    } catch (err) {
      console.error('Register error:', err);
      setError(err.message || 'Registration failed');
      setSuccessMessage('');
    }
  };

  return {
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
  };
};