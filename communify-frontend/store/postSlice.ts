import { INITIAL_APP_STORE } from '@/constants';
import { IPost, IPostForCreate } from '@/models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const API_BASE_URL = 'http://localhost:4000/api/v1/post';

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + '/all');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    return rejectWithValue('Failed to fetch posts');
  }
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + `/${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const data = await response.json();
    return data.post;
  } catch (error) {
    return rejectWithValue('Failed to fetch post');
  }
});

export const createPost = createAsyncThunk<void, { postData: IPostForCreate, refreshToken: string, accessToken: string }>('posts/createPost',
  async ({ postData, refreshToken, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL + '/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const data = await response.json();
      return data.post;
    } catch (error) {
      return rejectWithValue('Failed to create post');
    }
  });

export const updatePostById = createAsyncThunk(
  'posts/updatePostById',
  async ({ postId, postData }: { postId: string; postData: IPost }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL + `/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      const data = await response.json();
      return data.post;
    } catch (error) {
      return rejectWithValue('Failed to update post');
    }
  }
);

export const deletePostById = createAsyncThunk('posts/deletePostById', async (postId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + `/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return postId;
  } catch (error) {
    return rejectWithValue('Failed to delete post');
  }
});

export const searchPosts = createAsyncThunk('posts/searchPosts', async (name: string, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + `/search?name=${name}`);
    if (!response.ok) {
      throw new Error('Failed to search posts');
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    return rejectWithValue('Failed to search posts');
  }
});

export const autoCompleteSearchPost = createAsyncThunk(
  'posts/autoCompleteSearchPost',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL + `/autocomplete?name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to perform autocomplete search');
      }
      const data = await response.json();
      return data.posts;
    } catch (error) {
      return rejectWithValue('Failed to perform autocomplete search');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_APP_STORE.post,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateTag: (state, action) => {
      state.tags = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "fetch vali check");
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [action.payload];
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(updatePostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(autoCompleteSearchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(autoCompleteSearchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(autoCompleteSearchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateTitle, updateTag } = postSlice.actions;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectLoading = (state: RootState) => state.posts.loading;
export const selectError = (state: RootState) => state.posts.error;

export default postSlice.reducer;
