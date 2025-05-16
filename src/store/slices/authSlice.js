import { createSlice } from "@reduxjs/toolkit";

// authSlice.js
const initialState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      // Изменяем обработку action
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  }
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;