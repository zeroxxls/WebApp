import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserWorks, uploadWork } from "../../api/worksApi";

const initialState = {
  userWorks: [],
  isLoading: true,
  error: null,
  isLoadingMore: false,
  page: 0,
  hasMore: true,
  search: '',
  currentRequestId: null,
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
    .addCase(fetchAllWorks.pending, (state, action) => {
      const page = action.meta.arg?.page || 1;
      state.isLoading = page === 1;
      state.isLoadingMore = page > 1;
      state.error = null;
      state.search = action.meta.arg?.search || '';
      state.currentRequestId = action.meta.requestId;
    })
    .addCase(fetchAllWorks.fulfilled, (state, action) => {
      if (state.currentRequestId !== action.meta.requestId) return;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.userWorks = action.payload.page === 1
        ? action.payload.works
        : [...state.userWorks, ...action.payload.works];
      state.currentRequestId = null;
    })
    .addCase(fetchAllWorks.rejected, (state, action) => {
      if (state.currentRequestId !== action.meta.requestId) return;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.error = action.payload;
      state.currentRequestId = null;
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
  async ({ page = 1, limit = 24, search = '' } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit), search });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/works?${params}`);
      if (!response.ok) throw new Error('Failed to fetch works');
      const data = await response.json();
      return data;
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
