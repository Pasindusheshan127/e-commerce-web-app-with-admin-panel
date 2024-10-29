import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false, // Corrected spelling here
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action) => {
      state.value = {
        isAuth: true,
        username: action.payload.username,
        uid: action.payload.uid,
        isModerator: action.payload.isModerator, // Corrected spelling here
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
