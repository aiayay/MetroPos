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


// authSlice.js

// Perbaiki LoginUser thunk
export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "user/login", {
      username: user.username,
      password: user.password,
    });
    console.log("API Response:", response.data); // Log respons API
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) { // Ubah 'msg' menjadi 'message'
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue("Terjadi kesalahan");
  }
});

// Perbaiki getMe thunk
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token tidak ditemukan");
    }
    const response = await axios.get(API_URL + "user/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Menggunakan backticks
      },
    });
    // console.log("Respons dari getMe:", action.payload);

    return response.data;
    
  } catch (error) {
    if (error.response && error.response.data.message) { // Ubah 'msg' menjadi 'message'
      return thunkAPI.rejectWithValue(error.response.data.message);
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
    token: localStorage.getItem("token") || null,
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
      // console.log("API Response:", response.data);
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;  // Pastikan user disimpan di state
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("nama_kasir", action.payload.user.nama_lengkap);
      
      console.log("Redux State setelah login:", state); // Periksa apakah state.auth berisi user
   

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
      console.log("Respons dari getMe:", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.data;  // Simpan data user dari getMe ke Redux state
      localStorage.setItem("nama_kasir", action.payload.data.nama_lengkap);

      console.log("Token dari localStorage:", localStorage.getItem("token"));

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
