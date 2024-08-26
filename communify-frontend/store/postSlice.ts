import { INITIAL_APP_STORE } from '@/constants';
import { IPost, IPostForCreate } from '@/models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { toast } from 'react-toastify';
import { stat } from 'fs';

const API_BASE_URL = 'http://localhost:4000/api/v1/post';
const API_BASE_URL_FOR_SAVE_POST = 'http://localhost:4000/api/v1/savedPost';
const API_BASE_URL_FOR_ANSWER_AND_REACTION = 'http://localhost:4000/api/v1/answer'

export const fetchAllPosts = createAsyncThunk<IPost, { refreshToken: string, accessToken: string }>
('posts/fetchAllPosts', async ({ refreshToken, accessToken }, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + '/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const { data } = await response.json();
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

export const savePost = createAsyncThunk<string, { postId: string, refreshToken: string, accessToken: string }>(
  'posts/savePost',
  async ({ postId, refreshToken, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL_FOR_SAVE_POST}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ postId }), // Wrap postId in an object
      });

      return postId;
    } catch (error) {
      return rejectWithValue('Failed to save post');
    }
  }
);

export const unSavePost = createAsyncThunk<string, { postId: string, refreshToken: string, accessToken: string }>(
  'posts/unSavePost',
  async ({ postId, refreshToken, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL_FOR_SAVE_POST}/${postId}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      return postId;
    } catch (error) {
      return rejectWithValue('Failed to save post');
    }
  }
);

export const likePost = createAsyncThunk<{postId: string, reactionType: string}, { postId: string, reactionType: string, refreshToken: string, accessToken: string }>(
  'posts/likePost',
  async ({ postId, reactionType, refreshToken, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL_FOR_ANSWER_AND_REACTION}/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reactionType })
      });

      return { postId, reactionType };
    } catch (error) {
      return rejectWithValue('Failed to save post');
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
      .addCase(savePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        toast.success('You have successfully saved this post. To view it, visit your profile and check the answer section.', {
          position: 'bottom-right',
        });
        const index = state.posts.findIndex(item => item._id === action.payload);
        if (index !== -1) {
          state.posts[index].isSaved = true;
        }
      })
      .addCase(savePost.rejected, (state) => {
        state.loading = false;
        toast.error(`Couldn't save this post, please try again`, {
          position: 'bottom-right',
        });
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        toast.success('You have successfully liked this post', {
          position: 'bottom-right',
        });
        const index = state.posts.findIndex(item => item._id === action.payload.postId);
        if (index !== -1) {
          state.posts[index].mostLikedAnswer.isLiked = action.payload.reactionType === 'LIKE' ? true : false;
        }
      })
      .addCase(likePost.rejected, (state) => {
        state.loading = false;
        toast.error(`Couldn't like this post, please try again`, {
          position: 'bottom-right',
        });
      })
      .addCase(unSavePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(unSavePost.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        toast.success('You have successfully unsaved this post. Click again to save', {
          position: 'bottom-right',
        });
        const index = state.posts.findIndex(item => item._id === action.payload);
        if (index !== -1) {
          state.posts[index].isSaved = false;
        }
      })
      .addCase(unSavePost.rejected, (state) => {
        state.loading = false;
        toast.error(`Couldn't unsave this post, please try again`, {
          position: 'bottom-right',
        });
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        // @ts-ignore: Unreachable code error
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
        // state.posts.push(action.payload);
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
        const index = state.posts.findIndex((post) => post._id === updatedPost.id);
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
        state.posts = state.posts.filter((post) => post._id !== action.payload);
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
