import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import answerReducer from './answerSlice';
import authReducer from './authSlice';
import commentReducer from './commentSlice';
import postReducer from './postSlice';
import uploadReducer from './uploadSlice';
import userReducer from './userSlice';

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const { auth } = store.getState();
  localStorage.setItem('reduxState', JSON.stringify({ auth }));
  return result;
};

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') || '')
  : {};

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    posts: postReducer,
    answers: answerReducer,
    comments: commentReducer,
    upload: uploadReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, localStorageMiddleware),
  preloadedState: persistedState,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

