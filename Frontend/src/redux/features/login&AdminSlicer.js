import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedin: false,
  isAdmin: false,
  userId: "",
};

export const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedin = true;
    },
    logout: (state) => {
      state.loggedin = false;
    },
    adminLogin: (state, action) => {
      state.loggedin = true;
      state.isAdmin = true;
      state.userId = action.payload;
    },
    adminLogout: (state) => {
      state.loggedin = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout, adminLogin, adminLogout } =
  loginAdminSlice.actions;
export default loginAdminSlice.reducer;
