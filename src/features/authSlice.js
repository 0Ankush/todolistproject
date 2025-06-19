import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // Mock authentication delay
    await new Promise((res) => setTimeout(res, 1000));
    if (username === "user" && password === "password") {
      dispatch(loginSuccess());
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};
