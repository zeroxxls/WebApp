import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            const existingItem = state.items.find(item => item.workId === action.payload.workId);
            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.items.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart:(state,action)=>{
            state.items = state.items.filter(item=> item.workId !== action.payload);
        },
        updateQuantity:(state,action)=>{
            const {workId,quantity} = action.payload;
            const item = state.items.find(item => item.workId === workId);
            if(item){
                item.quantity = quantity;
            }
        },
        clearCart:(state)=>{
            state.items = [];
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;