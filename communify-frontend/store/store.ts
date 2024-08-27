import { IStore } from '@/models/store.interface';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

const persistedState = localStorage.getItem('reduxState');
const initialState: Partial<IStore> = persistedState ? JSON.parse(persistedState) : {};

export const store = configureStore({
  reducer: {
    // @ts-ignore: Unreachable code error
    userProfile: userReducer,
    auth: authReducer,
    posts: postReducer,
    answers: answerReducer,
    comments: commentReducer,
    upload: uploadReducer,
  },
  // @ts-ignore: Unreachable code error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, localStorageMiddleware),
  preloadedState: initialState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<any>();

