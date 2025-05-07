import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name:"loading",
    initialState:{isPostLoading: true},
    reducers:{
        setIsPostLoading:(state,action)=>{
            state.isPostLoading = action.payload
        },
    },
})

export const {setIsPostLoading} = loadingSlice.actions
export default loadingSlice.reducer