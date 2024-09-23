import { configureStore } from "@reduxjs/toolkit";
import loginAdminReducer from "./features/login&AdminSlicer";
import productsReducer from "./features/productsSlicer";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    loginAdmin: loginAdminReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
