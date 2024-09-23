import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [
    ],
    total: 0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            const [item, counter] = action.payload;
            const existingItem =  state.cart.find((cartItem) => cartItem.item._id === item._id);
            if (existingItem) {
                existingItem.counter += counter;
            }
            else {
                state.cart.push({ item: item, counter: counter });
            }

            state.total += counter;
        },

        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cart.find((cartItem) => cartItem.item._id === id);
            if (existingItem) {
                state.total -= existingItem.counter;
                state.cart = state.cart.filter((cartItem) => cartItem.item._id !== id);
            }
        },

        reduceItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cart.find((cartItem) => cartItem.item._id === id);
            if (existingItem) {
                state.total -= 1;
                existingItem.counter -= 1;
            }
        },
    },
})

export const { setCart, deleteItem, reduceItem } = cartSlice.actions;
export default cartSlice.reducer;