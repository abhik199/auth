import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const user = state.payload;
      // state.isAuthenticated = true;
      // state.user = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuthenticated = false;
      } else {
        state.isAuthenticated = true;
      }
    },

    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
