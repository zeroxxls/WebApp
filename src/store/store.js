import {configureStore} from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import loadingReducer from './slices/loadingSlice';
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer:{
        search: searchReducer,
        loading: loadingReducer,
        auth: authReducer,
    }
})