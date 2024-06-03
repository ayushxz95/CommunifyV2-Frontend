import { INITIAL_APP_STORE } from '@/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const uploadImage = createAsyncThunk<
  { url: string; fileName: string },
  { fileName: string },
  { rejectValue: string }
>('upload/uploadImage', async ({ fileName }, { rejectWithValue }) => {
  try {

    const response = await fetch(`http://localhost:4000/api/v1/getSignedUrlForImageUpload?fileName=${fileName}`);
    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.data.msg);
    }

    return data.data;
  } catch (error) {
    return rejectWithValue('An error occurred during image upload');
  }
});

const uploadSlice = createSlice({
  name: 'upload',
  initialState: INITIAL_APP_STORE.upload,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.imageUrl = "";
        state.fileName = "";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload.url;
        state.fileName = action.payload.fileName;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectImageUrl = (state: RootState) => state.upload.imageUrl;
export const selectFileName = (state: RootState) => state.upload.fileName;
export const selectUploadLoading = (state: RootState) => state.upload.loading;
export const selectUploadError = (state: RootState) => state.upload.error;

export default uploadSlice.reducer;
