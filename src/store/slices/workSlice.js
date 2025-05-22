import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserWorks, uploadWork } from "../../api/worksApi";

const initialState = {
  userWorks: [],
  isLoading: false,
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
      .addCase(fetchAllWorks.pending, (state) => { // Обработка загрузки всех работ
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllWorks.fulfilled, (state, action) => { // Обработка успешной загрузки всех работ
        state.isLoading = false;
        // Возможно, вам захочется создать отдельное состояние для всех работ,
        // чтобы не путать с работами пользователя.
        // Например: state.allWorks = action.payload;
        state.userWorks = action.payload; // Временно используем userWorks
      })
      .addCase(fetchAllWorks.rejected, (state, action) => { // Обработка ошибки загрузки всех работ
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
      const response = await fetch('http://localhost:4444/works', { // Запрос на эндпоинт для всех работ
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch all works');
      }
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

// 👇 Экспорт экшенов
export const { setLoading, setError, clearWorks, addNewWork } = workSlice.actions;

export default workSlice.reducer;
