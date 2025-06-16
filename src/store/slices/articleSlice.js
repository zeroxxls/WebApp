import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllArticles, uploadArticle } from '../../api/articlesApi';

const initialState = {
    list: [],
    loading: false,
    error: null
};

export const fetchArticles = createAsyncThunk(
    'articles/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchAllArticles();
            console.log('API response data:', data); // Логируем полученные данные
            
            if (!Array.isArray(data)) {
                throw new Error(`Expected array but got ${typeof data}: ${JSON.stringify(data)}`);
            }
            
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createNewArticle = createAsyncThunk(
    'articles/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await uploadArticle(formData);
            return response.docs;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        // Добавляем редьюсер для добавления статьи без API запроса
        addNewArticle: (state, action) => {
            state.list.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createNewArticle.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            });
    }
});

export const { addNewArticle } = articleSlice.actions;

export default articleSlice.reducer;