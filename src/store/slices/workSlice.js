import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserWorks, uploadWork } from "../../api/worksApi";

const initialState = {
  userWorks: [],
  isLoading: true,
  error: null
};

export const workSlice = createSlice({
  name: 'works',
  initialState,
    reducers: {
    setLoading: (state, action) => {
        state.isLoading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
    clearWorks: (state) => {
        state.userWorks = [];
    },
    addNewWork: (state, action) => {
        state.userWorks.unshift(action.payload);
    }
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchWorks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchWorks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userWorks = action.payload;
    })
    .addCase(fetchWorks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(uploadNewWork.fulfilled, (state, action) => {
      state.userWorks.unshift(action.payload);
    })
    .addCase(fetchAllWorks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchAllWorks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userWorks = action.payload;
    })
    .addCase(fetchAllWorks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

export const fetchWorks = createAsyncThunk(
  'works/fetchWorks',
  async (userId, { rejectWithValue }) => {
    try {
      const works = await fetchUserWorks(userId);
      return works;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllWorks = createAsyncThunk(
  'works/fetchAllWorks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/works`);
      if (!response.ok) throw new Error('Failed to fetch works');
      const data = await response.json();
      return data.works;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadNewWork = createAsyncThunk(
  'works/uploadNewWork',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadWork(formData);
      return response.work;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { setLoading, setError, clearWorks, addNewWork } = workSlice.actions;

export default workSlice.reducer;
