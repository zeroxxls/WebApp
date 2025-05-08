import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../shared/styles/Border.css';
import { AuthBtns } from '../../ui/AuthBtns';
import { AuthInput } from '../../ui/AuthInput';
import {users} from '../../../MainContent/data/users'
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/slices/authSlice';

export const LoginSection = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleUserProfileClick = (id)=>{
    const loggedInUser = users.find(user=> user.id === id);
    if(loggedInUser){
      dispatch(setUser(loggedInUser))
      navigate(`/profile/${id}`)
    }else{
      console.error("User not found")
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-lg border border-transparent animate-border">
            <div className="p-8 bg-gray-950/25 border border-blue-900 rounded-lg relative z-10">
                <h2 className="text-white text-xl font-bold text-center mb-4">Sign In</h2>
                <AuthInput placeholder={'Name'}/>
                <AuthInput placeholder={'Password'} type={'password'}/>
                <AuthBtns onClick={()=>handleUserProfileClick(users[0].id)} variant='signIn'>Sign In</AuthBtns>
                {children && <div className="mt-4">{children}</div>}
            </div>
        </div>
    </div>
  );
};
