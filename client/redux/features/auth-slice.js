import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (FormData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      FormData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginrUser = createAsyncThunk("/auth/login", async (FormData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    FormData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
