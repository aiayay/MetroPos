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

// authSlice.js
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token; // Mengambil token dari state.auth.token
    if (!token) {
      return thunkAPI.rejectWithValue("Token tidak ditemukan");
    }
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
    } else {
      return thunkAPI.rejectWithValue("Terjadi kesalahan jaringan");
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
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null, // Inisialisasi token dari localStorage
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => initialState,
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      localStorage.removeItem("token"); // Hapus token dari localStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.token = action.payload.token; // Menyimpan token ke state
      localStorage.setItem("token", action.payload.token); // Menyimpan token ke localStorage
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

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
