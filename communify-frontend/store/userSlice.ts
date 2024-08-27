import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INITIAL_APP_STORE } from '../constants';
import { RootState } from './store';

const API_BASE_URL = 'http://localhost:4000/api/v1/user';

export const autocompleteSearchUser = createAsyncThunk(
  'users/autocompleteSearchUser',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/autocomplete?name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to autocomplete search users');
      }
      const data = await response.json();
      return data.users;
    } catch (error) {
      return rejectWithValue('Failed to autocomplete search users');
    }
  }
);

export const searchUser = createAsyncThunk(
  'users/searchUser',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      const data = await response.json();
      return data.users;
    } catch (error) {
      return rejectWithValue('Failed to search users');
    }
  }
);

export const fetchUserProfile = createAsyncThunk<any, { refreshToken: string; accessToken: string }>(
  'users/fetchUserProfile',
  async ({ refreshToken, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch user profile');
      }

      const data = await response.json();
      return data.data.user;
    } catch (error) {
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async ({ userId, userData }: { userId: string; userData: any }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      return;
    } catch (error) {
      return rejectWithValue('Failed to update user profile');
    }
  }
);

export const updateUserImage = createAsyncThunk(
  'users/updateUserImage',
  async ({ fileName }: { fileName: string }, { getState, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).userProfile.user?._id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      const response = await fetch(`${API_BASE_URL}/profile/image`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, userId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user image');
      }
      const data = await response.json();
      return data.publicUrl;
    } catch (error) {
      return rejectWithValue('Failed to update user image');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_APP_STORE.user,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(autocompleteSearchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(autocompleteSearchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(autocompleteSearchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.loading = false;
        const publicUrl = action.payload;
        if (state.user) {
          state.user.profilePicture = publicUrl;
        }
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUser = (state: RootState) => state.userProfile.user;
export const selectLoading = (state: RootState) => state.userProfile.loading;
export const selectError = (state: RootState) => state.userProfile.error;

export default userSlice.reducer;
