import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  isAuth: boolean;
  token: string;
  user: any;
  users: any;
}

const initialState: authState = {
  isAuth: false,
  token: "",
  user: null,
  users: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = true;
      state.token = action.payload?.user?.token;
      state.user = action.payload?.user;
      localStorage.setItem("token", action.payload?.user?.token);
    },
    users: (state, action) => {
      state.users = action.payload?.users;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    },
    updateToken: (state, action) => {
      state.token = action.payload?.access_token;
      state.isAuth = true;
    },
    updateUser: (state, action) => {
      state.user = action.payload?.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateToken, users, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
