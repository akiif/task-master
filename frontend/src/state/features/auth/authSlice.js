import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import api
import axiosRequest from "../../../api/user.api";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  userId: ''
}

export const checkIsLoggedIn = createAsyncThunk('auth/checkIsLoggedIn', async () => {
  return await 
    axiosRequest.get('/auth/check-logged-in')  
      .then((res) => res.data)
      .catch((err) => console.log(err))
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false,
      state.userId = '' 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIsLoggedIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkIsLoggedIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userId = action.payload.userId
      })
      .addCase(checkIsLoggedIn.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  }
});

export const { setIsLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
