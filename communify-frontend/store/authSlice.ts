import { INITIAL_APP_STORE } from '@/constants';
import { IUser } from '@/models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { RootState } from './store';

export const signInUser = createAsyncThunk<IUser, { email: string; password: string }>(
  'auth/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const userData: IUser = await response.json();
      return userData;
    } catch (error) {
      return rejectWithValue('An error occurred during sign in');
    }
  }
);


export const signUpUser = createAsyncThunk<IUser, { username: string; email: string; password: string }>(
  'auth/signUpUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    console.log(username, email, password);
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const userData: IUser = await response.json();
      return userData;
    } catch (error) {
      return rejectWithValue('An error occurred during sign up');
    }
  }
);

export const logoutUser = createAsyncThunk<void, { userId: string; refreshToken: string, accessToken: string }>(
  'auth/logoutUser',
  async ({ userId, refreshToken, accessToken }, { rejectWithValue }) => {
    console.log('I am in logout');
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId, refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      return;
    } catch (error) {
      return rejectWithValue('An error occurred during logout');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_APP_STORE.auth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        console.log(action.payload);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('I am here');
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
        toast.error('Something went wrong');
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
