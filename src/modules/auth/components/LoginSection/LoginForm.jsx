import React from 'react';
import { AuthBtns } from '../../ui/AuthBtns';
import { AuthInput } from '../../ui/AuthInput';

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  onSubmit,
  children,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
          <AuthBtns type="submit" variant="signIn">
            Sign In
          </AuthBtns>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </form>
  );
};