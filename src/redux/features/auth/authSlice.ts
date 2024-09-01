import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
};
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  address: string;
  bookings: [string];
  preferences: string[];
}

export type TAuthState = {
  user: null | IUser;
  token: null | string;
};

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: TAuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Persist user and token to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Remove user and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
