import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    signOutUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { loginUser, signOutUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
