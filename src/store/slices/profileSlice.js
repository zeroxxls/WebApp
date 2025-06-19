import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfileData = createAsyncThunk(
  'profile/fetchData',
  async (userId,) => {
    const token = localStorage.getItem('token');
    try {
       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const worksResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/works/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { user: response.data.user, works: worksResponse.data.works };
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    works: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload.user;
      state.works = action.payload.works;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.works = action.payload.works;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;