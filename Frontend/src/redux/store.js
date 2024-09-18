import { configureStore } from "@reduxjs/toolkit";
import loginAdminReducer from "./features/login&AdminSlicer";
import productsReducer from "./features/productsSlicer";

export const store = configureStore({
  reducer: {
    loginAdmin: loginAdminReducer,
    products: productsReducer,
  },
});
