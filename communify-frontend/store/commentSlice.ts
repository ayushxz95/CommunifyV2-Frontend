import { INITIAL_APP_STORE } from '@/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const API_BASE_URL = 'http://localhost:4000/api/v1/comments';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ answerId, content }: { answerId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL + '/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answerId, content }),
      });
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      const data = await response.json();
      return data.comment;
    } catch (error) {
      return rejectWithValue('Failed to create comment');
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, content }: { commentId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL + `/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      const data = await response.json();
      return { commentId, content: data.content };
    } catch (error) {
      return rejectWithValue('Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + `/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
    return commentId;
  } catch (error) {
    return rejectWithValue('Failed to delete comment');
  }
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: INITIAL_APP_STORE.comment,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const { commentId, content } = action.payload;
        const index = state.comments.findIndex((comment) => comment.id === commentId);
        if (index !== -1) {
          state.comments[index].content = content;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoading = (state: RootState) => state.comments.loading;
export const selectError = (state: RootState) => state.comments.error;

export default commentSlice.reducer;
