import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./constants";

const initialState = {
  user: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "user/login", {
      username: user.username,
      password: user.password,
    });
    console.log("API Response:", response.data); // Tambahkan log ini
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

//kedua

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user.token;  // Pastikan token tersedia di state
    const response = await axios.get(API_URL + "user/admin", {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});


export const LogOut = createAsyncThunk("user/LogOut", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const id_user = state.auth.user.id;  // Ambil id_user dari state auth
  await axios.delete(API_URL + "user/users/" + id_user);
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user; // Simpan hanya objek user
    });
    
    
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })

    //get user login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
