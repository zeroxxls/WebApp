import {configureStore} from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import loadingReducer from './slices/loadingSlice';
import authReducer from './slices/authSlice';
import workReducer from './slices/workSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice'

export const store = configureStore({
    reducer:{
        search: searchReducer,
        loading: loadingReducer,
        auth: authReducer,
        works: workReducer,
        user: userReducer,
        cart: cartReducer,
    }
})