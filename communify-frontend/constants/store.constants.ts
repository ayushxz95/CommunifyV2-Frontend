import { IStore } from "../models";

export const INITIAL_APP_STORE: IStore = {
  auth: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
  },
  user: {
    users: [],
    loading: false,
    error: null
  },
  post: {
    posts: [],
    loading: false,
    error: null
  },
  answer: {
    answers: [],
    loading: false,
    error: null
  },
  comment: {
    comments: [],
    loading: false,
    error: null
  },
  upload: {
    loading: false,
    error: null,
    imageUrl: null,
    fileName: null
  }
};
