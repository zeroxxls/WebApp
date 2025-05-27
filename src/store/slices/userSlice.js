import { createSlice,} from "@reduxjs/toolkit";

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
  },
  },
);

export const {
  setLikedWorks,
  setSavedWorks,
  addLikedWork,
  addSavedWork,
} = userSlice.actions;

export default userSlice.reducer;