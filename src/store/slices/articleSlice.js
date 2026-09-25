import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesPage, uploadArticle } from '../../api/articlesApi';

const initialState = {
    list: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true,
};

export const fetchArticles = createAsyncThunk(
    'articles/fetchAll',
    async (page = 1, { rejectWithValue }) => {
        try {
            const data = await fetchArticlesPage(page, 12);
            if (!Array.isArray(data.articles)) {
                throw new Error('Unexpected articles response');
            }
            return data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : error.message);
        }
    },
    {
        condition: (page = 1, { getState }) => {
            const state = getState().articles;
            return !state.loading && (page === 1
                || (page === state.page + 1 && state.hasMore));
        }
    }
);

export const createNewArticle = createAsyncThunk(
    'articles/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await uploadArticle(formData);
            return response.article;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
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
                const { articles, page, hasMore } = action.payload;
                state.list = page === 1 ? articles : [...state.list, ...articles];
                state.page = page;
                state.hasMore = hasMore;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createNewArticle.fulfilled, (state, action) => {
                state.list.unshift(action.payload.article || action.payload);
            });
    }
});

export const { addNewArticle } = articleSlice.actions;

export default articleSlice.reducer;
