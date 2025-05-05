import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearchQuery: (state, action)=>{
            state.searchQuery = action.payload;
        },
        clearSearchQuery: (state) => {
            state.searchQuery = '';
        },
    }
})

export const {setSearchQuery, clearSearchQuery} = searchSlice.actions;
export default searchSlice.reducer;