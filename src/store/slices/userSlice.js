import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedWorks: [],
  savedWorks: [],
  loadingLiked: false,
  loadingSaved: false,
  errorLiked: null,
  errorSaved: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLikedWorks: (state, action) => {
      state.likedWorks = action.payload;
    },
    setSavedWorks: (state, action) => {
      state.savedWorks = action.payload;
    },
    addLikedWork: (state, action) => {
      if (!state.likedWorks.includes(action.payload)) {
        state.likedWorks.push(action.payload);
      }
    },
    removeLikedWork: (state, action) => {
      state.likedWorks = state.likedWorks.filter(id => id !== action.payload);
    },
    addSavedWork: (state, action) => {
      if (!state.savedWorks.includes(action.payload)) {
        state.savedWorks.push(action.payload);
      }
    },
    removeSavedWork: (state, action) => {
      state.savedWorks = state.savedWorks.filter(id => id !== action.payload);
    },
  },
});

export const {
  setLikedWorks,
  setSavedWorks,
  addLikedWork,
  removeLikedWork,
  addSavedWork,
  removeSavedWork,
} = userSlice.actions;

export default userSlice.reducer;